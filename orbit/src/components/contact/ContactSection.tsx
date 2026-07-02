'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send, Github, Linkedin, MapPin, Terminal } from 'lucide-react'

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, send to your API endpoint
    console.log('Form submitted:', formState)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section className="relative min-h-screen py-24 z-10" id="contact">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Terminal className="w-8 h-8 text-primary" />
            <h2 className="text-4xl md:text-5xl font-bold">
              Connect <span className="glow-text">With Me</span>
            </h2>
          </div>
          <p className="text-muted text-lg max-w-2xl mx-auto font-mono">
            $ connect --divyansh
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Contact Info */}
          <motion.div
            className="md:col-span-2 space-y-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="glass-card p-6 space-y-4">
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>

              <a
                href="mailto:divyansh@email.com"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text">Email</p>
                  <p className="text-xs text-muted">divyansh@email.com</p>
                </div>
              </a>

              <a
                href="https://linkedin.com/in/divyansh"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Linkedin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text">LinkedIn</p>
                  <p className="text-xs text-muted">/in/divyansh</p>
                </div>
              </a>

              <a
                href="https://github.com/divyansh"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Github className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text">GitHub</p>
                  <p className="text-xs text-muted">/divyansh</p>
                </div>
              </a>

              <div className="flex items-center gap-3 p-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text">Location</p>
                  <p className="text-xs text-muted">Dehradun, India</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="md:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="glass-card p-8 space-y-5">
              <h3 className="text-lg font-semibold mb-2">Send a Message</h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-muted mb-1.5">Name</label>
                  <input
                    type="text"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-surface border border-primary/20 text-text placeholder:text-muted/50 focus:outline-none focus:border-primary/50 transition-colors text-sm"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted mb-1.5">Email</label>
                  <input
                    type="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-surface border border-primary/20 text-text placeholder:text-muted/50 focus:outline-none focus:border-primary/50 transition-colors text-sm"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-muted mb-1.5">Subject</label>
                <input
                  type="text"
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-surface border border-primary/20 text-text placeholder:text-muted/50 focus:outline-none focus:border-primary/50 transition-colors text-sm"
                  placeholder="What's this about?"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-muted mb-1.5">Message</label>
                <textarea
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-2.5 rounded-lg bg-surface border border-primary/20 text-text placeholder:text-muted/50 focus:outline-none focus:border-primary/50 transition-colors text-sm resize-none"
                  placeholder="Your message..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submitted}
                className="magnetic-btn w-full px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              >
                {submitted ? (
                  'Message Sent!'
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}