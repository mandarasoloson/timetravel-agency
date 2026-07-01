import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { getFallbackReply } from '../lib/chatbotFallback'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

const WELCOME: ChatMessage = {
  role: 'assistant',
  content:
    "Bonjour, je suis votre conseiller TimeTravel Agency ! Posez-moi vos questions sur les voyages temporels — destinations, prix, sécurité, réservation...",
}

const SUGGESTIONS = [
  'Quels sont vos prix ?',
  'Quelle destination pour un passionné d\'art ?',
  'Est-ce dangereux ?',
]

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [usingFallback, setUsingFallback] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, open])

  async function send(text: string) {
    const userMessage: ChatMessage = { role: 'user', content: text }
    const nextMessages = [...messages, userMessage]
    setMessages(nextMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      })

      if (!res.ok) throw new Error('api unavailable')

      const data = await res.json()
      if (!data.reply) throw new Error('empty reply')

      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }])
      setUsingFallback(false)
    } catch {
      setUsingFallback(true)
      const reply = getFallbackReply(text)
      await new Promise((r) => setTimeout(r, 350))
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
    } finally {
      setLoading(false)
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed || loading) return
    send(trimmed)
  }

  return (
    <>
      <motion.button
        onClick={() => setOpen((o) => !o)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        aria-label="Ouvrir le chat"
        className="fixed bottom-6 right-6 z-90 w-14 h-14 rounded-full bg-gold text-ink shadow-2xl flex items-center justify-center"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
            >
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-6 z-90 w-[92vw] max-w-sm h-[70vh] max-h-[560px] rounded-2xl border border-line bg-panel shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-line bg-panel-light">
              <div className="w-9 h-9 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center text-gold-soft text-sm font-display">
                TT
              </div>
              <div>
                <p className="text-sm text-white">Conseiller TimeTravel</p>
                <p className="text-[11px] text-mist flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  En ligne
                </p>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                      m.role === 'user'
                        ? 'bg-gold text-ink rounded-br-sm'
                        : 'bg-void border border-line text-mist rounded-bl-sm'
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-sm border border-line bg-void px-4 py-3 flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-gold"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 1, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-xs rounded-full border border-line px-3 py-1.5 text-mist hover:border-gold/50 hover:text-gold-soft transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {usingFallback && (
              <p className="px-4 pb-1 text-[10px] text-mist/60">
                Mode hors-ligne : réponses locales (API IA non configurée).
              </p>
            )}

            <form onSubmit={handleSubmit} className="flex items-center gap-2 p-3 border-t border-line">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Posez-moi vos questions sur les voyages temporels..."
                className="flex-1 rounded-full bg-void border border-line px-4 py-2.5 text-sm text-white placeholder:text-mist/40 focus:outline-none focus:border-gold/60"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Envoyer"
                className="w-10 h-10 shrink-0 rounded-full bg-gold text-ink flex items-center justify-center disabled:opacity-40 hover:bg-gold-soft transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
