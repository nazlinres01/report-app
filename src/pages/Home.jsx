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
  const [gorseller, setGorseller] = useState([]);
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (!isim.trim() || !calismaSuresi.trim() || !hedefler.trim() || !yapilanlar.trim()) {
      e.preventDefault();
      setHata("⚠️ Lütfen gerekli alanları doldurun!");
    } else {
      setHata("");
      navigate("/report", {
        state: { isim, calismaSuresi, hedefler, yapilanlar, tamamlanmayanlar, notlar, tarih, gorseller },
      });
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setGorseller(files.map((file) => ({
      src: URL.createObjectURL(file),
      name: file.name,
    })));
  };

  const handleRemoveImage = (index) => {
    setGorseller((prevGorseller) => prevGorseller.filter((_, i) => i !== index));
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>📌 Günlük Rapor</h2>
      
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
      <textarea 
        value={hedefler} 
        onChange={(e) => setHedefler(e.target.value)} 
        placeholder="Hedefleriniz" 
        style={styles.textarea} 
      />
      <textarea 
        value={yapilanlar} 
        onChange={(e) => setYapilanlar(e.target.value)} 
        placeholder="Yaptıklarınız" 
        style={styles.textarea} 
      />
      <textarea 
        value={tamamlanmayanlar} 
        onChange={(e) => setTamamlanmayanlar(e.target.value)} 
        placeholder="Tamamlanmayanlar" 
        style={styles.textarea} 
      />
      <textarea 
        value={notlar} 
        onChange={(e) => setNotlar(e.target.value)} 
        placeholder="Ekstra Notlar" 
        style={styles.textarea} 
      />

      <div style={styles.imageUpload}>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          style={styles.fileInput}
        />
        <div style={styles.imageList}>
          {gorseller.map((gorsel, index) => (
            <div key={index} style={styles.imageItem}>
              <span>{gorsel.name}</span>
              <button 
                onClick={() => handleRemoveImage(index)} 
                style={styles.removeButton}>❌
              </button>
            </div>
          ))}
        </div>
      </div>

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
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    maxWidth: "400px",
    padding: "14px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    margin: "10px 0",
  },
  textarea: {
    width: "100%",
    maxWidth: "400px",
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
    maxWidth: "400px",
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
  imageUpload: {
    marginTop: "20px",
    textAlign: "center",
  },
  fileInput: {
    marginBottom: "10px",
  },
  imageList: {
    marginTop: "10px",
    width: "100%",
    maxWidth: "400px",
    listStyleType: "none",
    padding: "0",
  },
  imageItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
    padding: "5px",
    backgroundColor: "#f0f0f0",
    borderRadius: "4px",
  },
  removeButton: {
    background: "transparent",
    border: "none",
    color: "red",
    fontSize: "20px",
    cursor: "pointer",
  },
};

export default Home;
