import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html, useProgress } from '@react-three/drei'
import { Suspense, useRef } from 'react'
import BoyCharacter from './BoyCharacter'
import Stations from './Stations'
import Backpack from './Backpack'
import {
  sampleJourney,
  wearsBackpack,
  bagOnGround,
  wearsSuit,
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
// scrolls ease and each phase lingers), follows with the camera, and toggles
// backpack / ground bag / suit.
function Rig({ progressRef, boyRef, poseRef, bagRef }) {
  const { camera } = useThree()
  const smooth = useRef(0)

  useFrame((_, delta) => {
    const target = progressRef.current ?? 0
    // ease the progress itself — this is what gives the GSAP-like inertia
    smooth.current += (target - smooth.current) * Math.min(1, delta * 3)
    const p = smooth.current

    const { x, action, moving } = sampleJourney(p)
    const k = Math.min(1, delta * 6)

    if (boyRef.current) {
      boyRef.current.position.x = x
      const targetRot = moving ? Math.PI / 2 : 0
      boyRef.current.rotation.y += (targetRot - boyRef.current.rotation.y) * k
    }
    poseRef.current.pose = action
    poseRef.current.backpack = wearsBackpack(p)
    poseRef.current.suit = wearsSuit(p)
    if (bagRef.current) bagRef.current.visible = bagOnGround(p)

    camera.position.x += (x + 1 - camera.position.x) * k
    camera.position.y += (2.4 - camera.position.y) * (k * 0.6)
    camera.position.z += (7 - camera.position.z) * (k * 0.6)
    camera.lookAt(x, 1.15, 0)
  })
  return null
}

export default function Stage({ progressRef }) {
  const boyRef = useRef()
  const bagRef = useRef()
  const poseRef = useRef({ pose: 'idle', backpack: false, suit: false })
  const localProgress = useRef(0)
  const pr = progressRef ?? localProgress
  const startX = STATIONS[0].x

  return (
    <Canvas
      dpr={[1, 1.8]}
      shadows
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      camera={{ position: [startX + 1, 2.4, 7], fov: 42 }}
    >
      <color attach="background" args={['#191527']} />
      <fog attach="fog" args={['#191527', 16, 46]} />

      <hemisphereLight args={['#cbb8ee', '#241a33', 1.0]} />
      <ambientLight intensity={0.7} />
      <directionalLight
        position={[6, 12, 8]}
        intensity={3.2}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={1}
        shadow-camera-far={70}
        shadow-camera-left={-26}
        shadow-camera-right={26}
        shadow-camera-top={16}
        shadow-camera-bottom={-16}
      />
      <directionalLight position={[-6, 5, 6]} intensity={1.1} color="#b266d2" />
      <pointLight position={[0, 4, 6]} intensity={25} distance={40} color="#8b74e0" />

      <Suspense fallback={<Loader />}>
        <Stations />

        <group ref={boyRef} position={[startX, 0, 0]}>
          <BoyCharacter poseRef={poseRef} />
        </group>

        {/* Fallen bag on the ground directly in front, grabbed in the intro */}
        <group ref={bagRef} position={[startX, 0.14, 0.5]} rotation={[Math.PI / 2, 0, 0.35]}>
          <Backpack />
        </group>

        {/* Ground + walking path */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
          <planeGeometry args={[150, 60]} />
          <meshStandardMaterial color="#221f33" roughness={1} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0.6]} receiveShadow>
          <planeGeometry args={[150, 2.4]} />
          <meshStandardMaterial color="#2b2740" roughness={1} />
        </mesh>
      </Suspense>

      <Rig progressRef={pr} boyRef={boyRef} poseRef={poseRef} bagRef={bagRef} />
    </Canvas>
  )
}
