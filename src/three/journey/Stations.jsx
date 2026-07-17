import { Html } from '@react-three/drei'
import { STATIONS } from './journeyPath'
import { Building, Laptop, Football, GradCap } from '../models'

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

function Label({ x, label, sub }) {
  return (
    <Html position={[x, 2.8, -1]} center distanceFactor={12} pointerEvents="none">
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
        <div style={{ font: '500 11px Manrope, sans-serif', color: '#cbb8ee' }}>
          {sub}
        </div>
      </div>
    </Html>
  )
}

export default function Stations() {
  return (
    <group>
      {STATIONS.map((s) => (
        <Label key={s.id} x={s.x} label={s.label} sub={s.sub} />
      ))}

      {/* School */}
      <Building position={[-12, 1.05, -2.6]} scale={1.4} rotation={[0, 0.4, 0]} />

      {/* Football: goal behind boy + ball in front */}
      <Goal position={[-6, 0, -3]} />
      <Football position={[-6, 0.4, 1.4]} scale={0.9} />

      {/* College */}
      <Building position={[0, 1.05, -2.6]} scale={1.25} rotation={[0, -0.35, 0]} />
      <GradCap position={[0, 2.65, -1]} scale={1.1} rotation={[0.2, 0, 0]} />

      {/* Coding desk (in front of the boy) */}
      <Desk position={[6, 0, 0.95]} />
      <Laptop position={[6, 1.06, 0.95]} scale={0.5} />

      {/* Work: taller office */}
      <Building position={[12, 1.9, -2.6]} scale={[1.5, 2.6, 1.5]} />
    </group>
  )
}
