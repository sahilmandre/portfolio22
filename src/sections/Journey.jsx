import { lazy, Suspense } from 'react'
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

export default function Journey() {
  return (
    <section id="journey" className="section journey">
      <div className="container">
        <header className="section__head">
          <Reveal as="h2" className="section__title">
            A journey, not a résumé
          </Reveal>
          <Reveal as="p" className="section__lead" delay={0.08}>
            From a goalkeeper in Jabalpur to a frontend engineer in Indore — walk
            through the life that got me here.
          </Reveal>
        </header>

        {/* Interactive 3D life stage (drag to look around) */}
        <div className="life-stage">
          <ErrorBoundary
            fallback={
              <div className="life-stage__fallback">
                3D scene couldn't load here — the timeline below tells the story.
              </div>
            }
          >
            <Suspense
              fallback={<div className="life-stage__loading">Loading the journey…</div>}
            >
              <Stage />
            </Suspense>
          </ErrorBoundary>
          <p className="life-stage__hint">Drag to look around · scroll to read the story</p>
        </div>

        <ol className="timeline">
          {JOURNEY.map((step, i) => {
            const Icon = ICONS[step.icon] || FaStar
            return (
              <Reveal
                as="li"
                key={step.title}
                className="timeline__item"
                delay={(i % 2) * 0.05}
              >
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
      </div>
    </section>
  )
}
