# 🧮 Kalkulator BMI (React Native + Expo)

Aplikasi kalkulator BMI berbasis mobile menggunakan React Native + Expo. Menghitung Indeks Massa Tubuh (BMI) berdasarkan berat badan, tinggi badan, dan jenis kelamin pengguna. Dilengkapi dengan interpretasi medis dan warna status yang intuitif.

---

## 📱 Tampilan Aplikasi

### 📥 Form Input
![Input BMI](./assets/inputbmi.jpg)

### 📊 Hasil Perhitungan
![Output BMI](./assets/outputbmi.jpg)

---

## 🚀 Fitur Unggulan

- Input berat & tinggi badan
- Pilih jenis kelamin (Laki-laki / Perempuan)
- Hasil BMI dengan kategori khusus gender
- Interpretasi medis berdasarkan hasil
- Warna visual untuk status BMI
- Reset data input dengan satu klik
- UI modern dan mobile-friendly

---

## 📦 Cara Instalasi & Menjalankan

### 1. Clone Proyek

```bash
git clone https://github.com/anamwebdev/BMICalculatorApp.git
cd ke directory app
```

### 2. Install Dependencies

```bash
npm install
# atau
yarn install
```

### 3. Jalankan dengan Expo

```bash
npx expo start
```

Lalu buka aplikasi **Expo Go** di Android/iOS dan scan QR code untuk langsung mencoba aplikasi.

---

## 📐 Logika Perhitungan BMI

BMI dihitung dengan rumus:

```ts
BMI = berat (kg) / (tinggi (m) ^ 2)
```

Kemudian diklasifikasikan berdasarkan jenis kelamin pengguna:

**Contoh Kategori (Laki-laki):**
- < 20.0 → Kurus
- 20.0 – 25.0 → Normal
- 26.0 – 29.0 → Overweight
- 30.0 – 34.0 → Obesitas 1
- 35.0 – 39.0 → Obesitas 2
- ≥ 40.0 → Obesitas 3

**Kategori untuk perempuan** sedikit berbeda dan sudah disesuaikan dalam logika program.

---

## 📁 Struktur Proyek

```bash
.
├── App.tsx                  
├── assets/
│   ├── inputbmi.jpg         
│   └── outputbmi.jpg       
├── package.json             
├── README.md                
└── ...
```

---

## 📄 Lisensi

MIT License © 2025 Samsul Anam  
Bebas digunakan, dimodifikasi, dan dikembangkan lebih lanjut untuk keperluan pribadi maupun open source.

---

## ✨ Catatan

> Interpretasi BMI ini adalah estimasi berbasis rumus standar dan tidak menggantikan diagnosis dokter. Konsultasikan ke tenaga medis untuk evaluasi kesehatan menyeluruh.
