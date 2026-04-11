import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'

// Disable caching for this API route
export const dynamic = 'force-dynamic'

interface ScheduledDocument {
  documentId: string
  draftId: string
  publishSchedule: {
    scheduledDate: string
    publishStatus: string
    dependencies?: string[]
  }
}

interface PublishResult {
  documentId: string
  status: 'published' | 'error' | 'skipped'
  error?: string
  reason?: string
}

export async function GET(req: Request) {
  return handlePublish(req)
}

export async function POST(req: Request) {
  return handlePublish(req)
}

async function handlePublish(req: Request) {
  const authHeader = req.headers.get('authorization')

  // You should store CRON_SECRET and SANITY_API_TOKEN in your environment variables.
  const expectedToken = process.env.CRON_SECRET || process.env.SANITY_API_READ_WRITE_TOKEN

  if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Initialize Sanity client. Uses NEXT_PUBLIC versions if the base ones are undefined.
  const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn: false,
    token: process.env.SANITY_API_READ_WRITE_TOKEN, // Needs write permissions
    apiVersion: '2025-01-01',
  })

  // Validate required environment variables
  if (!client.config().projectId || !client.config().dataset || !process.env.SANITY_API_READ_WRITE_TOKEN) {
    return NextResponse.json({
      error: 'Missing required environment variables',
      required: ['SANITY_PROJECT_ID', 'SANITY_DATASET', 'SANITY_API_READ_WRITE_TOKEN'],
    }, { status: 500 })
  }

  try {
    const now = new Date().toISOString()

    // Find all documents scheduled to publish now or in the past
    const scheduledDocs: ScheduledDocument[] = await client.fetch(`
      *[_type == "workflow.metadata" 
        && defined(publishSchedule.scheduledDate)
        && publishSchedule.scheduledDate <= $now
        && publishSchedule.publishStatus == "scheduled"
      ] {
        documentId,
        "draftId": "drafts." + documentId,
        publishSchedule
      }
    `, { now })

    const results: PublishResult[] = []

    for (const doc of scheduledDocs) {
      try {
        // Check dependencies first
        const dependencies = doc.publishSchedule?.dependencies || []
        if (dependencies.length > 0) {
          const dependencyChecks = await Promise.all(
            dependencies.map(async (depId: string) => {
              try {
                const dep = await client.getDocument(depId)
                return { id: depId, published: !!dep && !dep._id.startsWith('drafts.') }
              } catch {
                return { id: depId, published: false }
              }
            })
          )

          const unmetDeps = dependencyChecks.filter(d => !d.published)
          if (unmetDeps.length > 0) {
            results.push({
              documentId: doc.documentId,
              status: 'skipped',
              reason: `Dependencies not met: ${unmetDeps.map(d => d.id).join(', ')}`,
            })
            continue // Skip to next document
          }
        }

        // Get the draft document
        let draft
        try {
          draft = await client.getDocument(doc.draftId)
        } catch (error) {
          results.push({
            documentId: doc.documentId,
            status: 'skipped',
            reason: 'Draft not found',
          })
          continue
        }

        if (draft) {
          // Publish the draft by copying its content to the published version
          // Remove _id and _rev from draft to avoid conflicts
          const { _id: draftId, _rev: draftRev, ...draftContent } = draft

          // Use set() to copy all draft content to published document
          await client
            .patch(doc.documentId)
            .set(draftContent)
            .commit()

          // Update workflow metadata to mark as published
          await client
            .patch(`workflow-metadata.${doc.documentId}`)
            .set({
              'publishSchedule.publishStatus': 'published',
            })
            .commit()

          results.push({
            documentId: doc.documentId,
            status: 'published',
          })
        } else {
          results.push({
            documentId: doc.documentId,
            status: 'skipped',
            reason: 'Draft content was empty or undefined',
          })
        }
      } catch (error) {
        console.error(`Failed to publish ${doc.documentId}:`, error)
        results.push({
          documentId: doc.documentId,
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error',
        })
      }
    }

    const publishedCount = results.filter(r => r.status === 'published').length
    const errorCount = results.filter(r => r.status === 'error').length
    const skippedCount = results.filter(r => r.status === 'skipped').length

    return NextResponse.json({
      timestamp: new Date().toISOString(),
      checked: scheduledDocs.length,
      published: publishedCount,
      errors: errorCount,
      skipped: skippedCount,
      results,
    }, { status: 200 })

  } catch (error) {
    console.error('Publish scheduled error:', error)
    return NextResponse.json({
      error: 'Failed to publish scheduled documents',
      message: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 })
  }
}
