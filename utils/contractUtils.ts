// lib/contractUtils.ts
export function replacePlaceholders(text: string, data: any): string {
    // Fix: Properly format add-ons as bullet list with <br>
    const addOnsList = Array.isArray(data.addOnsList) && data.addOnsList.length > 0
        ? data.addOnsList.map((item: string) => `• ${item}`).join('<br>')
        : 'None';

    return text
        .replace(/{{clientName}}/g, data.clientName || '')
        .replace(/{{clientCompany}}/g, data.clientCompany || 'Client Company')
        .replace(/{{packageName}}/g, data.packageName || 'Selected Package')
        .replace(/{{packagePrice}}/g, data.packagePrice?.toLocaleString() || '0')
        .replace(/{{totalPrice}}/g, data.totalPrice?.toLocaleString() || '0')
        .replace(/{{depositAmount}}/g, data.depositAmount?.toLocaleString() || '0')
        .replace(/{{depositPercentage}}/g, data.depositPercentage?.toString() || '50')
        .replace(/{{todayDate}}/g, data.todayDate)
        .replace(/{{agencyName}}/g, data.agencyName)
        .replace(/{{agencySigner}}/g, data.agencySigner)
        .replace(/{{addOnsList}}/g, addOnsList);
}