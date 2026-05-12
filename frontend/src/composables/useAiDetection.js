import Groq from "groq-sdk";

const client = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function analyzeText(text) {
  const prompt = `Kamu adalah seorang ahli pendeteksi teks AI. Analisis teks berikut dan tentukan probabilitas apakah teks tersebut ditulis oleh AI atau manusia.

Analisis faktor-faktor berikut:
- Gaya penulisan dan kealamiannya
- Variasi struktur kalimat
- Penggunaan kata pengisi, kontraksi, bahasa informal
- Pola berulang atau bahasa yang terlalu formal
- Keaslian emosional
- Alur logika dan koherensi

Teks yang akan dianalisis:
"""
${text}
"""

Jawab HANYA dengan objek JSON yang valid dalam format berikut, tanpa teks tambahan apapun, tanpa markdown, tanpa backtick:
{
  "ai_probability": <angka 0-100>,
  "human_probability": <angka 0-100>,
  "confidence": "<Rendah|Sedang|Tinggi>",
  "verdict": "<Dibuat AI|Kemungkinan AI|Tidak Pasti|Kemungkinan Manusia|Ditulis Manusia>",
  "summary": "<penjelasan 2-3 kalimat dalam bahasa Indonesia>",
  "highlights": [
    { "text": "<frasa dari teks asli>", "reason": "<alasan dalam bahasa Indonesia>" }
  ]
}

Pastikan ai_probability + human_probability = 100.`;

  const completion = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    max_tokens: 1024,
    temperature: 0.3,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const raw = completion.choices[0].message.content;
  const clean = raw.replace(/```json|```/g, "").trim();
  const parsed = JSON.parse(clean);

  return {
    ...parsed,
    text,
    analyzedAt: new Date().toISOString(),
  };
}
