import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const LINKS = [
  { href: '#destinations', label: 'Destinations' },
  { href: '#quiz', label: 'Trouver mon époque' },
  { href: '#reservation', label: 'Réservation' },
  { href: '#faq', label: 'FAQ' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 ${
        scrolled ? 'bg-void/90 backdrop-blur-md border-b border-line' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="#top" className="font-display text-2xl tracking-wide text-gold-soft">
          Time<span className="text-gradient-gold">Travel</span> Agency
        </a>

        <ul className="hidden md:flex items-center gap-8 text-sm text-mist">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-gold transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#reservation"
          className="hidden md:inline-flex items-center rounded-full border border-gold/60 px-5 py-2 text-sm text-gold-soft hover:bg-gold hover:text-ink transition-colors"
        >
          Réserver
        </a>

        <button
          onClick={() => setOpen((o) => !o)}
          className="md:hidden text-gold-soft"
          aria-label="Menu"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-void border-t border-line px-6 py-4 flex flex-col gap-4">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-mist hover:text-gold">
              {l.label}
            </a>
          ))}
          <a href="#reservation" onClick={() => setOpen(false)} className="text-gold-soft">
            Réserver
          </a>
        </div>
      )}
    </motion.header>
  )
}
