import { motion, useReducedMotion } from 'framer-motion'

/**
 * Subtle in-view reveal. Respects prefers-reduced-motion (falls back to a
 * plain fade / no transform) per accessibility guidance.
 */
export default function Reveal({
  children,
  as = 'div',
  delay = 0,
  y = 24,
  className = '',
  once = true,
  ...rest
}) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as] || motion.div

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.25 }}
      transition={{
        duration: reduce ? 0.2 : 0.7,
        delay: reduce ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
