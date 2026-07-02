'use client'

import { motion } from 'framer-motion'
import {
  FileText,
  Download,
  ExternalLink,
  Eye,
  Linkedin,
  Github,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react'

export default function ResumeSection() {
  return (
    <section className="relative min-h-screen py-24 z-10" id="resume">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <FileText className="w-8 h-8 text-primary" />
            <h2 className="text-4xl md:text-5xl font-bold">
              Resume <span className="glow-text">Download</span>
            </h2>
          </div>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            My professional experience, education, and skills in one document.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Preview Card */}
          <motion.div
            className="glass-card p-8 text-center relative overflow-hidden group"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <FileText className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Resume Preview</h3>
              <p className="text-muted text-sm mb-6">
                Quick overview of my qualifications and experience
              </p>
              <button className="magnetic-btn px-6 py-3 rounded-xl glass-card hover:border-primary/30 text-text font-medium inline-flex items-center gap-2 transition-all">
                <Eye className="w-4 h-4" />
                View Resume
              </button>
            </div>
          </motion.div>

          {/* Download Card */}
          <motion.div
            className="glass-card p-8 relative overflow-hidden group"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <h3 className="text-xl font-semibold mb-4">Quick Connect</h3>

              <div className="space-y-3 mb-6">
                <a
                  href="mailto:divyansh@email.com"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors"
                >
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted">divyansh@email.com</span>
                </a>
                <a
                  href="https://linkedin.com/in/divyansh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors"
                >
                  <Linkedin className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted">linkedin.com/in/divyansh</span>
                </a>
                <a
                  href="https://github.com/divyansh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors"
                >
                  <Github className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted">github.com/divyansh</span>
                </a>
                <div className="flex items-center gap-3 p-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted">Dehradun, India</span>
                </div>
              </div>

              <div className="space-y-3">
                <a
                  href="/resume.pdf"
                  download
                  className="magnetic-btn w-full px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download Resume (PDF)
                </a>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="magnetic-btn w-full px-6 py-3 rounded-xl glass-card hover:border-primary/30 text-text font-medium flex items-center justify-center gap-2 transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open in Browser
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}