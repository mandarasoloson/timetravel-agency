export default function Footer() {
  return (
    <footer className="relative bg-ink border-t border-line py-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <p className="font-display text-xl text-gold-soft">
            Time<span className="text-gradient-gold">Travel</span> Agency
          </p>
          <p className="text-xs text-mist mt-1">Explorez l'Histoire, réinventée.</p>
        </div>

        <p className="text-xs text-mist/70 text-center">
          Projet pédagogique — M1/M2 Digital &amp; IA. Agence fictive, aucune machine à voyager
          dans le temps n'a réellement été utilisée.
        </p>

        <div className="flex items-center gap-4 text-mist">
          {['Instagram', 'X', 'LinkedIn'].map((s) => (
            <span key={s} className="text-xs border border-line rounded-full px-3 py-1.5 hover:border-gold/50 hover:text-gold-soft transition-colors cursor-default">
              {s}
            </span>
          ))}
        </div>
      </div>
    </footer>
  )
}
