import { useEffect, useState } from 'react'
import Header from './components/Header'
import Preloader from './components/Preloader'
import Hero from './sections/Hero'
import Journey from './sections/Journey'
import About from './sections/About'
import Experience from './sections/Experience'
import Projects from './sections/Projects'
import Evolution from './sections/Evolution'
import BeyondCode from './sections/BeyondCode'
import Contact from './sections/Contact'
import Footer from './components/Footer'
import './App.css'

export default function App() {
  // The header steps aside while the immersive 3D journey is pinned full-screen,
  // then returns once the playground scrolls past.
  const [journeyActive, setJourneyActive] = useState(false)
  // Terminal boot loader on first paint. The page still mounts underneath (so
  // the hero 3D warms up behind the overlay), and we lift the overlay only once
  // it's ready — which is also what prevents the hero terminal->3D flicker.
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [loading])

  return (
    <>
      {loading && <Preloader onDone={() => setLoading(false)} />}
      <a href="#main" className="skip-link">Skip to content</a>
      <Header hidden={journeyActive} />
      <main id="main">
        <Hero />
        <Journey onActiveChange={setJourneyActive} />
        <About />
        <Experience />
        <Projects />
        <Evolution />
        <BeyondCode />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
