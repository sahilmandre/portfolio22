import Reveal from './Reveal'
import './Section.css'

/**
 * Section wrapper with an optional heading + lead. Intentionally NO repeated
 * uppercase eyebrow / numbered scaffolding — just a strong title and (sometimes)
 * a lead line, varied per section.
 */
export default function Section({
  id,
  title,
  lead,
  children,
  className = '',
  headingAlign = 'left',
}) {
  return (
    <section id={id} className={`section ${className}`}>
      <div className="container">
        {(title || lead) && (
          <header className={`section__head section__head--${headingAlign}`}>
            {title && (
              <Reveal as="h2" className="section__title">
                {title}
              </Reveal>
            )}
            {lead && (
              <Reveal as="p" className="section__lead" delay={0.08}>
                {lead}
              </Reveal>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  )
}
