'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Code2,
  Cpu,
  Wrench,
  Brain,
  Sparkles,
  Dumbbell,
  BookOpen,
  Gamepad2,
  Coffee,
  Database,
  Globe,
  Terminal,
  GitBranch,
  Server,
  Network,
  Layers,
  Binary,
  ChevronRight,
  Star,
  BrainCircuitIcon,
} from 'lucide-react'


const skillCategories = [
  {
    id: 'languages',
    title: 'Programming Languages',
    icon: Code2,
    color: 'from-blue-500/20 to-cyan-500/20',
    accent: '#3B82F6',
    skills: [
      { name: 'Java', level: 65 },
      { name: 'Python', level: 60 },
      { name: 'C', level: 70 },
      { name: 'SQL', level: 65 },
      { name: 'JavaScript', level: 40 },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    icon: Globe,
    color: 'from-orange-500/20 to-red-500/20',
    accent: '#F97316',
    skills: [
      { name: 'HTML', level: 75 },
      { name: 'CSS', level: 55 },
    ],
  },
  {
    id: 'corecs',
    title: 'Core Computer Science',
    icon: Cpu,
    color: 'from-violet-500/20 to-purple-500/20',
    accent: '#8B5CF6',
    skills: [
      { name: 'DSA', level: 60 },
      { name: 'OOP', level: 55 },
      { name: 'DBMS', level: 65 },
      { name: 'Operating Systems', level: 40 },
      { name: 'Computer Networks', level: 45 },
    ],
  },
  {
    id: 'tools',
    title: 'Development Tools',
    icon: Wrench,
    color: 'from-emerald-500/20 to-teal-500/20',
    accent: '#10B981',
    skills: [
      { name: 'Git', level: 70 },
      { name: 'GitHub', level: 75 },
      { name: 'VS Code', level: 90 },
      { name: 'Postman', level: 35 },
      { name: 'Linux', level: 55 },
    ],
  },
  {
    id: 'ai',
    title: 'AI & Data',
    icon: Brain,
    color: 'from-pink-500/20 to-rose-500/20',
    accent: '#EC4899',
    skills: [
      { name: 'NumPy', level: 75 },
      { name: 'Pandas', level: 60 },
      { name: 'Matplotlib', level: 45 },
      { name: 'Scikit-Learn', level: 40 },
    ],
  },
]

const learningItems = [
  { name: 'Artificial Intelligence', icon: BrainCircuitIcon },
  { name: 'Machine Learning', icon: Sparkles },
]

const softSkills = [
  'Problem Solving',
  'Team Collaboration',
  'Communication',
  'Adaptability',
  'Continuous Learning',
]

const beyondCoding = [
  { emoji: '🏋️', label: 'Fitness' },
  { emoji: '📚', label: 'Reading Tech Articles' },
  { emoji: '🎮', label: 'Gaming' },
  { emoji: '☕', label: 'Coffee' },
]



function SkillBar({ name, level, accent }: { name: string; level: number; accent: string }) {
  return (
    <div className="group">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm text-muted group-hover:text-text transition-colors">{name}</span>
        <span className="text-xs text-muted font-mono opacity-0 group-hover:opacity-100 transition-opacity">{level}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: accent }}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

function CategoryCard({ category, index }: { category: any; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  return (
    <motion.div
      ref={cardRef}
      className="glass-card p-6 relative overflow-hidden group cursor-default"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -4 }}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      <motion.div
        className="absolute -top-6 -right-6 w-20 h-20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ backgroundColor: category.accent }}
        animate={isHovered ? { scale: [1, 1.3, 1], opacity: [0.15, 0.25, 0.15] } : {}}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-5">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300"
            style={{ backgroundColor: `${category.accent}15` }}
          >
            <category.icon className="w-5 h-5" style={{ color: category.accent }} />
          </div>
          <h3 className="font-semibold text-text text-sm">{category.title}</h3>
        </div>

        <div className="space-y-3">
          {category.skills.map((skill: any) => (
            <SkillBar
              key={skill.name}
              name={skill.name}
              level={skill.level}
              accent={category.accent}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function SkillsSection() {
  return (
    <section className="relative min-h-screen py-24 z-10" id="skills">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs text-muted uppercase tracking-widest font-medium mb-4">What I Know</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Skills & <span className="text-primary">Technologies</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {skillCategories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <motion.div
            className="glass-card p-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-semibold text-text">Currently Learning</h3>
            </div>
            <div className="space-y-3">
              {learningItems.map((item) => (
                <motion.div
                  key={item.name}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] hover:border-accent/30 transition-all group"
                  whileHover={{ x: 4 }}
                >
                  <item.icon className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" />
                  <span className="text-sm text-muted group-hover:text-text transition-colors">{item.name}</span>
                  <motion.div
                    className="ml-auto w-2 h-2 rounded-full bg-accent"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="glass-card p-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                <Star className="w-5 h-5 text-secondary" />
              </div>
              <h3 className="font-semibold text-text">Soft Skills</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {softSkills.map((skill, i) => (
                <motion.span
                  key={skill}
                  className="px-3 py-1.5 rounded-full text-sm bg-white/[0.02] border border-white/[0.06] text-muted hover:border-secondary/30 hover:text-text hover:bg-secondary/5 transition-all cursor-default"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -2 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs text-muted uppercase tracking-widest font-medium mb-6">Beyond Coding</p>
          <div className="flex flex-wrap justify-center gap-3">
            {beyondCoding.map((item) => (
              <motion.div
                key={item.label}
                className="glass-card px-5 py-3 flex items-center gap-3 cursor-default group"
                whileHover={{ y: -4, scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <span className="text-xl group-hover:scale-110 transition-transform">{item.emoji}</span>
                <span className="text-sm text-muted group-hover:text-text transition-colors">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}