"use client";

import { useEffect, useCallback, useRef } from "react";
import { useOrbitStore } from "@stores/orbitStore";
import { motion, AnimatePresence } from "framer-motion";
import Engine from "@three/Engine";
import BootSequence from "@components/boot/BootSequence";
import Navbar from "@components/navigation/Navbar";
import CommandPalette from "@components/command/CommandPalette";
import HeroSection from "@components/hero/HeroSection";
import AboutSection from "@components/about/AboutSection";
import EducationSection from "@components/education/EducationSection";
import SkillsSection from "@components/skills/SkillsSection";
import ProjectsSection from "@components/projects/ProjectsSection";
import ExperienceSection from "@components/experience/ExperienceSection";
import GithubSection from "@components/github/GithubSection";
import LeetcodeSection from "@components/leetcode/LeetcodeSection";
import ResumeSection from "@components/resume/ResumeSection";
import ContactSection from "@components/contact/ContactSection";
import FooterSection from "@components/footer/FooterSection";
import ScrollProgress from "@components/ui/ScrollProgress";

const sectionIds: Record<string, string> = {
  hero: "hero",
  about: "about",
  education: "education",
  skills: "skills",
  projects: "projects",
  experience: "experience",
  github: "github",
  leetcode: "leetcode",
  resume: "resume",
  contact: "contact",
};

const sections = [
  { id: "hero", Component: HeroSection },
  { id: "about", Component: AboutSection },
  { id: "education", Component: EducationSection },
  { id: "skills", Component: SkillsSection },
  { id: "projects", Component: ProjectsSection },
  { id: "experience", Component: ExperienceSection },
  { id: "github", Component: GithubSection },
  { id: "leetcode", Component: LeetcodeSection },
  { id: "resume", Component: ResumeSection },
  { id: "contact", Component: ContactSection },
];

export default function Home() {
  const { currentScene, isBootComplete, setScene, setPerformanceMode } =
    useOrbitStore();
  const scrollProgressRef = useRef(0);
  const isManualScrolling = useRef(false);

  // Performance detection
  const checkPerformance = useCallback(() => {
    let lowFps = false;
    let frameCount = 0;
    let lastTime = performance.now();

    const check = () => {
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        const fps = frameCount / ((now - lastTime) / 1000);
        if (fps < 30 && !lowFps) {
          lowFps = true;
          setPerformanceMode(true);
        }
        frameCount = 0;
        lastTime = now;
      }
      requestAnimationFrame(check);
    };
    requestAnimationFrame(check);
  }, [setPerformanceMode]);

  useEffect(() => {
    checkPerformance();
  }, [checkPerformance]);

  // Listen for manual nav events
  useEffect(() => {
    const handleManualNav = () => {
      isManualScrolling.current = true;
      // Re-enable observer after scroll completes
      setTimeout(() => {
        isManualScrolling.current = false;
      }, 1500);
    };

    window.addEventListener("orbit-manual-nav", handleManualNav);
    return () =>
      window.removeEventListener("orbit-manual-nav", handleManualNav);
  }, []);

  // Track scroll progress for 3D camera
  useEffect(() => {
    if (!isBootComplete) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      scrollProgressRef.current = progress;

      window.dispatchEvent(
        new CustomEvent("orbit-scroll", {
          detail: { scroll: scrollTop, limit: docHeight, progress },
        }),
      );
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isBootComplete]);

  // Intersection Observer - only active during natural scrolling
  useEffect(() => {
    if (!isBootComplete) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Skip if user manually clicked a nav item
        if (isManualScrolling.current) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const scene = entry.target.id;
            if (scene && scene in sectionIds) {
              setScene(scene as any);
            }
          }
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" },
    );

    Object.values(sectionIds).forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isBootComplete, setScene]);

  return (
    <main className="relative min-h-screen">
      <Engine />

      <AnimatePresence>{!isBootComplete && <BootSequence />}</AnimatePresence>

      {isBootComplete && (
        <>
          <Navbar />
          <CommandPalette />
          <ScrollProgress />

          <div className="relative z-10">
            {sections.map(({ id, Component }, index) => (
              <motion.div
                key={id}
                id={id}
                initial={{ opacity: 0, y: 60, scale: 0.97 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 1.0,
                    ease: [0.25, 0.1, 0.25, 1],
                    delay: index * 0.05,
                  },
                }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <Component />
              </motion.div>
            ))}
            <FooterSection />
          </div>
        </>
      )}
    </main>
  );
}
