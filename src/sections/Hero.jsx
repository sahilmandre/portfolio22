import { SITE } from '../data/site'
import SocialLinks from '../components/SocialLinks'
import Lazy3D from '../three/Lazy3D'
import './Hero.css'

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__orbs" aria-hidden="true">
        <span className="orb orb--1" />
        <span className="orb orb--2" />
        <span className="orb orb--3" />
      </div>

      <Lazy3D className="hero__canvas" load={() => import('../three/HeroCanvas')} />

      <div className="container hero__inner">
        <p className="hero__intro">Hi, I'm</p>
        <h1 className="hero__name">Sahil Mandre</h1>
        <p className="hero__role">
          {SITE.role} <span className="hero__dot">·</span> Senior Analyst at Accenture
        </p>
        <p className="hero__tagline">{SITE.tagline}</p>

        <div className="hero__cta">
          <a href="#work" className="btn btn--primary">
            View my work
          </a>
          <a href={SITE.resume} className="btn btn--ghost" download>
            Download résumé
          </a>
        </div>

        <SocialLinks className="hero__socials" />
      </div>

      <a href="#journey" className="hero__scroll" aria-label="Scroll to journey">
        <span className="hero__scroll-text">Scroll</span>
        <span className="hero__scroll-line" aria-hidden="true" />
      </a>
    </section>
  )
}
