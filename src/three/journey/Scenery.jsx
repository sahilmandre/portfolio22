import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { STATIONS } from './journeyPath'

const X = Object.fromEntries(STATIONS.map((s) => [s.id, s.x]))

// Low-poly roadside tree (trunk + two foliage cones), twilight-toned so it sits
// in the moody palette but still catches warm daylight.
function Tree({ position, scale = 1, tint = '#4b5a72' }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.14, 1, 6]} />
        <meshStandardMaterial color="#3a2f2a" flatShading roughness={1} />
      </mesh>
      <mesh position={[0, 1.35, 0]} castShadow>
        <coneGeometry args={[0.7, 1.2, 7]} />
        <meshStandardMaterial color={tint} flatShading roughness={1} />
      </mesh>
      <mesh position={[0, 2.05, 0]} castShadow>
        <coneGeometry args={[0.5, 0.9, 7]} />
        <meshStandardMaterial color={tint} flatShading roughness={1} />
      </mesh>
    </group>
  )
}

// A single grass tuft — three little blades.
function Tuft({ position, color }) {
  return (
    <group position={position}>
      {[-0.05, 0, 0.06].map((dx, i) => (
        <mesh key={i} position={[dx, 0.11, 0]} rotation={[0, 0, dx * 2]}>
          <coneGeometry args={[0.03, 0.22, 4]} />
          <meshStandardMaterial color={color} flatShading roughness={1} />
        </mesh>
      ))}
    </group>
  )
}

export default function Scenery({ envRef }) {
  const groundMat = useRef()
  const pathMat = useRef()
  const fieldMat = useRef()
  const lampMats = useRef([])
  const lampLights = useRef([])
  lampMats.current = []
  lampLights.current = []

  // Colours we blend between by time of day (day tone -> night tone).
  const c = useMemo(
    () => ({
      groundDay: new THREE.Color('#37324f'),
      groundNight: new THREE.Color('#201d30'),
      pathDay: new THREE.Color('#433d61'),
      pathNight: new THREE.Color('#2b2740'),
      fieldDay: new THREE.Color('#3f5a46'),
      fieldNight: new THREE.Color('#25322a'),
      g: new THREE.Color(),
      p: new THREE.Color(),
      f: new THREE.Color(),
    }),
    []
  )

  useFrame(() => {
    const night = envRef?.current?.night ?? 0
    if (groundMat.current) groundMat.current.color.copy(c.g.lerpColors(c.groundDay, c.groundNight, night))
    if (pathMat.current) pathMat.current.color.copy(c.p.lerpColors(c.pathDay, c.pathNight, night))
    if (fieldMat.current) fieldMat.current.color.copy(c.f.lerpColors(c.fieldDay, c.fieldNight, night))
    // Street lamps warm up as the sun sets.
    const glow = night * night
    for (const m of lampMats.current) if (m) m.emissiveIntensity = 0.08 + glow * 2.2
    for (const l of lampLights.current) if (l) l.intensity = glow * 7
  })

  // Lamp x-positions between the stations; a subset also cast a real warm light.
  const lamps = [-15, -9, -3, 3, 9, 15]
  const realLight = new Set([-9, 3, 15])

  // Foliage strung along the back of the path with varied size.
  const trees = [-20, -16.5, -13.5, -9.5, -4.5, -1.5, 2.5, 7.5, 10.5, 14.5, 17.5, 20]

  const fieldColor = '#3f5a46'

  return (
    <group>
      {/* Ground + walking path (day/night tinted) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[150, 60]} />
        <meshStandardMaterial ref={groundMat} color="#37324f" roughness={1} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0.6]} receiveShadow>
        <planeGeometry args={[150, 2.4]} />
        <meshStandardMaterial ref={pathMat} color="#433d61" roughness={1} />
      </mesh>

      {/* Football pitch */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[X.football, 0.02, -1.2]} receiveShadow>
        <planeGeometry args={[9, 6]} />
        <meshStandardMaterial ref={fieldMat} color={fieldColor} roughness={1} />
      </mesh>
      {[-3, -1.5, 0, 1.5, 3, -2.4, 2.4].map((dx, i) => (
        <Tuft key={i} position={[X.football + dx, 0, -0.4 + (i % 2) * 1.4]} color={fieldColor} />
      ))}

      {/* Trees */}
      {trees.map((x, i) => (
        <Tree
          key={i}
          position={[x, 0, -5 - (i % 3) * 0.7]}
          scale={0.85 + ((i * 7) % 5) * 0.12}
          tint={i % 3 === 0 ? '#4b5a72' : '#445a5c'}
        />
      ))}

      {/* Street lamps that switch on at dusk */}
      {lamps.map((x, i) => (
        <group key={i} position={[x, 0, 2.1]}>
          <mesh position={[0, 1.3, 0]} castShadow>
            <cylinderGeometry args={[0.05, 0.07, 2.6, 6]} />
            <meshStandardMaterial color="#2a2740" flatShading roughness={0.9} />
          </mesh>
          <mesh position={[0.18, 2.55, 0]}>
            <boxGeometry args={[0.4, 0.08, 0.12]} />
            <meshStandardMaterial color="#2a2740" flatShading />
          </mesh>
          <mesh position={[0.34, 2.45, 0]}>
            <sphereGeometry args={[0.12, 12, 12]} />
            <meshStandardMaterial
              ref={(m) => m && lampMats.current.push(m)}
              color="#ffd9a0"
              emissive="#ffcf8a"
              emissiveIntensity={0.1}
              toneMapped={false}
            />
          </mesh>
          {realLight.has(x) && (
            <pointLight
              ref={(l) => l && lampLights.current.push(l)}
              position={[0.34, 2.4, 0]}
              intensity={0}
              distance={8}
              decay={2}
              color="#ffce8a"
            />
          )}
        </group>
      ))}
    </group>
  )
}
