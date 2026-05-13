# AuthentiText AI

AuthentiText AI adalah aplikasi web modern untuk mendeteksi apakah sebuah teks kemungkinan ditulis oleh **AI** atau **Manusia** secara instan menggunakan teknologi AI detection berbasis **Groq API** dan model **LLaMA 3.3 70B**.

Aplikasi ini dirancang dengan tampilan modern, responsif, ringan, dan mudah digunakan untuk kebutuhan akademik, content writing, validasi artikel, serta pengecekan orisinalitas teks.

---

# ✨ Fitur Utama

## 🔍 AI Text Detection

Mendeteksi probabilitas apakah sebuah teks ditulis oleh AI atau manusia dengan hasil persentase yang mudah dipahami.

Contoh hasil:

| Jenis | Persentase |
| ----- | ---------- |
| AI    | 82%        |
| Human | 18%        |

---

## 📊 Visualisasi Analisis

Hasil analisis ditampilkan menggunakan:

- Donut chart
- Progress bar
- Confidence indicator
- Summary analysis
- Suspicious phrase detection

---

## 🌙 Dark Mode

Mendukung:

- Auto dark mode mengikuti sistem
- Manual toggle
- Penyimpanan preferensi tema

---

## 📱 Fully Responsive

Dioptimalkan untuk:

- Mobile
- Tablet
- Desktop
- Wide screen

---

## 💾 Local History

Semua hasil analisis disimpan di browser menggunakan:

```txt
localStorage
```

Fitur history meliputi:

- Pencarian riwayat
- Filter data
- Hapus riwayat
- Maksimal 50 data terakhir

---

## 📄 Export Result

Mendukung export:

- PDF
- JSON

---

# 🧠 Cara Kerja Sistem

1. User memasukkan teks
2. Teks dikirim ke Groq API
3. AI menganalisis pola bahasa
4. Sistem menghasilkan:
   - Persentase AI
   - Persentase Human
   - Confidence level
   - Ringkasan analisis
   - Kalimat mencurigakan
5. Hasil disimpan ke history browser

---

# 🛠 Tech Stack

| Bagian              | Teknologi                |
| ------------------- | ------------------------ |
| Framework           | Vue 3 (Composition API)  |
| Build Tool          | Vite                     |
| Styling             | Tailwind CSS v3          |
| UI Components       | shadcn-vue               |
| Icons               | Lucide Vue Next          |
| State Management    | Pinia                    |
| Routing             | Vue Router 4             |
| AI Detection Engine | Groq API (LLaMA 3.3 70B) |
| Export PDF          | jsPDF                    |
| Data Storage        | localStorage             |

---

# 📁 Struktur Project

```bash
authentitext/
├── frontend/
│
├── public/
│   └── favicon.svg
│
├── src/
│
│   ├── assets/
│   │   └── index.css
│   │
│   ├── components/
│   │
│   │   ├── ui/
│   │   │   └── # shadcn-vue components
│   │   │
│   │   ├── DarkModeToggle.vue
│   │   ├── ToastContainer.vue
│   │   ├── ConfirmDialog.vue
│   │   ├── ScoreChart.vue
│   │   ├── ResultCard.vue
│   │   ├── LoadingSpinner.vue
│   │   ├── Navbar.vue
│   │   └── Footer.vue
│   │
│   ├── composables/
│   │
│   │   ├── useAiDetection.js
│   │   ├── useDarkMode.js
│   │   ├── useToast.js
│   │   ├── useExport.js
│   │   └── useLocalStorage.js
│   │
│   ├── pages/
│   │
│   │   ├── LandingPage.vue
│   │   ├── AnalysisPage.vue
│   │   ├── ResultPage.vue
│   │   ├── HistoryPage.vue
│   │   ├── NotFoundPage.vue
│   │   └── AboutPage.vue
│   │
│   ├── router/
│   │   └── index.js
│   │
│   ├── stores/
│   │
│   │   ├── useAnalysisStore.js
│   │   ├── useHistoryStore.js
│   │   └── useThemeStore.js
│   │
│   ├── utils/
│   │
│   │   ├── formatDate.js
│   │   ├── calculateScore.js
│   │   └── exportHelpers.js
│   │
│   ├── App.vue
│   └── main.js
│
├── .env
├── .gitignore
├── index.html
├── jsconfig.json
├── package.json
├── postcss.config.cjs
├── tailwind.config.cjs
├── vite.config.js
└── README.md
```

