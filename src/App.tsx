import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import DestinationsGallery from './components/DestinationsGallery'
import Quiz from './components/Quiz'
import Reservation from './components/Reservation'
import Faq from './components/Faq'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import type { Destination } from './data/destinations'

function App() {
  const [bookingDestination, setBookingDestination] = useState<Destination | null>(null)

  function handleBook(destination: Destination) {
    setBookingDestination(destination)
    requestAnimationFrame(() => {
      document.getElementById('reservation')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  return (
    <div className="min-h-screen bg-void">
      <Navbar />
      <main>
        <Hero />
        <About />
        <DestinationsGallery onBook={handleBook} />
        <Quiz onBook={handleBook} />
        <Reservation selected={bookingDestination} />
        <Faq />
      </main>
      <Footer />
      <Chatbot />
    </div>
  )
}

export default App
