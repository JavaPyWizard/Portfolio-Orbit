'use client'

import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

interface ScrollData {
  progress: number
}

export function CameraController() {
  const { camera } = useThree()
  const progressRef = useRef(0)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleScroll = (e: Event) => {
      progressRef.current = (e as CustomEvent<ScrollData>).detail.progress
    }
    window.addEventListener('orbit-scroll', handleScroll)
    return () => window.removeEventListener('orbit-scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame((state) => {
    const progress = progressRef.current
    const time = state.clock.elapsedTime


    const orbitRadius = 8 + progress * 15
    const angle = time * 0.08 + progress * Math.PI * 0.5

    const targetX = Math.cos(angle) * orbitRadius * 0.5 + mouseRef.current.x * 2
    const targetY = 1.5 + progress * 10 + Math.sin(time * 0.2) * 1.5 + mouseRef.current.y * 1.5
    const targetZ = 8 + progress * 25 + Math.sin(angle) * orbitRadius * 0.3

    camera.position.lerp(
      new THREE.Vector3(targetX, targetY, targetZ),
      0.025
    )


    const lookTarget = new THREE.Vector3(
      Math.sin(time * 0.1) * 5,
      progress * 10,
      -5 - progress * 20
    )
    camera.lookAt(lookTarget)
  })

  return null
}