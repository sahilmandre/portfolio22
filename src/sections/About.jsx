import { useState } from 'react'
import { SITE, FACTS, SKILLS } from '../data/site'
import Reveal from '../components/Reveal'
import './About.css'

export default function About() {
  const [imgOk, setImgOk] = useState(true)

  return (
    <section id="about" className="section about">
      <div className="container about__grid">
        <Reveal className="about__media">
          <div className="about__frame">
            {imgOk ? (
              <img
                src="/assets/images/me.webp"
                alt="Sahil Mandre"
                loading="lazy"
                onError={() => setImgOk(false)}
              />
            ) : (
              <div className="about__placeholder" aria-label="Sahil Mandre">
                <span>SM</span>
              </div>
            )}
          </div>
          <div className="about__frame-glow" aria-hidden="true" />
        </Reveal>

        <div className="about__body">
          <Reveal as="h2" className="section__title">
            About me
          </Reveal>

          <Reveal as="p" className="about__lead" delay={0.05}>
            I'm a front-end developer with {SITE.yearsExperience} years of
            experience turning ideas into fast, interactive interfaces. I work
            mostly in React (with a solid Angular past), and I care about the
            details — motion, performance and how a page <em>feels</em>.
          </Reveal>

          <Reveal as="p" className="about__text" delay={0.1}>
            These days I'm the sole frontend developer on my project at Accenture,
            shipping React features and bringing OpenAI / GenAI into real products.
            Off the clock, I'm usually learning something new or chasing a cleaner
            way to build.
          </Reveal>

          <Reveal className="about__facts" delay={0.15}>
            {FACTS.map((f) => (
              <div className="fact" key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </Reveal>

          <Reveal className="about__skills" delay={0.2}>
            <h3 className="about__skills-title">What I work with</h3>
            <div className="about__skill-groups">
              {SKILLS.map((s) => (
                <div className="skill-group" key={s.group}>
                  <span className="skill-group__label">{s.group}</span>
                  <ul className="skill-group__items">
                    {s.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
