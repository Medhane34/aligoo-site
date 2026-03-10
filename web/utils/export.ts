export const exportToExcel = async (data: any[], fileName: string) => {
  const XLSX = await import("xlsx");
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Subscribers");
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};

export const exportToPDF = async (
  columns: string[],
  data: any[][],
  fileName: string,
) => {
  const { default: jsPDF } = await import("jspdf");
  const { default: autoTable } = await import("jspdf-autotable");
  const doc = new jsPDF();

  autoTable(doc, {
    head: [columns],
    body: data,
    theme: "grid",
    styles: { fontSize: 8 },
    headStyles: { fillColor: [41, 128, 185] },
  });

  doc.save(`${fileName}.pdf`);
};
