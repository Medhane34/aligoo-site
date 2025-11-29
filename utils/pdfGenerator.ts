// lib/pdfGenerator.ts
import PdfPrinter from 'pdfmake';
import path from 'path';
import { replacePlaceholders } from './contractUtils';

// Define fonts with absolute paths for Node.js environment
const fonts = {
    Chiret: {
        normal: path.join(process.cwd(), 'public/fonts/Chiret-Regular.ttf'),
        bold: path.join(process.cwd(), 'public/fonts/Chiret-Regular.ttf'),
        italics: path.join(process.cwd(), 'public/fonts/Chiret-Regular.ttf'),
        bolditalics: path.join(process.cwd(), 'public/fonts/Chiret-Regular.ttf'),
    },
    NotoSansEthiopic: {
        normal: path.join(process.cwd(), 'public/fonts/NotoSansEthiopic-VariableFont_wdth,wght.ttf'),
        bold: path.join(process.cwd(), 'public/fonts/NotoSansEthiopic-VariableFont_wdth,wght.ttf'),
        italics: path.join(process.cwd(), 'public/fonts/NotoSansEthiopic-VariableFont_wdth,wght.ttf'),
        bolditalics: path.join(process.cwd(), 'public/fonts/NotoSansEthiopic-VariableFont_wdth,wght.ttf'),
    },
};

// DEFAULT FONT
const defaultStyle = {
    font: 'Chiret',
    fontSize: 12,
    lineHeight: 1.8,
};

export function generateSignedContractPDF(
    proposal: any,
    data: Record<string, any>,
    clientSignatureBase64: string
): Promise<Buffer> {
    const docDefinition: any = {
        pageSize: 'A4',
        pageMargins: [60, 60, 60, 80],
        defaultStyle,
        content: [
            // TITLE — NEVER FAILS
            {
                text: proposal.contractTemplate?.header?.mainHeading || 'የአገልግሎት ስምምነት',
                style: { fontSize: 28, bold: true, alignment: 'center', margin: [0, 0, 0, 30] },
            },
            {
                text: `ለደንበኛ፡ ${data.clientName} • ቀን፡ ${data.todayDate}`,
                style: { fontSize: 15, alignment: 'center', margin: [0, 0, 0, 50], color: '#555' },
            },

            // SECTIONS — BULLETPROOF
            ...(proposal.contractTemplate?.sections || []).flatMap((section: any) => [
                {
                    text: section.heading || 'ክፍል',
                    style: { fontSize: 19, bold: true, color: '#f59e0b', margin: [0, 20, 0, 10] },
                },
                {
                    text: replacePlaceholders(section.body || '', data),
                    margin: [0, 0, 0, 12],
                },
                ...(section.bullets || []).map((b: string) => ({
                    text: `• ${b}`,
                    margin: [25, 0, 0, 8],
                })),
                { text: '\n' },
            ]),

            // PRICE TABLE — SAFE
            {
                table: {
                    headerRows: 1,
                    widths: ['65%', '35%'],
                    body: [
                        [
                            { text: 'እቃ', bold: true, fillColor: '#fef3c7', padding: 10 },
                            { text: 'ዋጋ (ብር)', bold: true, fillColor: '#fef3c7', padding: 10 },
                        ],
                        ['የተመረጠው ጥቅል', data.packageName],
                        ['ጠቅላላ ዋጋ', `${data.totalPrice.toLocaleString()} ብር`],
                        [`የመጀመሪያ ክፍያነት (${data.depositPercentage}%)`, `${data.depositAmount.toLocaleString()} ብር`],
                    ],
                },
                layout: 'lightHorizontalLines',
                margin: [0, 30, 0, 50],
            },

            // SIGNATURES — FINAL
            {
                columns: [
                    {
                        width: '50%',
                        stack: [
                            { text: 'የደንበኛ ፊርማ', bold: true, fontSize: 16, margin: [0, 0, 0, 20] },
                            clientSignatureBase64
                                ? { image: clientSignatureBase64, width: 280, height: 110 }
                                : { text: '______________________________', fontSize: 16 },
                            { text: data.clientName, bold: true, margin: [0, 20, 0, 5] },
                            { text: `ቀን፡ ${data.todayDate}` },
                        ],
                    },
                    {
                        width: '50%',
                        stack: [
                            { text: 'የድርጅቱ ፊርማ', bold: true, fontSize: 16, margin: [0, 0, 0, 20] },
                            proposal.contractTemplate?.agencySignature?.signatureImage
                                ? { image: proposal.contractTemplate.agencySignature.signatureImage, width: 280, height: 110 }
                                : { text: '______________________________', fontSize: 16 },
                            { text: 'አማኑኤል ተስፋዬ', bold: true, margin: [0, 20, 0, 5] },
                            { text: 'ዋና ስራ አስፈፃሚ', color: '#666' },
                            { text: `ቀን፡ ${data.todayDate}` },
                        ],
                    },
                ],
            },

            // FOOTER
            {
                text: 'አሊጉ ዲጂታል ኃ/የተ/የግ/ማ • Aligoo Digital PLC • አዲስ አበባ፣ ኢትዮጵያ',
                alignment: 'center',
                fontSize: 11,
                color: '#888',
                margin: [0, 40, 0, 0],
            },
        ],
    };

    const printer = new PdfPrinter(fonts);
    const pdfDoc = printer.createPdfKitDocument(docDefinition);

    return new Promise((resolve, reject) => {
        const chunks: Buffer[] = [];
        pdfDoc.on('data', (chunk) => chunks.push(chunk));
        pdfDoc.on('end', () => resolve(Buffer.concat(chunks)));
        pdfDoc.on('error', (err) => reject(err));
        pdfDoc.end();
    });
}