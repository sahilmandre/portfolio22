import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// Time-of-day engine. As scroll progresses 0 -> 1 the whole scene travels from a
// warm childhood MORNING, through bright midday and golden hour, into a present-day
// NIGHT. Everything (sky, fog, sun colour + elevation, hemisphere bounce, ambient)
// is interpolated between the stops below, and a sun/moon disc + stars sell it.
const STOPS = [
  // p     bg         fog        sun        sunI  disc       hemiSky    hemiGround hemiI ambI  elev night
  { p: 0.0, bg: '#aeb8e6', fog: '#c9c6ea', sun: '#ffd9a0', sunI: 2.6, disc: '#ffe6b8', hemiSky: '#dfe4ff', hemiGround: '#b3a17a', hemiI: 1.0, ambI: 0.78, elev: 0.28, night: 0.0 },
  { p: 0.22, bg: '#b9c6ee', fog: '#cdd6f2', sun: '#fff3dc', sunI: 3.4, disc: '#fff6e6', hemiSky: '#eaf0ff', hemiGround: '#9f8f7a', hemiI: 1.1, ambI: 0.86, elev: 0.95, night: 0.0 },
  { p: 0.5, bg: '#b0a9d6', fog: '#c3b6d8', sun: '#ffe6b0', sunI: 3.0, disc: '#ffe2a6', hemiSky: '#d9d0ee', hemiGround: '#8a7a68', hemiI: 1.0, ambI: 0.8, elev: 0.7, night: 0.06 },
  { p: 0.72, bg: '#c99fb0', fog: '#cf9f8c', sun: '#ff9d5c', sunI: 2.8, disc: '#ff8f52', hemiSky: '#d9a9c0', hemiGround: '#6a5568', hemiI: 0.9, ambI: 0.62, elev: 0.3, night: 0.4 },
  { p: 1.0, bg: '#191527', fog: '#191527', sun: '#9c84ee', sunI: 1.8, disc: '#e6e2ff', hemiSky: '#5a4f8f', hemiGround: '#181228', hemiI: 0.74, ambI: 0.58, elev: 0.5, night: 1.0 },
]

const lerp = (a, b, t) => a + (b - a) * t
const clamp01 = (v) => Math.min(1, Math.max(0, v))

export default function Atmosphere({ smoothRef, envRef }) {
  const { scene, camera } = useThree()
  const sun = useRef()
  const sunTarget = useRef()
  const fill = useRef()
  const hemi = useRef()
  const amb = useRef()
  const disc = useRef()
  const halo = useRef()
  const starsMat = useRef()

  // Precompute THREE.Color per stop so the frame loop only lerps (no allocs).
  const stops = useMemo(
    () =>
      STOPS.map((s) => ({
        ...s,
        cBg: new THREE.Color(s.bg),
        cFog: new THREE.Color(s.fog),
        cSun: new THREE.Color(s.sun),
        cDisc: new THREE.Color(s.disc),
        cSky: new THREE.Color(s.hemiSky),
        cGround: new THREE.Color(s.hemiGround),
      })),
    []
  )

  const scr = useRef({
    bg: new THREE.Color(),
    fog: new THREE.Color(),
    sun: new THREE.Color(),
    disc: new THREE.Color(),
    sky: new THREE.Color(),
    ground: new THREE.Color(),
  }).current

  const starGeo = useMemo(() => {
    const N = 260
    const arr = new Float32Array(N * 3)
    for (let i = 0; i < N; i++) {
      arr[i * 3] = (Math.random() * 2 - 1) * 70
      arr[i * 3 + 1] = 4 + Math.random() * 20
      arr[i * 3 + 2] = -14 - Math.random() * 22
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(arr, 3))
    return g
  }, [])

  useFrame(() => {
    const p = clamp01(smoothRef?.current ?? 0)

    let i = 0
    while (i < stops.length - 2 && p > stops[i + 1].p) i++
    const A = stops[i]
    const B = stops[i + 1]
    let t = (p - A.p) / (B.p - A.p || 1)
    t = clamp01(t)
    t = t * t * (3 - 2 * t) // smoothstep for eased transitions

    scr.bg.lerpColors(A.cBg, B.cBg, t)
    scr.fog.lerpColors(A.cFog, B.cFog, t)
    scr.sun.lerpColors(A.cSun, B.cSun, t)
    scr.disc.lerpColors(A.cDisc, B.cDisc, t)
    scr.sky.lerpColors(A.cSky, B.cSky, t)
    scr.ground.lerpColors(A.cGround, B.cGround, t)

    const sunI = lerp(A.sunI, B.sunI, t)
    const hemiI = lerp(A.hemiI, B.hemiI, t)
    const ambI = lerp(A.ambI, B.ambI, t)
    const elev = lerp(A.elev, B.elev, t)
    const night = lerp(A.night, B.night, t)

    if (scene.background?.isColor) scene.background.copy(scr.bg)
    if (scene.fog) scene.fog.color.copy(scr.fog)

    const camX = camera.position.x

    if (sun.current) {
      sun.current.color.copy(scr.sun)
      sun.current.intensity = sunI
      sun.current.position.set(camX + 5, 3 + elev * 13, 9)
      if (sunTarget.current) {
        sun.current.target = sunTarget.current
        sunTarget.current.position.set(camX, 0, -2)
      }
    }
    if (hemi.current) {
      hemi.current.color.copy(scr.sky)
      hemi.current.groundColor.copy(scr.ground)
      hemi.current.intensity = hemiI
    }
    if (amb.current) amb.current.intensity = ambI
    // Purple fill glows stronger into the night for a moody rim on the subject.
    if (fill.current) fill.current.intensity = lerp(0.5, 1.6, night)

    // Sun/moon disc arcs across the sky, ahead in the direction of travel.
    if (disc.current) {
      disc.current.position.set(camX + 9, 2 + elev * 11, -24)
      disc.current.material.color.copy(scr.disc)
    }
    if (halo.current) {
      halo.current.position.set(camX + 9, 2 + elev * 11, -24.2)
      halo.current.material.color.copy(scr.disc)
    }
    if (starsMat.current) starsMat.current.opacity = clamp01((night - 0.15) * 1.5)

    if (envRef) envRef.current.night = night
  })

  return (
    <group>
      <hemisphereLight ref={hemi} args={['#cbb8ee', '#241a33', 1.0]} />
      <ambientLight ref={amb} intensity={0.7} />
      <directionalLight
        ref={sun}
        position={[6, 12, 9]}
        intensity={3.2}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={1}
        shadow-camera-far={70}
        shadow-camera-left={-26}
        shadow-camera-right={26}
        shadow-camera-top={16}
        shadow-camera-bottom={-16}
      />
      <object3D ref={sunTarget} />
      <directionalLight ref={fill} position={[-6, 5, 6]} intensity={1.0} color="#b266d2" />

      {/* Sun / moon */}
      <mesh ref={disc}>
        <circleGeometry args={[2.2, 40]} />
        <meshBasicMaterial color="#ffe6b8" fog={false} toneMapped={false} />
      </mesh>
      <mesh ref={halo}>
        <circleGeometry args={[4.4, 40]} />
        <meshBasicMaterial color="#ffe6b8" transparent opacity={0.14} fog={false} toneMapped={false} depthWrite={false} />
      </mesh>

      {/* Stars — fade in for the present-day night */}
      <points geometry={starGeo}>
        <pointsMaterial
          ref={starsMat}
          size={2.2}
          sizeAttenuation={false}
          color="#eae6ff"
          transparent
          opacity={0}
          depthWrite={false}
          fog={false}
        />
      </points>
    </group>
  )
}
