import { FiDownload } from 'react-icons/fi'
import { SITE } from '../data/site'
import SocialLinks from './SocialLinks'
import './Footer.css'

const NAV = [
  { label: 'Journey', href: '#journey' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Work', href: '#work' },
  { label: 'Evolution', href: '#evolution' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="container footer__top">
        <div className="footer__brand">
          <a href="#top" className="wordmark">
            <span className="wordmark__first">Sahil</span>
            <span className="wordmark__last">Mandre</span>
          </a>
          <p className="footer__tagline">
            Front-end developer crafting fast, interactive web experiences from
            {' '}{SITE.location}.
          </p>
          <a href={SITE.resume} className="btn btn--ghost btn--sm" download>
            <FiDownload aria-hidden="true" /> Download résumé
          </a>
        </div>

        <nav className="footer__nav" aria-label="Footer">
          <span className="footer__col-title">Explore</span>
          <ul>
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href}>{n.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__social">
          <span className="footer__col-title">Elsewhere</span>
          <SocialLinks />
        </div>
      </div>

      <div className="container footer__bottom">
        <span>© {year} Sahil Mandre</span>
        <span>Built with React, Three.js &amp; GSAP · Portfolio v3</span>
      </div>
    </footer>
  )
}
