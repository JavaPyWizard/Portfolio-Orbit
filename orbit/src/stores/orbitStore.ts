import { create } from 'zustand'

export type Scene =
  | 'boot'
  | 'intro'
  | 'hero'
  | 'about'
  | 'education'
  | 'skills'
  | 'projects'
  | 'experience'
  | 'github'
  | 'leetcode'
  | 'certificates'
  | 'resume'
  | 'contact'
  | 'footer'

export type BootPhase = 'initializing' | 'loading' | 'complete'

interface OrbitState {

  currentScene: Scene
  previousScene: Scene | null
  setScene: (scene: Scene) => void


  bootPhase: BootPhase
  bootProgress: number
  bootMessages: string[]
  isBootComplete: boolean
  setBootPhase: (phase: BootPhase) => void
  setBootProgress: (progress: number) => void
  addBootMessage: (message: string) => void
  completeBoot: () => void


  isNavOpen: boolean
  toggleNav: () => void
  closeNav: () => void


  isSoundEnabled: boolean
  toggleSound: () => void


  isPerformanceMode: boolean
  setPerformanceMode: (mode: boolean) => void


  isCommandPaletteOpen: boolean
  toggleCommandPalette: () => void
  closeCommandPalette: () => void
}

export const useOrbitStore = create<OrbitState>((set, get) => ({

  currentScene: 'boot',
  previousScene: null,
  setScene: (scene) =>
    set((state) => ({
      previousScene: state.currentScene,
      currentScene: scene,
    })),


  bootPhase: 'initializing',
  bootProgress: 0,
  bootMessages: [],
  isBootComplete: false,
  setBootPhase: (phase) => set({ bootPhase: phase }),
  setBootProgress: (progress) => set({ bootProgress: progress }),
  addBootMessage: (message) =>
    set((state) => ({ bootMessages: [...state.bootMessages, message] })),
  completeBoot: () =>
    set({
      isBootComplete: true,
      bootPhase: 'complete',
      bootProgress: 100,
    }),


  isNavOpen: false,
  toggleNav: () => set((state) => ({ isNavOpen: !state.isNavOpen })),
  closeNav: () => set({ isNavOpen: false }),


  isSoundEnabled: false,
  toggleSound: () => set((state) => ({ isSoundEnabled: !state.isSoundEnabled })),


  isPerformanceMode: false,
  setPerformanceMode: (mode) => set({ isPerformanceMode: mode }),


  isCommandPaletteOpen: false,
  toggleCommandPalette: () =>
    set((state) => ({ isCommandPaletteOpen: !state.isCommandPaletteOpen })),
  closeCommandPalette: () => set({ isCommandPaletteOpen: false }),
}))