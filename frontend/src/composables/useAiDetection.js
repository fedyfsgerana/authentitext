import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
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

Jawab HANYA dengan objek JSON yang valid dalam format berikut, tanpa teks tambahan:
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

  const message = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt }],
  });

  const raw = message.content[0].text;
  const clean = raw.replace(/```json|```/g, "").trim();
  const parsed = JSON.parse(clean);

  return {
    ...parsed,
    text,
    analyzedAt: new Date().toISOString(),
  };
}
