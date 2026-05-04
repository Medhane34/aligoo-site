/**
 * One-time migration: Sync `title` from `title_en` on all "post" documents.
 *
 * Use with the token from your .env.local:
 *   SANITY_TOKEN=your_token node scripts/sync-post-titles.ts
 */

import { createClient } from '../web/src/sanity/client'

const TOKEN = process.env.SANITY_TOKEN || process.env.SANITY_API_READ_WRITE_TOKEN

if (!TOKEN) {
  console.error('❌ Missing SANITY_TOKEN or SANITY_API_READ_WRITE_TOKEN environment variable.')
  process.exit(1)
}

const client = createClient({
  projectId: 'mcpko9lw',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2025-01-01',
  token: TOKEN,
})

async function main() {
  console.log('🔍 Fetching all "post" documents with title_en...')

  const posts: Array<{ _id: string; title_en: string; title?: string }> = await client.fetch(
    `*[_type == "post" && defined(title_en)] { _id, title_en, title }`
  )

  if (posts.length === 0) {
    console.log('⚠️  No posts found with _type "post" and a defined title_en field.')
    return
  }

  console.log(`Found ${posts.length} posts.\n`)

  let updated = 0
  let skipped = 0

  for (const post of posts) {
    if (post.title === post.title_en) {
      console.log(`  ⏭  Already synced: ${post._id}`)
      skipped++
      continue
    }
    await client.patch(post._id).set({ title: post.title_en }).commit()
    console.log(`  ✅ Updated: ${post._id} → "${post.title_en}"`)
    updated++
  }

  console.log(`\n✅ Done! Updated ${updated}, skipped ${skipped}.`)
}

main().catch((err) => {
  console.error('❌ Error:', err.message)
  process.exit(1)
})
