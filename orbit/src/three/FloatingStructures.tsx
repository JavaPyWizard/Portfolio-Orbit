'use client'

import { useRef, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ScrollData {
  progress: number
}

function GeometricShape({ position, color, geometry, delay }: {
  position: [number, number, number]
  color: string
  geometry: THREE.BufferGeometry
  delay: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
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
    if (!meshRef.current) return

    const progress = progressRef.current
    const t = state.clock.elapsedTime + delay

    meshRef.current.position.y = position[1] - progress * 20 + Math.sin(t * 0.5) * 1
    meshRef.current.position.x = position[0] + Math.cos(t * 0.3) * 2
    meshRef.current.position.z = position[2] - progress * 15

    meshRef.current.rotation.x = t * 0.3
    meshRef.current.rotation.y = t * 0.5
    meshRef.current.rotation.z = t * 0.2

    const scale = 1 + Math.sin(t * 0.4) * 0.3
    meshRef.current.scale.setScalar(scale * (0.6 + progress * 0.8))


    const material = meshRef.current.material as THREE.MeshBasicMaterial
    material.opacity = Math.max(0.05, 0.12 - progress * 0.08)
  })

  return (
    <mesh ref={meshRef} position={position} geometry={geometry}>
      <meshBasicMaterial
        color={color}
        wireframe
        transparent
        opacity={0.12}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  )
}

export function FloatingStructures() {
  const geometries = useMemo(() => ({
    icosahedron: new THREE.IcosahedronGeometry(0.8, 0),
    octahedron: new THREE.OctahedronGeometry(0.6, 0),
    torusKnot: new THREE.TorusKnotGeometry(0.5, 0.15, 64, 8),
    dodecahedron: new THREE.DodecahedronGeometry(0.7, 0),
    tetrahedron: new THREE.TetrahedronGeometry(0.7, 0),
  }), [])

  const shapes = [
    { position: [-6, 3, -10] as [number, number, number], color: '#3B82F6', geometry: geometries.icosahedron, delay: 0 },
    { position: [5, -2, -15] as [number, number, number], color: '#8B5CF6', geometry: geometries.octahedron, delay: 1.5 },
    { position: [-3, 8, -20] as [number, number, number], color: '#06B6D4', geometry: geometries.torusKnot, delay: 3 },
    { position: [7, 5, -25] as [number, number, number], color: '#3B82F6', geometry: geometries.dodecahedron, delay: 4.5 },
    { position: [-5, -4, -30] as [number, number, number], color: '#8B5CF6', geometry: geometries.tetrahedron, delay: 2 },
    { position: [2, 10, -35] as [number, number, number], color: '#06B6D4', geometry: geometries.icosahedron, delay: 6 },
    { position: [-7, -6, -40] as [number, number, number], color: '#3B82F6', geometry: geometries.octahedron, delay: 5 },
    { position: [8, 12, -45] as [number, number, number], color: '#8B5CF6', geometry: geometries.torusKnot, delay: 7 },
  ]

  return (
    <group>
      {shapes.map((shape, i) => (
        <GeometricShape key={i} {...shape} />
      ))}
    </group>
  )
}