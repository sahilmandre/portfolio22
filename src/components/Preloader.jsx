import { useEffect, useState } from 'react'
import './Preloader.css'

// A terminal-style boot screen. It types build lines while a REAL 0->100%
// counter fills — driven by the hero 3D chunk, web fonts and window load — then
// fades out. Keeping it up until the 3D chunk is ready also hides the brief
// terminal->3D swap in the hero, so there's no flicker on reveal.

const BOOT = [
  '$ npm run build',
  '▲ vite v6 · building for production…',
  '✓ 214 modules transformed',
  '✓ bundling 3D workspace · three.js',
  '✓ fonts loaded · shaders warm',
  '✓ deploy ready — launching ✨',
]

const reduced =
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

const use3D =
  typeof window !== 'undefined' &&
  window.matchMedia?.('(min-width: 900px)').matches &&
  !reduced

function Line({ text }) {
  if (text.startsWith('$')) {
    return (
      <>
        <span className="pre__prompt">$</span>
        {text.slice(1)}
      </>
    )
  }
  return text
}

export default function Preloader({ onDone }) {
  const [lines, setLines] = useState(reduced ? BOOT : [])
  const [typing, setTyping] = useState('')
  const [pct, setPct] = useState(0)
  const [leaving, setLeaving] = useState(false)

  // Real readiness -> percentage. The bar rides a time ramp to ~92% so it always
  // moves, then completes once the things that actually matter for the first view
  // are ready (the hero 3D chunk + web fonts). A hard MAX_MS caps the wait so a
  // slow font/chunk can never strand the loader.
  useEffect(() => {
    const start = performance.now()
    const MIN_MS = reduced ? 600 : 1600
    const MAX_MS = reduced ? 2000 : 3400
    let raf
    let all = false

    const tasks = []
    // Preload the heavy 3D chunk ONLY where the hero actually uses it (desktop),
    // so phones don't front-load three.js just to show the DOM terminal.
    if (use3D) tasks.push(import('../three/HeroDeskCanvas').catch(() => {}))
    if (document.fonts?.ready) tasks.push(document.fonts.ready.catch(() => {}))
    Promise.allSettled(tasks).then(() => {
      all = true
    })

    let v = 0
    const loop = () => {
      const elapsed = performance.now() - start
      const timePct = Math.min(92, (elapsed / MIN_MS) * 100)
      const ready = (all && elapsed >= MIN_MS) || elapsed >= MAX_MS
      const goal = ready ? 100 : timePct
      v += (goal - v) * 0.2
      if (goal === 100 && v > 99) v = 100
      setPct(Math.round(v))
      if (v >= 100) {
        setLeaving(true)
        return
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  // Decorative typewriter
  useEffect(() => {
    if (reduced) return
    let alive = true
    let li = 0
    let ci = 0
    let timer

    const step = () => {
      if (!alive || li >= BOOT.length) return
      const full = BOOT[li]
      ci += 1
      setTyping(full.slice(0, ci))
      if (ci < full.length) {
        timer = setTimeout(step, 24 + Math.random() * 34)
      } else {
        setLines((prev) => [...prev, full])
        setTyping('')
        li += 1
        ci = 0
        timer = setTimeout(step, 200)
      }
    }
    timer = setTimeout(step, 240)
    return () => {
      alive = false
      clearTimeout(timer)
    }
  }, [])

  // Dismiss after the fade (backstop timeout — robust even if no transitionend)
  useEffect(() => {
    if (!leaving) return
    const t = setTimeout(() => onDone?.(), 620)
    return () => clearTimeout(t)
  }, [leaving, onDone])

  return (
    <div className={`pre${leaving ? ' pre--leaving' : ''}`} role="status" aria-label="Loading" aria-busy={!leaving}>
      <div className="pre__term" aria-hidden="true">
        <div className="pre__topbar">
          <span className="pre__dot pre__dot--r" />
          <span className="pre__dot pre__dot--y" />
          <span className="pre__dot pre__dot--g" />
          <span className="pre__title">sahil@portfolio — build</span>
        </div>
        <div className="pre__body">
          {lines.map((l, i) => (
            <div className="pre__line" key={i}>
              <Line text={l} />
            </div>
          ))}
          {typing && (
            <div className="pre__line">
              <Line text={typing} />
              <span className="pre__caret" />
            </div>
          )}
        </div>
        <div className="pre__foot">
          <div className="pre__track">
            <span className="pre__fill" style={{ width: `${pct}%` }} />
          </div>
          <span className="pre__pct">{pct}%</span>
        </div>
      </div>
    </div>
  )
}
