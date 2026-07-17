import { useGLTF, Html } from '@react-three/drei'

// Loads a Ready Player Me (or any) rigged GLB. Kept in its own component so the
// useGLTF hook is only ever called when a URL exists.
function AvatarModel({ url, ...props }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} {...props} />
}

// Placeholder shown until a real avatar URL is provided — sized like a ~1.8m
// person so we can calibrate camera and ground scale.
function Placeholder(props) {
  return (
    <group {...props}>
      <mesh position={[0, 0.95, 0]} castShadow>
        <capsuleGeometry args={[0.32, 1.05, 6, 16]} />
        <meshStandardMaterial color="#7a63d2" roughness={0.6} />
      </mesh>
      <mesh position={[0, 1.72, 0]} castShadow>
        <sphereGeometry args={[0.26, 24, 24]} />
        <meshStandardMaterial color="#b266d2" roughness={0.5} />
      </mesh>
      <Html center position={[0, 2.3, 0]} distanceFactor={8}>
        <div
          style={{
            whiteSpace: 'nowrap',
            font: '600 13px Manrope, sans-serif',
            color: '#fff',
            background: 'rgba(43,35,84,0.9)',
            border: '1px solid rgba(178,102,210,0.5)',
            padding: '6px 10px',
            borderRadius: 8,
          }}
        >
          Add your Ready Player Me URL in avatarConfig.js
        </div>
      </Html>
    </group>
  )
}

export default function Character({ url, ...props }) {
  if (!url) return <Placeholder {...props} />
  return <AvatarModel url={url} {...props} />
}
