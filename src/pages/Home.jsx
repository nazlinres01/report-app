import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [isim, setIsim] = useState("");
  const [calismaSuresi, setCalismaSuresi] = useState("");
  const [hedefler, setHedefler] = useState("");
  const [yapilanlar, setYapilanlar] = useState("");
  const [tamamlanmayanlar, setTamamlanmayanlar] = useState("");
  const [notlar, setNotlar] = useState("");
  const [hata, setHata] = useState("");
  const [tarih, setTarih] = useState(new Date().toLocaleDateString());
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (!isim.trim() || !calismaSuresi.trim() || !hedefler.trim() || !yapilanlar.trim()) {
      e.preventDefault();
      setHata("⚠️ Lütfen gerekli alanları doldurun!");
    } else {
      setHata("");
      navigate("/report", {
        state: { isim, calismaSuresi, hedefler, yapilanlar, tamamlanmayanlar, notlar, tarih },
      });
    }
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>📌 Günlük Rapor</h2>
      
      <div style={styles.doubleInputContainer}>
        <input
          type="text"
          value={isim}
          onChange={(e) => setIsim(e.target.value)}
          placeholder="Adınız"
          style={styles.input}
        />
        <input
          type="number"
          value={calismaSuresi}
          onChange={(e) => setCalismaSuresi(e.target.value)}
          placeholder="Çalışma Süresi (saat)"
          style={styles.input}
        />
      </div>

      <textarea value={hedefler} onChange={(e) => setHedefler(e.target.value)} placeholder="Hedefleriniz" style={styles.textarea}></textarea>
      <textarea value={yapilanlar} onChange={(e) => setYapilanlar(e.target.value)} placeholder="Yaptıklarınız" style={styles.textarea}></textarea>
      <textarea value={tamamlanmayanlar} onChange={(e) => setTamamlanmayanlar(e.target.value)} placeholder="Tamamlanmayanlar" style={styles.textarea}></textarea>
      <textarea value={notlar} onChange={(e) => setNotlar(e.target.value)} placeholder="Ekstra Notlar" style={styles.textarea}></textarea>
      
      <p style={styles.date}>📅 {tarih}</p>
      {hata && <p style={styles.error}>{hata}</p>}
      
      <button onClick={handleClick} style={styles.button}>📄 Raporu Görüntüle</button>
    </div>
  );
}

const styles = {
  page: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "#F4F4F4",
    padding: "20px 40px",
    boxSizing: "border-box",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center",
  },
  doubleInputContainer: {
    display: "flex",
    gap: "4px",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  input: {
    width: "100%",
    maxWidth: "400px", // Ensure consistent size across inputs
    padding: "14px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    margin: "10px 0",
  },
  textarea: {
    width: "100%",
    maxWidth: "400px", // Match width of input fields
    height: "90px",
    padding: "12px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    resize: "none",
    margin: "10px 0",
  },
  button: {
    width: "100%",
    maxWidth: "400px", // Match width of input fields
    padding: "14px",
    fontSize: "18px",
    backgroundColor: "#002855",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "20px",
  },
  error: {
    color: "red",
    fontSize: "16px",
    textAlign: "center",
  },
  date: {
    fontSize: "16px",
    textAlign: "center",
    margin: "10px 0",
  },
};

export default Home;
