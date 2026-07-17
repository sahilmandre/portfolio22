import { useGLTF } from '@react-three/drei'
import BoyCharacter from './BoyCharacter'

// Loads a Ready Player Me (or any) rigged GLB. Kept in its own component so the
// useGLTF hook is only ever called when a URL exists.
function AvatarModel({ url, ...props }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} {...props} />
}

// If a Ready Player Me URL is provided we use that; otherwise we render the
// custom hand-built low-poly boy (long hair, glasses) — no external assets.
export default function Character({ url, walking, speed, ...props }) {
  if (url) return <AvatarModel url={url} {...props} />
  return <BoyCharacter walking={walking} speed={speed} {...props} />
}
