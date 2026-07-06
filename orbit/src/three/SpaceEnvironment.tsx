'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function SpaceEnvironment() {
  const starsRef = useRef<THREE.Points>(null)
  const nebulaRef = useRef<THREE.Points>(null)

  const starsGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const count = 1000
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const radius = 30 + Math.random() * 120

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi) - 20

      sizes[i] = Math.random() * 1.5
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    return geo
  }, [])

  const nebulaGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const count = 200
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    const nebulaColors = [
      new THREE.Color('#3B82F6'),
      new THREE.Color('#8B5CF6'),
      new THREE.Color('#06B6D4'),
    ]

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = 10 + Math.random() * 40
      const height = (Math.random() - 0.5) * 25

      positions[i * 3] = Math.cos(angle) * radius
      positions[i * 3 + 1] = height
      positions[i * 3 + 2] = Math.sin(angle) * radius - 25

      const color = nebulaColors[Math.floor(Math.random() * nebulaColors.length)]
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return geo
  }, [])

  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = state.clock.elapsedTime * 0.002
      starsRef.current.rotation.x = state.clock.elapsedTime * 0.001
    }
    if (nebulaRef.current) {
      nebulaRef.current.rotation.y = state.clock.elapsedTime * 0.003
      nebulaRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.03
    }
  })

  return (
    <>
      <ambientLight intensity={0.06} />

      <points ref={starsRef} geometry={starsGeometry}>
        <pointsMaterial
          size={0.1}
          color="#F8FAFC"
          transparent
          opacity={0.6}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      <points ref={nebulaRef} geometry={nebulaGeometry}>
        <pointsMaterial
          size={1.0}
          vertexColors
          transparent
          opacity={0.08}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </>
  )
}