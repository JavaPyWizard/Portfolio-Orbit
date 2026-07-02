'use client'

import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ScrollData {
  progress: number
}

export function LightBeams() {
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

  useFrame((state) => {
    if (!groupRef.current) return

    const progress = progressRef.current
    const time = state.clock.elapsedTime

    groupRef.current.children.forEach((beam, i) => {
      beam.rotation.y = Math.sin(time * 0.2 + i * 1.5) * 1.5
      beam.rotation.x = Math.cos(time * 0.15 + i) * 0.5

      const material = (beam as THREE.Mesh).material as THREE.MeshBasicMaterial
      material.opacity = 0.05 + progress * 0.3 + Math.sin(time * 0.5 + i) * 0.05
    })

    groupRef.current.position.y = -progress * 15
  })

  return (
    <group ref={groupRef}>
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh key={i} position={[0, -5 + i * 3, -15]}>
          <planeGeometry args={[40, 0.3]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? '#3B82F6' : '#8B5CF6'}
            transparent
            opacity={0.08}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  )
}