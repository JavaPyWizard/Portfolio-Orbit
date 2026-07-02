'use client'

import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ScrollData {
  progress: number
}

export function OrbitalRings() {
  const groupRef = useRef<THREE.Group>(null)
  const progressRef = useRef(0)

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const { progress } = (e as CustomEvent<ScrollData>).detail
      progressRef.current = progress
    }
    window.addEventListener('orbit-scroll', handleScroll)
    return () => window.removeEventListener('orbit-scroll', handleScroll)
  }, [])

  const ringConfigs = [
    { radius: 3, color: '#3B82F6', speed: 0.3, tilt: 0.3 },
    { radius: 4.5, color: '#8B5CF6', speed: -0.2, tilt: -0.5 },
    { radius: 6, color: '#06B6D4', speed: 0.15, tilt: 0.7 },
    { radius: 8, color: '#3B82F6', speed: -0.1, tilt: -0.2 },
  ]

  useFrame((state) => {
    if (!groupRef.current) return

    const progress = progressRef.current
    const time = state.clock.elapsedTime

    groupRef.current.children.forEach((ring, i) => {
      const config = ringConfigs[i]
      const scale = 0.5 + progress * 2
      ring.scale.setScalar(scale)
      ring.rotation.x = config.tilt + progress * Math.PI
      ring.rotation.y += config.speed * 0.01
      ring.rotation.z += Math.sin(time * 0.3 + i) * 0.002

      // Fade rings as we scroll
      const material = (ring as THREE.Mesh).material as THREE.MeshBasicMaterial
      material.opacity = Math.max(0.04, 0.15 - progress * 0.12)
    })

    groupRef.current.position.y = -progress * 20
    groupRef.current.position.z = -progress * 10
  })

  return (
    <group ref={groupRef}>
      {ringConfigs.map((config, i) => (
        <mesh key={i}>
          <torusGeometry args={[config.radius, 0.015, 16, 200]} />
          <meshBasicMaterial
            color={config.color}
            transparent
            opacity={0.15}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  )
}