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

  const handleGorselYukle = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setGorseller((prevGorseller) => [...prevGorseller, { src: reader.result, name: file.name }]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGorselSil = (index) => {
    setGorseller((prevGorseller) => prevGorseller.filter((_, i) => i !== index));
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>📌 Günlük Rapor</h2>

      <div style={styles.row}>
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

      <textarea
        value={hedefler}
        onChange={(e) => setHedefler(e.target.value)}
        placeholder="Hedefleriniz"
        style={styles.textarea}
      ></textarea>
      <textarea
        value={yapilanlar}
        onChange={(e) => setYapilanlar(e.target.value)}
        placeholder="Yaptıklarınız"
        style={styles.textarea}
      ></textarea>
      <textarea
        value={tamamlanmayanlar}
        onChange={(e) => setTamamlanmayanlar(e.target.value)}
        placeholder="Tamamlanmayanlar"
        style={styles.textarea}
      ></textarea>
      <textarea
        value={notlar}
        onChange={(e) => setNotlar(e.target.value)}
        placeholder="Ekstra Notlar"
        style={styles.textarea}
      ></textarea>

      <p style={styles.date}>📅 {tarih}</p>

      <div style={styles.fileUpload}>
        <input type="file" onChange={handleGorselYukle} />
        {gorseller.length > 0 && (
          <div style={styles.imageList}>
            {gorseller.map((gorsel, index) => (
              <div key={index} style={styles.imageItem}>
                <p style={styles.imageName}>{gorsel.name}</p>
                <button
                  onClick={() => handleGorselSil(index)}
                  style={styles.deleteButton}
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {hata && <p style={styles.error}>{hata}</p>}

      <button onClick={handleClick} style={styles.button}>
        📄 Raporu Görüntüle
      </button>
    </div>
  );
}

const styles = {
  page: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "#F4F4F4",
    padding: "20px",
    boxSizing: "border-box",
    overflowX: "hidden", // Taşma engellendi
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "20px",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    gap: "10px",
    width: "100%",
    justifyContent: "center",
    flexWrap: "wrap", // Mobilde düzeni bozmadan sarma
    marginBottom: "20px",
  },
  input: {
    flex: 1,
    maxWidth: "250px",
    padding: "12px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "10px",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    height: "90px",
    padding: "12px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    resize: "none",
    marginBottom: "15px",
    boxSizing: "border-box",
  },
  button: {
    padding: "14px",
    fontSize: "18px",
    backgroundColor: "#002855",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    width: "100%",
    maxWidth: "300px",
    marginBottom: "20px",
  },
  error: {
    color: "red",
    fontSize: "16px",
    textAlign: "center",
    marginBottom: "20px",
  },
  fileUpload: {
    marginBottom: "20px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  imageList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  imageItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageName: {
    fontSize: "14px",
    color: "#555",
  },
  deleteButton: {
    background: "none",
    border: "none",
    color: "red",
    cursor: "pointer",
  },
  date: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "15px",
  },
  // Mobil uyumlu medya sorguları
  "@media (max-width: 768px)": {
    page: {
      padding: "10px",
    },
    title: {
      fontSize: "22px",
      marginBottom: "15px",
    },
    input: {
      maxWidth: "200px", // Mobilde daha dar input alanları
    },
    button: {
      fontSize: "16px", // Buton font boyutunu küçültüyoruz
      padding: "12px",
    },
    textarea: {
      height: "80px", // Textarea'yı mobilde biraz daha küçük yapıyoruz
    },
  },
  "@media (max-width: 480px)": {
    title: {
      fontSize: "20px",
    },
    input: {
      maxWidth: "180px", // Mobilde daha da daraltıyoruz
    },
    button: {
      fontSize: "14px",
      padding: "10px",
    },
    textarea: {
      fontSize: "14px", // Mobilde textareanın fontunu küçültüyoruz
    },
  },
};

export default Home;
