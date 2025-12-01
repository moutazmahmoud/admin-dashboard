import { saveAs } from "file-saver";
import jsPDF from "jspdf";

export function exportToCSV(payload: any) {
  const rows: string[] = [];
  // Example: flatten KPIs
  rows.push('Metric,Value');
  Object.keys(payload.kpis).forEach(k=>{
    rows.push(`${k},${payload.kpis[k]}`);
  });

  const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, `analytics-export-${Date.now()}.csv`);
}

export function exportToPDF(payload: any) {
  const doc = new jsPDF();
  doc.setFontSize(14);
  doc.text('Analytics Export', 14, 20);
  let y = 30;
  Object.keys(payload.kpis).forEach(k=>{
    doc.setFontSize(10);
    doc.text(`${k}: ${String(payload.kpis[k])}`, 14, y);
    y += 8;
  });
  doc.save(`analytics-${Date.now()}.pdf`);
}
