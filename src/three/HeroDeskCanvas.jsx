import { Canvas } from '@react-three/fiber'
import { ContactShadows, Html, OrbitControls } from '@react-three/drei'
import { Suspense, useRef } from 'react'
import BoyCharacter from './journey/BoyCharacter'
import DeskTerminal from '../components/DeskTerminal'

// Hero scene, ¾ back view: a low-poly "me" on an office chair at a wooden desk,
// coding on a laptop — his BACK to us. The laptop screen is a REAL interactive
// terminal (drei <Html>): click it to type. Drag to orbit and change the view.

const WOOD = '#b98a55'
const WOOD_DARK = '#8f6a3f'
const CHAIR = '#c0392b'
const METAL = '#cfd2da'
const SCREEN_TILT = -0.52

function OfficeChair() {
  const arms = [0, 1, 2, 3, 4]
  return (
    <group position={[0, 0, 0.05]}>
      {/* 5-star wheel base */}
      {arms.map((i) => {
        const a = (i / 5) * Math.PI * 2
        const x = Math.sin(a) * 0.42
        const z = Math.cos(a) * 0.42
        return (
          <group key={i}>
            <mesh position={[x * 0.5, 0.11, z * 0.5]} rotation={[0, -a, 0]} castShadow>
              <boxGeometry args={[0.08, 0.05, 0.5]} />
              <meshStandardMaterial color="#2b2740" flatShading />
            </mesh>
            <mesh position={[x, 0.06, z]} castShadow>
              <cylinderGeometry args={[0.06, 0.06, 0.08, 10]} />
              <meshStandardMaterial color="#15121d" flatShading />
            </mesh>
          </group>
        )
      })}
      {/* Gas cylinder */}
      <mesh position={[0, 0.34, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.45, 10]} />
        <meshStandardMaterial color={METAL} metalness={0.5} roughness={0.4} flatShading />
      </mesh>
      {/* Seat */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <boxGeometry args={[0.62, 0.12, 0.58]} />
        <meshStandardMaterial color={CHAIR} flatShading roughness={0.7} />
      </mesh>
      {/* Backrest — low (lumbar) so his whole upper back + head rise above it */}
      <mesh position={[0, 0.8, 0.3]} rotation={[0.18, 0, 0]} castShadow>
        <boxGeometry args={[0.54, 0.4, 0.1]} />
        <meshStandardMaterial color={CHAIR} flatShading roughness={0.7} />
      </mesh>
    </group>
  )
}

function Desk() {
  return (
    <group position={[0, 0, -1.05]}>
      {/* Wooden top */}
      <mesh position={[0, 1.0, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.0, 0.1, 1.2]} />
        <meshStandardMaterial color={WOOD} flatShading roughness={0.8} />
      </mesh>
      {/* Drawer cabinet (right) */}
      <group position={[1.05, 0.47, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.78, 0.94, 1.1]} />
          <meshStandardMaterial color={WOOD_DARK} flatShading roughness={0.85} />
        </mesh>
        {[0.28, 0.0, -0.28].map((y, i) => (
          <group key={i} position={[0, y, 0.56]}>
            <mesh>
              <boxGeometry args={[0.66, 0.22, 0.03]} />
              <meshStandardMaterial color="#9c7648" flatShading />
            </mesh>
            <mesh position={[0, 0, 0.03]}>
              <boxGeometry args={[0.2, 0.04, 0.03]} />
              <meshStandardMaterial color="#5f4629" flatShading />
            </mesh>
          </group>
        ))}
      </group>
      {/* Left leg */}
      <mesh position={[-1.35, 0.47, 0]} castShadow>
        <boxGeometry args={[0.12, 0.94, 1.0]} />
        <meshStandardMaterial color={WOOD_DARK} flatShading />
      </mesh>

      {/* Laptop */}
      <group position={[0, 1.06, 0.4]}>
        <mesh castShadow>
          <boxGeometry args={[1.9, 0.06, 1.0]} />
          <meshStandardMaterial color="#3a3550" flatShading metalness={0.3} roughness={0.5} />
        </mesh>
        {/* Trackpad hint */}
        <mesh position={[0, 0.035, 0.28]}>
          <boxGeometry args={[0.5, 0.01, 0.32]} />
          <meshStandardMaterial color="#2b2742" flatShading />
        </mesh>
        {/* Lid + emissive screen (terminal overlays it) */}
        <group position={[0, 0.02, -0.5]} rotation={[SCREEN_TILT, 0, 0]}>
          <mesh position={[0, 0.56, 0]} castShadow>
            <boxGeometry args={[1.94, 1.16, 0.05]} />
            <meshStandardMaterial color="#25203a" flatShading />
          </mesh>
          <mesh position={[0, 0.56, 0.03]}>
            <planeGeometry args={[1.82, 1.04]} />
            <meshStandardMaterial color="#140f2b" emissive="#5a3fa0" emissiveIntensity={0.5} toneMapped={false} />
          </mesh>
        </group>
      </group>

      {/* Headphones */}
      <group position={[1.02, 1.16, 0.15]} rotation={[0, 0.4, 0]}>
        <mesh rotation={[0, 0, 0]}>
          <torusGeometry args={[0.16, 0.03, 8, 20, Math.PI]} />
          <meshStandardMaterial color="#1b1828" flatShading />
        </mesh>
        <mesh position={[-0.16, -0.05, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 0.06, 12]} />
          <meshStandardMaterial color="#2b2742" flatShading />
        </mesh>
        <mesh position={[0.16, -0.05, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 0.06, 12]} />
          <meshStandardMaterial color="#2b2742" flatShading />
        </mesh>
      </group>
      {/* Mug */}
      <mesh position={[-1.0, 1.14, 0.2]} castShadow>
        <cylinderGeometry args={[0.11, 0.09, 0.22, 14]} />
        <meshStandardMaterial color={CHAIR} flatShading />
      </mesh>
      {/* Notepad */}
      <mesh position={[-0.95, 1.06, -0.15]} rotation={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[0.4, 0.04, 0.5]} />
        <meshStandardMaterial color="#e8e6f0" flatShading />
      </mesh>
    </group>
  )
}

export default function HeroDeskCanvas({ active = true }) {
  const poseRef = useRef({ pose: 'coding', outfit: 'hero', age: 1, backpack: false })

  return (
    <Canvas
      // Stop rendering entirely when scrolled out of view (otherwise the scene
      // keeps burning GPU/main-thread cycles and janks the rest of the page).
      frameloop={active ? 'always' : 'never'}
      dpr={[1, 1.8]}
      shadows
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [1.7, 2.15, 2.55], fov: 46 }}
    >
      <hemisphereLight args={['#6a5aa0', '#171226', 0.6]} />
      <ambientLight intensity={0.45} />
      {/* Laptop screen glow lifting his face/chest + desk */}
      <pointLight position={[0, 1.55, -0.35]} color="#8b74e0" intensity={16} distance={5} decay={2} />
      {/* Fill from the camera side so his white shirt + shoulders read clearly */}
      <directionalLight position={[3.5, 3, 4]} intensity={1.7} color="#efeaff" />
      {/* Key + shadow */}
      <directionalLight position={[-3, 6, 2]} intensity={0.75} color="#e9e0ff" castShadow shadow-mapSize={[1024, 1024]} />

      <Suspense fallback={null}>
        <Desk />
        <OfficeChair />

        {/* Seated developer, back to us, facing the laptop */}
        <group position={[0, 0, 0.06]} rotation={[0, Math.PI, 0]} scale={1.22}>
          <BoyCharacter poseRef={poseRef} />
        </group>

        {/* Decorative auto-typing terminal on the laptop screen (non-interactive) */}
        <Html
          transform
          occlude="blending"
          position={[0, 1.58, -1.39]}
          rotation={[SCREEN_TILT, 0, 0]}
          distanceFactor={1.6}
          zIndexRange={[20, 0]}
          style={{ pointerEvents: 'none' }}
          className="hero3d-term-wrap"
        >
          <div className="hero3d-term">
            <DeskTerminal className="hero__terminal" />
          </div>
        </Html>

        {/* Soft grounding shadow — no hard floor plane, so the scene blends into
            the page background instead of sitting in a dark square. */}
        <ContactShadows position={[0, 0.02, -0.3]} scale={9} blur={2.8} far={4.5} opacity={0.5} color="#000000" />
      </Suspense>

      <OrbitControls
        makeDefault
        target={[0, 1.35, -0.5]}
        enablePan={false}
        enableZoom
        minDistance={2.4}
        maxDistance={6}
        minPolarAngle={0.6}
        maxPolarAngle={1.42}
        minAzimuthAngle={-0.9}
        maxAzimuthAngle={0.9}
        enableDamping
        dampingFactor={0.08}
      />
    </Canvas>
  )
}
