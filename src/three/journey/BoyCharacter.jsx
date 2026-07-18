import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import Backpack from './Backpack'

// Stylized low-poly boy from primitives, rigged as a hierarchy:
//   root -> hips -> (upper: torso/head/arms + backpack) + legs
// The `upper` group bends at the waist (pickup). Pose + attire are read from a
// shared ref (poseRef.current.pose / .backpack / .suit) so the scroll rig can
// drive it without React re-renders.

const SKIN = '#c08c63'
const SKIN_DARK = '#a9744f'
const HAIR = '#241d2b'
const SHIRT = '#3f4f7d'
const SHIRT_DARK = '#33406a'
const SUIT = '#242a3d'
const LAPEL = '#171b28'
const TIE = '#7a2a3a'
const WHITE = '#e8e6f0'
const PANTS = '#2c2942'
const PANTS_SUIT = '#20243a'
const SHOE = '#17151f'
const FRAME = '#141019'

const damp = (rot, axis, target, k) => {
  rot[axis] += (target - rot[axis]) * k
}

export default function BoyCharacter({ poseRef, speed = 6, ...props }) {
  const root = useRef()
  const upper = useRef()
  const lArm = useRef()
  const rArm = useRef()
  const lLeg = useRef()
  const rLeg = useRef()
  const head = useRef()
  const bp = useRef()
  const casual = useRef()
  const suitG = useRef()
  const torsoMat = useRef()
  const lSleeveMat = useRef()
  const rSleeveMat = useRef()
  const lPantMat = useRef()
  const rPantMat = useRef()

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    const pose = poseRef?.current?.pose || 'idle'
    const suit = !!poseRef?.current?.suit
    const k = Math.min(1, delta * 10)

    let rootY = 0
    let upperX = 0
    let lArmX = 0
    let rArmX = 0
    let lArmZ = 0
    let rArmZ = 0
    let lLegX = 0
    let rLegX = 0
    let headY = head.current ? head.current.rotation.y : 0

    switch (pose) {
      case 'pickup': {
        upperX = 0.62 // reach down, not fold in half
        lArmX = -0.9
        rArmX = -0.9
        rootY = -0.14
        headY = 0
        break
      }
      case 'walk': {
        const s = Math.sin(t * speed)
        lLegX = s * 0.7
        rLegX = -s * 0.7
        lArmX = -s * 0.5
        rArmX = s * 0.5
        rootY = Math.abs(Math.sin(t * speed)) * 0.05
        headY = 0
        break
      }
      case 'goalkeeper': {
        rootY = -0.14 + Math.sin(t * 4) * 0.04
        lLegX = 0.35
        rLegX = 0.35
        lArmZ = 1.0
        rArmZ = -1.0
        lArmX = -0.4
        rArmX = -0.4
        headY = 0
        break
      }
      case 'graduate': {
        rArmZ = -2.5
        rArmX = -0.2
        lArmX = Math.sin(t * 3) * 0.15
        rootY = Math.sin(t * 2) * 0.03
        headY = 0
        break
      }
      case 'coding':
      case 'working': {
        lArmX = -1.3 + Math.sin(t * 12) * 0.09
        rArmX = -1.3 + Math.sin(t * 12 + 1) * 0.09
        headY = 0
        break
      }
      default: {
        rootY = Math.sin(t * 1.6) * 0.015
        lArmX = Math.sin(t * 1.6) * 0.06
        rArmX = Math.sin(t * 1.6 + 0.4) * 0.06
        headY = Math.sin(t * 0.5) * 0.15
      }
    }

    if (root.current) root.current.position.y += (rootY - root.current.position.y) * k
    if (upper.current) damp(upper.current.rotation, 'x', upperX, k)
    if (lArm.current) {
      damp(lArm.current.rotation, 'x', lArmX, k)
      damp(lArm.current.rotation, 'z', lArmZ, k)
    }
    if (rArm.current) {
      damp(rArm.current.rotation, 'x', rArmX, k)
      damp(rArm.current.rotation, 'z', rArmZ, k)
    }
    if (lLeg.current) damp(lLeg.current.rotation, 'x', lLegX, k)
    if (rLeg.current) damp(rLeg.current.rotation, 'x', rLegX, k)
    if (head.current) damp(head.current.rotation, 'y', headY, k)
    if (bp.current) bp.current.visible = !!poseRef?.current?.backpack

    // Attire swap: casual -> professional suit when working.
    const shirt = suit ? SUIT : SHIRT
    if (torsoMat.current) torsoMat.current.color.set(shirt)
    if (lSleeveMat.current) lSleeveMat.current.color.set(shirt)
    if (rSleeveMat.current) rSleeveMat.current.color.set(shirt)
    const pant = suit ? PANTS_SUIT : PANTS
    if (lPantMat.current) lPantMat.current.color.set(pant)
    if (rPantMat.current) rPantMat.current.color.set(pant)
    if (casual.current) casual.current.visible = !suit
    if (suitG.current) suitG.current.visible = suit
  })

  return (
    <group ref={root} {...props}>
      <group position={[0, 0.9, 0]}>
        {/* ---- Upper body (bends for pickup) ---- */}
        <group ref={upper}>
          <mesh position={[0, 0.26, 0]} castShadow>
            <boxGeometry args={[0.5, 0.62, 0.28]} />
            <meshStandardMaterial ref={torsoMat} color={SHIRT} flatShading roughness={0.8} />
          </mesh>

          {/* Casual details (plaid + soft collar) */}
          <group ref={casual}>
            <mesh position={[0, 0.26, 0.145]}>
              <boxGeometry args={[0.08, 0.62, 0.01]} />
              <meshStandardMaterial color={SHIRT_DARK} flatShading />
            </mesh>
            <mesh position={[0, 0.34, 0.145]}>
              <boxGeometry args={[0.5, 0.06, 0.01]} />
              <meshStandardMaterial color={SHIRT_DARK} flatShading />
            </mesh>
            <mesh position={[0, 0.56, 0.02]} rotation={[0.2, 0, 0]}>
              <boxGeometry args={[0.34, 0.12, 0.28]} />
              <meshStandardMaterial color={SHIRT_DARK} flatShading />
            </mesh>
          </group>

          {/* Suit details (collar + tie + lapels) */}
          <group ref={suitG} visible={false}>
            <mesh position={[0, 0.5, 0.145]}>
              <boxGeometry args={[0.2, 0.16, 0.02]} />
              <meshStandardMaterial color={WHITE} flatShading />
            </mesh>
            <mesh position={[0, 0.32, 0.155]}>
              <boxGeometry args={[0.06, 0.34, 0.02]} />
              <meshStandardMaterial color={TIE} flatShading />
            </mesh>
            <mesh position={[-0.12, 0.42, 0.15]} rotation={[0, 0, 0.32]}>
              <boxGeometry args={[0.12, 0.34, 0.03]} />
              <meshStandardMaterial color={LAPEL} flatShading />
            </mesh>
            <mesh position={[0.12, 0.42, 0.15]} rotation={[0, 0, -0.32]}>
              <boxGeometry args={[0.12, 0.34, 0.03]} />
              <meshStandardMaterial color={LAPEL} flatShading />
            </mesh>
          </group>

          {/* Backpack (school/college) */}
          <group ref={bp} position={[0, 0.28, -0.22]} visible={false}>
            <Backpack />
          </group>

          {/* Neck */}
          <mesh position={[0, 0.64, 0]}>
            <cylinderGeometry args={[0.08, 0.09, 0.12, 10]} />
            <meshStandardMaterial color={SKIN_DARK} flatShading />
          </mesh>

          {/* Head */}
          <group ref={head} position={[0, 0.86, 0]}>
            <mesh castShadow>
              <sphereGeometry args={[0.17, 22, 22]} />
              <meshStandardMaterial color={SKIN} flatShading roughness={0.85} />
            </mesh>
            <mesh position={[0, -0.01, 0.17]} rotation={[Math.PI / 2, 0, 0]}>
              <coneGeometry args={[0.03, 0.08, 8]} />
              <meshStandardMaterial color={SKIN} flatShading />
            </mesh>

            {/* Hair */}
            <mesh position={[0, 0.04, -0.03]} castShadow>
              <sphereGeometry args={[0.195, 20, 20]} />
              <meshStandardMaterial color={HAIR} flatShading roughness={1} />
            </mesh>
            <mesh position={[0, 0.13, -0.05]} castShadow>
              <sphereGeometry args={[0.16, 16, 16]} />
              <meshStandardMaterial color={HAIR} flatShading roughness={1} />
            </mesh>
            <mesh position={[0, -0.2, -0.12]} castShadow>
              <boxGeometry args={[0.38, 0.56, 0.15]} />
              <meshStandardMaterial color={HAIR} flatShading roughness={1} />
            </mesh>
            <mesh position={[-0.15, -0.1, 0.03]} rotation={[0, 0, 0.12]} castShadow>
              <boxGeometry args={[0.12, 0.46, 0.24]} />
              <meshStandardMaterial color={HAIR} flatShading roughness={1} />
            </mesh>
            <mesh position={[0.15, -0.1, 0.03]} rotation={[0, 0, -0.12]} castShadow>
              <boxGeometry args={[0.12, 0.46, 0.24]} />
              <meshStandardMaterial color={HAIR} flatShading roughness={1} />
            </mesh>
            <mesh position={[0, 0.12, 0.12]} rotation={[0.45, 0, 0]}>
              <boxGeometry args={[0.3, 0.13, 0.12]} />
              <meshStandardMaterial color={HAIR} flatShading roughness={1} />
            </mesh>

            {/* Glasses */}
            <mesh position={[-0.07, 0, 0.15]}>
              <torusGeometry args={[0.055, 0.012, 8, 20]} />
              <meshStandardMaterial color={FRAME} metalness={0.4} roughness={0.4} />
            </mesh>
            <mesh position={[0.07, 0, 0.15]}>
              <torusGeometry args={[0.055, 0.012, 8, 20]} />
              <meshStandardMaterial color={FRAME} metalness={0.4} roughness={0.4} />
            </mesh>
            <mesh position={[0, 0, 0.15]}>
              <boxGeometry args={[0.04, 0.012, 0.012]} />
              <meshStandardMaterial color={FRAME} metalness={0.4} roughness={0.4} />
            </mesh>
          </group>

          {/* Arms */}
          <group ref={lArm} position={[-0.31, 0.5, 0]}>
            <mesh position={[0, -0.24, 0]} castShadow>
              <capsuleGeometry args={[0.07, 0.4, 4, 10]} />
              <meshStandardMaterial ref={lSleeveMat} color={SHIRT} flatShading roughness={0.8} />
            </mesh>
            <mesh position={[0, -0.5, 0]} castShadow>
              <sphereGeometry args={[0.07, 12, 12]} />
              <meshStandardMaterial color={SKIN} flatShading />
            </mesh>
          </group>
          <group ref={rArm} position={[0.31, 0.5, 0]}>
            <mesh position={[0, -0.24, 0]} castShadow>
              <capsuleGeometry args={[0.07, 0.4, 4, 10]} />
              <meshStandardMaterial ref={rSleeveMat} color={SHIRT} flatShading roughness={0.8} />
            </mesh>
            <mesh position={[0, -0.5, 0]} castShadow>
              <sphereGeometry args={[0.07, 12, 12]} />
              <meshStandardMaterial color={SKIN} flatShading />
            </mesh>
          </group>
        </group>

        {/* ---- Legs ---- */}
        <group ref={lLeg} position={[-0.13, 0, 0]}>
          <mesh position={[0, -0.45, 0]} castShadow>
            <capsuleGeometry args={[0.09, 0.66, 4, 10]} />
            <meshStandardMaterial ref={lPantMat} color={PANTS} flatShading roughness={0.9} />
          </mesh>
          <mesh position={[0, -0.86, 0.06]} castShadow>
            <boxGeometry args={[0.14, 0.1, 0.26]} />
            <meshStandardMaterial color={SHOE} flatShading />
          </mesh>
        </group>
        <group ref={rLeg} position={[0.13, 0, 0]}>
          <mesh position={[0, -0.45, 0]} castShadow>
            <capsuleGeometry args={[0.09, 0.66, 4, 10]} />
            <meshStandardMaterial ref={rPantMat} color={PANTS} flatShading roughness={0.9} />
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
