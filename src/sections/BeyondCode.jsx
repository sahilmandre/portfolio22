import { FaShieldAlt, FaMicrophone, FaAward } from 'react-icons/fa'
import { FiCheckCircle } from 'react-icons/fi'
import { BEYOND, AWARDS, CERTS } from '../data/site'
import Section from '../components/Section'
import Reveal from '../components/Reveal'
import './BeyondCode.css'

const ICONS = { shield: FaShieldAlt, mic: FaMicrophone }

export default function BeyondCode() {
  return (
    <Section
      id="beyond"
      title="Beyond the code"
      lead="I care about more than shipping features — a bit of what I do away from the keyboard."
    >
      <div className="beyond__features">
        {BEYOND.map((b, i) => {
          const Icon = ICONS[b.icon] || FaAward
          return (
            <Reveal as="article" className="beyond__card" key={b.title} delay={i * 0.06}>
              <div className="beyond__icon" aria-hidden="true">
                <Icon />
              </div>
              <h3 className="beyond__title">{b.title}</h3>
              <p className="beyond__blurb">{b.blurb}</p>
            </Reveal>
          )
        })}
      </div>

      <div className="beyond__lists">
        <Reveal className="beyond__list">
          <h3 className="beyond__list-title">
            <FaAward aria-hidden="true" /> Awards
          </h3>
          <ul>
            {AWARDS.map((a) => (
              <li key={a}>
                <FiCheckCircle aria-hidden="true" /> {a}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal className="beyond__list" delay={0.08}>
          <h3 className="beyond__list-title">
            <FiCheckCircle aria-hidden="true" /> Certifications
          </h3>
          <ul>
            {CERTS.map((c) => (
              <li key={c}>
                <FiCheckCircle aria-hidden="true" /> {c}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  )
}
