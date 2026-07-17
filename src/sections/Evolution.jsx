import { FiArrowUpRight } from 'react-icons/fi'
import { EVOLUTION } from '../data/site'
import Section from '../components/Section'
import Reveal from '../components/Reveal'
import './Evolution.css'

export default function Evolution() {
  return (
    <Section
      id="evolution"
      title="Portfolio time machine"
      lead="Every version of this site, kept alive. Watch the craft evolve — you can still open each one."
    >
      <div className="evo">
        {EVOLUTION.map((v, i) => {
          const isLink = !v.current
          const Wrapper = isLink ? 'a' : 'div'
          const linkProps = isLink
            ? {
                href: v.href,
                ...(v.external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {}),
              }
            : {}
          return (
            <Reveal
              as="article"
              key={v.year}
              className={`evo__card ${v.current ? 'evo__card--current' : ''}`}
              delay={i * 0.06}
            >
              <Wrapper className="evo__inner" {...linkProps}>
                <div className="evo__media">
                  {v.image ? (
                    <img src={v.image} alt={`${v.title} screenshot`} loading="lazy" />
                  ) : (
                    <div className="evo__now" aria-hidden="true">
                      <span>You are here</span>
                    </div>
                  )}
                  <span className="evo__year">{v.year}</span>
                </div>
                <div className="evo__body">
                  <div className="evo__head">
                    <h3 className="evo__title">{v.title}</h3>
                    {isLink && (
                      <FiArrowUpRight className="evo__arrow" aria-hidden="true" />
                    )}
                  </div>
                  <p className="evo__tech">{v.tech}</p>
                  <p className="evo__note">{v.note}</p>
                  {v.current && <span className="evo__badge">Current</span>}
                </div>
              </Wrapper>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
