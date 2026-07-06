'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useOrbitStore, type Scene } from '@stores/orbitStore'
import { cn } from '@lib/utils'
import {
  Home,
  User,
  GraduationCap,
  Code2,
  FolderGit2,
  Briefcase,
  Github,
  Terminal,
  Award,
  FileText,
  Mail,
  Menu,
  X,
  Zap,
  ChevronDown,
} from 'lucide-react'

const primaryNavItems: { scene: Scene; label: string; icon: React.ElementType }[] = [
  { scene: 'hero', label: 'Home', icon: Home },
  { scene: 'about', label: 'About', icon: User },
  { scene: 'education', label: 'Education', icon: GraduationCap },
  { scene: 'skills', label: 'Skills', icon: Code2 },
  { scene: 'projects', label: 'Projects', icon: FolderGit2 },
]

const secondaryNavItems: { scene: Scene; label: string; icon: React.ElementType }[] = [
  { scene: 'experience', label: 'Experience', icon: Briefcase },
  { scene: 'github', label: 'GitHub', icon: Github },
  { scene: 'leetcode', label: 'LeetCode', icon: Terminal },
  { scene: 'resume', label: 'Resume', icon: FileText },
  { scene: 'contact', label: 'Contact', icon: Mail },
]

const allNavItems = [...primaryNavItems, ...secondaryNavItems]

export default function Navbar() {
  const { currentScene, setScene, isNavOpen, toggleNav, closeNav } = useOrbitStore()
  const [scrolled, setScrolled] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('.more-dropdown')) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const handleNavClick = (scene: Scene) => {
    closeNav()
    setDropdownOpen(false)
    setScene(scene)


    window.dispatchEvent(new CustomEvent('orbit-manual-nav'))


    setTimeout(() => {
      const el = document.getElementById(scene)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 50)
  }

  const isInSecondary = secondaryNavItems.some(item => item.scene === currentScene)

  return (
    <>
      <motion.nav
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          scrolled
            ? 'bg-background/80 backdrop-blur-xl border-b border-primary/10'
            : 'bg-transparent'
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => handleNavClick('hero')}
              className="flex items-center gap-2 group"
            >
              <Zap className="w-5 h-5 text-primary group-hover:text-accent transition-colors" />
              <span className="text-lg font-bold tracking-tight glow-text">ORBIT</span>
            </button>

            <div className="hidden lg:flex items-center gap-1">
              {primaryNavItems.map((item) => (
                <button
                  key={item.scene}
                  onClick={() => handleNavClick(item.scene)}
                  className={cn(
                    'relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    currentScene === item.scene
                      ? 'text-text'
                      : 'text-muted hover:text-text'
                  )}
                >
                  {currentScene === item.scene && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-lg"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </span>
                </button>
              ))}

              <div className="more-dropdown relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={cn(
                    'relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2',
                    isInSecondary
                      ? 'text-text'
                      : 'text-muted hover:text-text'
                  )}
                >
                  {isInSecondary && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-lg"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    More
                    <ChevronDown className={cn(
                      'w-3 h-3 transition-transform duration-200',
                      dropdownOpen && 'rotate-180'
                    )} />
                  </span>
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      className="absolute right-0 top-full mt-2 w-52 py-2 glass-card overflow-hidden"
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                    >
                      {secondaryNavItems.map((item) => (
                        <button
                          key={item.scene}
                          onClick={() => handleNavClick(item.scene)}
                          className={cn(
                            'w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors',
                            currentScene === item.scene
                              ? 'text-text bg-primary/10'
                              : 'text-muted hover:text-text hover:bg-primary/5'
                          )}
                        >
                          <item.icon className="w-4 h-4 text-primary" />
                          {item.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <button
              onClick={toggleNav}
              className="lg:hidden p-2 rounded-lg hover:bg-surface transition-colors"
              aria-label="Toggle navigation"
            >
              {isNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isNavOpen && (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-background/95 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeNav}
            />
            <motion.div
              className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
                {allNavItems.map((item, index) => (
                  <motion.button
                    key={item.scene}
                    onClick={() => handleNavClick(item.scene)}
                    className={cn(
                      'p-4 rounded-xl text-center transition-all duration-200 glass-card',
                      currentScene === item.scene
                        ? 'border-primary/50 bg-primary/10'
                        : 'hover:border-primary/30'
                    )}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <item.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}