# AuthentiText AI

AuthentiText AI adalah aplikasi web untuk mendeteksi apakah sebuah teks ditulis oleh AI atau manusia menggunakan Groq API dan model LLaMA 3.3 70B.

---

## Fitur

- Deteksi AI vs Human
- Donut chart & progress bar
- Dark mode
- Export PDF & JSON
- Responsive design
- Riwayat analisis menggunakan localStorage
- Analisis cepat dengan Groq API

---

## Tech Stack

- Vue 3
- Vite
- Tailwind CSS v3
- shadcn-vue
- Pinia
- Vue Router 4
- Groq API (LLaMA 3.3 70B)
- jsPDF

---

## Struktur Project

```bash
authentitext/
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.cjs
├── .gitignore
└── README.md
```

---

## Instalasi

Clone repository:

```bash
git clone <repo-url>
cd authentitext/frontend
```

Install dependencies:

```bash
npm install
```

Buat file `.env`:

```env
VITE_GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxx
```

Ambil API key di:

https://console.groq.com/keys

---

## Menjalankan Project

```bash
npm run dev
```

Buka di browser:

```txt
http://localhost:5173
```

---

## Contoh Hasil

```json
{
  "ai_score": 81,
  "human_score": 19,
  "confidence": "Tinggi"
}
```

---

## Privasi

- Data disimpan lokal di browser
- Tidak menggunakan database
- Hanya teks analisis yang dikirim ke API

---

## Developer

**Fedy Fs. Gerana**  
Web Developer

---

## Lisensi

MIT License © 2026 AuthentiText AI