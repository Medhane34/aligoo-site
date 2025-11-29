// lib/saveSignedContract.ts
import { client as sanityClient } from '@/src/sanity/client';

export async function saveSignedContract({
    proposalId,
    uniqueCode,
    clientSignatureBase64,
    pdfBuffer,
}: {
    proposalId: string;
    uniqueCode: string;
    clientSignatureBase64: string;
    pdfBuffer: Buffer;
}) {
    console.log('saveSignedContract STARTED');
    console.log('proposalId:', proposalId);
    console.log('uniqueCode:', uniqueCode);

    try {
        // 1. Upload PDF
        console.log('Uploading PDF...');
        const pdfAsset = await sanityClient.assets.upload('file', pdfBuffer, {
            filename: `signed-contract-${uniqueCode}.pdf`,
            contentType: 'application/pdf',
        });
        console.log('PDF uploaded → asset ID:', pdfAsset._id);

        // 2. Upload Client Signature
        console.log('Uploading client signature...');
        const sigResponse = await fetch(clientSignatureBase64);
        const sigBuffer = Buffer.from(await sigResponse.arrayBuffer());
        const sigAsset = await sanityClient.assets.upload('image', sigBuffer, {
            filename: `client-signature-${uniqueCode}.png`,
        });
        console.log('Client signature uploaded → asset ID:', sigAsset._id);

        // 3. Patch Proposal — CORRECT FORMAT
        console.log('Patching proposal...');
        await sanityClient
            .patch(proposalId)
            .set({
                clientSignature: {
                    _type: 'image',
                    asset: {
                        _type: 'reference',
                        _ref: sigAsset._id,
                    },
                },
                signedContractPdf: {
                    _type: 'file',
                    asset: {
                        _type: 'reference',
                        _ref: pdfAsset._id,
                    },
                },
                contractSignedAt: new Date().toISOString(),
                status: 'signed', // ← THIS WAS MISSING!
            })
            .commit();

        console.log('PATCH SUCCESSFUL — status: signed');

        return {
            success: true,
            message: 'Contract signed! Project starts today.',
            pdfUrl: pdfAsset.url,
        };
    } catch (error: any) {
        console.error('saveSignedContract FAILED:', error);
        throw new Error(error.message || 'Failed to save contract');
    }
}