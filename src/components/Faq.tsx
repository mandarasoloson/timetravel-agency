import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { faqItems } from '../data/faq'
import Reveal from './Reveal'

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="relative bg-panel py-28 border-t border-line">
      <div className="max-w-3xl mx-auto px-6">
        <Reveal className="text-center">
          <p className="text-xs tracking-[0.25em] uppercase text-gold-soft mb-4">Questions fréquentes</p>
          <h2 className="font-display text-4xl md:text-5xl text-white">
            Avant de <span className="text-gradient-gold italic">sauter le pas.</span>
          </h2>
          <p className="mt-4 text-mist">
            D'autres questions&nbsp;? Notre assistant IA en bas de page répond en temps réel.
          </p>
        </Reveal>

        <div className="mt-12 divide-y divide-line rounded-2xl border border-line bg-void overflow-hidden">
          {faqItems.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left text-white hover:bg-panel-light transition-colors"
                >
                  <span className="font-medium">{item.q}</span>
                  <motion.svg
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="shrink-0 text-gold"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                  </motion.svg>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-mist leading-relaxed">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
