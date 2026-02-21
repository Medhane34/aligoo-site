
import { automationClient } from '../src/sanity/client';

async function verifyMigration() {
    console.log('Verifying Proposal Migration...');
    try {
        const proposals = await automationClient.fetch(`*[_type == "proposal"][0...5]{_id, clientName, uniqueCode}`);
        console.log(`Found ${proposals.length} proposals in 'automation' dataset:`);
        proposals.forEach((p: any) => console.log(`- ${p.clientName} (${p.uniqueCode})`));

        if (proposals.length > 0) {
            console.log('✅ SUCCESS: Proposals are accessible in the automation dataset.');
        } else {
            console.error('❌ FAILURE: No proposals found in the automation dataset.');
        }
    } catch (error) {
        console.error('❌ ERROR: Failed to fetch proposals:', error);
    }
}

verifyMigration();
