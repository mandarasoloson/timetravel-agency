import Reveal from './Reveal'

const STATS = [
  { value: '3', label: 'Époques accessibles' },
  { value: '1 200+', label: 'Voyageurs temporels' },
  { value: '100%', label: 'Retours garantis' },
  { value: '0', label: 'Paradoxe temporel signalé*' },
]

export default function About() {
  return (
    <section className="relative bg-void py-28">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-[1fr_1.1fr] gap-14 items-start">
        <Reveal>
          <p className="text-xs tracking-[0.25em] uppercase text-gold-soft mb-4">L'agence</p>
          <h2 className="font-display text-4xl md:text-5xl text-white leading-tight">
            L'excellence du <span className="text-gradient-gold italic">voyage</span>, hors du temps.
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="text-mist leading-relaxed text-lg">
            Depuis notre laboratoire chronologique, nous ouvrons des passages sécurisés vers
            trois moments choisis de l'Histoire. Chaque expédition est encadrée par des
            historiens, guides et techniciens temporels, pour une immersion totale sans jamais
            altérer le cours des événements.
          </p>
          <p className="mt-4 text-mist leading-relaxed">
            Notre promesse&nbsp;: un voyage sur mesure, une sécurité irréprochable, et des
            souvenirs qu'aucune autre agence ne pourra jamais vous offrir.
          </p>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="font-display text-3xl text-gold-soft">{s.value}</p>
                <p className="text-xs text-mist mt-1 leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[11px] text-mist/60">
            *à notre connaissance. TimeTravel Agency décline toute responsabilité en cas
            d'altération du continuum espace-temps.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
