import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import jsPDF from "jspdf";

function Rapor() {
  const location = useLocation();
  const { isim, calismaSuresi, hedefler, yapilanlar, tamamlanmayanlar, notlar, tarih, gorsel, raporAdi } = location.state || {};
  const [pdfUrl, setPdfUrl] = useState(null);

  const handleViewPDF = () => {
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 15;
    let y = 20;

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(18);
    pdf.text(raporAdi || "Günlük Rapor", pageWidth / 2, y, { align: "center" });
    y += 15;

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);
    pdf.text(`📌 Rapor Sahibi: ${isim || "Bilinmeyen Kullanıcı"}`, margin, y);
    y += 10;
    pdf.text(`⏳ Çalışma Süresi: ${calismaSuresi || "Belirtilmedi"} saat`, margin, y);
    y += 10;
    pdf.text(`📅 Tarih: ${tarih || "Bilinmeyen Tarih"}`, margin, y);
    y += 15;

    pdf.setFont("times", "italic");
    pdf.setFontSize(11);
    pdf.text("🎯 Hedefler:", margin, y);
    y += 7;
    pdf.setFont("times", "normal");
    pdf.text(hedefler || "Belirtilmedi", margin, y, { maxWidth: pageWidth - 2 * margin });
    y += 15;

    pdf.setFont("times", "italic");
    pdf.text("✅ Yapılanlar:", margin, y);
    y += 7;
    pdf.setFont("times", "normal");
    pdf.text(yapilanlar || "Belirtilmedi", margin, y, { maxWidth: pageWidth - 2 * margin });
    y += 15;

    pdf.setFont("times", "italic");
    pdf.text("❌ Tamamlanmayanlar:", margin, y);
    y += 7;
    pdf.setFont("times", "normal");
    pdf.text(tamamlanmayanlar || "Belirtilmedi", margin, y, { maxWidth: pageWidth - 2 * margin });
    y += 15;

    pdf.setFont("times", "italic");
    pdf.text("📝 Notlar:", margin, y);
    y += 7;
    pdf.setFont("times", "normal");
    pdf.text(notlar || "Belirtilmedi", margin, y, { maxWidth: pageWidth - 2 * margin });
    y += 15;

    if (gorsel) {
      const imgWidth = 120;
      const imgHeight = 80;
      pdf.addImage(gorsel, "JPEG", (pageWidth - imgWidth) / 2, y, imgWidth, imgHeight);
      y += imgHeight + 10;
    }

    const pdfOutput = pdf.output("bloburl");
    setPdfUrl(pdfOutput);
  };

  useEffect(() => {
    handleViewPDF();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📄 Rapor Görüntüleme</h1>
      {pdfUrl && (
        <div style={styles.pdfViewer}>
          <iframe src={pdfUrl} width="100%" height="500px" style={{ border: "none" }} title="Rapor PDF" />
        </div>
      )}
      <Link to="/">
        <button style={styles.button}>🔙 Geri Dön</button>
      </Link>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#f4f4f4",
    padding: "20px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "15px",
  },
  pdfViewer: {
    width: "100%",
    height: "500px",
    marginTop: "20px",
  },
  button: {
    marginTop: "15px",
    padding: "12px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background 0.3s",
  },
};

export default Rapor;
