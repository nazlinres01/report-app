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
  const [gorsel, setGorsel] = useState(null);
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (!isim.trim() || !calismaSuresi.trim() || !hedefler.trim() || !yapilanlar.trim()) {
      e.preventDefault();
      setHata("⚠️ Lütfen gerekli alanları doldurun!");
    } else {
      setHata("");
      navigate("/rapor", {
        state: { isim, calismaSuresi, hedefler, yapilanlar, tamamlanmayanlar, notlar, tarih, gorsel },
      });
    }
  };

  const handleGorselYukle = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setGorsel(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.title}>📌 Günlük Rapor</h2>

        <div style={styles.row}>
          <input type="text" value={isim} onChange={(e) => setIsim(e.target.value)} placeholder="Adınız" style={styles.input} />
          <input type="number" value={calismaSuresi} onChange={(e) => setCalismaSuresi(e.target.value)} placeholder="Çalışma Süresi (saat)" style={styles.input} />
        </div>

        <textarea value={hedefler} onChange={(e) => setHedefler(e.target.value)} placeholder="Hedefleriniz" style={styles.textarea}></textarea>
        <textarea value={yapilanlar} onChange={(e) => setYapilanlar(e.target.value)} placeholder="Yaptıklarınız" style={styles.textarea}></textarea>
        <textarea value={tamamlanmayanlar} onChange={(e) => setTamamlanmayanlar(e.target.value)} placeholder="Tamamlanmayanlar" style={styles.textarea}></textarea>
        <textarea value={notlar} onChange={(e) => setNotlar(e.target.value)} placeholder="Ekstra Notlar" style={styles.textarea}></textarea>

        <p style={styles.date}>📅 {tarih}</p>

        <div style={styles.fileUpload}>
          <input type="file" onChange={handleGorselYukle} />
          {gorsel && <img src={gorsel} alt="Yüklenen görsel" style={styles.image} />}
        </div>

        {hata && <p style={styles.error}>{hata}</p>}

        <button onClick={handleClick} style={styles.button}>📄 Raporu Görüntüle</button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#EAEAEA",
  },
  container: {
    width: "90%",
    maxWidth: "600px",
    background: "white",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#002855",
    marginBottom: "20px",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  row: {
    display: "flex",
    gap: "15px",
    width: "100%",
    marginBottom: "10px",
  },
  input: {
    flex: 1,
    padding: "12px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    backgroundColor: "#F9F9F9",
  },
  textarea: {
    width: "100%",
    height: "100px",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    outline: "none",
    resize: "none",
    marginBottom: "8px",
    backgroundColor: "#F9F9F9",
  },
  date: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "10px",
  },
  fileUpload: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "12px",
  },
  image: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "8px",
    marginTop: "8px",
    boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
  },
  button: {
    padding: "12px",
    fontSize: "16px",
    fontWeight: "bold",
    backgroundColor: "#002855",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background 0.3s",
    width: "100%",
    boxShadow: "0px 3px 6px rgba(0,0,0,0.2)",
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginTop: "10px",
  },
};

export default Home;
