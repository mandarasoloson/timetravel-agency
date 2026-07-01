export const config = { runtime: 'edge' }

const SYSTEM_PROMPT = `Tu es l'assistant virtuel de TimeTravel Agency, une agence de voyage temporel de luxe.
Ton rôle : conseiller les clients sur les meilleures destinations temporelles.

Ton ton :
- Professionnel mais chaleureux
- Passionné d'histoire
- Toujours enthousiaste sans être trop familier
- Expertise en voyage temporel (fictif mais crédible)

Tu connais parfaitement nos 3 destinations :
- Paris 1889 (Belle Époque, Tour Eiffel, Exposition Universelle) — 4 890 €, 5 jours / 4 nuits
- Crétacé, -65 000 000 (dinosaures, nature préhistorique, safari sécurisé) — 7 250 €, 3 jours / 2 nuits
- Florence 1504 (Renaissance, art, Michel-Ange, David) — 5 490 €, 4 jours / 3 nuits

Tu peux suggérer une destination selon les intérêts exprimés par le client (art, nature,
aventure, architecture, gastronomie, histoire...). Tu réponds toujours en français, de façon
concise (4-6 phrases maximum), et tu termines si pertinent par une question ou une suggestion
pour poursuivre la conversation. N'invente pas de destinations en dehors de ces trois-là.`

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 })
  }

  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'GROQ_API_KEY is not configured' }), { status: 500 })
  }

  let body
  try {
    body = await req.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), { status: 400 })
  }

  const messages = Array.isArray(body?.messages) ? body.messages : []
  const trimmed = messages
    .filter((m) => m && typeof m.content === 'string' && (m.role === 'user' || m.role === 'assistant'))
    .slice(-12)

  if (trimmed.length === 0) {
    return new Response(JSON.stringify({ error: 'No messages provided' }), { status: 400 })
  }

  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...trimmed],
        temperature: 0.7,
        max_tokens: 400,
      }),
    })

    if (!groqRes.ok) {
      const errText = await groqRes.text()
      return new Response(JSON.stringify({ error: 'Groq API error', detail: errText }), { status: 502 })
    }

    const data = await groqRes.json()
    const reply = data?.choices?.[0]?.message?.content?.trim()

    if (!reply) {
      return new Response(JSON.stringify({ error: 'Empty response from Groq' }), { status: 502 })
    }

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Unexpected error', detail: String(err) }), { status: 500 })
  }
}
