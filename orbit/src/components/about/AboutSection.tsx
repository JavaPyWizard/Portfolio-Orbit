'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  User,
  MapPin,
  Brain,
  Code2,
  Database,
  Wrench,
  Dumbbell,
  BookOpen,
  Coffee,
  Film,
  Music,
  Gamepad2,
  Lightbulb,
  Target,
  Star,
  GitBranch,
  Terminal,
  Cpu,
} from 'lucide-react'

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  )
}

// Star rating component
function StarRating({ filled, total = 5 }: { filled: number; total?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: total }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i < filled
              ? 'text-yellow-400 fill-yellow-400'
              : 'text-muted/30'
          }`}
        />
      ))}
    </div>
  )
}

// Tech badge with icon
function TechBadge({ name, icon: Icon, color }: { name: string; icon: React.ElementType; color: string }) {
  return (
    <motion.div
      className="group relative flex items-center gap-2 px-3 py-2 rounded-lg bg-surface/50 border border-primary/10 cursor-default overflow-hidden"
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Animated border on hover */}
      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}20, transparent)`,
          backgroundSize: '200% 100%',
          animation: 'shimmer 2s linear infinite',
        }}
      />
      <Icon className="w-4 h-4 relative z-10" style={{ color }} />
      <span className="text-sm text-text relative z-10 group-hover:glow-text transition-all">
        {name}
      </span>
    </motion.div>
  )
}

