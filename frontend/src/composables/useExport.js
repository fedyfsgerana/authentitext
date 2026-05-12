import { jsPDF } from "jspdf";

export function useExport() {
  function exportJSON(result) {
    const data = {
      analyzedAt: result.analyzedAt,
      verdict: result.verdict,
      ai_probability: result.ai_probability,
      human_probability: result.human_probability,
      confidence: result.confidence,
      summary: result.summary,
      highlights: result.highlights,
      text: result.text,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `authentitext-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function exportPDF(result) {
    const doc = new jsPDF();
    const pageW = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentW = pageW - margin * 2;
    let y = 20;

    // Header
    doc.setFillColor(15, 15, 15);
    doc.rect(0, 0, pageW, 40, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("AuthentiText AI", margin, 25);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text("Laporan Analisis Teks", margin, 33);
    y = 55;

    // Tanggal
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(9);
    doc.text(
      new Date(result.analyzedAt).toLocaleString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      margin,
      y,
    );
    y += 12;

    // Verdict badge
    const isAi = result.ai_probability >= 50;
    doc.setFillColor(isAi ? 239 : 34, isAi ? 68 : 197, isAi ? 68 : 94);
    doc.roundedRect(margin, y, 60, 8, 2, 2, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text(
      result.verdict || (isAi ? "Dibuat AI" : "Ditulis Manusia"),
      margin + 4,
      y + 5.5,
    );
    y += 18;

    // Skor
    doc.setTextColor(30, 30, 30);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("Hasil Skor", margin, y);
    y += 8;

    // AI Bar
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60, 60, 60);
    doc.text(`AI: ${result.ai_probability}%`, margin, y);
    doc.setFillColor(230, 230, 230);
    doc.roundedRect(margin + 30, y - 4, contentW - 30, 5, 1, 1, "F");
    doc.setFillColor(239, 68, 68);
    doc.roundedRect(
      margin + 30,
      y - 4,
      ((contentW - 30) * result.ai_probability) / 100,
      5,
      1,
      1,
      "F",
    );
    y += 10;

    // Human Bar
    doc.text(`Manusia: ${result.human_probability}%`, margin, y);
    doc.setFillColor(230, 230, 230);
    doc.roundedRect(margin + 30, y - 4, contentW - 30, 5, 1, 1, "F");
    doc.setFillColor(34, 197, 94);
    doc.roundedRect(
      margin + 30,
      y - 4,
      ((contentW - 30) * result.human_probability) / 100,
      5,
      1,
      1,
      "F",
    );
    y += 10;

    // Kepercayaan
    doc.text(`Kepercayaan: ${result.confidence}`, margin, y);
    y += 14;

    // Divider
    doc.setDrawColor(220, 220, 220);
    doc.line(margin, y, pageW - margin, y);
    y += 10;

    // Ringkasan
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 30, 30);
    doc.text("Ringkasan Analisis", margin, y);
    y += 8;
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    const summaryLines = doc.splitTextToSize(result.summary, contentW);
    doc.text(summaryLines, margin, y);
    y += summaryLines.length * 5 + 10;

    // Divider
    doc.setDrawColor(220, 220, 220);
    doc.line(margin, y, pageW - margin, y);
    y += 10;

    // Indikator
    if (result.highlights && result.highlights.length) {
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(30, 30, 30);
      doc.text("Indikator Utama", margin, y);
      y += 8;

      result.highlights.forEach((h) => {
        if (y > 260) {
          doc.addPage();
          y = 20;
        }
        doc.setFillColor(245, 245, 245);
        const textLines = doc.splitTextToSize(`"${h.text}"`, contentW - 8);
        const reasonLines = doc.splitTextToSize(h.reason, contentW - 8);
        const boxH = (textLines.length + reasonLines.length) * 5 + 8;
        doc.roundedRect(margin, y, contentW, boxH, 2, 2, "F");
        doc.setFontSize(8);
        doc.setFont("helvetica", "italic");
        doc.setTextColor(40, 40, 40);
        doc.text(textLines, margin + 4, y + 5);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(100, 100, 100);
        doc.text(reasonLines, margin + 4, y + 5 + textLines.length * 5);
        y += boxH + 5;
      });
      y += 5;
    }

    // Divider
    doc.setDrawColor(220, 220, 220);
    doc.line(margin, y, pageW - margin, y);
    y += 10;

    // Teks Asli
    if (y > 240) {
      doc.addPage();
      y = 20;
    }
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 30, 30);
    doc.text("Teks yang Dianalisis", margin, y);
    y += 8;
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    const textLines = doc.splitTextToSize(result.text, contentW);
    const previewLines = textLines.slice(0, 20);
    doc.text(previewLines, margin, y);
    if (textLines.length > 20) {
      y += previewLines.length * 4 + 4;
      doc.setTextColor(150, 150, 150);
      doc.text("... (teks dipotong)", margin, y);
    }

    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(180, 180, 180);
      doc.text(
        `AuthentiText AI — Halaman ${i} dari ${pageCount}`,
        margin,
        doc.internal.pageSize.getHeight() - 10,
      );
    }

    doc.save(`authentitext-${Date.now()}.pdf`);
  }

  return { exportJSON, exportPDF };
}
