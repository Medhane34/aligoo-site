// lib/proposal.ts
import { client } from '@/src/sanity/client'
import { PROPOSAL_BY_CODE_QUERY } from '@/sanity/queries/proposal'
import { ContractReadyProposal, ProposalData } from '@/types/ProposalType'


export async function getProposalByCode(code: string): Promise<ProposalData | null> {
  try {
    const proposal = await client.fetch<ProposalData>(
      PROPOSAL_BY_CODE_QUERY,
      { code },
      /* { next: { revalidate: 60 } } */
    )
    console.log('Fresh proposal fetched:', proposal?.uniqueCode) // ← ADD THIS
    return proposal || null
  } catch (error) {
    console.error('Fetch error:', error)
    return null
  }
}


// Client-side action to update selected package in Sanity (use in client components)
export async function updateProposalSelection(
  proposalId: string,
  selectedPackage: string,
  selectedAddOns?: string[] // Added optional param
) {
  try {
    const patchData: any = {
      'currentSelection.selectedPackage': selectedPackage,
    };

    if (selectedAddOns !== undefined) {
      patchData['currentSelection.selectedAddOns'] = selectedAddOns;
    }


    await client
      .patch(proposalId)
      .set(patchData)
      .commit();
    console.log('Selection saved:', { selectedPackage, selectedAddOns });
  } catch (error) {
    console.error('Failed to save selection:', error);
  }
}

// Update proposal with total price and status (for "Proceed to Contract")
export async function updateProposalWithTotal(
  proposalId: string,
  selectedPackage: string,
  selectedAddOns: string[],
  totalPrice: number,
  status: string = 'viewed'
) {
  try {
    console.log('📊 Updating Sanity with:', {
      selectedPackage,
      selectedAddOns,
      totalPrice,
      status
    });

    await client
      .patch(proposalId)
      .set({
        'currentSelection.selectedPackage': selectedPackage,
        'currentSelection.selectedAddOns': selectedAddOns,
        'currentSelection.totalPrice': totalPrice,
        'status': status,
      })
      .commit();

    console.log('✅ Proposal updated successfully!');
    return { success: true };
  } catch (error) {
    console.error('❌ Failed to update proposal:', error);
    return { success: false, error };
  }
}

export async function getContractByCode(code: string): Promise<ContractReadyProposal | null> {
  try {
    const proposal = await client.fetch<ContractReadyProposal>(
      PROPOSAL_BY_CODE_QUERY,
      { code },
      { next: { revalidate: 30 } }
    )

    console.log('Contract Page Loaded:', {
      code,
      clientName: proposal?.clientName,
      status: proposal?.status,
      hasContractTemplate: !!proposal?.contractTemplate,
      hasClientSignature: !!proposal?.clientSignature,
      hasSignedPdf: !!proposal?.signedContractPdf,
    })

    return proposal || null
  } catch (error) {
    console.error('getContractByCode failed:', error)
    return null
  }
}