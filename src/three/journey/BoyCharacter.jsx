import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import Backpack from './Backpack'

// Stylized low-poly boy from primitives, rigged as a hierarchy:
//   root -> hips -> (upper: torso/head/arms) + shorts + legs
// The `upper` group bends at the waist (pickup). Pose, attire and age are read
// from a shared ref (poseRef.current.pose / .backpack / .outfit / .age) so the
// scroll rig can drive it without React re-renders. He literally grows up and
// changes clothes at each life phase.

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

// Per-phase wardrobe. `legs: SKIN` + `shorts`/`sock` means bare legs (shorts kit);
// `gloves` adds goalkeeper gloves; `detail` picks which trim group is shown.
const OUTFITS = {
  school: { top: '#7fa8e0', legs: SKIN, shorts: '#2b3350', sock: WHITE, detail: 'school', bare: true },
  goalie: { top: '#26c069', legs: SKIN, shorts: '#17151f', sock: '#149a52', detail: 'goalie', bare: true, gloves: true },
  casual: { top: SHIRT, legs: PANTS, shorts: null, sock: null, detail: 'casual', bare: false },
  suit: { top: SUIT, legs: PANTS_SUIT, shorts: null, sock: null, detail: 'suit', bare: false },
  // White shirt + blue jeans "developer at his desk" look (hero scene).
  hero: { top: '#eceef4', legs: '#3a6197', shorts: null, sock: null, detail: 'plain', bare: false },
}

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
  const longHair = useRef()
  const bp = useRef()
  const casual = useRef()
  const suitG = useRef()
  const schoolG = useRef()
  const goalieG = useRef()
  const lGloveG = useRef()
  const rGloveG = useRef()
  const shortsG = useRef()
  const lSockG = useRef()
  const rSockG = useRef()
  const torsoMat = useRef()
  const lSleeveMat = useRef()
  const rSleeveMat = useRef()
  const lPantMat = useRef()
  const rPantMat = useRef()
  const shortsMat = useRef()
  const lSockMat = useRef()
  const rSockMat = useRef()

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    const pose = poseRef?.current?.pose || 'idle'
    const outfit = poseRef?.current?.outfit || 'casual'
    const age = poseRef?.current?.age ?? 1
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
        // Wide, crouched "ready to save" stance — arms spread OUT to the sides.
        rootY = -0.2 + Math.sin(t * 4) * 0.05
        lLegX = 0.5
        rLegX = 0.5
        lArmZ = -1.5 // left arm out to his left
        rArmZ = 1.5 // right arm out to his right
        lArmX = -0.2
        rArmX = -0.2
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
        // Seated at the desk: drop onto the chair, thighs forward, slight lean in.
        rootY = -0.26
        upperX = 0.12
        lLegX = -1.3
        rLegX = -1.3
        lArmX = -1.15 + Math.sin(t * 12) * 0.09
        rArmX = -1.15 + Math.sin(t * 12 + 1) * 0.09
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

    if (root.current) {
      root.current.position.y += (rootY - root.current.position.y) * k
      // Grow up: small child -> full-grown man. Feet sit at the root origin so
      // scaling keeps him planted on the ground.
      const targetScale = 0.55 + 0.45 * age
      const s = root.current.scale.x + (targetScale - root.current.scale.x) * k
      root.current.scale.setScalar(s)
    }
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
    if (head.current) {
      damp(head.current.rotation, 'y', headY, k)
      // Children have proportionally bigger heads; shrink toward adult ratio.
      const targetHead = 1.34 - 0.34 * age
      const hs = head.current.scale.x + (targetHead - head.current.scale.x) * k
      head.current.scale.setScalar(hs)
    }
    // Hair grows out with age — short crop as a school kid, long by adulthood.
    if (longHair.current) {
      const grow = 0.12 + 0.88 * age
      longHair.current.scale.y += (grow - longHair.current.scale.y) * k
    }
    if (bp.current) bp.current.visible = !!poseRef?.current?.backpack

    // ---- Wardrobe: recolour + toggle trim per life phase ----
    const o = OUTFITS[outfit] || OUTFITS.casual
    if (torsoMat.current) torsoMat.current.color.set(o.top)
    if (lSleeveMat.current) lSleeveMat.current.color.set(o.top)
    if (rSleeveMat.current) rSleeveMat.current.color.set(o.top)
    if (lPantMat.current) lPantMat.current.color.set(o.legs)
    if (rPantMat.current) rPantMat.current.color.set(o.legs)
    if (casual.current) casual.current.visible = o.detail === 'casual'
    if (suitG.current) suitG.current.visible = o.detail === 'suit'
    if (schoolG.current) schoolG.current.visible = o.detail === 'school'
    if (goalieG.current) goalieG.current.visible = o.detail === 'goalie'

    const bare = !!o.bare
    if (shortsG.current) shortsG.current.visible = bare
    if (lSockG.current) lSockG.current.visible = bare
    if (rSockG.current) rSockG.current.visible = bare
    if (bare) {
      if (shortsMat.current) shortsMat.current.color.set(o.shorts)
      if (lSockMat.current) lSockMat.current.color.set(o.sock)
      if (rSockMat.current) rSockMat.current.color.set(o.sock)
    }

    const gl = !!o.gloves
    if (lGloveG.current) lGloveG.current.visible = gl
    if (rGloveG.current) rGloveG.current.visible = gl
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

          {/* School uniform trim (white collar + little tie) */}
          <group ref={schoolG} visible={false}>
            <mesh position={[0, 0.5, 0.145]}>
              <boxGeometry args={[0.24, 0.1, 0.02]} />
              <meshStandardMaterial color={WHITE} flatShading />
            </mesh>
            <mesh position={[0, 0.34, 0.15]}>
              <boxGeometry args={[0.05, 0.3, 0.02]} />
              <meshStandardMaterial color="#8a2f3a" flatShading />
            </mesh>
          </group>

          {/* Goalkeeper jersey trim (v-neck + side panels + a #1) */}
          <group ref={goalieG} visible={false}>
            <mesh position={[0, 0.5, 0.145]}>
              <boxGeometry args={[0.2, 0.08, 0.02]} />
              <meshStandardMaterial color={WHITE} flatShading />
            </mesh>
            <mesh position={[-0.2, 0.26, 0.145]}>
              <boxGeometry args={[0.07, 0.5, 0.01]} />
              <meshStandardMaterial color="#149a52" flatShading />
            </mesh>
            <mesh position={[0.2, 0.26, 0.145]}>
              <boxGeometry args={[0.07, 0.5, 0.01]} />
              <meshStandardMaterial color="#149a52" flatShading />
            </mesh>
            <mesh position={[0, 0.28, 0.151]}>
              <boxGeometry args={[0.035, 0.18, 0.01]} />
              <meshStandardMaterial color={WHITE} flatShading />
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

            {/* Short crop hair (always present) */}
            <mesh position={[0, 0.04, -0.03]} castShadow>
              <sphereGeometry args={[0.195, 20, 20]} />
              <meshStandardMaterial color={HAIR} flatShading roughness={1} />
            </mesh>
            <mesh position={[0, 0.13, -0.05]} castShadow>
              <sphereGeometry args={[0.16, 16, 16]} />
              <meshStandardMaterial color={HAIR} flatShading roughness={1} />
            </mesh>
            <mesh position={[0, 0.12, 0.12]} rotation={[0.45, 0, 0]}>
              <boxGeometry args={[0.3, 0.13, 0.12]} />
              <meshStandardMaterial color={HAIR} flatShading roughness={1} />
            </mesh>

            {/* Long hair — grows out with age (pivots down from the crown) */}
            <group ref={longHair} position={[0, 0.1, 0]}>
              <mesh position={[0, -0.3, -0.12]} castShadow>
                <boxGeometry args={[0.38, 0.56, 0.15]} />
                <meshStandardMaterial color={HAIR} flatShading roughness={1} />
              </mesh>
              <mesh position={[-0.15, -0.2, 0.03]} rotation={[0, 0, 0.12]} castShadow>
                <boxGeometry args={[0.12, 0.46, 0.24]} />
                <meshStandardMaterial color={HAIR} flatShading roughness={1} />
              </mesh>
              <mesh position={[0.15, -0.2, 0.03]} rotation={[0, 0, -0.12]} castShadow>
                <boxGeometry args={[0.12, 0.46, 0.24]} />
                <meshStandardMaterial color={HAIR} flatShading roughness={1} />
              </mesh>
            </group>

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
            {/* Goalkeeper glove */}
            <group ref={lGloveG} visible={false}>
              <mesh position={[0, -0.52, 0.01]} castShadow>
                <boxGeometry args={[0.14, 0.17, 0.12]} />
                <meshStandardMaterial color={WHITE} flatShading roughness={0.7} />
              </mesh>
              <mesh position={[0, -0.42, 0.01]}>
                <boxGeometry args={[0.15, 0.05, 0.13]} />
                <meshStandardMaterial color="#ff8a3c" flatShading />
              </mesh>
            </group>
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
            {/* Goalkeeper glove */}
            <group ref={rGloveG} visible={false}>
              <mesh position={[0, -0.52, 0.01]} castShadow>
                <boxGeometry args={[0.14, 0.17, 0.12]} />
                <meshStandardMaterial color={WHITE} flatShading roughness={0.7} />
              </mesh>
              <mesh position={[0, -0.42, 0.01]}>
                <boxGeometry args={[0.15, 0.05, 0.13]} />
                <meshStandardMaterial color="#ff8a3c" flatShading />
              </mesh>
            </group>
          </group>
        </group>

        {/* ---- Shorts (school / goalie) — stay at the hips, don't bend/pickup ---- */}
        <group ref={shortsG} visible={false}>
          <mesh position={[0, -0.13, 0]} castShadow>
            <boxGeometry args={[0.46, 0.32, 0.31]} />
            <meshStandardMaterial ref={shortsMat} color="#2b3350" flatShading roughness={0.9} />
          </mesh>
        </group>

        {/* ---- Legs ---- */}
        <group ref={lLeg} position={[-0.13, 0, 0]}>
          <mesh position={[0, -0.45, 0]} castShadow>
            <capsuleGeometry args={[0.09, 0.66, 4, 10]} />
            <meshStandardMaterial ref={lPantMat} color={PANTS} flatShading roughness={0.9} />
          </mesh>
          {/* Sock (shorts kits) */}
          <group ref={lSockG} visible={false}>
            <mesh position={[0, -0.66, 0]} castShadow>
              <cylinderGeometry args={[0.098, 0.098, 0.3, 10]} />
              <meshStandardMaterial ref={lSockMat} color={WHITE} flatShading roughness={0.9} />
            </mesh>
          </group>
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
          {/* Sock (shorts kits) */}
          <group ref={rSockG} visible={false}>
            <mesh position={[0, -0.66, 0]} castShadow>
              <cylinderGeometry args={[0.098, 0.098, 0.3, 10]} />
              <meshStandardMaterial ref={rSockMat} color={WHITE} flatShading roughness={0.9} />
            </mesh>
          </group>
          <mesh position={[0, -0.86, 0.06]} castShadow>
            <boxGeometry args={[0.14, 0.1, 0.26]} />
            <meshStandardMaterial color={SHOE} flatShading />
          </mesh>
        </group>
      </group>
    </group>
  )
}
