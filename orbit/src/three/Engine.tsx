'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense, useMemo } from 'react'
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing'
import { useOrbitStore } from '@stores/orbitStore'
import { SpaceEnvironment } from './SpaceEnvironment'
import { CinematicParticles } from './CinematicParticles'
import { OrbitalRings } from './OrbitalRings'
import { LightBeams } from './LightBeams'
import { FloatingStructures } from './FloatingStructures'
import { CameraController } from './CameraController'

export default function Engine() {
  const { currentScene, isBootComplete, isPerformanceMode } = useOrbitStore()

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 1.5, 8], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: 3,
        }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <SpaceEnvironment />
          <CinematicParticles />
          <OrbitalRings />
          <LightBeams />
          <FloatingStructures />
          <CameraController />

          {!isPerformanceMode && (
            <EffectComposer multisampling={2}>
              <Bloom
                intensity={0.6}
                luminanceThreshold={0.3}
                luminanceSmoothing={0.8}
                mipmapBlur
              />
              <Vignette eskil={false} offset={0.15} darkness={1.1} />
              <Noise opacity={0.015} />
            </EffectComposer>
          )}
        </Suspense>
      </Canvas>
    </div>
  )
}