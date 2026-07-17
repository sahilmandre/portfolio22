// The life path: stations along the x-axis the boy walks through, and a keyframe
// timeline mapping scroll progress (0..1) -> position + action.

export const STATIONS = [
  { id: 'school', x: -12, label: 'School', sub: 'Jabalpur · 2000–2017' },
  { id: 'football', x: -6, label: 'Goalkeeper', sub: 'District team · 2009–2015' },
  { id: 'college', x: 0, label: 'College', sub: 'RGPV Bhopal · 2017–2021' },
  { id: 'coding', x: 6, label: 'Coding', sub: 'COVID 2020 → self-taught' },
  { id: 'work', x: 12, label: 'Accenture', sub: 'Senior Analyst · 2025–Now' },
]

const X = STATIONS.map((s) => s.x)

// [progress, x, action]. "walk" segments move x; dwell segments hold x + act.
const KF = [
  { p: 0.0, x: X[0], a: 'idle' },
  { p: 0.08, x: X[0], a: 'idle' }, // arrive at school
  { p: 0.2, x: X[1], a: 'walk' }, // walk to football
  { p: 0.32, x: X[1], a: 'goalkeeper' }, // goalkeeper
  { p: 0.44, x: X[2], a: 'walk' }, // walk to college
  { p: 0.56, x: X[2], a: 'graduate' }, // graduate
  { p: 0.68, x: X[3], a: 'walk' }, // walk to coding
  { p: 0.8, x: X[3], a: 'coding' }, // coding
  { p: 0.92, x: X[4], a: 'walk' }, // walk to work
  { p: 1.0, x: X[4], a: 'working' }, // working
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
