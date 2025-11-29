// app/api/proposal/contract/route.ts
import { NextResponse } from 'next/server';
import { client as sanityClient } from '@/src/sanity/client';
import { generateSignedContractPDF } from '@/utils/pdfGenerator';
import { saveSignedContract } from '@/utils/saveSignedContract';

interface Payload {
    proposalId: string;
    uniqueCode: string;
    clientSignature: string;
}

export async function POST(request: Request) {
    console.log('API /contract POST called');

    try {
        const { proposalId, uniqueCode, clientSignature }: Payload = await request.json();
        console.log('Payload:', { proposalId, uniqueCode, hasSignature: !!clientSignature });

        if (!proposalId || !clientSignature) {
            return NextResponse.json({ error: 'Missing proposalId or signature' }, { status: 400 });
        }

        const proposal: any = await sanityClient.getDocument(proposalId);
        if (!proposal) {
            return NextResponse.json({ error: 'Proposal not found' }, { status: 404 });
        }

        // ENSURE contractTemplate exists
        if (!proposal.contractTemplate) {
            console.error('No contractTemplate assigned → using fallback');
            return NextResponse.json(
                { error: 'No contract template assigned. Please link one in Sanity.' },
                { status: 400 }
            );
        }

        // DEFAULT HEADER IF MISSING
        const header = proposal.contractTemplate.header || {
            mainHeading: 'Service Agreement',
            preparedForText: 'Prepared for:',
            createdByText: 'Created by:',
        };

        // DEFAULT AGENCY SIGNATURE
        const agencySignature = proposal.contractTemplate.agencySignature || {
            companyName: 'Aligoo Digital PLC',
            signerName: 'Amanuel Tesfaye',
            signatureImage: null,
        };

        // SAFELY BUILD FINAL CONTRACT OBJECT
        const safeContractTemplate = {
            ...proposal.contractTemplate,
            header,
            agencySignature,
            sections: proposal.contractTemplate.sections || [],
            priceSection: proposal.contractTemplate.priceSection || { heading: 'Payment Terms' },
        };

        // Attach safe version back
        const safeProposal = {
            ...proposal,
            contractTemplate: safeContractTemplate,
        };

        console.log('Using safe contract template:', {
            mainHeading: safeContractTemplate.header.mainHeading,
            sectionsCount: safeContractTemplate.sections.length,
        });

        // PREPARE DATA
        const data = {
            clientName: proposal.clientName || 'Valued Client',
            clientCompany: 'Client Company',
            packageName:
                proposal.currentSelection?.selectedPackage === 'basic'
                    ? 'Build'
                    : proposal.currentSelection?.selectedPackage === 'pro'
                        ? 'Grow'
                        : 'Accelerate',
            totalPrice: proposal.currentSelection?.totalPrice || 0,
            depositPercentage: proposal.currentSelection?.depositPercentage || 50,
            depositAmount:
                ((proposal.currentSelection?.totalPrice || 0) * (proposal.currentSelection?.depositPercentage || 50)) / 100,
            todayDate: new Date().toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            }),
            addOnsList: proposal.currentSelection?.selectedAddOns || [],
        };

        console.log('Generating PDF...');
        const pdfBuffer = await generateSignedContractPDF(safeProposal, data, clientSignature);

        console.log('Saving to Sanity...');
        const result = await saveSignedContract({
            proposalId,
            uniqueCode,
            clientSignatureBase64: clientSignature,
            pdfBuffer,
        });

        console.log('CONTRACT SIGNED SUCCESSFULLY');
        return NextResponse.json(result);
    } catch (error: any) {
        console.error('FATAL ERROR:', error);
        return NextResponse.json(
            { error: 'Signing failed', details: error.message },
            { status: 500 }
        );
    }
}