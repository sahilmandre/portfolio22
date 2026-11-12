import { EXPERIENCE } from '../data/site'
import Section from '../components/Section'
import Reveal from '../components/Reveal'
import './Experience.css'

export default function Experience() {
  return (
    <Section
      id="experience"
      title="Where I've worked"
      lead="Five years across product teams — from Salesforce beginnings to leading the frontend on GenAI-powered products."
    >
      <div className="xp">
        {EXPERIENCE.map((job, i) => (
          <Reveal as="article" className="xp__item" key={job.company} delay={i * 0.05}>
            <div className="xp__meta">
              <span className="xp__period">{job.period}</span>
              <span className="xp__location">{job.location}</span>
            </div>
            <div className="xp__main">
              <h3 className="xp__role">{job.role}</h3>
              <p className="xp__company">{job.company}</p>
              <ul className="xp__points">
                {job.points.map((p, idx) => (
                  <li key={idx}>{p}</li>
                ))}
              </ul>
              <ul className="xp__tags">
                {job.tags.map((t) => (
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