// Parallax card for outside coding
function ParallaxCard({ emoji, label }: { emoji: string; label: string }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / 10
    const y = (e.clientY - rect.top - rect.height / 2) / 10
    setOffset({ x, y })
  }

  const handleMouseLeave = () => setOffset({ x: 0, y: 0 })

  return (
    <motion.div
      ref={cardRef}
      className="glass-card p-4 text-center cursor-default relative overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      whileHover={{ scale: 1.05, borderColor: 'rgba(6, 182, 212, 0.5)' }}
    >
      <span className="text-2xl block mb-1">{emoji}</span>
      <span className="text-xs text-muted">{label}</span>
    </motion.div>
  )
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const focusAreas = [
    { text: 'Data Structures & Algorithms', stars: 5 },
    { text: 'Operating Systems', stars: 4 },
    { text: 'Computer Networks', stars: 4 },
    { text: 'Backend Development', stars: 2 },
    { text: 'Artificial Intelligence', stars: 3 },
  ]

  const principles = [
    { text: 'Learn by building', sub: 'Theory means nothing without practice' },
    { text: 'Write clean readable code', sub: 'Code is read more than it is written' },
    { text: 'Solve problems before optimizing', sub: 'Premature optimization is the root of all evil' },
    { text: 'Consistency beats intensity', sub: 'Small steps every day compound' },
    { text: 'Keep improving every day', sub: '1% better each day = 37x better each year' },
  ]

  const outsideItems = [
    { emoji: '🏋️', label: 'Fitness' },
    { emoji: '📚', label: 'Reading Tech Blogs' },
    { emoji: '☕', label: 'Coffee' },
    { emoji: '🎬', label: 'Movies' },
    { emoji: '🎵', label: 'Music' },
    { emoji: '🎮', label: 'BGMI' },
    { emoji: '👑', label: 'Clash Royale' },
  ]

  return (
    <section ref={sectionRef} className="relative min-h-screen py-32 z-10" id="about">
      <div className="max-w-6xl mx-auto px-6">
        {/* ========== PROFILE HEADER ========== */}
        <motion.div
          className="flex flex-col lg:flex-row items-center lg:items-start gap-12 mb-20"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Photo */}
          <div className="relative flex-shrink-0">
            <div className="relative">
              <div className="absolute inset-0 rounded-full border border-primary/10 animate-spin"
                style={{ animationDuration: '25s', width: 'calc(100% + 30px)', height: 'calc(100% + 30px)', top: -15, left: -15 }} />
              <div className="w-40 h-40 rounded-full bg-gradient-to-br from-primary/15 via-surface to-secondary/15 flex items-center justify-center border border-primary/20 relative z-10">
                <User className="w-14 h-14 text-primary/40" />
              </div>
            </div>
          </div>

          {/* Identity */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-bold mb-2">
              Divyansh <span className="glow-text">Kumar Singh</span>
            </h2>
            <div className="flex flex-wrap items-center gap-2 mb-2 justify-center lg:justify-start">
              <span className="text-primary font-medium">Computer Science Student</span>
              <span className="text-muted">·</span>
              <span className="text-muted">UPES</span>
            </div>
            <div className="flex items-center gap-2 text-muted text-sm mb-6 justify-center lg:justify-start">
              <MapPin className="w-4 h-4" />
              <span>Dehradun, Uttarakhand & Prayagraj, Uttar Pradesh</span>
            </div>

            <p className="text-text/80 leading-relaxed text-lg max-w-2xl">
              I&apos;m a third-year Computer Science student at UPES with a strong interest in
              <span className="text-primary font-medium"> software engineering</span> and
              <span className="text-secondary font-medium"> Artificial Intelligence</span>.
              I enjoy solving challenging problems, building modern applications, and learning
              technologies that create real-world impact.
            </p>
            <p className="text-muted mt-3">
              Every project is an opportunity to write better code, think deeper, and grow as a developer.
            </p>

            {/* Stats */}
            <div className="flex gap-8 mt-8 justify-center lg:justify-start">
              {[
                { value: '6+', label: 'Projects' },
                { value: '50+', label: 'LeetCode' },
                { value: '8+', label: 'Technologies' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl font-bold glow-text">{stat.value}</p>
                  <p className="text-xs text-muted mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ========== TECH STACK - WITH ICONS ========== */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold mb-8 text-center">
            <Cpu className="w-5 h-5 inline mr-2 text-primary" />
            Tech <span className="glow-text">Stack</span>
          </h3>

          <div className="space-y-6 max-w-3xl mx-auto">
            {/* Languages */}
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
              <span className="text-sm text-primary font-mono font-medium w-20 flex-shrink-0">Languages</span>
              <div className="flex flex-wrap gap-2">
                <TechBadge name="Java" icon={Code2} color="#E76F00" />
                <TechBadge name="Python" icon={Code2} color="#3776AB" />
                <TechBadge name="C" icon={Code2} color="#A8B9CC" />
                <TechBadge name="SQL" icon={Database} color="#336791" />
                <TechBadge name="JavaScript" icon={Code2} color="#F7DF1E" />
              </div>
            </div>

            {/* Frontend */}
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
              <span className="text-sm text-primary font-mono font-medium w-20 flex-shrink-0">Frontend</span>
              <div className="flex flex-wrap gap-2">
                <TechBadge name="HTML" icon={Code2} color="#E34F26" />
                <TechBadge name="CSS" icon={Code2} color="#1572B6" />
              </div>
            </div>

            {/* Database */}
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
              <span className="text-sm text-primary font-mono font-medium w-20 flex-shrink-0">Database</span>
              <div className="flex flex-wrap gap-2">
                <TechBadge name="MySQL" icon={Database} color="#4479A1" />
              </div>
            </div>

            {/* Tools */}
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
              <span className="text-sm text-primary font-mono font-medium w-20 flex-shrink-0">Tools</span>
              <div className="flex flex-wrap gap-2">
                <TechBadge name="Git" icon={GitBranch} color="#F05032" />
                <TechBadge name="GitHub" icon={GithubIcon} color="#fff" />
                <TechBadge name="VS Code" icon={Terminal} color="#007ACC" />
                <TechBadge name="Postman" icon={Wrench} color="#FF6C37" />
              </div>
            </div>

            {/* Core CS */}
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
              <span className="text-sm text-primary font-mono font-medium w-20 flex-shrink-0">Core CS</span>
              <div className="flex flex-wrap gap-2">
                {['DSA', 'OOP', 'DBMS', 'OS', 'CN'].map((cs) => (
                  <TechBadge key={cs} name={cs} icon={Brain} color="#8B5CF6" />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========== FOCUS AREAS + PRINCIPLES ========== */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          {/* Focus Areas with Stars */}
          <div>
            <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
              <Target className="w-5 h-5 text-accent" />
              Focus <span className="glow-text">Areas</span>
            </h3>
            <div className="space-y-5">
              {focusAreas.map((item, i) => (
                <motion.div
                  key={item.text}
                  className="flex items-center justify-between group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <span className="text-muted group-hover:text-text transition-colors text-sm">
                    {item.text}
                  </span>
                  <StarRating filled={item.stars} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Principles - Timeline */}
          <div>
            <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-400" />
              What I <span className="glow-text">Believe</span>
            </h3>
            <div className="relative">
              {/* Vertical timeline line */}
              <div className="absolute left-[5px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent" />

              <div className="space-y-6">
                {principles.map((item, i) => (
                  <motion.div
                    key={item.text}
                    className="flex gap-4 pl-2"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                  >
                    <div className="relative flex-shrink-0 mt-1.5">
                      <motion.div
                        className="w-3 h-3 rounded-full bg-primary relative z-10 ring-4 ring-background"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15 + 0.2, type: 'spring', stiffness: 400 }}
                      />
                    </div>
                    <div>
                      <p className="text-text font-medium text-sm">{item.text}</p>
                      <p className="text-muted text-xs mt-0.5">{item.sub}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ========== OUTSIDE CODING ========== */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-bold mb-8 text-muted">
            Outside <span className="text-text">Coding</span>
          </h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
            {outsideItems.map((item) => (
              <ParallaxCard key={item.label} emoji={item.emoji} label={item.label} />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Shimmer animation style */}
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </section>
  )
}