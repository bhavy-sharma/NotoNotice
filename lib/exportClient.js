import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function exportToPDF() {
  const element = document.getElementById('notice-preview');
  if (!element) return alert('Preview not found');

  try {
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/jpeg', 0.95);

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = 210;
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('notice.pdf');
  } catch (err) {
    console.error('Export failed:', err);
    alert('Export failed. Try again.');
  }
}

export function exportToJPG() {
  const element = document.getElementById('notice-preview');
  if (!element) return;

  html2canvas(element, { scale: 2 }).then((canvas) => {
    const link = document.createElement('a');
    link.download = 'notice.jpg';
    link.href = canvas.toDataURL('image/jpeg', 0.95);
    link.click();
  });
}