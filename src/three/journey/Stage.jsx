import { Canvas } from '@react-three/fiber'
import {
  OrbitControls,
  ContactShadows,
  Html,
  useProgress,
} from '@react-three/drei'
import { Suspense } from 'react'
import Character from './Character'
import { AVATAR_URL } from './avatarConfig'
import { Building } from '../models'

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

// Round 1: a single calibration scene — character on a ground plane, one prop
// (schoolhouse), soft lighting + contact shadows, orbit controls so we can look
// around and check scale before laying out the full life path.
export default function Stage() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      shadows
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      camera={{ position: [2.5, 1.7, 4.5], fov: 40 }}
    >
      <color attach="background" args={['#14121f']} />
      <fog attach="fog" args={['#14121f', 10, 26]} />

      <hemisphereLight args={['#b9a7ec', '#20142e', 0.7]} />
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 9, 5]}
        intensity={2.6}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={1}
        shadow-camera-far={30}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={12}
        shadow-camera-bottom={-12}
      />
      <pointLight position={[-5, 3, 2]} color="#b266d2" intensity={20} distance={25} />

      <Suspense fallback={<Loader />}>
        <Character url={AVATAR_URL} position={[0, 0, 0]} />

        {/* First life station: school (placeholder building for now) */}
        <Building position={[-3.4, 1.05, -3]} scale={1.1} rotation={[0, 0.5, 0]} />

        {/* Ground */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
          <planeGeometry args={[80, 80]} />
          <meshStandardMaterial color="#1b1924" roughness={1} metalness={0} />
        </mesh>
        <ContactShadows
          position={[0, 0.01, 0]}
          opacity={0.55}
          scale={16}
          blur={2.6}
          far={6}
          color="#000000"
        />
      </Suspense>

      <OrbitControls
        makeDefault
        enablePan={false}
        minDistance={2}
        maxDistance={12}
        maxPolarAngle={Math.PI / 2.05}
        target={[0, 1, 0]}
      />
    </Canvas>
  )
}
