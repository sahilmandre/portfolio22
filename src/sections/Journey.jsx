import { lazy, Suspense, useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import {
  FaSchool,
  FaFutbol,
  FaGraduationCap,
  FaLaptopCode,
  FaBriefcase,
  FaBuilding,
  FaStar,
} from 'react-icons/fa'
import { JOURNEY } from '../data/site'
import Reveal from '../components/Reveal'
import ErrorBoundary from '../components/ErrorBoundary'
import './Journey.css'

const Stage = lazy(() => import('../three/journey/Stage'))

const ICONS = {
  school: FaSchool,
  football: FaFutbol,
  college: FaGraduationCap,
  code: FaLaptopCode,
  briefcase: FaBriefcase,
  building: FaBuilding,
  spark: FaStar,
}

function Timeline() {
  return (
    <ol className="timeline">
      {JOURNEY.map((step, i) => {
        const Icon = ICONS[step.icon] || FaStar
        return (
          <Reveal as="li" key={step.title} className="timeline__item" delay={(i % 2) * 0.05}>
            <div className="timeline__marker" aria-hidden="true">
              <Icon />
            </div>
            <div className="timeline__card">
              <span className="timeline__year">{step.year}</span>
              <h3 className="timeline__title">{step.title}</h3>
              <p className="timeline__place">{step.place}</p>
              <p className="timeline__blurb">{step.blurb}</p>
            </div>
          </Reveal>
        )
      })}
    </ol>
  )
}

export default function Journey() {
  const reduce = useReducedMotion()
  const wrapRef = useRef(null)
  const progressRef = useRef(0)

  useEffect(() => {
    if (reduce) return
    const onScroll = () => {
      const el = wrapRef.current
      if (!el) return
      const total = el.offsetHeight - window.innerHeight
      const scrolled = Math.min(Math.max(-el.getBoundingClientRect().top, 0), total)
      progressRef.current = total > 0 ? scrolled / total : 0
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [reduce])

  return (
    <section id="journey" className="section journey">
      <div className="container">
        <header className="section__head">
          <Reveal as="h2" className="section__title">
            A journey, not a résumé
          </Reveal>
          <Reveal as="p" className="section__lead" delay={0.08}>
            From a goalkeeper in Jabalpur to a frontend engineer in Indore — scroll to
            walk through the life that got me here.
          </Reveal>
        </header>
      </div>

      {reduce ? (
        // Reduced-motion / no-JS friendly: skip the scroll-scrubbed 3D
        <div className="container">
          <Timeline />
        </div>
      ) : (
        <>
          <div className="life-scroll" ref={wrapRef}>
            <div className="life-stage-sticky">
              <ErrorBoundary
                fallback={
                  <div className="life-stage__fallback">
                    3D scene couldn't load — the timeline below tells the story.
                  </div>
                }
              >
                <Suspense
                  fallback={<div className="life-stage__loading">Loading the journey…</div>}
                >
                  <Stage progressRef={progressRef} />
                </Suspense>
              </ErrorBoundary>
              <p className="life-stage__hint">Scroll to walk through my life</p>
            </div>
          </div>

          <div className="container">
            <Timeline />
          </div>
        </>
      )}
    </section>
  )
}
