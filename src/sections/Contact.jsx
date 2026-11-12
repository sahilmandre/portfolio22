import { useState } from 'react'
import { FiArrowUpRight, FiCheckCircle, FiAlertCircle } from 'react-icons/fi'
import { SITE } from '../data/site'
import Reveal from '../components/Reveal'
import './Contact.css'

const ENDPOINT = `https://formsubmit.co/ajax/${SITE.email}`

export default function Contact() {
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  async function handleSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    setStatus('submitting')
    const data = Object.fromEntries(new FormData(form))
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          ...data,
          _subject: 'New message from your portfolio',
          _template: 'table',
        }),
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section contact">
      <div className="container contact__grid">
        <div className="contact__intro">
          <Reveal as="h2" className="section__title">
            Let's build something
          </Reveal>
          <Reveal as="p" className="contact__lead" delay={0.06}>
            Have a project, a role, or just an idea worth chasing? Drop me a line —
            I read everything.
          </Reveal>
          <Reveal className="contact__direct" delay={0.12}>
            <a href={`mailto:${SITE.email}`} className="contact__email">
              {SITE.email} <FiArrowUpRight aria-hidden="true" />
            </a>
            <p className="contact__loc">{SITE.location}</p>
          </Reveal>
        </div>

        <Reveal as="form" className="contact__form" onSubmit={handleSubmit} delay={0.1}>
          <div className="field-row">
            <label className="field">
              <span>Name</span>
              <input type="text" name="name" placeholder="Your name" required />
            </label>
            <label className="field">
              <span>Email</span>
              <input type="email" name="email" placeholder="you@email.com" required />
            </label>
          </div>
          <label className="field">
            <span>Phone (optional)</span>
            <input type="tel" name="phone" placeholder="+91 ..." />
          </label>
          <label className="field">
            <span>Message</span>
            <textarea
              name="message"
              rows="5"
              placeholder="Tell me a little about it…"
              required
            />
          </label>

          <button
            type="submit"
            className="btn btn--primary contact__submit"
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? 'Sending…' : 'Send message'}
            <FiArrowUpRight aria-hidden="true" />
          </button>

          <div className="contact__status" role="status" aria-live="polite">
            {status === 'success' && (
              <p className="status status--ok">
                <FiCheckCircle aria-hidden="true" /> Thanks! Your message is on its
                way. I'll get back to you soon.
              </p>
            )}
            {status === 'error' && (
              <p className="status status--err">
                <FiAlertCircle aria-hidden="true" /> Something went wrong. Please
                email me directly at {SITE.email}.
              </p>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
