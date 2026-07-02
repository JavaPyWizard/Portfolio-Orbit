'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react'

export default function FooterSection() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative z-10 border-t border-primary/10">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold glow-text">ORBIT</h3>
            <p className="text-sm text-muted mt-1">
              Interactive Cinematic Portfolio
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/divyansh"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-primary/10 transition-colors text-muted hover:text-text"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/divyansh"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-primary/10 transition-colors text-muted hover:text-text"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:divyansh@email.com"
              className="p-2 rounded-lg hover:bg-primary/10 transition-colors text-muted hover:text-text"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="p-3 rounded-xl glass-card hover:border-primary/30 transition-all group"
          >
            <ArrowUp className="w-5 h-5 text-muted group-hover:text-primary transition-colors" />
          </button>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-primary/10 text-center">
          <p className="text-sm text-muted flex items-center justify-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-danger inline" /> by Divyansh Kumar Singh
          </p>
          <p className="text-xs text-muted/50 mt-2">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}