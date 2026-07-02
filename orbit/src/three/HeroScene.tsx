'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Text3D, Ring, Sphere } from '@react-three/drei'
import * as THREE from 'three'

export function HeroScene() {
  const ringRef = useRef<THREE.Mesh>(null)
  const orbRef = useRef<THREE.Mesh>(null)

  // Central energy orb
  const orbMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uColor1: { value: new THREE.Color('#3B82F6') },
          uColor2: { value: new THREE.Color('#8B5CF6') },
        },
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vPosition;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          varying vec3 vPosition;
          uniform float uTime;
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          void main() {
            float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 3.0);
            vec3 color = mix(uColor1, uColor2, sin(uTime * 0.5) * 0.5 + 0.5);
            float alpha = fresnel * 0.8 + 0.2;
            gl_FragColor = vec4(color, alpha);
          }
        `,
        transparent: true,
      }),
    []
  )

  useFrame((state) => {
    if (orbRef.current) {
      const material = orbRef.current.material as THREE.ShaderMaterial
      material.uniforms.uTime.value = state.clock.elapsedTime
    }

    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.3
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.3
    }
  })

  return (
    <group position={[0, 0, -3]}>
      {/* Central energy orb */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere ref={orbRef} args={[1.2, 64, 64]}>
          <primitive object={orbMaterial} attach="material" />
        </Sphere>
      </Float>

      {/* Orbiting rings */}
      <Ring
        ref={ringRef}
        args={[1.8, 2, 128]}
        rotation={[Math.PI / 3, 0, 0]}
      >
        <meshBasicMaterial
          color="#3B82F6"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </Ring>

      <Ring args={[2.2, 2.4, 128]} rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
        <meshBasicMaterial
          color="#8B5CF6"
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
        />
      </Ring>

      {/* Orbiting particles */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const x = Math.cos(angle) * 2.8
        const z = Math.sin(angle) * 2.8

        return (
          <Float key={i} speed={1 + i * 0.3} rotationIntensity={0} floatIntensity={0.5}>
            <Sphere position={[x, 0, z]} args={[0.08, 16, 16]}>
              <meshBasicMaterial color="#06B6D4" transparent opacity={0.8} />
            </Sphere>
          </Float>
        )
      })}
    </group>
  )
}