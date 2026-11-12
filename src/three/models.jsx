// Low-poly milestone models built from primitives (no external assets — robust,
// tiny, and on-theme). Flat shading gives the faceted low-poly look.

const VIOLET = '#7a63d2'
const MAGENTA = '#b266d2'
const DEEP = '#2b2354'
const DEEPER = '#1c1830'

export function Building(props) {
  return (
    <group {...props}>
      <mesh castShadow>
        <boxGeometry args={[1, 2.1, 1]} />
        <meshStandardMaterial color={DEEP} flatShading roughness={0.7} />
      </mesh>
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[1.15, 0.3, 1.15]} />
        <meshStandardMaterial color={DEEPER} flatShading />
      </mesh>
      {[-0.28, 0.28].map((x) =>
        [-0.55, -0.05, 0.45].map((y) => (
          <mesh key={`${x}-${y}`} position={[x, y, 0.52]}>
            <boxGeometry args={[0.18, 0.22, 0.05]} />
            <meshStandardMaterial
              color={MAGENTA}
              emissive={MAGENTA}
              emissiveIntensity={0.6}
            />
          </mesh>
        ))
      )}
    </group>
  )
}

export function Football(props) {
  return (
    <group {...props}>
      <mesh castShadow>
        <icosahedronGeometry args={[0.85, 1]} />
        <meshStandardMaterial color="#f3f0ff" flatShading roughness={0.45} />
      </mesh>
    </group>
  )
}

export function GradCap(props) {
  return (
    <group {...props}>
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[0.32, 0.42, 0.32, 6]} />
        <meshStandardMaterial color={DEEP} flatShading />
      </mesh>
      <mesh position={[0, 0.06, 0]} rotation={[0, Math.PI / 4, 0]}>
        <boxGeometry args={[1.25, 0.09, 1.25]} />
        <meshStandardMaterial color={DEEPER} flatShading />
      </mesh>
      <mesh position={[0.45, 0.02, 0.45]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color={MAGENTA} emissive={MAGENTA} emissiveIntensity={0.5} />
      </mesh>
    </group>
  )
}

export function Laptop(props) {
  return (
    <group {...props}>
      <mesh position={[0, -0.28, 0.1]} rotation={[-0.08, 0, 0]}>
        <boxGeometry args={[1.5, 0.08, 1]} />
        <meshStandardMaterial color={DEEP} flatShading metalness={0.2} />
      </mesh>
      <mesh position={[0, 0.22, -0.42]} rotation={[0.38, 0, 0]}>
        <boxGeometry args={[1.5, 1, 0.07]} />
        <meshStandardMaterial color={DEEPER} flatShading />
      </mesh>
      <mesh position={[0, 0.24, -0.38]} rotation={[0.38, 0, 0]}>
        <planeGeometry args={[1.3, 0.82]} />
        <meshStandardMaterial
          color={VIOLET}
          emissive={VIOLET}
          emissiveIntensity={0.9}
          toneMapped={false}
        />
      </mesh>
    </group>
  )
}

export function Gem({ color = MAGENTA, ...props }) {
  return (
    <mesh {...props}>
      <octahedronGeometry args={[0.7, 0]} />
      <meshStandardMaterial color={color} flatShading metalness={0.3} roughness={0.25} />
    </mesh>
  )
}

export function Node({ color = VIOLET, ...props }) {
  return (
    <mesh {...props}>
      <icosahedronGeometry args={[0.4, 0]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        flatShading
      />
    </mesh>
  )
}
