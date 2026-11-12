import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import './Terminal.css'

// A NON-interactive terminal that auto-types dev commands on a loop — it just
// looks like the 3D "me" is coding. No input, no commands (keeps the UI calm).

const SCRIPT = [
  ['cmd', 'npm run dev'],
  ['out', 'VITE v6  ready in 287 ms'],
  ['out', '➜  Local:  http://localhost:5173/'],
  ['cmd', 'const sahil = new Developer()'],
  ['out', "sahil.stack = ['React', 'Three.js', 'GenAI']"],
  ['cmd', 'git commit -m "ship something delightful"'],
  ['out', '[main 9f2c1a3] ship something delightful'],
  ['out', ' 3 files changed, 128 insertions(+)'],
  ['cmd', 'npm run build && deploy'],
  ['out', '✓ built in 1.24s  ·  deploying…'],
  ['out', '✓ live ✨'],
]

export default function DeskTerminal({ className = '' }) {
  const reduce = useReducedMotion()
  const [rendered, setRendered] = useState([])
  const [typing, setTyping] = useState('')

  useEffect(() => {
    if (reduce) {
      setRendered(SCRIPT.slice(0, 6).map(([k, text], i) => ({ k, text, id: i })))
      return
    }
    let alive = true
    let step = 0
    let out = []
    let timer

    const push = (k, text) => {
      out = [...out.slice(-9), { k, text, id: `${step}-${k}` }]
      setRendered(out)
    }

    const next = () => {
      if (!alive) return
      const [k, text] = SCRIPT[step % SCRIPT.length]
      step += 1
      if (k === 'cmd') {
        let c = 0
        const type = () => {
          if (!alive) return
          c += 1
          setTyping(text.slice(0, c))
          if (c < text.length) {
            timer = setTimeout(type, 42 + Math.random() * 55)
          } else {
            push('cmd', text)
            setTyping('')
            timer = setTimeout(next, 560)
          }
        }
        type()
      } else {
        push('out', text)
        timer = setTimeout(next, 360)
      }
    }

    timer = setTimeout(next, 450)
    return () => {
      alive = false
      clearTimeout(timer)
    }
  }, [reduce])

  return (
    <div className={`term term--readonly ${className}`} aria-hidden="true">
      <div className="term__bar">
        <span className="term__dot term__dot--r" />
        <span className="term__dot term__dot--y" />
        <span className="term__dot term__dot--g" />
        <span className="term__title">sahil@portfolio — zsh</span>
      </div>
      <div className="term__body">
        {rendered.map((l) => (
          <div className="term__line term__out" key={l.id}>
            {l.k === 'cmd' ? (
              <>
                <span className="term__prompt">$</span> {l.text}
              </>
            ) : (
              l.text
            )}
          </div>
        ))}
        {typing && (
          <div className="term__line">
            <span className="term__prompt">$</span> {typing}
            <span className="term__caret" />
          </div>
        )}
      </div>
    </div>
  )
}
