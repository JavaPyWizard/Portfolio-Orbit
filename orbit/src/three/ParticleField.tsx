'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ParticleFieldProps {
  count?: number
}

export function ParticleField({ count = 500 }: ParticleFieldProps) {
  const meshRef = useRef<THREE.Points>(null)

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40

      velocities[i * 3] = (Math.random() - 0.5) * 0.01
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3))

    return geometry
  }, [count])

  useFrame((state) => {
    if (!meshRef.current) return

    const positions = meshRef.current.geometry.attributes.position
    const velocities = meshRef.current.geometry.attributes.velocity

    for (let i = 0; i < count; i++) {

      positions.array[i * 3] += velocities.array[i * 3]
      positions.array[i * 3 + 1] += velocities.array[i * 3 + 1]
      positions.array[i * 3 + 2] += velocities.array[i * 3 + 2]


      if (Math.abs(positions.array[i * 3]) > 30) positions.array[i * 3] *= -1
      if (Math.abs(positions.array[i * 3 + 1]) > 20) positions.array[i * 3 + 1] *= -1
      if (Math.abs(positions.array[i * 3 + 2]) > 20) positions.array[i * 3 + 2] *= -1
    }

    positions.needsUpdate = true
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.002
  })

  return (
    <points ref={meshRef} geometry={particles}>
      <pointsMaterial
        size={0.03}
        color="#3B82F6"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}