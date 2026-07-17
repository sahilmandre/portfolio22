import Header from './components/Header'
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
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Header />
      <main id="main">
        <Hero />
        <Journey />
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
