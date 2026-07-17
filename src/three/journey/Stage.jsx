import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html, useProgress } from '@react-three/drei'
import { Suspense, useRef } from 'react'
import BoyCharacter from './BoyCharacter'
import Stations from './Stations'
import { sampleJourney, STATIONS } from './journeyPath'

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

// Drives the boy along the path from scroll progress + follows with the camera.
function Rig({ progressRef, boyRef, poseRef }) {
  const { camera } = useThree()
  useFrame((_, delta) => {
    const k = Math.min(1, delta * 4)
    const p = progressRef.current ?? 0
    const { x, action, moving } = sampleJourney(p)

    if (boyRef.current) {
      boyRef.current.position.x += (x - boyRef.current.position.x) * k
      const targetRot = moving ? Math.PI / 2 : 0
      // shortest-path-ish damp toward facing
      boyRef.current.rotation.y += (targetRot - boyRef.current.rotation.y) * k
    }
    poseRef.current.pose = action

    const bx = boyRef.current ? boyRef.current.position.x : x
    camera.position.x += (bx + 1 - camera.position.x) * (k * 0.8)
    camera.position.y += (2.4 - camera.position.y) * (k * 0.6)
    camera.position.z += (7 - camera.position.z) * (k * 0.6)
    camera.lookAt(bx, 1.15, 0)
  })
  return null
}

export default function Stage({ progressRef }) {
  const boyRef = useRef()
  const poseRef = useRef({ pose: 'idle' })
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
      <fog attach="fog" args={['#191527', 14, 42]} />

      <hemisphereLight args={['#cbb8ee', '#241a33', 1.0]} />
      <ambientLight intensity={0.7} />
      <directionalLight
        position={[6, 12, 8]}
        intensity={3.2}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={1}
        shadow-camera-far={60}
        shadow-camera-left={-22}
        shadow-camera-right={22}
        shadow-camera-top={14}
        shadow-camera-bottom={-14}
      />
      <directionalLight position={[-6, 5, 6]} intensity={1.1} color="#b266d2" />
      <pointLight position={[0, 4, 6]} intensity={25} distance={40} color="#8b74e0" />

      <Suspense fallback={<Loader />}>
        <Stations />
        <group ref={boyRef} position={[startX, 0, 0]}>
          <BoyCharacter poseRef={poseRef} />
        </group>

        {/* Ground */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
          <planeGeometry args={[120, 60]} />
          <meshStandardMaterial color="#221f33" roughness={1} />
        </mesh>
        {/* Path strip */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0.6]} receiveShadow>
          <planeGeometry args={[120, 2.4]} />
          <meshStandardMaterial color="#2b2740" roughness={1} />
        </mesh>
      </Suspense>

      <Rig progressRef={pr} boyRef={boyRef} poseRef={poseRef} />
    </Canvas>
  )
}
