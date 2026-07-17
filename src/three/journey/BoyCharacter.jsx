import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

// A stylized low-poly boy, built entirely from primitives and assembled as a
// rigged hierarchy (hips → torso/head/arms/legs as separate groups) so the
// limbs can swing for walk/idle animation in later rounds.
//
// Look tuned to Sahil: long dark wavy hair, glasses, warm skin, navy plaid shirt.

const SKIN = '#c08c63'
const SKIN_DARK = '#a9744f'
const HAIR = '#241d2b'
const SHIRT = '#3f4f7d'
const SHIRT_DARK = '#33406a'
const PANTS = '#2c2942'
const SHOE = '#17151f'
const FRAME = '#141019'

export default function BoyCharacter({ walking = false, speed = 6, ...props }) {
  const root = useRef()
  const hips = useRef()
  const lArm = useRef()
  const rArm = useRef()
  const lLeg = useRef()
  const rLeg = useRef()
  const head = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (walking) {
      const s = Math.sin(t * speed)
      const s2 = Math.sin(t * speed + Math.PI)
      if (lLeg.current) lLeg.current.rotation.x = s * 0.7
      if (rLeg.current) rLeg.current.rotation.x = s2 * 0.7
      if (lArm.current) lArm.current.rotation.x = s2 * 0.55
      if (rArm.current) rArm.current.rotation.x = s * 0.55
      if (root.current) root.current.position.y = Math.abs(Math.sin(t * speed)) * 0.04
    } else {
      // gentle idle: breathing bob + soft arm sway + subtle head life
      const b = Math.sin(t * 1.6)
      if (root.current) root.current.position.y = b * 0.015
      if (lArm.current) lArm.current.rotation.x = Math.sin(t * 1.6) * 0.06
      if (rArm.current) rArm.current.rotation.x = Math.sin(t * 1.6 + 0.4) * 0.06
      if (lLeg.current) lLeg.current.rotation.x = 0
      if (rLeg.current) rLeg.current.rotation.x = 0
      if (head.current) head.current.rotation.y = Math.sin(t * 0.5) * 0.15
    }
  })

  return (
    <group ref={root} {...props}>
      <group ref={hips} position={[0, 0.9, 0]}>
        {/* ---- Torso ---- */}
        <mesh position={[0, 0.26, 0]} castShadow>
          <boxGeometry args={[0.5, 0.62, 0.28]} />
          <meshStandardMaterial color={SHIRT} flatShading roughness={0.8} />
        </mesh>
        {/* plaid hint: a couple of subtle stripes */}
        <mesh position={[0, 0.26, 0.145]} castShadow>
          <boxGeometry args={[0.08, 0.62, 0.01]} />
          <meshStandardMaterial color={SHIRT_DARK} flatShading />
        </mesh>
        <mesh position={[0, 0.34, 0.145]}>
          <boxGeometry args={[0.5, 0.06, 0.01]} />
          <meshStandardMaterial color={SHIRT_DARK} flatShading />
        </mesh>
        {/* collar */}
        <mesh position={[0, 0.56, 0.02]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[0.34, 0.12, 0.28]} />
          <meshStandardMaterial color={SHIRT_DARK} flatShading />
        </mesh>

        {/* ---- Neck ---- */}
        <mesh position={[0, 0.64, 0]}>
          <cylinderGeometry args={[0.08, 0.09, 0.12, 10]} />
          <meshStandardMaterial color={SKIN_DARK} flatShading />
        </mesh>

        {/* ---- Head group ---- */}
        <group ref={head} position={[0, 0.86, 0]}>
          {/* skull */}
          <mesh castShadow>
            <sphereGeometry args={[0.17, 22, 22]} />
            <meshStandardMaterial color={SKIN} flatShading roughness={0.85} />
          </mesh>
          {/* nose */}
          <mesh position={[0, -0.01, 0.17]} rotation={[Math.PI / 2, 0, 0]}>
            <coneGeometry args={[0.03, 0.08, 8]} />
            <meshStandardMaterial color={SKIN} flatShading />
          </mesh>

          {/* ---- Long wavy hair ---- */}
          {/* top mound */}
          <mesh position={[0, 0.08, -0.01]} castShadow>
            <sphereGeometry args={[0.2, 18, 18]} />
            <meshStandardMaterial color={HAIR} flatShading roughness={1} />
          </mesh>
          {/* back sheet falling to shoulders */}
          <mesh position={[0, -0.16, -0.11]} castShadow>
            <boxGeometry args={[0.34, 0.5, 0.16]} />
            <meshStandardMaterial color={HAIR} flatShading roughness={1} />
          </mesh>
          {/* side strands framing the face */}
          <mesh position={[-0.16, -0.08, 0.02]} rotation={[0, 0, 0.15]} castShadow>
            <boxGeometry args={[0.1, 0.42, 0.22]} />
            <meshStandardMaterial color={HAIR} flatShading roughness={1} />
          </mesh>
          <mesh position={[0.16, -0.08, 0.02]} rotation={[0, 0, -0.15]} castShadow>
            <boxGeometry args={[0.1, 0.42, 0.22]} />
            <meshStandardMaterial color={HAIR} flatShading roughness={1} />
          </mesh>
          {/* fringe over forehead */}
          <mesh position={[0, 0.12, 0.13]} rotation={[0.5, 0, 0]}>
            <boxGeometry args={[0.3, 0.14, 0.1]} />
            <meshStandardMaterial color={HAIR} flatShading roughness={1} />
          </mesh>

          {/* ---- Glasses ---- */}
          <mesh position={[-0.07, 0.0, 0.15]}>
            <torusGeometry args={[0.055, 0.012, 8, 20]} />
            <meshStandardMaterial color={FRAME} metalness={0.4} roughness={0.4} />
          </mesh>
          <mesh position={[0.07, 0.0, 0.15]}>
            <torusGeometry args={[0.055, 0.012, 8, 20]} />
            <meshStandardMaterial color={FRAME} metalness={0.4} roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.0, 0.15]}>
            <boxGeometry args={[0.04, 0.012, 0.012]} />
            <meshStandardMaterial color={FRAME} metalness={0.4} roughness={0.4} />
          </mesh>
        </group>

        {/* ---- Arms (pivot at shoulders) ---- */}
        <group ref={lArm} position={[-0.31, 0.5, 0]}>
          <mesh position={[0, -0.24, 0]} castShadow>
            <capsuleGeometry args={[0.07, 0.4, 4, 10]} />
            <meshStandardMaterial color={SHIRT} flatShading roughness={0.8} />
          </mesh>
          <mesh position={[0, -0.5, 0]} castShadow>
            <sphereGeometry args={[0.07, 12, 12]} />
            <meshStandardMaterial color={SKIN} flatShading />
          </mesh>
        </group>
        <group ref={rArm} position={[0.31, 0.5, 0]}>
          <mesh position={[0, -0.24, 0]} castShadow>
            <capsuleGeometry args={[0.07, 0.4, 4, 10]} />
            <meshStandardMaterial color={SHIRT} flatShading roughness={0.8} />
          </mesh>
          <mesh position={[0, -0.5, 0]} castShadow>
            <sphereGeometry args={[0.07, 12, 12]} />
            <meshStandardMaterial color={SKIN} flatShading />
          </mesh>
        </group>

        {/* ---- Legs (pivot at hips) ---- */}
        <group ref={lLeg} position={[-0.13, 0, 0]}>
          <mesh position={[0, -0.45, 0]} castShadow>
            <capsuleGeometry args={[0.09, 0.66, 4, 10]} />
            <meshStandardMaterial color={PANTS} flatShading roughness={0.9} />
          </mesh>
          <mesh position={[0, -0.86, 0.06]} castShadow>
            <boxGeometry args={[0.14, 0.1, 0.26]} />
            <meshStandardMaterial color={SHOE} flatShading />
          </mesh>
        </group>
        <group ref={rLeg} position={[0.13, 0, 0]}>
          <mesh position={[0, -0.45, 0]} castShadow>
            <capsuleGeometry args={[0.09, 0.66, 4, 10]} />
            <meshStandardMaterial color={PANTS} flatShading roughness={0.9} />
          </mesh>
          <mesh position={[0, -0.86, 0.06]} castShadow>
            <boxGeometry args={[0.14, 0.1, 0.26]} />
            <meshStandardMaterial color={SHOE} flatShading />
          </mesh>
        </group>
      </group>
    </group>
  )
}
