// Distinct low-poly buildings — different silhouettes and sizes per place.

function Windows({ w, h, rows, cols, color = '#b266d2' }) {
  const items = []
  const mX = w * 0.18
  const mY = h * 0.18
  const uw = w - 2 * mX
  const uh = h - 2 * mY
  const sw = Math.min(0.32, (uw / cols) * 0.55)
  const sh = Math.min(0.36, (uh / rows) * 0.55)
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = cols === 1 ? 0 : -uw / 2 + (c / (cols - 1)) * uw
      const y = rows === 1 ? 0 : -uh / 2 + (r / (rows - 1)) * uh
      items.push(
        <mesh key={`${r}-${c}`} position={[x, y, 0]}>
          <boxGeometry args={[sw, sh, 0.05]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} />
        </mesh>
      )
    }
  }
  return <group>{items}</group>
}

// Wide schoolhouse with a pyramid roof + flag.
export function Schoolhouse(props) {
  return (
    <group {...props}>
      <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.4, 1.8, 1.6]} />
        <meshStandardMaterial color="#4a3f7a" flatShading roughness={0.9} />
      </mesh>
      <mesh position={[0, 2.15, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <coneGeometry args={[2.6, 0.95, 4]} />
        <meshStandardMaterial color="#8a4a5a" flatShading />
      </mesh>
      <mesh position={[0, 0.45, 0.81]}>
        <boxGeometry args={[0.5, 0.9, 0.05]} />
        <meshStandardMaterial color="#241f3a" flatShading />
      </mesh>
      <group position={[0, 1.1, 0.82]}>
        <Windows w={3.4} h={1.4} rows={1} cols={4} />
      </group>
      <mesh position={[1.5, 3.0, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 1.5, 6]} />
        <meshStandardMaterial color="#cccccc" />
      </mesh>
      <mesh position={[1.72, 3.5, 0]}>
        <boxGeometry args={[0.42, 0.26, 0.02]} />
        <meshStandardMaterial color="#b266d2" flatShading />
      </mesh>
    </group>
  )
}

// Classical college with columns + pediment.
export function College(props) {
  return (
    <group {...props}>
      <mesh position={[0, 1, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 2, 1.8]} />
        <meshStandardMaterial color="#6b6396" flatShading />
      </mesh>
      <mesh position={[0, 2.15, 0]} castShadow>
        <boxGeometry args={[3.3, 0.24, 2.05]} />
        <meshStandardMaterial color="#57507d" flatShading />
      </mesh>
      {[-1.15, -0.57, 0, 0.57, 1.15].map((x, i) => (
        <mesh key={i} position={[x, 0.95, 0.98]} castShadow>
          <cylinderGeometry args={[0.12, 0.12, 1.9, 10]} />
          <meshStandardMaterial color="#d8d2ea" flatShading />
        </mesh>
      ))}
      <mesh position={[0, 0.1, 1.35]}>
        <boxGeometry args={[3.3, 0.2, 0.6]} />
        <meshStandardMaterial color="#4b4570" flatShading />
      </mesh>
      <group position={[0, 1.25, 0.92]}>
        <Windows w={3} h={1.4} rows={1} cols={3} />
      </group>
    </group>
  )
}

// Cozy house for the "learning to code at home" phase.
export function House(props) {
  return (
    <group {...props}>
      <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 1.2, 1.6]} />
        <meshStandardMaterial color="#3f3a63" flatShading />
      </mesh>
      <mesh position={[0, 1.5, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <coneGeometry args={[1.55, 0.8, 4]} />
        <meshStandardMaterial color="#5a4a7a" flatShading />
      </mesh>
      <mesh position={[0, 0.4, 0.81]}>
        <boxGeometry args={[0.4, 0.8, 0.05]} />
        <meshStandardMaterial color="#241f3a" flatShading />
      </mesh>
      <group position={[0, 0.75, 0.82]}>
        <Windows w={2} h={1} rows={1} cols={2} color="#e0b0ff" />
      </group>
    </group>
  )
}

// Parametric office tower — vary height/width/colour per company.
export function Office({
  w = 1.6,
  h = 3,
  color = '#2b2354',
  accent = '#b266d2',
  rows = 5,
  cols = 3,
  ...props
}) {
  return (
    <group {...props}>
      <mesh position={[0, h / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[w, h, w]} />
        <meshStandardMaterial color={color} flatShading />
      </mesh>
      <mesh position={[0, h + 0.12, 0]} castShadow>
        <boxGeometry args={[w * 1.12, 0.24, w * 1.12]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.4} flatShading />
      </mesh>
      <group position={[0, h / 2, w / 2 + 0.03]}>
        <Windows w={w} h={h} rows={rows} cols={cols} color={accent} />
      </group>
    </group>
  )
}
