import { useState } from 'react'
import { FiArrowUpRight, FiGithub } from 'react-icons/fi'
import { PROJECTS } from '../data/site'
import Section from '../components/Section'
import Reveal from '../components/Reveal'
import './Projects.css'

function Thumb({ src, name }) {
  const [ok, setOk] = useState(true)
  if (!ok) {
    return (
      <div className="thumb thumb--fallback" aria-hidden="true">
        <span>{name.charAt(0)}</span>
      </div>
    )
  }
  return (
    <img
      className="thumb"
      src={src}
      alt={`${name} preview`}
      loading="lazy"
      onError={() => setOk(false)}
    />
  )
}

export default function Projects() {
  const featured = PROJECTS.find((p) => p.featured)
  const rest = PROJECTS.filter((p) => !p.featured)

  return (
    <Section
      id="work"
      title="Selected work"
      lead="A few things I've designed and built — from a full-stack trading dashboard to streaming UIs."
    >
      {featured && (
        <Reveal as="article" className="feature">
          <a
            className="feature__media"
            href={featured.live}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${featured.name} — open live`}
          >
            <Thumb src={featured.image} name={featured.name} />
          </a>
          <div className="feature__body">
            <span className="feature__flag">Flagship</span>
            <h3 className="feature__name">{featured.name}</h3>
            <p className="feature__tagline">{featured.tagline}</p>
            <p className="feature__desc">{featured.description}</p>
            <ul className="tags">
              {featured.tech.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <div className="feature__links">
              <a
                href={featured.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary"
              >
                Live project <FiArrowUpRight aria-hidden="true" />
              </a>
              {featured.code && (
                <a
                  href={featured.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--ghost"
                >
                  <FiGithub aria-hidden="true" /> Code
                </a>
              )}
            </div>
          </div>
        </Reveal>
      )}

      <div className="proj-grid">
        {rest.map((p, i) => (
          <Reveal as="article" className="proj" key={p.name} delay={i * 0.05}>
            <a
              className="proj__media"
              href={p.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${p.name} — open live`}
            >
              <Thumb src={p.image} name={p.name} />
              <span className="proj__open" aria-hidden="true">
                <FiArrowUpRight />
              </span>
            </a>
            <div className="proj__body">
              <h3 className="proj__name">{p.name}</h3>
              <p className="proj__tagline">{p.tagline}</p>
              <ul className="tags tags--sm">
                {p.tech.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
