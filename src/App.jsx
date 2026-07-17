import Header from './components/Header'
import Hero from './sections/Hero'
import Footer from './components/Footer'
import './App.css'

export default function App() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        {/* Phase 2: Journey · About · Experience · Projects · Evolution · Beyond Code */}
      </main>
      <Footer />
    </>
  )
}
