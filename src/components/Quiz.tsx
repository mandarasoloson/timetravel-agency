import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { quizQuestions, quizExplanations } from '../data/quiz'
import { destinations, type Destination, type DestinationId } from '../data/destinations'
import Reveal from './Reveal'

interface Props {
  onBook: (d: Destination) => void
}

export default function Quiz({ onBook }: Props) {
  const [step, setStep] = useState(0)
  const [scores, setScores] = useState<Record<DestinationId, number>>({
    'paris-1889': 0,
    cretace: 0,
    'florence-1504': 0,
  })
  const [finished, setFinished] = useState(false)

  const result = useMemo(() => {
    if (!finished) return null
    const entries = Object.entries(scores) as [DestinationId, number][]
    const [bestId] = entries.sort((a, b) => b[1] - a[1])[0]
    const destination = destinations.find((d) => d.id === bestId)!
    const explanations = quizExplanations[bestId]
    const explanation = explanations[Math.floor(Math.random() * explanations.length)]
    return { destination, explanation }
  }, [finished, scores])

  const progress = Math.min((step / quizQuestions.length) * 100, 100)

  function answer(optionScores: Partial<Record<DestinationId, number>>) {
    setScores((prev) => {
      const next = { ...prev }
      for (const [id, pts] of Object.entries(optionScores) as [DestinationId, number][]) {
        next[id] += pts
      }
      return next
    })
    if (step + 1 >= quizQuestions.length) {
      setFinished(true)
    } else {
      setStep((s) => s + 1)
    }
  }

  function restart() {
    setStep(0)
    setScores({ 'paris-1889': 0, cretace: 0, 'florence-1504': 0 })
    setFinished(false)
  }

  return (
    <section id="quiz" className="relative bg-panel py-28 border-y border-line">
      <div className="max-w-3xl mx-auto px-6">
        <Reveal className="text-center">
          <p className="text-xs tracking-[0.25em] uppercase text-gold-soft mb-4">Recommandation personnalisée</p>
          <h2 className="font-display text-4xl md:text-5xl text-white">
            Quelle époque est <span className="text-gradient-gold italic">faite pour vous ?</span>
          </h2>
          <p className="mt-4 text-mist">Répondez à 4 questions, notre algorithme s'occupe du reste.</p>
        </Reveal>

        <div className="mt-12 rounded-2xl border border-line bg-void p-6 sm:p-10">
          {!finished && (
            <div className="mb-8 h-1 w-full rounded-full bg-line overflow-hidden">
              <motion.div
                className="h-full bg-gold"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          )}

          <AnimatePresence mode="wait">
            {!finished ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <p className="text-xs text-mist mb-2">
                  Question {step + 1} / {quizQuestions.length}
                </p>
                <h3 className="font-display text-2xl sm:text-3xl text-white mb-8">
                  {quizQuestions[step].question}
                </h3>

                <div className="grid gap-3">
                  {quizQuestions[step].options.map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => answer(opt.scores)}
                      className="group text-left rounded-xl border border-line px-5 py-4 text-mist hover:border-gold/60 hover:bg-panel-light hover:text-white transition-colors flex items-center justify-between"
                    >
                      {opt.label}
                      <svg
                        className="opacity-0 group-hover:opacity-100 text-gold transition-opacity"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              result && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="text-center"
                >
                  <p className="text-xs tracking-[0.25em] uppercase text-gold-soft mb-3">
                    Votre destination recommandée
                  </p>
                  <div className="relative mx-auto max-w-md rounded-2xl overflow-hidden border border-line">
                    <img
                      src={result.destination.image}
                      alt={result.destination.name}
                      className="w-full aspect-video object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-left">
                      <p className="text-xs text-gold-soft">{result.destination.era}</p>
                      <p className="font-display text-2xl text-white">{result.destination.name}</p>
                    </div>
                  </div>

                  <p className="mt-6 text-mist leading-relaxed max-w-md mx-auto">{result.explanation}</p>

                  <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                    <button
                      onClick={() => onBook(result.destination)}
                      className="rounded-full bg-gold text-ink font-medium px-7 py-3.5 hover:bg-gold-soft transition-colors"
                    >
                      Réserver {result.destination.name}
                    </button>
                    <button
                      onClick={restart}
                      className="rounded-full border border-line px-7 py-3.5 text-mist hover:text-white hover:border-gold/50 transition-colors"
                    >
                      Refaire le quiz
                    </button>
                  </div>
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
