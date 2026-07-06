'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useOrbitStore, type Scene } from '@stores/orbitStore'
import { cn } from '@lib/utils'
import {
  Search,
  Home,
  User,
  Code2,
  FolderGit2,
  Github,
  Terminal,
  FileText,
  Mail,
  ArrowRight,
  Command,
} from 'lucide-react'

interface CommandItem {
  id: string
  label: string
  description: string
  icon: React.ElementType
  scene?: Scene
  action?: () => void
}

const commands: CommandItem[] = [
  { id: 'hero', label: 'Home', description: 'Return to hero section', icon: Home, scene: 'hero' },
  { id: 'about', label: 'About', description: 'Learn about Divyansh', icon: User, scene: 'about' },
  { id: 'skills', label: 'Skills', description: 'View technical skills', icon: Code2, scene: 'skills' },
  { id: 'projects', label: 'Projects', description: 'Explore portfolio projects', icon: FolderGit2, scene: 'projects' },
  { id: 'github', label: 'GitHub', description: 'View GitHub activity', icon: Github, scene: 'github' },
  { id: 'leetcode', label: 'LeetCode', description: 'View coding stats', icon: Terminal, scene: 'leetcode' },
  { id: 'resume', label: 'Resume', description: 'View and download resume', icon: FileText, scene: 'resume' },
  { id: 'contact', label: 'Contact', description: 'Get in touch', icon: Mail, scene: 'contact' },
]

export default function CommandPalette() {
  const { isCommandPaletteOpen, toggleCommandPalette, closeCommandPalette, setScene } =
    useOrbitStore()
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)

  const filteredCommands = query
    ? commands.filter(
        (cmd) =>
          cmd.label.toLowerCase().includes(query.toLowerCase()) ||
          cmd.description.toLowerCase().includes(query.toLowerCase())
      )
    : commands


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        toggleCommandPalette()
      }
      if (e.key === 'Escape') {
        closeCommandPalette()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [toggleCommandPalette, closeCommandPalette])


  useEffect(() => {
    if (isCommandPaletteOpen) {
      setQuery('')
      setSelectedIndex(0)
    }
  }, [isCommandPaletteOpen])

  const handleSelect = useCallback(
    (command: CommandItem) => {
      if (command.scene) {
        setScene(command.scene)
      }
      if (command.action) {
        command.action()
      }
      closeCommandPalette()
    },
    [setScene, closeCommandPalette]
  )

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % filteredCommands.length)
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(
        (prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length
      )
    }
    if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
      handleSelect(filteredCommands[selectedIndex])
    }
  }

  return (
    <AnimatePresence>
      {isCommandPaletteOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-start justify-center pt-[20vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={closeCommandPalette}
          />

          <motion.div
            className="relative z-10 w-full max-w-lg mx-4 glass-card overflow-hidden"
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-primary/10">
              <Search className="w-5 h-5 text-muted" />
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setSelectedIndex(0)
                }}
                onKeyDown={handleKeyDown}
                placeholder="Search sections..."
                className="flex-1 bg-transparent text-text placeholder:text-muted outline-none font-mono text-sm"
                autoFocus
              />
              <kbd className="px-2 py-1 text-xs font-mono text-muted bg-surface rounded border border-primary/20">
                <Command className="w-3 h-3 inline mr-0.5" />K
              </kbd>
            </div>

            <div className="max-h-64 overflow-y-auto p-2">
              {filteredCommands.length === 0 ? (
                <div className="text-center text-muted py-8 text-sm">No results found</div>
              ) : (
                filteredCommands.map((command, index) => (
                  <motion.button
                    key={command.id}
                    onClick={() => handleSelect(command)}
                    className={cn(
                      'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors',
                      index === selectedIndex
                        ? 'bg-primary/20 border border-primary/30'
                        : 'hover:bg-primary/5 border border-transparent'
                    )}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <command.icon
                      className={cn(
                        'w-5 h-5',
                        index === selectedIndex ? 'text-primary' : 'text-muted'
                      )}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-text">{command.label}</p>
                      <p className="text-xs text-muted">{command.description}</p>
                    </div>
                    {index === selectedIndex && (
                      <ArrowRight className="w-4 h-4 text-primary" />
                    )}
                  </motion.button>
                ))
              )}
            </div>

            <div className="px-4 py-2 border-t border-primary/10 flex items-center gap-4 text-xs text-muted">
              <span>↑↓ Navigate</span>
              <span>↵ Select</span>
              <span>Esc Close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}