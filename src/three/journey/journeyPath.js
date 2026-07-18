// The life path: stations along the x-axis the boy walks through, and a keyframe
// timeline mapping scroll progress (0..1) -> position + action.

export const STATIONS = [
  { id: 'school', x: -18, label: 'School', sub: 'Jabalpur · 2000–2017' },
  { id: 'football', x: -12, label: 'Goalkeeper', sub: 'District team · 2009–2015' },
  { id: 'college', x: -6, label: 'College', sub: 'RGPV Bhopal · 2017–2021' },
  { id: 'coding', x: 0, label: 'Learning to code', sub: 'COVID 2020 · self-taught' },
  { id: 'v2', x: 6, label: 'V2 Solutions', sub: 'Associate Developer · 2021' },
  { id: 'tcs', x: 12, label: 'TCS', sub: 'System Engineer · 2021–2025' },
  { id: 'accenture', x: 18, label: 'Accenture', sub: 'Senior Analyst · 2025–Now' },
]

const X = Object.fromEntries(STATIONS.map((s) => [s.id, s.x]))

// [progress, x, action]. Dwell segments hold x (perform action); walk segments
// move x. Dwells are wide so each phase lingers (GSAP-like).
const KF = [
  { p: 0.0, x: X.school, a: 'pickup' }, // bend + grab the fallen bag
  { p: 0.05, x: X.school, a: 'pickup' },
  { p: 0.11, x: X.school, a: 'idle' }, // stand at school (backpack on)
  { p: 0.18, x: X.football, a: 'walk' },
  { p: 0.26, x: X.football, a: 'goalkeeper' },
  { p: 0.33, x: X.college, a: 'walk' },
  { p: 0.41, x: X.college, a: 'graduate' },
  { p: 0.48, x: X.coding, a: 'walk' },
  { p: 0.56, x: X.coding, a: 'coding' },
  { p: 0.63, x: X.v2, a: 'walk' }, // suit on from here
  { p: 0.71, x: X.v2, a: 'working' },
  { p: 0.78, x: X.tcs, a: 'walk' },
  { p: 0.86, x: X.tcs, a: 'working' },
  { p: 0.93, x: X.accenture, a: 'walk' },
  { p: 1.0, x: X.accenture, a: 'working' },
]

const clamp = (v, a, b) => Math.min(b, Math.max(a, v))

// Returns { x, action, moving } for a given scroll progress.
export function sampleJourney(progress) {
  const p = clamp(progress, 0, 1)
  for (let i = 0; i < KF.length - 1; i++) {
    const a = KF[i]
    const b = KF[i + 1]
    if (p >= a.p && p <= b.p) {
      const t = b.p === a.p ? 0 : (p - a.p) / (b.p - a.p)
      const x = a.x + (b.x - a.x) * t
      const moving = b.x !== a.x
      return { x, action: moving ? 'walk' : b.a, moving }
    }
  }
  const last = KF[KF.length - 1]
  return { x: last.x, action: last.a, moving: false }
}

// Student era (backpack) — carried at school and again at college, but NOT during
// the football phase (he's in his goalkeeper kit then).
export function wearsBackpack(progress) {
  return (progress >= 0.05 && progress < 0.18) || (progress >= 0.33 && progress < 0.48)
}
// The fallen bag sits on the ground only until it's grabbed.
export function bagOnGround(progress) {
  return progress < 0.05
}
// Professional suit once he starts working (heading into V2 onward).
export function wearsSuit(progress) {
  return progress >= 0.6
}

// Outfit per life phase, so he changes clothes as he grows:
//   school uniform -> goalkeeper kit -> casual (college/coding) -> business suit.
export function outfitAt(progress) {
  const p = clamp(progress, 0, 1)
  if (p < 0.18) return 'school' // little kid in a school uniform
  if (p < 0.32) return 'goalie' // green goalkeeper jersey, gloves, shorts, socks
  if (p < 0.6) return 'casual' // college + learning to code
  return 'suit' // professional career (V2 / TCS / Accenture)
}

// Age 0..1 across the journey: a small child at school, fully grown by the time
// he starts his career. Drives the character's overall size + head proportions
// so the boy visibly becomes a man as he reaches each milestone (born 1997 →
// school toddler → football boy → college young-adult → working man).
export function ageAt(progress) {
  const p = clamp(progress, 0, 1)
  const a = Math.min(1, p / 0.6) // fully grown by the time he starts working
  return a * a * (3 - 2 * a) // smoothstep — childhood lingers, then he grows fast
}
