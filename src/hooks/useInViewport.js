import { useEffect, useRef, useState } from 'react'

/**
 * Reports whether the referenced element is on (or near) the screen.
 *
 * Used to pause off-screen WebGL canvases: an R3F <Canvas> defaults to
 * `frameloop="always"` and keeps rendering at 60fps even when scrolled out of
 * view, starving the rest of the page. Gating `frameloop` on this flag stops
 * that wasted work while the scene isn't visible.
 *
 * Starts `true` so the scene paints immediately on mount; the observer then
 * corrects it. `rootMargin` gives a head-start so it resumes just before the
 * element scrolls back into view (no blank pop-in).
 */
export default function useInViewport({ rootMargin = '250px', threshold = 0 } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(true)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      (entries) => setInView(entries[0].isIntersecting),
      { rootMargin, threshold }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [rootMargin, threshold])

  return [ref, inView]
}
