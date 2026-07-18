import { lazy, Suspense, useEffect, useRef, useState } from 'react'
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

export default function Journey({ onActiveChange }) {
  const reduce = useReducedMotion()
  const wrapRef = useRef(null)
  const progressRef = useRef(0)
  // Pause the 3D stage's render loop whenever the journey is fully off-screen,
  // so it stops burning GPU/main-thread cycles while you read the rest of the page.
  const [stageActive, setStageActive] = useState(true)

  useEffect(() => {
    if (reduce) return
    const el = wrapRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      ([entry]) => setStageActive(entry.isIntersecting),
      { rootMargin: '200px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [reduce])

  useEffect(() => {
    if (reduce) return
    const onScroll = () => {
      const el = wrapRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const total = el.offsetHeight - window.innerHeight
      const scrolled = Math.min(Math.max(-rect.top, 0), total)
      progressRef.current = total > 0 ? scrolled / total : 0
      // The playground is "active" (pinned full-screen) while the tall scroll
      // region spans the whole viewport — hide the navbar during that stretch.
      const active = rect.top <= 0 && rect.bottom > window.innerHeight + 4
      onActiveChange?.(active)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      onActiveChange?.(false)
    }
  }, [reduce, onActiveChange])

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
                  <Stage progressRef={progressRef} active={stageActive} />
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
