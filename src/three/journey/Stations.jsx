import { Html } from '@react-three/drei'
import { STATIONS } from './journeyPath'
import { Laptop, Football, GradCap } from '../models'
import { Schoolhouse, College, House, Office } from './Buildings'

function Goal({ position }) {
  const bar = '#e8e6f0'
  return (
    <group position={position}>
      <mesh position={[-1.5, 1, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 2, 8]} />
        <meshStandardMaterial color={bar} />
      </mesh>
      <mesh position={[1.5, 1, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 2, 8]} />
        <meshStandardMaterial color={bar} />
      </mesh>
      <mesh position={[0, 2, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 3.1, 8]} />
        <meshStandardMaterial color={bar} />
      </mesh>
      <mesh position={[0, 1, -0.55]}>
        <planeGeometry args={[3, 2]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.08} side={2} />
      </mesh>
    </group>
  )
}

function Desk({ position }) {
  const legs = [
    [-0.72, -0.32],
    [0.72, -0.32],
    [-0.72, 0.32],
    [0.72, 0.32],
  ]
  return (
    <group position={position}>
      <mesh position={[0, 1.0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 0.08, 0.8]} />
        <meshStandardMaterial color="#3a3358" flatShading />
      </mesh>
      {legs.map(([x, z], i) => (
        <mesh key={i} position={[x, 0.5, z]} castShadow>
          <boxGeometry args={[0.08, 1.0, 0.08]} />
          <meshStandardMaterial color="#2b2544" flatShading />
        </mesh>
      ))}
    </group>
  )
}

// A desk + laptop placed in front of the boy at a working station.
function Workstation({ x }) {
  return (
    <group>
      <Desk position={[x, 0, 0.95]} />
      <Laptop position={[x, 1.06, 0.95]} scale={0.5} />
    </group>
  )
}

function Label({ x, label, sub }) {
  return (
    <Html position={[x, 3.1, -1]} center distanceFactor={12} pointerEvents="none">
      <div
        style={{
          whiteSpace: 'nowrap',
          textAlign: 'center',
          font: '700 15px Bricolage Grotesque, sans-serif',
          color: '#fff',
          textShadow: '0 2px 12px rgba(0,0,0,0.6)',
        }}
      >
        <div>{label}</div>
        <div style={{ font: '500 11px Manrope, sans-serif', color: '#cbb8ee' }}>{sub}</div>
      </div>
    </Html>
  )
}

const X = Object.fromEntries(STATIONS.map((s) => [s.id, s.x]))

export default function Stations() {
  return (
    <group>
      {STATIONS.map((s) => (
        <Label key={s.id} x={s.x} label={s.label} sub={s.sub} />
      ))}

      {/* School */}
      <Schoolhouse position={[X.school, 0, -3]} rotation={[0, 0.3, 0]} />

      {/* Football */}
      <Goal position={[X.football, 0, -3]} />
      <Football position={[X.football, 0.4, 1.4]} scale={0.9} />

      {/* College */}
      <College position={[X.college, 0, -3]} rotation={[0, -0.25, 0]} />
      <GradCap position={[X.college, 2.7, -1]} scale={1.1} rotation={[0.2, 0, 0]} />

      {/* Learning to code — at home */}
      <House position={[X.coding, 0, -3]} />
      <Workstation x={X.coding} />

      {/* V2 Solutions — small modern office (teal accent) */}
      <Office position={[X.v2, 0, -3]} w={1.5} h={2.4} color="#33456f" accent="#5fd0b0" rows={4} cols={3} />
      <Workstation x={X.v2} />

      {/* TCS — taller blue tower */}
      <Office position={[X.tcs, 0, -3]} w={1.8} h={3.8} color="#2f3f7a" accent="#7fa6df" rows={6} cols={3} />
      <Workstation x={X.tcs} />

      {/* Accenture — tallest, signature purple */}
      <Office position={[X.accenture, 0, -3]} w={2} h={5.2} color="#2b2354" accent="#b266d2" rows={8} cols={4} />
      <Workstation x={X.accenture} />
    </group>
  )
}
