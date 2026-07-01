import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { destinations, type Destination } from '../data/destinations'
import Reveal from './Reveal'

interface Props {
  selected: Destination | null
}

const today = new Date().toISOString().split('T')[0]

export default function Reservation({ selected }: Props) {
  const [destinationId, setDestinationId] = useState(selected?.id ?? destinations[0].id)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [date, setDate] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (selected) setDestinationId(selected.id)
  }, [selected])

  const activeDestination = destinations.find((d) => d.id === destinationId)!

  function validate() {
    const next: Record<string, string> = {}
    if (name.trim().length < 2) next.name = 'Merci d\'indiquer votre nom complet.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Adresse e-mail invalide.'
    if (!date) next.date = 'Choisissez une date de départ.'
    else if (date < today) next.date = 'La date doit être dans le futur (logique, pour une fois).'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (validate()) {
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <section id="reservation" className="relative bg-void py-28 border-t border-line">
        <div className="max-w-xl mx-auto px-6 text-center">
          <Reveal>
            <div className="mx-auto w-16 h-16 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center mb-6">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#d4af6a" strokeWidth="2">
                <path d="M5 12l4 4L19 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="font-display text-3xl text-white">Demande envoyée, {name.split(' ')[0]} !</h2>
            <p className="mt-3 text-mist">
              Votre expédition vers <span className="text-gold-soft">{activeDestination.name}, {activeDestination.era}</span> le{' '}
              {new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })} est en
              cours de validation. Un technicien temporel vous contactera sous 24h à {email}.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-8 rounded-full border border-line px-7 py-3 text-mist hover:text-white hover:border-gold/50 transition-colors"
            >
              Nouvelle réservation
            </button>
          </Reveal>
        </div>
      </section>
    )
  }

  return (
    <section id="reservation" className="relative bg-void py-28 border-t border-line">
      <div className="max-w-2xl mx-auto px-6">
        <Reveal className="text-center">
          <p className="text-xs tracking-[0.25em] uppercase text-gold-soft mb-4">Réservation</p>
          <h2 className="font-display text-4xl md:text-5xl text-white">
            Planifiez votre <span className="text-gradient-gold italic">expédition.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <motion.form
            onSubmit={handleSubmit}
            className="mt-12 rounded-2xl border border-line bg-panel p-6 sm:p-10 grid gap-6"
            noValidate
          >
            <div>
              <label className="block text-sm text-mist mb-2">Destination</label>
              <div className="grid sm:grid-cols-3 gap-3">
                {destinations.map((d) => (
                  <button
                    type="button"
                    key={d.id}
                    onClick={() => setDestinationId(d.id)}
                    className={`rounded-lg border px-4 py-3 text-left transition-colors ${
                      activeDestination.id === d.id
                        ? 'border-gold bg-gold/10 text-white'
                        : 'border-line text-mist hover:border-gold/40'
                    }`}
                  >
                    <p className="text-sm">{d.name}</p>
                    <p className="text-xs text-mist/70">{d.era}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm text-mist mb-2">
                  Nom complet
                </label>
                <input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ada Lovelace"
                  className="w-full rounded-lg border border-line bg-void px-4 py-3 text-white placeholder:text-mist/40 focus:outline-none focus:border-gold/60"
                />
                {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm text-mist mb-2">
                  E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ada@timetravel.agency"
                  className="w-full rounded-lg border border-line bg-void px-4 py-3 text-white placeholder:text-mist/40 focus:outline-none focus:border-gold/60"
                />
                {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="date" className="block text-sm text-mist mb-2">
                Date de départ souhaitée
              </label>
              <input
                id="date"
                type="date"
                min={today}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full sm:w-60 rounded-lg border border-line bg-void px-4 py-3 text-white focus:outline-none focus:border-gold/60"
              />
              {errors.date && <p className="mt-1.5 text-xs text-red-400">{errors.date}</p>}
            </div>

            <button
              type="submit"
              className="justify-self-start rounded-full bg-gold text-ink font-medium px-8 py-3.5 hover:bg-gold-soft transition-colors"
            >
              Confirmer la demande
            </button>
          </motion.form>
        </Reveal>
      </div>
    </section>
  )
}
