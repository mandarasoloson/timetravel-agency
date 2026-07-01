import { AnimatePresence, motion } from 'framer-motion'
import type { Destination } from '../data/destinations'

interface Props {
  destination: Destination | null
  onClose: () => void
  onBook: (d: Destination) => void
}

export default function DestinationModal({ destination, onClose, onBook }: Props) {
  return (
    <AnimatePresence>
      {destination && (
        <motion.div
          className="fixed inset-0 z-100 flex items-end sm:items-center justify-center p-0 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl border border-line bg-panel"
          >
            <button
              onClick={onClose}
              aria-label="Fermer"
              className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-ink/70 text-white hover:bg-gold hover:text-ink transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>

            <div className="relative aspect-16/9">
              <img src={destination.image} alt={destination.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-panel via-panel/10 to-transparent" />
            </div>

            <div className="p-6 sm:p-8">
              <p className="text-xs tracking-[0.2em] uppercase text-gold-soft">{destination.era}</p>
              <h3 className="font-display text-3xl sm:text-4xl text-white mt-1">{destination.name}</h3>
              <p className="text-mist mt-1">{destination.tagline}</p>

              <p className="mt-5 text-mist leading-relaxed">{destination.description}</p>

              <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div className="rounded-lg border border-line px-4 py-3">
                  <p className="text-mist/70 text-xs">Durée</p>
                  <p className="text-white mt-1">{destination.duration}</p>
                </div>
                <div className="rounded-lg border border-line px-4 py-3">
                  <p className="text-mist/70 text-xs">Tarif indicatif</p>
                  <p className="text-gold-soft mt-1">{destination.price}</p>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-sm text-white mb-3">Ce qui vous attend</p>
                <ul className="grid sm:grid-cols-2 gap-2.5">
                  {destination.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-mist">
                      <svg
                        className="mt-0.5 shrink-0 text-gold"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                      >
                        <path d="M5 12l4 4L19 6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => onBook(destination)}
                className="mt-8 w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gold text-ink font-medium px-7 py-3.5 hover:bg-gold-soft transition-colors"
              >
                Réserver cette expédition
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
