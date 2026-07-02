'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
    >
      <div className="w-1 h-16 rounded-full bg-surface overflow-hidden">
        <motion.div
          className="w-full bg-gradient-to-b from-primary to-secondary rounded-full"
          style={{ height: `${progress * 100}%` }}
        />
      </div>
      <span className="text-xs text-muted font-mono">
        {Math.round(progress * 100)}%
      </span>
    </motion.div>
  )
}