"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Send,
  Github,
  Linkedin,
  MapPin,
  Terminal,
  ExternalLink,
  CheckCircle,
} from "lucide-react";

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);


    const mailtoLink = `mailto:divyanshkumarsingh29@gmail.com?subject=${encodeURIComponent(formState.subject)}&body=${encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`,
    )}`;


    window.location.href = mailtoLink;


    setSubmitted(true);
    setSending(false);
    setFormState({ name: "", email: "", subject: "", message: "" });

    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section className="relative min-h-screen py-24 z-10" id="contact">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs text-muted uppercase tracking-widest font-medium mb-4">
            Get In Touch
          </p>
          <div className="flex items-center justify-center gap-3 mb-2">
            <Terminal className="w-7 h-7 text-primary" />
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Connect <span className="text-primary">With Me</span>
            </h2>
          </div>
          <p className="text-muted text-lg font-mono mt-2">
            $ connect --divyansh
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8">
          <motion.div
            className="md:col-span-2 space-y-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="glass-card p-6 space-y-1">
              <h3 className="text-sm font-semibold text-text mb-4">
                Contact Information
              </h3>

              <a
                href="mailto:divyanshkumarsingh29@gmail.com"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/[0.03] transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-text">Email</p>
                  <p className="text-xs text-muted truncate">
                    divyanshkumarsingh29@gmail.com
                  </p>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/divyansh-kumar-singh-028747321/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/[0.03] transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
                  <Linkedin className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-text">LinkedIn</p>
                  <p className="text-xs text-muted truncate">
                    /in/divyansh-kumar-singh
                  </p>
                </div>
              </a>

              <a
                href="https://github.com/JavaPyWizard"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/[0.03] transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
                  <Github className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-text">GitHub</p>
                  <p className="text-xs text-muted truncate">/JavaPyWizard</p>
                </div>
              </a>

              <a
                href="https://leetcode.com/u/JavaPyWizard/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/[0.03] transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
                  <Terminal className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-text">LeetCode</p>
                  <p className="text-xs text-muted truncate">/JavaPyWizard</p>
                </div>
              </a>

              <div className="flex items-center gap-3 p-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text">Location</p>
                  <p className="text-xs text-muted">Dehradun, Uttarakhand</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="md:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="glass-card p-8 space-y-5">
              <h3 className="text-sm font-semibold text-text mb-2">
                Send a Message
              </h3>
              <p className="text-xs text-muted -mt-3 mb-2">
                Your email client will open to send the message directly.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-muted mb-1.5">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-text placeholder:text-muted/40 focus:outline-none focus:border-primary/50 transition-colors text-sm"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-text placeholder:text-muted/40 focus:outline-none focus:border-primary/50 transition-colors text-sm"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-muted mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  value={formState.subject}
                  onChange={(e) =>
                    setFormState({ ...formState, subject: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-text placeholder:text-muted/40 focus:outline-none focus:border-primary/50 transition-colors text-sm"
                  placeholder="What's this about?"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-muted mb-1.5">
                  Message
                </label>
                <textarea
                  value={formState.message}
                  onChange={(e) =>
                    setFormState({ ...formState, message: e.target.value })
                  }
                  rows={5}
                  className="w-full px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-text placeholder:text-muted/40 focus:outline-none focus:border-primary/50 transition-colors text-sm resize-none"
                  placeholder="Your message..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="magnetic-btn w-full px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              >
                {submitted ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Message Sent!
                  </>
                ) : sending ? (
                  "Opening email client..."
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
  );
}
