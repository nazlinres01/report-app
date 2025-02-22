import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable"; 

function Report() {
  const location = useLocation();
  const { isim, calismaSuresi, hedefler, yapilanlar, tamamlanmayanlar, notlar, tarih, gorseller } = location.state || {};
  const [pdfUrl, setPdfUrl] = useState(null);

  const handleViewPDF = () => {
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 20;
    let y = 30;

    pdf.setTextColor(50, 50, 50);
    pdf.setFontSize(26);
    pdf.setFont("times", "bold");
    pdf.text("Günlük Rapor", pageWidth / 2, y, { align: "center" });
    y += 15;

    pdf.setDrawColor(200, 200, 200);
    pdf.line(margin, y, pageWidth - margin, y);
    y += 20;

    pdf.setFontSize(12);
    pdf.setFont("times", "normal");
    pdf.setTextColor(90, 90, 90);
    pdf.text(`Rapor Sahibi: ${isim || "Bilinmeyen Kullanıcı"}`, margin, y);
    y += 8;
    pdf.text(`Çalisma Süresi: ${calismaSuresi || "Belirtilmedi"} saat`, margin, y);
    y += 8;
    pdf.text(`Tarih: ${tarih || "Bilinmeyen Tarih"}`, margin, y);
    y += 20;

    pdf.setDrawColor(220, 220, 220);
    pdf.line(margin, y, pageWidth - margin, y);
    y += 15;

    const addSectionTitle = (title) => {
      pdf.setFont("times", "bold");
      pdf.setFontSize(14);
      pdf.setTextColor(30, 30, 30);
      pdf.text(`${title}`, margin, y);
      y += 8;
      pdf.setDrawColor(220, 220, 220);
      pdf.line(margin, y, pageWidth - margin, y);
      y += 12;
      pdf.setFont("times", "normal");
      pdf.setFontSize(12);
      pdf.setTextColor(80, 80, 80);
    };

    addSectionTitle("Hedefler:");
    pdf.text(hedefler || "Belirtilmedi", margin, y, { maxWidth: pageWidth - 2 * margin });
    y += 20;

    addSectionTitle("Yapilanlar:");
    pdf.text(yapilanlar || "Belirtilmedi", margin, y, { maxWidth: pageWidth - 2 * margin });
    y += 20;

    addSectionTitle("Tamamlanmayanlar:");
    pdf.text(tamamlanmayanlar || "Belirtilmedi", margin, y, { maxWidth: pageWidth - 2 * margin });
    y += 20;

    addSectionTitle("Notlar:");
    pdf.text(notlar || "Belirtilmedi", margin, y, { maxWidth: pageWidth - 2 * margin });
    y += 20;

    if (gorseller && gorseller.length > 0) {
      addSectionTitle("Eklenen Görseller:");
      gorseller.forEach((gorsel, index) => {
        const img = new Image();
        img.src = gorsel.src;
        img.onload = () => {
          const imgWidth = 100;
          const imgHeight = (img.height * imgWidth) / img.width;
          if (y + imgHeight > pdf.internal.pageSize.height - margin) {
            pdf.addPage();
            y = 20;
          }
          pdf.addImage(img, "JPEG", margin, y, imgWidth, imgHeight);
          y += imgHeight + 10;
          const output = pdf.output("bloburl");
          setPdfUrl(output);
        };
      });
    } else {
      const output = pdf.output("bloburl");
      setPdfUrl(output);
    }
  };

  useEffect(() => {
    handleViewPDF();
  }, []);

  return (
    <div style={styles.container}>
      <Link to="/">
        <button style={styles.backButton}>← Geri Dön</button>
      </Link>
      <h1 style={styles.title}>📄 Rapor Görüntüleme</h1>
      {pdfUrl && (
        <div style={styles.pdfViewer}>
          <iframe
            src={pdfUrl}
            style={styles.iframe}
            title="Rapor PDF"
            sandbox="allow-same-origin allow-scripts"
          />
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f4f4f4",
    position: "relative",
    overflow: "hidden",
    padding: "20px",
  },
  backButton: {
    position: "absolute",
    top: "15px",
    left: "15px",
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#0056b3",
    color: "white",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "10px",
    textAlign: "center",
  },
  pdfViewer: {
    width: "100%",
    maxWidth: "800px", // Limit the width on larger screens
    height: "75vh", // Allow the viewer to scale with viewport
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    overflow: "hidden",
    backgroundColor: "white",
  },
  iframe: {
    width: "100%",
    height: "100%",
    border: "none",
  },
};

export default Report;
