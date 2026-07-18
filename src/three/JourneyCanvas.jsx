import { Canvas, useFrame } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import { Suspense, useRef } from 'react'
import { Node } from './models'
import { JOURNEY } from '../data/site'

// A slowly drifting 3D "constellation" of milestone nodes behind the timeline.
// Subtle by design — the readable content is the HTML timeline on top.
function Constellation() {
  const group = useRef()
  const n = JOURNEY.length

  useFrame((state, delta) => {
    if (!group.current) return
    group.current.rotation.y += delta * 0.12
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.08
  })

  return (
    <group ref={group}>
      {JOURNEY.map((_, i) => {
        const t = i / Math.max(1, n - 1)
        const angle = t * Math.PI * 2.2
        const radius = 2.6
        const x = Math.cos(angle) * radius
        const y = (t - 0.5) * 6
        const z = Math.sin(angle) * radius
        return (
          <Node
            key={i}
            position={[x, y, z]}
            scale={0.7 + (i % 3) * 0.12}
            color={i % 2 === 0 ? '#7a63d2' : '#b266d2'}
          />
        )
      })}
    </group>
  )
}

export default function JourneyCanvas() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 8], fov: 50 }}
    >
      <ambientLight intensity={1} />
      <pointLight position={[4, 4, 5]} color="#b266d2" intensity={30} distance={30} />
      <pointLight position={[-4, -4, 2]} color="#7a63d2" intensity={25} distance={30} />
      <Suspense fallback={null}>
        <Constellation />
        <Sparkles count={90} scale={[12, 12, 8]} size={2} speed={0.25} color="#9a7fd6" opacity={0.5} />
      </Suspense>
    </Canvas>
  )
}
