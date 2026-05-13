# AuthentiText AI

AuthentiText AI adalah aplikasi web modern untuk mendeteksi apakah sebuah teks ditulis oleh **AI** atau **Manusia** secara instan menggunakan **Groq API** dan model **LLaMA 3.3 70B**.

Aplikasi ini memiliki tampilan modern, responsif, dark mode, serta mendukung export hasil analisis ke PDF dan JSON.

---

# ✨ Fitur

- 🔍 Deteksi AI vs Human
- 📊 Donut chart & progress bar
- 🌙 Dark mode
- 💾 Riwayat analisis (`localStorage`)
- 📄 Export PDF & JSON
- 📱 Responsive design
- ⚡ Analisis cepat dengan Groq API

---

# 🛠 Tech Stack

| Bagian           | Teknologi                |
| ---------------- | ------------------------ |
| Framework        | Vue 3                    |
| Build Tool       | Vite                     |
| Styling          | Tailwind CSS v3          |
| UI Components    | shadcn-vue               |
| State Management | Pinia                    |
| Routing          | Vue Router 4             |
| AI Detection     | Groq API (LLaMA 3.3 70B) |
| Export PDF       | jsPDF                    |

---

# 📁 Struktur Project

```bash
authentitext/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── composables/
│   │   ├── pages/
│   │   ├── router/
│   │   ├── stores/
│   │   ├── App.vue
│   │   └── main.js
│   ├── .env
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.cjs
├── .gitignore
└── README.md
```

---

# 🚀 Instalasi

## Clone Repository

```bash
git clone <repo-url>
cd authentitext
```

---

## Install Dependencies

```bash
cd frontend
npm install
```

---

## Setup API Key

Buat file `.env`:

```env
VITE_GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxx
```

Ambil API key gratis di:

https://console.groq.com/keys

---

# ▶️ Menjalankan Project

```bash
npm run dev
```

Buka:

```txt
http://localhost:5173
```

---

# 📄 Contoh Hasil

```json
{
  "ai_score": 81,
  "human_score": 19,
  "confidence": "Tinggi"
}
```

---

# 🔒 Privasi

- Data history disimpan lokal di browser
- Tidak menggunakan database
- Hanya teks analisis yang dikirim ke API

---

# 👨‍💻 Developer

<table>
  <tr>
    <td align="center">
      <b>Fedy Fs.</b><br/>
      <sub>Gerana Web Developer</sub>
    </td>
  </tr>
</table>

---

# 📜 Lisensi

MIT License © 2026 AuthentiText AI
