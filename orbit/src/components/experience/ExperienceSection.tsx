"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Calendar,
  MapPin,
  Building2,
  ChevronDown,
} from "lucide-react";

const experiences = [
  {
    id: 1,
    role: "Social Intern",
    company: "Ek Soch Foundation",
    period: "June 2025 – July 2025",
    location: "Prayagraj, Uttar Pradesh",
    type: "On-site",
    description:
      "Led a team of interns in planning and executing community outreach initiatives while contributing to district-level social awareness programs. Coordinated volunteers, managed event operations, and worked with the organization to ensure successful execution of campaigns.",
    highlights: [
      "Led and coordinated a team of interns during community outreach initiatives",
      "Assisted in planning and executing district-level awareness and social impact events",
      "Coordinated volunteers, event logistics, and on-ground activities to ensure smooth operations",
      "Collaborated with organizational members to improve participation and community engagement",
    ],
    skills: [
      "Leadership",
      "Event Management",
      "Community Outreach",
      "Team Coordination",
    ],
    accent: "#10B981",
    accentLight: "rgba(16, 185, 129, 0.12)",
    accentText: "text-emerald-400",
  },
  {
    id: 2,
    role: "Java Developer / Data Management Intern",
    company: "High Court of Judicature at Allahabad",
    period: "June 2026 – July 2026",
    location: "Prayagraj, Uttar Pradesh",
    type: "On-site",
    description:
      "Contributed to the development of an internal judicial case information chatbot by implementing Java backend functionality, integrating case retrieval APIs, and managing structured legal data for efficient access.",
    highlights: [
      "Developed Java and Spring Boot modules for judicial case information retrieval",
      "Integrated REST APIs to fetch real-time case details and party information",
      "Collaborated on frontend integration and maintained structured case data",
    ],
    skills: ["Java", "Spring Boot", "REST APIs", "Maven"],
    accent: "#3B82F6",
    accentLight: "rgba(59, 130, 246, 0.12)",
    accentText: "text-blue-400",
  },
];

export default function ExperienceSection() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="relative min-h-screen py-24 z-10" id="experience">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs text-muted uppercase tracking-[0.2em] font-medium mb-4">
            Where I&apos;ve Worked
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Work <span className="text-primary">Experience</span>
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-[21px] md:left-1/2 top-2 bottom-2 w-px bg-gradient-to-b from-primary/20 via-primary/10 to-transparent md:-translate-x-px" />

          <div className="space-y-10">
            {experiences.map((exp, index) => {
              const isExpanded = expandedId === exp.id;
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={exp.id}
                  className={`relative flex flex-col md:flex-row gap-0 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute left-[21px] md:left-1/2 top-7 w-[10px] h-[10px] rounded-full bg-background border-2 -translate-x-1/2 z-10"
                    style={{ borderColor: exp.accent }}
                  />

                  {/* Card */}
                  <div
                    className={`ml-14 md:ml-0 md:w-1/2 ${isLeft ? "md:pr-10" : "md:pl-10"}`}
                  >
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.01] overflow-hidden transition-all duration-500 hover:bg-white/[0.015]">
                      <button
                        onClick={() => toggleExpand(exp.id)}
                        className="w-full text-left group"
                      >
                        {/* Top section: Icon + Text */}
                        <div className="flex items-start gap-4 p-5 pb-3">
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{ backgroundColor: exp.accentLight }}
                          >
                            <Building2
                              className="w-5 h-5"
                              style={{ color: exp.accent }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-[15px] font-semibold text-text leading-snug">
                              {exp.role}
                            </h3>
                            <p
                              className={`text-[13px] font-medium mt-0.5 ${exp.accentText}`}
                            >
                              {exp.company}
                            </p>
                          </div>
                        </div>

                        {/* Bottom section: Period + Chevron */}
                        <div className="flex items-center justify-between px-5 pb-4">
                          <span className="text-xs text-muted">
                            {exp.period}
                          </span>
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="w-7 h-7 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center group-hover:border-white/12 transition-colors"
                          >
                            <ChevronDown className="w-3.5 h-3.5 text-muted" />
                          </motion.div>
                        </div>
                      </button>

                      {/* Expanded content */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: 0.35,
                              ease: [0.25, 0.1, 0.25, 1],
                            }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-5 border-t border-white/[0.04]">
                              <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mt-4 mb-4 text-xs text-muted">
                                <span className="flex items-center gap-1.5">
                                  <Calendar className="w-3.5 h-3.5 text-muted/50" />
                                  {exp.period}
                                </span>
                                <span className="flex items-center gap-1.5">
                                  <MapPin className="w-3.5 h-3.5 text-muted/50" />
                                  {exp.location}
                                </span>
                                <span className="flex items-center gap-1.5">
                                  <Briefcase className="w-3.5 h-3.5 text-muted/50" />
                                  {exp.type}
                                </span>
                              </div>

                              <p className="text-sm text-muted/80 leading-relaxed mb-4">
                                {exp.description}
                              </p>

                              <ul className="space-y-2 mb-4">
                                {exp.highlights.map((highlight, i) => (
                                  <motion.li
                                    key={i}
                                    className="flex items-start gap-2.5 text-sm text-muted/70"
                                    initial={{ opacity: 0, x: -6 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.08 + i * 0.04 }}
                                  >
                                    <span
                                      className="w-1 h-1 rounded-full mt-2 flex-shrink-0"
                                      style={{ backgroundColor: exp.accent }}
                                    />
                                    <span>{highlight}</span>
                                  </motion.li>
                                ))}
                              </ul>

                              <div className="flex flex-wrap gap-1.5">
                                {exp.skills.map((skill) => (
                                  <span
                                    key={skill}
                                    className="text-[11px] px-2.5 py-1 rounded-md bg-white/[0.02] border border-white/[0.04] text-muted/60"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
