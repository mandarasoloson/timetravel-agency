import { motion, type Variants } from 'framer-motion'

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Hero() {
  const words = ['Explorez', "l'Histoire,", 'réinventée.']

  return (
    <section id="top" className="relative min-h-screen flex items-center overflow-hidden bg-ink">
      <div
        className="absolute inset-0 bg-noise opacity-40"
        aria-hidden
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(212,175,106,0.16), transparent 70%), radial-gradient(ellipse 80% 60% at 80% 100%, rgba(122,155,110,0.12), transparent 70%)',
        }}
        aria-hidden
      />

      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            'linear-gradient(115deg, transparent 0%, transparent 45%, rgba(212,175,106,0.06) 45%, rgba(212,175,106,0.06) 55%, transparent 55%)',
        }}
        aria-hidden
      />

      <div className="relative max-w-6xl mx-auto px-6 pt-32 pb-24 w-full grid md:grid-cols-2 gap-12 items-center">
        <div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-gold-soft border border-gold/40 rounded-full px-4 py-1.5 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            Agence de voyage temporel — depuis 1889
          </motion.span>

          <h1 className="font-display text-5xl md:text-7xl leading-[1.05] text-white">
            {words.map((w, i) => (
              <motion.span
                key={w}
                custom={i}
                variants={wordVariants}
                initial="hidden"
                animate="show"
                className={`inline-block mr-4 ${i === 2 ? 'text-gradient-gold italic' : ''}`}
              >
                {w}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="mt-6 text-lg text-mist max-w-md"
          >
            Trois époques, une seule promesse&nbsp;: vivre l'Histoire de l'intérieur.
            Paris 1889, le Crétacé, Florence 1504 — choisissez votre siècle.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#destinations"
              className="inline-flex items-center gap-2 rounded-full bg-gold text-ink font-medium px-7 py-3.5 hover:bg-gold-soft transition-colors"
            >
              Découvrir les destinations
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="#quiz"
              className="inline-flex items-center gap-2 rounded-full border border-line px-7 py-3.5 text-mist hover:text-white hover:border-gold/50 transition-colors"
            >
              Quelle époque pour moi&nbsp;?
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden md:block"
        >
          <div className="relative rounded-2xl overflow-hidden border border-line shadow-2xl aspect-4/5">
            <img
              src="/images/florence-1504.jpg"
              alt="Florence, 1504"
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <p className="text-xs tracking-[0.2em] uppercase text-gold-soft">Renaissance</p>
              <p className="font-display text-2xl text-white">Florence, 1504</p>
            </div>
          </div>
          <div className="absolute -bottom-8 -left-8 w-40 rounded-xl overflow-hidden border border-line shadow-2xl rotate-[-6deg] hidden lg:block">
            <img src="/images/paris-1889.jpg" alt="Paris, 1889" className="w-full h-28 object-cover" />
          </div>
          <div className="absolute -top-8 -right-6 w-36 rounded-xl overflow-hidden border border-line shadow-2xl rotate-[8deg] hidden lg:block">
            <img src="/images/cretace.jpg" alt="Crétacé" className="w-full h-24 object-cover" />
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-mist"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-gold to-transparent"
        />
      </motion.div>
    </section>
  )
}
