# AuthentiText AI

Aplikasi web untuk mendeteksi apakah sebuah teks ditulis oleh **AI** atau **Manusia** secara instan.

## Tampilan

- Landing page modern dengan contoh hasil analisis
- Halaman analisis dengan input teks dan validasi
- Halaman hasil dengan chart donut, progress bar, dan indikator utama
- Riwayat analisis tersimpan di browser (localStorage)
- Dark mode
- Responsif untuk semua ukuran layar
- Export hasil ke PDF dan JSON

## Tech Stack

| Bagian           | Teknologi                |
| ---------------- | ------------------------ |
| Framework        | Vue 3 (Composition API)  |
| Build Tool       | Vite                     |
| Styling          | Tailwind CSS v3          |
| UI Components    | shadcn-vue               |
| Icons            | Lucide Vue Next          |
| State Management | Pinia                    |
| Routing          | Vue Router 4             |
| AI Detection     | Groq API (LLaMA 3.3 70B) |
| Export PDF       | jsPDF                    |

## Struktur Project

\\\
authentitext/
├── frontend/
│ ├── public/
│ │ └── favicon.svg
│ ├── src/
│ │ ├── assets/
│ │ │ └── index.css
│ │ ├── components/
│ │ │ ├── ui/ # shadcn-vue components
│ │ │ ├── DarkModeToggle.vue
│ │ │ ├── ToastContainer.vue
│ │ │ ├── ConfirmDialog.vue
│ │ │ └── ScoreChart.vue
│ │ ├── composables/
│ │ │ ├── useAiDetection.js
│ │ │ ├── useDarkMode.js
│ │ │ ├── useToast.js
│ │ │ └── useExport.js
│ │ ├── pages/
│ │ │ ├── LandingPage.vue
│ │ │ ├── AnalysisPage.vue
│ │ │ ├── ResultPage.vue
│ │ │ └── HistoryPage.vue
│ │ ├── router/
│ │ │ └── index.js
│ │ ├── stores/
│ │ │ ├── useAnalysisStore.js
│ │ │ └── useHistoryStore.js
│ │ ├── App.vue
│ │ └── main.js
│ ├── .env # tidak di-commit
│ ├── index.html
│ ├── jsconfig.json
│ ├── package.json
│ ├── postcss.config.cjs
│ ├── tailwind.config.cjs
│ └── vite.config.js
├── .gitignore
└── README.md
\\\

## Cara Menjalankan

### 1. Clone atau download project

\\\ash
git clone <repo-url>
cd authentitext
\\\

### 2. Install dependencies

\\\ash
cd frontend
npm install
\\\

### 3. Setup API Key

Buat file \.env\ di folder \rontend/\:

\\\env
VITE_GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxx
\\\

Daftar dan ambil API key gratis di [console.groq.com/keys](https://console.groq.com/keys)

### 4. Jalankan

\\\ash
npx vite
\\\

Buka [http://localhost:5173](http://localhost:5173)

## Fitur

- Deteksi probabilitas AI vs Manusia (0-100%)
- Tingkat kepercayaan hasil (Rendah / Sedang / Tinggi)
- Ringkasan analisis dalam Bahasa Indonesia
- Indikator frasa yang mencurigakan
- Riwayat analisis (maks. 50 entri, tersimpan di browser)
- Filter dan pencarian riwayat
- Export hasil ke PDF
- Export data ke JSON
- Dark mode otomatis (mengikuti preferensi sistem)
- Responsif (mobile, tablet, desktop)

## Catatan

- API key Groq **gratis** dengan rate limit yang cukup untuk penggunaan normal
- Semua data tersimpan **lokal di browser** — tidak ada data yang dikirim ke server selain teks yang dianalisis
- Hasil analisis bersifat **estimasi** dan tidak 100% akurat

## Developer

<table>
  <tr>
    <td align="center">
      <b>Fedy Fs.</b><br/>
      <sub>Gerana Web Developer</sub>
    </td>
  </tr>
</table>

## Lisensi

MIT License © 2026 AuthentiText
