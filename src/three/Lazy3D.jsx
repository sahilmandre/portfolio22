import { Suspense, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import ErrorBoundary from '../components/ErrorBoundary'

/**
 * Mounts a 3D canvas only when it scrolls near the viewport, skips it entirely
 * under prefers-reduced-motion, and falls back gracefully if WebGL fails.
 *
 * @param {() => Promise<{default: React.ComponentType}>} load  dynamic import
 */
export default function Lazy3D({ load, className = '', fallback = null }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  const [Comp, setComp] = useState(null)

  useEffect(() => {
    if (reduce) return
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { rootMargin: '250px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [reduce])

  useEffect(() => {
    let alive = true
    if (inView && !Comp) {
      load().then((m) => {
        if (alive) setComp(() => m.default)
      })
    }
    return () => {
      alive = false
    }
  }, [inView, Comp, load])

  if (reduce) return null

  return (
    <div ref={ref} className={className} aria-hidden="true">
      {Comp && (
        <ErrorBoundary fallback={fallback}>
          <Suspense fallback={fallback}>
            <Comp />
          </Suspense>
        </ErrorBoundary>
      )}
    </div>
  )
}
