import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
import { Suspense } from 'react'
import { Building, Football, GradCap, Laptop, Gem } from './models'

// Gentle mouse parallax on the camera.
function Rig() {
  useFrame((state, delta) => {
    const targetX = state.pointer.x * 0.8
    const targetY = state.pointer.y * 0.5
    const k = Math.min(1, delta * 2.5)
    state.camera.position.x += (targetX - state.camera.position.x) * k
    state.camera.position.y += (targetY - state.camera.position.y) * k
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

export default function HeroCanvas() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 9], fov: 45 }}
    >
      <ambientLight intensity={1.1} />
      <directionalLight position={[5, 6, 5]} intensity={2.4} />
      <pointLight position={[-6, -2, 3]} color="#b266d2" intensity={40} distance={25} />
      <pointLight position={[6, 3, -2]} color="#7a63d2" intensity={30} distance={25} />

      <Suspense fallback={null}>
        <Float speed={1.4} rotationIntensity={0.7} floatIntensity={1.1}>
          <Building position={[-3.4, 0.3, -1]} scale={0.85} rotation={[0, 0.5, 0]} />
        </Float>
        <Float speed={1.7} rotationIntensity={0.9} floatIntensity={1.3}>
          <Laptop position={[3.2, 0.9, 0]} scale={0.95} rotation={[0, -0.6, 0]} />
        </Float>
        <Float speed={2} rotationIntensity={1.4} floatIntensity={1.6}>
          <Football position={[2.6, -1.6, 1.2]} scale={0.9} />
        </Float>
        <Float speed={1.5} rotationIntensity={1} floatIntensity={1.2}>
          <GradCap position={[-2.9, -1.5, 0.2]} scale={1} rotation={[0.2, 0.4, 0]} />
        </Float>
        <Float speed={2.4} rotationIntensity={1.6} floatIntensity={1.8}>
          <Gem position={[0.4, 2, -2]} scale={0.8} color="#b266d2" />
        </Float>
        <Float speed={2.2} rotationIntensity={1.5} floatIntensity={1.7}>
          <Gem position={[-0.6, -2.2, -1.5]} scale={0.55} color="#7a63d2" />
        </Float>

        <Sparkles
          count={70}
          scale={[13, 8, 6]}
          size={2.4}
          speed={0.35}
          color="#c79be0"
          opacity={0.7}
        />
      </Suspense>

      <Rig />
    </Canvas>
  )
}
