import { SITE } from '../data/site'
import SocialLinks from './SocialLinks'
import { FiArrowUpRight, FiDownload } from 'react-icons/fi'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer" id="contact">
      <div className="container">
        <div className="footer__cta">
          <p className="footer__kicker">Get in touch</p>
          <h2 className="footer__title">Let's build something worth remembering.</h2>
          <div className="footer__actions">
            <a href={`mailto:${SITE.email}`} className="btn btn--primary">
              {SITE.email} <FiArrowUpRight aria-hidden="true" />
            </a>
            <a href={SITE.resume} className="btn btn--ghost" download>
              Download résumé <FiDownload aria-hidden="true" />
            </a>
          </div>
          <SocialLinks className="footer__socials" />
        </div>

        <div className="footer__bottom">
          <span>Created with care by {SITE.name} · {SITE.location}</span>
          <span>© {year} Sahil Mandre · Portfolio v3</span>
        </div>
      </div>
    </footer>
  )
}
