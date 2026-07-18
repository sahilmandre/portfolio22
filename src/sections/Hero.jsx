import { Suspense, lazy, useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { SITE } from '../data/site'
import SocialLinks from '../components/SocialLinks'
import DeskTerminal from '../components/DeskTerminal'
import ErrorBoundary from '../components/ErrorBoundary'
import './Hero.css'

const HeroDeskCanvas = lazy(() => import('../three/HeroDeskCanvas'))

export default function Hero() {
  const reduce = useReducedMotion()
  const [wide, setWide] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 900px)').matches
  )

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 900px)')
    const onChange = () => setWide(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // Full 3D workspace on wide screens; on phones / reduced-motion the terminal
  // stands alone (still fully interactive).
  const use3D = wide && !reduce
  const domTerminal = (
    <div className="hero__terminal-wrap">
      <DeskTerminal />
    </div>
  )

  return (
    <section className="hero" id="top">
      <div className="hero__orbs" aria-hidden="true">
        <span className="orb orb--1" />
        <span className="orb orb--2" />
        <span className="orb orb--3" />
      </div>

      <div className="container hero__grid">
        <div className="hero__intro-col">
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

        {/* Workspace: a 3D "me" coding at a desk. Drag to orbit / change the view. */}
        <div className="hero__workspace">
          {use3D ? (
            <div className="hero__stage">
              <ErrorBoundary fallback={domTerminal}>
                <Suspense fallback={domTerminal}>
                  <HeroDeskCanvas />
                </Suspense>
              </ErrorBoundary>
              <p className="hero__hint" aria-hidden="true">
                drag to look around
              </p>
            </div>
          ) : (
            domTerminal
          )}
        </div>
      </div>

      <a href="#journey" className="hero__scroll" aria-label="Scroll to journey">
        <span className="hero__scroll-text">Scroll</span>
        <span className="hero__scroll-line" aria-hidden="true" />
      </a>
    </section>
  )
}
