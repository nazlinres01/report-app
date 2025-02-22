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
  const [gorseller, setGorseller] = useState([]); // Görselleri bir dizi olarak tutacağız
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

  const handleGorselYukle = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setGorseller((prevGorseller) => [
          ...prevGorseller,
          { src: reader.result, name: file.name }, // Görselin adı ve verisini ekliyoruz
        ]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGorselSil = (index) => {
    setGorseller((prevGorseller) => prevGorseller.filter((_, i) => i !== index)); // Silinen görseli diziden kaldır
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
          {gorseller.length > 0 && (
            <div style={styles.imageList}>
              {gorseller.map((gorsel, index) => (
                <div key={index} style={styles.imageItem}>
                  <p style={styles.imageName}>{gorsel.name}</p>
                  <button onClick={() => handleGorselSil(index)} style={styles.deleteButton}>❌</button>
                </div>
              ))}
            </div>
          )}
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
  imageList: {
    width: "100%",
    padding: "10px 0",
    borderTop: "1px solid #ddd",
    marginTop: "10px",
  },
  imageItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },
  imageName: {
    fontSize: "14px",
    color: "#333",
    fontWeight: "500",
  },
  deleteButton: {
    background: "rgba(255, 0, 0, 0.6)",
    color: "white",
    border: "none",
    padding: "5px",
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: "14px",
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
