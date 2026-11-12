// Simple low-poly backpack — used both on the boy's back and as the fallen bag
// on the ground during the pickup beat.
export default function Backpack(props) {
  return (
    <group {...props}>
      <mesh castShadow>
        <boxGeometry args={[0.34, 0.44, 0.2]} />
        <meshStandardMaterial color="#9b3fc4" flatShading roughness={0.85} />
      </mesh>
      {/* top flap */}
      <mesh position={[0, 0.14, 0.06]} castShadow>
        <boxGeometry args={[0.34, 0.18, 0.12]} />
        <meshStandardMaterial color="#7f2fa8" flatShading />
      </mesh>
      {/* front pocket */}
      <mesh position={[0, -0.08, 0.11]}>
        <boxGeometry args={[0.22, 0.16, 0.05]} />
        <meshStandardMaterial color="#7f2fa8" flatShading />
      </mesh>
    </group>
  )
}
