'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, ExternalLink, X } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: 'ORBIT Portfolio',
    description: 'Interactive 3D cinematic portfolio built with Next.js, Three.js, and Framer Motion.',
    tech: ['Next.js', 'TypeScript', 'Three.js', 'Tailwind'],
    github: '#',
    live: '#',
    challenges: 'Balancing 3D performance with smooth animations across devices.',
  },
  {
    id: 2,
    title: 'AI Chat Platform',
    description: 'Real-time chat application with AI-powered responses.',
    tech: ['React', 'Node.js', 'OpenAI', 'Socket.io'],
    github: '#',
    live: '#',
    challenges: 'Managing real-time state and streaming AI responses efficiently.',
  },
]

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null)

  return (
    <section className="relative min-h-screen py-24 z-10">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          className="text-4xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Featured <span className="glow-text">Projects</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="glass-card p-6 hover:border-primary/30 transition-all cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedProject(project.id)}
              whileHover={{ y: -4 }}
            >
              {/* Project Preview */}
              <div className="aspect-video rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 mb-4 flex items-center justify-center">
                <p className="text-primary/50 font-mono text-sm">{project.title}</p>
              </div>
              <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
              <p className="text-sm text-muted mb-3 line-clamp-2">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Expanded Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            >
              <div className="absolute inset-0 bg-background/90 backdrop-blur-xl" />
              <motion.div
                className="relative z-10 glass-card max-w-2xl w-full p-8"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-4 right-4 p-2 rounded-lg hover:bg-surface transition-colors"
                  onClick={() => setSelectedProject(null)}
                >
                  <X className="w-5 h-5" />
                </button>
                <h3 className="text-2xl font-bold mb-4">
                  {projects.find((p) => p.id === selectedProject)?.title}
                </h3>
                <p className="text-muted mb-6">
                  {projects.find((p) => p.id === selectedProject)?.challenges}
                </p>
                <div className="flex gap-3">
                  <a
                    href={projects.find((p) => p.id === selectedProject)?.github}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg glass-card hover:border-primary/30"
                  >
                    <Github className="w-4 h-4" /> Code
                  </a>
                  <a
                    href={projects.find((p) => p.id === selectedProject)?.live}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-white"
                  >
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}