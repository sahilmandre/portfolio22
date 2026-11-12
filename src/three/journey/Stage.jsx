import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html, useProgress } from '@react-three/drei'
import { Suspense, useRef } from 'react'
import BoyCharacter from './BoyCharacter'
import Stations from './Stations'
import Scenery from './Scenery'
import Atmosphere from './Atmosphere'
import Backpack from './Backpack'
import {
  sampleJourney,
  wearsBackpack,
  bagOnGround,
  outfitAt,
  ageAt,
  STATIONS,
} from './journeyPath'

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div style={{ color: '#cbb8ee', font: '600 14px Manrope, sans-serif' }}>
        {Math.round(progress)}%
      </div>
    </Html>
  )
}

// Drives the boy along the path from a *smoothed* scroll progress (so fast
// scrolls ease and each phase lingers), choreographs the camera (wide tracking
// while walking, gentle push-in on each action beat), and toggles backpack /
// ground bag / suit. The smoothed progress is shared via smoothRef so the
// Atmosphere/Scenery stay in lockstep with the boy.
function Rig({ smoothRef, progressRef, boyRef, poseRef, bagRef }) {
  const { camera } = useThree()
  const dwell = useRef(0)

  useFrame((state, delta) => {
    const target = progressRef.current ?? 0
    // ease the progress itself — this is what gives the GSAP-like inertia
    smoothRef.current += (target - smoothRef.current) * Math.min(1, delta * 3)
    const p = smoothRef.current

    const { x, action, moving } = sampleJourney(p)
    const age = ageAt(p)
    const k = Math.min(1, delta * 6)

    if (boyRef.current) {
      boyRef.current.position.x = x
      const targetRot = moving ? Math.PI / 2 : 0
      boyRef.current.rotation.y += (targetRot - boyRef.current.rotation.y) * k
    }
    poseRef.current.pose = action
    poseRef.current.backpack = wearsBackpack(p)
    poseRef.current.outfit = outfitAt(p)
    poseRef.current.age = age
    if (bagRef.current) bagRef.current.visible = bagOnGround(p)

    // Camera: wide travelling shot while walking, dolly in on the action beats.
    const dTarget = moving ? 0 : 1
    dwell.current += (dTarget - dwell.current) * Math.min(1, delta * 2.2)
    const d = dwell.current
    const closeZ =
      action === 'goalkeeper' ? 6.7
      : action === 'coding' || action === 'working' ? 5.1
      : action === 'graduate' ? 5.9
      : 5.7
    // When he's little, pull the camera in a bit + drop the eyeline so the small
    // child still fills the frame — but gently, so the floating labels stay in view.
    const ageZoom = 0.85 + 0.15 * age
    const zTarget = (7.4 + (closeZ - 7.4) * d) * ageZoom
    const yTarget = (2.75 + (2.15 - 2.75) * d) * ageZoom
    const lookAtY = 1.0 + 0.25 * age
    const t = state.clock.elapsedTime
    const swayX = Math.sin(t * 0.45) * 0.05 * d
    const swayY = Math.sin(t * 0.6) * 0.04 * d

    camera.position.x += (x + 0.7 + swayX - camera.position.x) * k
    camera.position.y += (yTarget + swayY - camera.position.y) * (k * 0.5)
    camera.position.z += (zTarget - camera.position.z) * (k * 0.5)
    camera.lookAt(x + 0.15, lookAtY, 0)
  })
  return null
}

export default function Stage({ progressRef, active = true }) {
  const boyRef = useRef()
  const bagRef = useRef()
  const poseRef = useRef({ pose: 'idle', backpack: false, outfit: 'school', age: 0 })
  const smoothRef = useRef(0)
  const envRef = useRef({ night: 0 })
  const localProgress = useRef(0)
  const pr = progressRef ?? localProgress
  const startX = STATIONS[0].x

  return (
    <Canvas
      // Pause rendering when the journey is scrolled off-screen — otherwise the
      // rig/atmosphere keep running at 60fps and jank the rest of the page.
      frameloop={active ? 'always' : 'never'}
      dpr={[1, 1.8]}
      shadows
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      camera={{ position: [startX + 1, 2.4, 7], fov: 42 }}
    >
      <color attach="background" args={['#aeb8e6']} />
      <fog attach="fog" args={['#c9c6ea', 16, 46]} />

      <Atmosphere smoothRef={smoothRef} envRef={envRef} />

      <Suspense fallback={<Loader />}>
        <Scenery envRef={envRef} />
        <Stations envRef={envRef} />

        <group ref={boyRef} position={[startX, 0, 0]}>
          <BoyCharacter poseRef={poseRef} />
        </group>

        {/* Fallen bag on the ground directly in front, grabbed in the intro.
            Sized down to match the small child who picks it up. */}
        <group ref={bagRef} position={[startX, 0.1, 0.42]} rotation={[Math.PI / 2, 0, 0.35]} scale={0.62}>
          <Backpack />
        </group>
      </Suspense>

      <Rig
        smoothRef={smoothRef}
        progressRef={pr}
        boyRef={boyRef}
        poseRef={poseRef}
        bagRef={bagRef}
      />
    </Canvas>
  )
}
