import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Eğer tablo kullanıyorsanız

function Report() {
  const location = useLocation();
  const { isim, calismaSuresi, hedefler, yapilanlar, tamamlanmayanlar, notlar, tarih, gorsel, raporAdi } = location.state || {};
  const [pdfUrl, setPdfUrl] = useState(null);

  const handleViewPDF = () => {
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 20;
    let y = 30;

    // Başlık ve içerik düzenleme
    pdf.setTextColor(50, 50, 50);
    pdf.setFontSize(26);
    pdf.setFont("times", "bold");
    pdf.text(raporAdi || "Günlük Rapor", pageWidth / 2, y, { align: "center" });
    y += 15;

    pdf.setDrawColor(200, 200, 200);
    pdf.line(margin, y, pageWidth - margin, y); // İnce çizgi
    y += 20;

    // Rapor Sahibi ve Bilgiler
    pdf.setFontSize(12);
    pdf.setFont("times", "normal");
    pdf.setTextColor(90, 90, 90);
    pdf.text(`Rapor Sahibi: ${isim || "Bilinmeyen Kullanıcı"}`, margin, y);
    y += 8;
    pdf.text(`Çalışma Süresi: ${calismaSuresi || "Belirtilmedi"} saat`, margin, y);
    y += 8;
    pdf.text(`Tarih: ${tarih || "Bilinmeyen Tarih"}`, margin, y);
    y += 20;

    pdf.setDrawColor(220, 220, 220);
    pdf.line(margin, y, pageWidth - margin, y); // Bölüm Çizgisi
    y += 15;

    // Bölüm Başlıkları ve İçerik Düzeni
    const addSectionTitle = (title) => {
      pdf.setFont("times", "bold");
      pdf.setFontSize(14);
      pdf.setTextColor(30, 30, 30);
      pdf.text(`${title}`, margin, y);
      y += 8;
      pdf.setDrawColor(220, 220, 220);
      pdf.line(margin, y, pageWidth - margin, y); // Bölüm Çizgisi
      y += 12;
      pdf.setFont("times", "normal");
      pdf.setFontSize(12);
      pdf.setTextColor(80, 80, 80);
    };

    // Hedefler
    addSectionTitle("Hedefler:");
    pdf.text(hedefler || "Belirtilmedi", margin, y, { maxWidth: pageWidth - 2 * margin });
    y += 20;

    // Yapılanlar
    addSectionTitle("Yapılanlar:");
    pdf.text(yapilanlar || "Belirtilmedi", margin, y, { maxWidth: pageWidth - 2 * margin });
    y += 20;

    // Tamamlanmayanlar
    addSectionTitle("Tamamlanmayanlar:");
    pdf.text(tamamlanmayanlar || "Belirtilmedi", margin, y, { maxWidth: pageWidth - 2 * margin });
    y += 20;

    // Notlar
    addSectionTitle("Notlar:");
    pdf.text(notlar || "Belirtilmedi", margin, y, { maxWidth: pageWidth - 2 * margin });
    y += 20;

    // Alt Bilgi
    pdf.setFont("times", "italic");
    pdf.setFontSize(10);
    pdf.setTextColor(150, 150, 150);
    pdf.text("Bu rapor otomatik olarak olusturulmustur.", margin, 285);
    pdf.text(`Sayfa 1`, pageWidth - margin, 285, { align: "right" });

    // PDF çıktı
    const pdfOutput = pdf.output("bloburl");
    setPdfUrl(pdfOutput);
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
          <iframe src={pdfUrl} style={styles.iframe} title="Rapor PDF" />
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
    transition: "background 0.3s, transform 0.2s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
    width: "90vw",
    height: "75vh",
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
