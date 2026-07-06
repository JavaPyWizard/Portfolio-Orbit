"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  ExternalLink,
  Play,
  X,
  ChevronDown,
  FolderGit2,
  Gamepad2,
  TrafficCone,
} from "lucide-react";

const projects = [
  {
    id: 1,
    name: "Snakeware",
    tagline: "Snake and Food Game",
    description:
      "A terminal-based Snake game built in C with real-time controls, dynamic speed progression, collision detection, and persistent high-score tracking. Implements non-blocking keyboard input, player profiles, and file-based score storage using POSIX terminal APIs and core C concepts.",
    tech: [
      "C",
      "POSIX Terminal APIs",
      "termios",
      "fcntl",
      "unistd",
      "File I/O",
      "Standard C Library",
    ],
    github: "https://github.com/JavaPyWizard/SnakeWare",
    live: null,
    video: "/snakeware-demo.mp4",
    features: [
      "Real-time gameplay with non-blocking keyboard input",
      "Supports both Arrow Keys and WASD controls",
      "Dynamic difficulty with increasing game speed",
      "Persistent player profiles and high-score storage using file handling",
      "Collision detection for walls and self-intersection",
      "Pause and resume functionality",
      "Clean terminal-based rendering with continuous screen updates",
    ],
    accent: "#10B981",
    accentLight: "rgba(16, 185, 129, 0.12)",
    icon: Gamepad2,
  },
  {
    id: 2,
    name: "CrossSafe",
    tagline: "Traffic Control System",
    description:
      "A terminal-based traffic light simulation developed in C that models automated traffic signal transitions with countdown timers, pedestrian crossing status, colored console output, and graceful program termination. Demonstrates state management, terminal control using ANSI escape sequences, signal handling, and real-time system simulation.",
    tech: [
      "C",
      "ANSI Escape Sequences",
      "POSIX (unistd.h, signal.h)",
      "Standard C Library",
    ],
    github: "https://github.com/JavaPyWizard/CrossSafe/tree/main",
    live: null,
    video: "/crosssafe-demo.mov",
    features: [

      "Automated traffic light state transitions (Red, Yellow, Green)",
      "Real-time countdown timer for each signal phase",
      "Pedestrian crossing status indicator",
      "Colored terminal output using ANSI escape sequences",
      "Smooth screen updates without flickering",
      "Graceful exit handling using signal interrupts (Ctrl + C)",
    ],
    accent: "#F59E0B",
    accentLight: "rgba(245, 158, 11, 0.12)",
    icon: TrafficCone,
  },
];

export default function ProjectsSection() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [showVideo, setShowVideo] = useState<string | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="relative min-h-screen py-24 z-10" id="projects">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs text-muted uppercase tracking-[0.2em] font-medium mb-4">
            What I&apos;ve Built
          </p>
          <div className="flex items-center gap-3 mb-2">
            <FolderGit2 className="w-7 h-7 text-primary" />
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Featured <span className="text-primary">Projects</span>
            </h2>
          </div>
        </motion.div>

        <div className="space-y-4">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="rounded-xl border border-white/[0.06] bg-white/[0.01] overflow-hidden transition-all duration-500 hover:bg-white/[0.015]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <button
                onClick={() => toggleExpand(project.id)}
                className="w-full text-left group"
              >
                <div className="flex items-start gap-4 p-6 pb-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: project.accentLight }}
                  >
                    <project.icon
                      className="w-6 h-6"
                      style={{ color: project.accent }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-semibold text-text">
                      {project.name}
                    </h3>
                    <p className="text-sm text-muted mt-0.5">
                      {project.tagline}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between px-6 pb-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="text-[11px] px-2.5 py-1 rounded-md bg-white/[0.02] border border-white/[0.04] text-muted/60"
                      >
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="text-[11px] px-2.5 py-1 rounded-md bg-white/[0.02] border border-white/[0.04] text-muted/40">
                        +{project.tech.length - 4} more
                      </span>
                    )}
                  </div>
                  <motion.div
                    animate={{ rotate: expandedId === project.id ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="w-8 h-8 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center group-hover:border-white/12 transition-colors flex-shrink-0 ml-3"
                  >
                    <ChevronDown className="w-4 h-4 text-muted" />
                  </motion.div>
                </div>
              </button>

              <AnimatePresence>
                {expandedId === project.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 border-t border-white/[0.04]">
                      <p className="text-sm text-muted/80 leading-relaxed mt-5 mb-6">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-3 mb-6">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.03] border border-white/[0.08] text-sm text-text hover:border-white/15 transition-all"
                        >
                          <Github className="w-4 h-4" />
                          View Code
                          <ExternalLink className="w-3 h-3 text-muted" />
                        </a>
                        <button
                          onClick={() => setShowVideo(project.video)}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20 text-sm text-primary hover:bg-primary/20 transition-all"
                        >
                          <Play className="w-4 h-4" />
                          Watch Demo
                        </button>
                      </div>

                      <div>
                        <h4 className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">
                          Key Features
                        </h4>
                        <ul className="space-y-2.5">
                          {project.features.map((feature, i) => (
                            <motion.li
                              key={i}
                              className="flex items-start gap-3 text-sm text-muted/70"
                              initial={{ opacity: 0, x: -6 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.08 + i * 0.04 }}
                            >
                              <span
                                className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                                style={{ backgroundColor: project.accent }}
                              />
                              <span>{feature}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-6">
                        <h4 className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">
                          Tech Stack
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((t) => (
                            <span
                              key={t}
                              className="text-[12px] px-3 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.05] text-muted/70"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {showVideo && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowVideo(null)}
            >
              <div className="absolute inset-0 bg-background/90 backdrop-blur-xl" />
              <motion.div
                className="relative z-10 w-full max-w-3xl glass-card p-4"
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setShowVideo(null)}
                  className="absolute -top-10 right-0 p-2 text-muted hover:text-text transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <video
                  controls
                  autoPlay
                  className="w-full aspect-video rounded-lg bg-black"
                  src={showVideo}
                >
                  Your browser does not support the video tag.
                </video>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
