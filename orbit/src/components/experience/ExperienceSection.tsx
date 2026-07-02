'use client'

import { motion } from 'framer-motion'
import { Briefcase, Calendar, MapPin, ArrowRight, ExternalLink } from 'lucide-react'

const experiences = [
  {
    id: 1,
    role: 'Software Engineering Intern',
    company: 'TechCorp',
    location: 'Remote',
    period: 'Jun 2024 - Aug 2024',
    description: 'Built full-stack features for the main product dashboard. Improved API response times by 40% through query optimization.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
    highlights: [
      'Developed 3 major features shipped to production',
      'Reduced bundle size by 30% through code splitting',
      'Collaborated with cross-functional team of 8 engineers',
    ],
  },
  {
    id: 2,
    role: 'Frontend Developer Intern',
    company: 'StartupXYZ',
    location: 'Dehradun, India',
    period: 'Jan 2024 - May 2024',
    description: 'Redesigned the customer-facing web application with modern UI/UX patterns. Implemented responsive designs and animation systems.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    highlights: [
      'Redesigned 15+ pages with new design system',
      'Improved Lighthouse score from 65 to 95',
      'Built reusable component library used across teams',
    ],
  },
  {
    id: 3,
    role: 'Open Source Contributor',
    company: 'Various Projects',
    location: 'Remote',
    period: '2023 - Present',
    description: 'Active contributor to open-source projects focused on developer tools and web frameworks. Maintain personal projects with 200+ stars.',
    technologies: ['TypeScript', 'Python', 'React', 'Node.js'],
    highlights: [
      'Merged 25+ PRs across various projects',
      'Maintains 3 personal open-source libraries',
      'Helped resolve 50+ issues for the community',
    ],
  },
]

export default function ExperienceSection() {
  return (
    <section className="relative min-h-screen py-24 z-10" id="experience">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Work <span className="glow-text">Experience</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Where I&apos;ve applied my skills and what I&apos;ve accomplished.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-primary/20 md:-translate-x-px" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 top-0 w-3 h-3 rounded-full bg-primary border-4 border-background -translate-x-1/2 z-10" />

                {/* Card */}
                <div
                  className={`ml-12 md:ml-0 md:w-1/2 ${
                    index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                  }`}
                >
                  <div className="glass-card p-6 hover:border-primary/30 transition-all group">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-text group-hover:text-primary transition-colors">
                          {exp.role}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Briefcase className="w-4 h-4 text-primary" />
                          <span className="text-primary font-medium">{exp.company}</span>
                        </div>
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-3 mb-4 text-sm text-muted">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {exp.location}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-muted text-sm leading-relaxed mb-4">
                      {exp.description}
                    </p>

                    {/* Highlights */}
                    <ul className="space-y-2 mb-4">
                      {exp.highlights.map((highlight, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-muted"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                          {highlight}
                        </li>
                      ))}
                    </ul>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}