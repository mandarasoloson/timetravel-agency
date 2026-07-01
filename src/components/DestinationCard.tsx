import { motion } from 'framer-motion'
import type { Destination } from '../data/destinations'

interface Props {
  destination: Destination
  onSelect: (d: Destination) => void
}

export default function DestinationCard({ destination, onSelect }: Props) {
  return (
    <motion.button
      onClick={() => onSelect(destination)}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="group relative text-left rounded-2xl overflow-hidden border border-line bg-panel focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
    >
      <div className="relative aspect-4/5 overflow-hidden">
        <img
          src={destination.image}
          alt={`${destination.name} ${destination.era}`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />

        <span className="absolute top-4 right-4 rounded-full bg-ink/70 backdrop-blur px-3 py-1 text-xs text-gold-soft border border-gold/30">
          {destination.price}
        </span>

        <div className="absolute inset-x-0 bottom-0 p-6">
          <p className="text-xs tracking-[0.2em] uppercase text-gold-soft mb-1">{destination.era}</p>
          <h3 className="font-display text-3xl text-white">{destination.name}</h3>
          <p className="mt-2 text-sm text-mist line-clamp-2">{destination.tagline}</p>

          <div className="mt-4 flex items-center gap-2 text-sm text-gold-soft opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
            Découvrir l'expédition
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </motion.button>
  )
}
