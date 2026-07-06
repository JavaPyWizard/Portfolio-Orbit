'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useOrbitStore } from '@stores/orbitStore'
import { cn } from '@lib/utils'
import { Cpu, Zap, Globe, Code, Terminal, Loader2 } from 'lucide-react'

const bootScript = [
  { text: 'Initializing ORBIT GPU Engine...', icon: Cpu, delay: 300 },
  { text: 'Loading neural core v3.2.1...', icon: Zap, delay: 400 },
  { text: 'Establishing quantum link...', icon: Globe, delay: 350 },
  { text: 'Compiling shader programs...', icon: Code, delay: 500 },
  { text: 'Calibrating particle systems...', icon: Terminal, delay: 450 },
  { text: 'Rendering orbital station...', icon: Globe, delay: 600 },
  { text: 'ORBIT ready. Welcome, Divyansh.', icon: Terminal, delay: 800 },
]

export default function BootSequence() {
  const {
    bootPhase,
    bootProgress,
    bootMessages,
    isBootComplete,
    setBootPhase,
    setBootProgress,
    addBootMessage,
    completeBoot,
    setScene,
  } = useOrbitStore()

  const [visibleMessages, setVisibleMessages] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState(0)
  const [showSkip, setShowSkip] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [typedText, setTypedText] = useState('')
  const progressInterval = useRef<NodeJS.Timeout>()


  useEffect(() => {
    if (bootPhase !== 'initializing') return

    setBootPhase('loading')
    setCurrentLine(0)
    setVisibleMessages([])


    setTimeout(() => setShowSkip(true), 2000)


    let progress = 0
    progressInterval.current = setInterval(() => {
      progress += Math.random() * 8
      if (progress > 95) progress = 95
      setBootProgress(Math.min(progress, 95))
    }, 300)

    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current)
    }
  }, [bootPhase])


  useEffect(() => {
    if (currentLine >= bootScript.length) {

      setBootProgress(100)
      setTimeout(() => {
        completeBoot()
        setTimeout(() => {
          setScene('hero')
        }, 1000)
      }, 500)
      return
    }

    const line = bootScript[currentLine]
    const timer = setTimeout(() => {
      addBootMessage(line.text)
      setVisibleMessages((prev) => [...prev, line.text])
      setCurrentLine((prev) => prev + 1)
    }, line.delay)

    return () => clearTimeout(timer)
  }, [currentLine])

  const handleSkip = () => {
    if (progressInterval.current) clearInterval(progressInterval.current)
    setBootProgress(100)
    completeBoot()
    setTimeout(() => {
      setScene('hero')
    }, 300)
  }

  return (
    <AnimatePresence>
      {!isBootComplete && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="absolute inset-0 bg-grid opacity-20" />

          <div className="absolute inset-0 bg-radial-glow opacity-30" />

          <div className="relative z-10 w-full max-w-2xl px-6">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold tracking-tighter glow-text">
                ORBIT
              </h1>
              <p className="text-muted mt-2 font-mono text-sm">
                Interactive Cinematic Portfolio
              </p>
            </motion.div>

            <motion.div
              className="bg-surface/80 backdrop-blur-xl border border-primary/20 rounded-xl p-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="font-mono text-sm space-y-2">
                {visibleMessages.map((message, index) => {
                  const isLatest = index === visibleMessages.length - 1
                  const Icon = bootScript[index]?.icon || Terminal

                  return (
                    <motion.div
                      key={index}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                      <span
                        className={cn(
                          'text-muted',
                          isLatest && 'text-text'
                        )}
                      >
                        {message}
                      </span>
                      {isLatest && index < bootScript.length - 1 && (
                        <span className="w-1.5 h-4 bg-primary animate-terminal-blink ml-1" />
                      )}
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            <motion.div
              className="relative h-1 bg-surface rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-secondary rounded-full"
                style={{ width: `${bootProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            <p className="text-center text-muted text-xs mt-3 font-mono">
              {bootProgress.toFixed(0)}% complete
            </p>

            {showSkip && (
              <motion.button
                className="mt-8 mx-auto block text-muted hover:text-text transition-colors font-mono text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                onClick={handleSkip}
              >
                Press to skip &gt;&gt;
              </motion.button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}