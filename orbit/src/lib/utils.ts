import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const COLORS = {
  background: '#050816',
  surface: '#0D1224',
  card: '#151C34',
  primary: '#3B82F6',
  secondary: '#8B5CF6',
  accent: '#06B6D4',
  text: '#F8FAFC',
  muted: '#94A3B8',
  success: '#22C55E',
  danger: '#EF4444',
} as const

export const MOTION = {
  spring: {
    gentle: { type: 'spring', stiffness: 100, damping: 20 },
    snappy: { type: 'spring', stiffness: 300, damping: 30 },
    bouncy: { type: 'spring', stiffness: 200, damping: 12 },
  },
  transition: {
    fast: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
    medium: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
    slow: { duration: 1.0, ease: [0.25, 0.1, 0.25, 1] },
  },
} as const

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}