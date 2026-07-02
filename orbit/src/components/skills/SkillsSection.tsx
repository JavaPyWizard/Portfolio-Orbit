'use client'

import { motion } from 'framer-motion'

const skills = [
  { name: 'React', category: 'Frontend', years: 3, confidence: 90 },
  { name: 'Next.js', category: 'Framework', years: 2, confidence: 85 },
  { name: 'TypeScript', category: 'Language', years: 3, confidence: 88 },
  { name: 'Python', category: 'Language', years: 4, confidence: 92 },
  { name: 'Node.js', category: 'Backend', years: 3, confidence: 85 },
  { name: 'Three.js', category: '3D', years: 1, confidence: 70 },
  { name: 'TensorFlow', category: 'AI/ML', years: 2, confidence: 78 },
  { name: 'PostgreSQL', category: 'Database', years: 2, confidence: 80 },
]

export default function SkillsSection() {
  return (
    <section className="relative min-h-screen py-24 z-10">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          className="text-4xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Skills & <span className="glow-text">Technologies</span>
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="glass-card p-4 text-center hover:border-primary/30 transition-all cursor-pointer group"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -4 }}
            >
              <p className="font-semibold text-text group-hover:text-primary transition-colors">
                {skill.name}
              </p>
              <p className="text-xs text-muted mt-1">{skill.years} years</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}