import { useState } from 'react'
import { destinations, type Destination } from '../data/destinations'
import DestinationCard from './DestinationCard'
import DestinationModal from './DestinationModal'
import Reveal from './Reveal'

interface Props {
  onBook: (d: Destination) => void
}

export default function DestinationsGallery({ onBook }: Props) {
  const [selected, setSelected] = useState<Destination | null>(null)

  return (
    <section id="destinations" className="relative bg-ink py-28">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="max-w-xl">
          <p className="text-xs tracking-[0.25em] uppercase text-gold-soft mb-4">Nos expéditions</p>
          <h2 className="font-display text-4xl md:text-5xl text-white leading-tight">
            Trois époques, <span className="text-gradient-gold italic">une machine.</span>
          </h2>
          <p className="mt-4 text-mist">
            Chaque destination est une expédition à part entière, pensée dans les moindres
            détails par nos historiens et techniciens temporels.
          </p>
        </Reveal>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((d, i) => (
            <Reveal key={d.id} delay={i * 0.12}>
              <DestinationCard destination={d} onSelect={setSelected} />
            </Reveal>
          ))}
        </div>
      </div>

      <DestinationModal
        destination={selected}
        onClose={() => setSelected(null)}
        onBook={(d) => {
          setSelected(null)
          onBook(d)
        }}
      />
    </section>
  )
}
