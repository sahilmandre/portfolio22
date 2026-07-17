import { useEffect, useState } from 'react'
import { SITE } from '../data/site'
import SocialLinks from './SocialLinks'
import './Header.css'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container site-header__inner">
        <a href="#top" className="wordmark" aria-label={`${SITE.name} — home`}>
          <span className="wordmark__first">Sahil</span>
          <span className="wordmark__last">Mandre</span>
        </a>

        <nav className="site-nav" aria-label="Primary">
          <a href="#journey">Journey</a>
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="site-header__actions">
          <SocialLinks className="site-header__socials" />
          <a
            href={SITE.resume}
            className="btn btn--ghost btn--sm"
            download
          >
            Résumé
          </a>
        </div>
      </div>
    </header>
  )
}
