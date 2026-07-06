'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Award, Calendar, ExternalLink, X, ChevronRight } from 'lucide-react'

const certificates = [
  {
    id: 1,
    title: 'AWS Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: '2024',
    description: 'Foundational understanding of AWS Cloud concepts, services, security, architecture, pricing, and support.',
    skills: ['Cloud Computing', 'AWS', 'Security', 'Architecture'],
    credentialUrl: '#',
    color: 'from-yellow-500/20 to-orange-500/20',
  },
  {
    id: 2,
    title: 'Meta Frontend Developer',
    issuer: 'Meta (Coursera)',
    date: '2024',
    description: 'Professional certificate covering React, advanced JavaScript, UI/UX principles, and frontend development best practices.',
    skills: ['React', 'JavaScript', 'UI/UX', 'HTML/CSS'],
    credentialUrl: '#',
    color: 'from-blue-500/20 to-purple-500/20',
  },
  {
    id: 3,
    title: 'Deep Learning Specialization',
    issuer: 'DeepLearning.AI (Coursera)',
    date: '2023',
    description: 'Comprehensive deep learning program covering neural networks, CNNs, RNNs, and practical AI applications.',
    skills: ['Deep Learning', 'Neural Networks', 'TensorFlow', 'Python'],
    credentialUrl: '#',
    color: 'from-green-500/20 to-teal-500/20',
  },
  {
    id: 4,
    title: 'Google Data Analytics',
    issuer: 'Google (Coursera)',
    date: '2023',
    description: 'Professional certificate in data analysis, visualization, SQL, and data-driven decision making.',
    skills: ['Data Analysis', 'SQL', 'Tableau', 'R'],
    credentialUrl: '#',
    color: 'from-red-500/20 to-pink-500/20',
  },
]

export default function CertificatesSection() {
  const [selectedCert, setSelectedCert] = useState<number | null>(null)

  return (
    <section className="relative min-h-screen py-24 z-10" id="certificates">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Award className="w-8 h-8 text-primary" />
            <h2 className="text-4xl md:text-5xl font-bold">
              Certificates & <span className="glow-text">Achievements</span>
            </h2>
          </div>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Professional certifications that validate my skills and knowledge.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              className="glass-card p-6 hover:border-primary/30 transition-all cursor-pointer group relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedCert(cert.id)}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <Award className="w-8 h-8 text-primary" />
                  <ChevronRight className="w-5 h-5 text-muted group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-lg font-semibold mb-1">{cert.title}</h3>
                <p className="text-primary text-sm font-medium mb-2">{cert.issuer}</p>
                <div className="flex items-center gap-1 text-xs text-muted mb-3">
                  <Calendar className="w-3 h-3" />
                  {cert.date}
                </div>
                <div className="flex flex-wrap gap-2">
                  {cert.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedCert && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
            >
              <div className="absolute inset-0 bg-background/90 backdrop-blur-xl" />
              <motion.div
                className="relative z-10 glass-card max-w-lg w-full p-8"
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                {(() => {
                  const cert = certificates.find((c) => c.id === selectedCert)!
                  return (
                    <>
                      <button
                        className="absolute top-4 right-4 p-2 rounded-lg hover:bg-surface transition-colors"
                        onClick={() => setSelectedCert(null)}
                      >
                        <X className="w-5 h-5" />
                      </button>
                      <Award className="w-10 h-10 text-primary mb-4" />
                      <h3 className="text-2xl font-bold mb-2">{cert.title}</h3>
                      <p className="text-primary font-medium mb-1">{cert.issuer}</p>
                      <p className="text-sm text-muted mb-4">{cert.date}</p>
                      <p className="text-muted leading-relaxed mb-6">{cert.description}</p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {cert.skills.map((skill) => (
                          <span
                            key={skill}
                            className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-white font-medium transition-colors"
                      >
                        View Credential <ExternalLink className="w-4 h-4" />
                      </a>
                    </>
                  )
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}