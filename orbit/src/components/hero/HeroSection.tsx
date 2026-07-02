'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useOrbitStore } from '@stores/orbitStore'
import { ArrowRight, Download, Mail, Github, Linkedin } from 'lucide-react'

export default function HeroSection() {
  const { setScene } = useOrbitStore()
  const sectionRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const nameY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const descY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const ctaY = useTransform(scrollYProgress, [0, 1], [0, 60])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95])

  const handleExplore = () => {
    window.dispatchEvent(new CustomEvent('orbit-manual-nav'))
    setTimeout(() => {
      const el = document.getElementById('projects')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  const handleResume = () => {
    window.dispatchEvent(new CustomEvent('orbit-manual-nav'))
    setTimeout(() => {
      const el = document.getElementById('resume')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  const handleContact = () => {
    window.dispatchEvent(new CustomEvent('orbit-manual-nav'))
    setTimeout(() => {
      const el = document.getElementById('contact')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  const tags = ['Software Engineer', 'AI Enthusiast', 'Problem Solver', 'Open Source Learner']

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center z-10">
      <motion.div 
        className="max-w-5xl mx-auto px-6 text-center"
        style={{ scale }}
      >
        {/* Status Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{ opacity }}
        >
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-sm text-muted">Available for opportunities</span>
        </motion.div>

        {/* Name */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          style={{ y: nameY }}
        >
          <span className="text-text">Divyansh </span>
          <span className="glow-text">Kumar Singh</span>
        </motion.h1>

        {/* Title Tags */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          style={{ y: titleY }}
        >
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-4 py-1.5 rounded-full glass-card text-sm md:text-base text-muted hover:border-primary/30 hover:text-text transition-all cursor-default"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Description */}
        <motion.p
          className="max-w-2xl mx-auto text-muted text-lg mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          style={{ y: descY, opacity }}
        >
          Turning ideas into reliable software through code, curiosity, and continuous learning.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          style={{ y: ctaY }}
        >
          <button
            onClick={handleExplore}
            className="magnetic-btn px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium flex items-center gap-2 transition-colors"
          >
            Explore Projects
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={handleResume}
            className="magnetic-btn px-6 py-3 rounded-xl glass-card hover:border-primary/30 text-text font-medium flex items-center gap-2 transition-all"
          >
            <Download className="w-4 h-4" />
            Download Resume
          </button>
          <button
            onClick={handleContact}
            className="magnetic-btn px-6 py-3 rounded-xl glass-card hover:border-primary/30 text-text font-medium flex items-center gap-2 transition-all"
          >
            <Mail className="w-4 h-4" />
            Contact Me
          </button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <a
            href="https://github.com/JavaPyWizard"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg glass-card hover:border-primary/30 transition-all group"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5 text-muted group-hover:text-text transition-colors" />
          </a>
          <a
            href="https://leetcode.com/u/JavaPyWizard/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg glass-card hover:border-primary/30 transition-all group"
            aria-label="LeetCode"
          >
            <svg className="w-5 h-5 text-muted group-hover:text-text transition-colors" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/divyansh-kumar-singh-028747321/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg glass-card hover:border-primary/30 transition-all group"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5 text-muted group-hover:text-text transition-colors" />
          </a>
          <a
            href="mailto:divyanshkumarsingh29@gmail.com"
            className="p-2 rounded-lg glass-card hover:border-primary/30 transition-all group"
            aria-label="Email"
          >
            <Mail className="w-5 h-5 text-muted group-hover:text-text transition-colors" />
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{ opacity }}
        >
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-1.5"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            <motion.div className="w-1.5 h-3 rounded-full bg-primary" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}