---

# 🚀 Instalasi

## 1. Clone Repository

```bash
git clone <repo-url>
```

---

## 2. Masuk ke Folder Project

```bash
cd authentitext
```

---

## 3. Install Dependencies

```bash
cd frontend
npm install
```

---

# 🔑 Setup API Key

Buat file:

```txt
frontend/.env
```

Isi dengan:

```env
VITE_GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxx
```

Dapatkan API key gratis di:

https://console.groq.com/keys

---

# ▶️ Menjalankan Project

## Development Mode

```bash
npm run dev
```

atau:

```bash
npx vite
```

---

## Build Production

```bash
npm run build
```

---

## Preview Production

```bash
npm run preview
```

---

# 🌐 Default URL

```txt
http://localhost:5173
```

---

# 📦 Dependencies Utama

## Vue

```bash
npm install vue vue-router pinia
```

---

## Tailwind CSS

```bash
npm install -D tailwindcss postcss autoprefixer
```

---

## shadcn-vue

```bash
npx shadcn-vue@latest init
```

---

## Lucide Icons

```bash
npm install lucide-vue-next
```

---

## PDF Export

```bash
npm install jspdf
```

---

# 📄 Contoh Hasil Analisis

```json
{
  "ai_score": 81,
  "human_score": 19,
  "confidence": "Tinggi",
  "summary": "Teks memiliki pola penulisan yang sangat konsisten dan terstruktur seperti AI.",
  "suspicious_phrases": [
    "Sebagai kesimpulan",
    "Penting untuk dicatat",
    "Secara keseluruhan"
  ]
}
```

---

# 🧩 Halaman Aplikasi

## Landing Page

Berisi:

- Hero section
- Penjelasan fitur
- Contoh hasil analisis
- CTA button
- Footer

---

## Analysis Page

Berisi:

- Input textarea
- Character counter
- Validasi input
- Tombol analisis
- Loading state

---

## Result Page

Berisi:

- Donut chart
- Progress indicator
- AI/Human percentage
- Summary analysis
- Suspicious phrase list
- Export buttons

---

## History Page

Berisi:

- List riwayat analisis
- Search history
- Filter results
- Delete history
- Re-analyze text

---

# 🌙 Sistem Dark Mode

Dark mode menggunakan:

```js
window.matchMedia("(prefers-color-scheme: dark)");
```

dan disimpan ke:

```txt
localStorage
```

---

# 🔒 Privasi & Keamanan

- Tidak menggunakan database
- Tidak menyimpan data pengguna di server
- Semua history tersimpan lokal
- Hanya teks yang dianalisis dikirim ke API

---

# ⚠️ Keterbatasan

- AI detection tidak 100% akurat
- Teks pendek lebih sulit dianalisis
- API gratis memiliki rate limit
- Hasil hanya berupa estimasi probabilitas

---

# 📈 Pengembangan Selanjutnya

Roadmap fitur berikutnya:

- Multi-language detection
- Upload file `.txt` dan `.docx`
- AI writing style detector
- Team workspace
- Cloud history sync
- User authentication
- API backend sendiri
- Real-time typing analysis

---

# 👨‍💻 Developer

<table>
  <tr>
    <td align="center">
      <img src="https://avatars.githubusercontent.com/u/00000000?v=4" width="100" style="border-radius:50%;" />
      <br />
      <b>Fedy Fs.</b>
      <br />
      <sub>Gerana Web Developer</sub>
    </td>
  </tr>
</table>

---

# 📜 Lisensi

MIT License © 2026 AuthentiText AI

---

# ❤️ Support

Jika project ini membantu, jangan lupa:

⭐ Star repository  
🍴 Fork project  
🛠 Contribute improvement

---

# 🧾 Catatan

- API Groq gratis dan cukup cepat untuk penggunaan normal
- Semua data pengguna tetap berada di browser
- Cocok untuk edukasi, penelitian, dan validasi konten

---

# 🚀 AuthentiText AI

Modern AI Text Detection Platform.
