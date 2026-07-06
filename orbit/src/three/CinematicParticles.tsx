"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ScrollData {
  scroll: number;
  limit: number;
  progress: number;
}

export function CinematicParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const progressRef = useRef(0);
  const speedsRef = useRef<Float32Array>(new Float32Array());
  const count = 800;

  const geometry = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const spd = new Float32Array(count);

    const color1 = new THREE.Color("#3B82F6");
    const color2 = new THREE.Color("#8B5CF6");
    const color3 = new THREE.Color("#06B6D4");

    for (let i = 0; i < count; i++) {
      const t = i / count;
      const angle = t * Math.PI * 20;
      const radius = 5 + Math.sin(t * Math.PI * 3) * 3;
      const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 8;
      const y = (t - 0.5) * 30 + (Math.random() - 0.5) * 5;
      const z = Math.sin(angle) * radius + (Math.random() - 0.5) * 8 - 10;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      const mixColor = color1.clone();
      if (t > 0.5) mixColor.lerp(color3, (t - 0.5) * 2);
      else mixColor.lerp(color2, t * 2);

      col[i * 3] = mixColor.r;
      col[i * 3 + 1] = mixColor.g;
      col[i * 3 + 2] = mixColor.b;

      spd[i] = 0.2 + Math.random() * 0.8;
    }

    speedsRef.current = spd;

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(col, 3));

    return geo;
  }, []);

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const { progress } = (e as CustomEvent<ScrollData>).detail;
      progressRef.current = progress;
    };
    window.addEventListener("orbit-scroll", handleScroll);
    return () => window.removeEventListener("orbit-scroll", handleScroll);
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const posArray = pointsRef.current.geometry.attributes.position
      .array as Float32Array;
    const speeds = speedsRef.current;
    const progress = progressRef.current;
    const time = state.clock.elapsedTime;


    const opacity = Math.max(0.15, 0.7 - progress * 0.6);
    const material = pointsRef.current.material as THREE.PointsMaterial;
    material.opacity = opacity;

    for (let i = 0; i < count; i++) {
      const flowSpeed = speeds[i] * (0.3 + progress * 1.5);
      posArray[i * 3 + 1] += flowSpeed * 0.02;

      posArray[i * 3] += Math.sin(time * 0.5 + i) * 0.003;

      if (posArray[i * 3 + 1] > 15) {
        posArray[i * 3 + 1] = -15;
        posArray[i * 3] = (Math.random() - 0.5) * 15;
        posArray[i * 3 + 2] = (Math.random() - 0.5) * 15 - 10;
      }

      if (posArray[i * 3 + 1] < -15) {
        posArray[i * 3 + 1] = 15;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y = Math.sin(time * 0.08) * 0.15;
    pointsRef.current.rotation.x = Math.cos(time * 0.06) * 0.08;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}
