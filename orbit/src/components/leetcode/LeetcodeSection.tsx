"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Terminal,
  Trophy,
  CheckCircle,
  Clock,
  ExternalLink,
  AlertCircle,
  RefreshCw,
  Medal,
  Code,
} from "lucide-react";

const LEETCODE_USERNAME = "JavaPyWizard";
const CACHE_KEY = "orbit-leetcode-data";
const CACHE_DURATION = 60 * 60 * 1000;

interface LeetCodeData {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking: number;
  contributionPoints: number;
  badges: { id: string; name: string; icon: string }[];
  recentSubmissions: {
    title: string;
    titleSlug: string;
    timestamp: string;
    langName?: string;
  }[];
  skillTags: { name: string; solved: number; level: string }[];
}

function getRelativeTime(timestamp: string): string {
  const now = Date.now();
  const diff = now - parseInt(timestamp) * 1000;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days}d ago`;
  return `${Math.floor(days / 7)}w ago`;
}

function CountUp({
  from = 0,
  to,
  duration = 1.5,
}: {
  from?: number;
  to: number;
  duration?: number;
}) {
  const [count, setCount] = useState(from);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(from + (to - from) * eased));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [to, from, duration]);

  return <span>{count}</span>;
}

export default function LeetcodeSection() {
  const [data, setData] = useState<LeetCodeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLeetCodeData();
  }, []);

  const fetchLeetCodeData = async () => {
    setLoading(true);
    setError(null);

    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
          setData(data);
          setLoading(false);
          return;
        }
      } catch {}
    }

    const query = `
      query {
        matchedUser(username: "${LEETCODE_USERNAME}") {
          profile {
            ranking
          }
          submitStats {
            acSubmissionNum {
              difficulty
              count
            }
          }
          contributions {
            points
          }
          badges {
            id
            name
            icon
          }
          tagProblemCounts {
            advanced {
              tagName
              tagSlug
              problemsSolved
            }
            intermediate {
              tagName
              tagSlug
              problemsSolved
            }
            fundamental {
              tagName
              tagSlug
              problemsSolved
            }
          }
        }
        recentAcSubmissionList(username: "${LEETCODE_USERNAME}", limit: 6) {
          title
          titleSlug
          timestamp
          langName
        }
      }
    `;

    try {
      const res = await fetch("/api/leetcode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) throw new Error("Failed to fetch");

      const json = await res.json();

      if (json.errors) {
        throw new Error(json.errors[0]?.message || "API error");
      }

      const user = json.data?.matchedUser;
      const submissions = json.data?.recentAcSubmissionList || [];

      if (!user) throw new Error("User not found");

      const acStats: any[] = user.submitStats?.acSubmissionNum || [];

      const totalSolved =
        acStats.find((s: any) => s.difficulty === "All")?.count || 0;
      const easySolved =
        acStats.find((s: any) => s.difficulty === "Easy")?.count || 0;
      const mediumSolved =
        acStats.find((s: any) => s.difficulty === "Medium")?.count || 0;
      const hardSolved =
        acStats.find((s: any) => s.difficulty === "Hard")?.count || 0;


      const tagStats = user.tagProblemCounts;
      const skillTags: { name: string; solved: number; level: string }[] = [];
      if (tagStats) {
        tagStats.advanced?.forEach((t: any) =>
          skillTags.push({
            name: t.tagName,
            solved: t.problemsSolved,
            level: "Advanced",
          }),
        );
        tagStats.intermediate?.forEach((t: any) =>
          skillTags.push({
            name: t.tagName,
            solved: t.problemsSolved,
            level: "Intermediate",
          }),
        );
        tagStats.fundamental?.forEach((t: any) =>
          skillTags.push({
            name: t.tagName,
            solved: t.problemsSolved,
            level: "Fundamental",
          }),
        );
      }

      const parsedData: LeetCodeData = {
        totalSolved,
        easySolved,
        mediumSolved,
        hardSolved,
        ranking: user.profile?.ranking || 0,
        contributionPoints: user.contributions?.points || 0,
        badges: user.badges || [],
        recentSubmissions: submissions,
        skillTags: skillTags.slice(0, 8),
      };

      setData(parsedData);
      setLoading(false);

      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          data: parsedData,
          timestamp: Date.now(),
        }),
      );
    } catch (err: any) {
      console.error("LeetCode fetch error:", err);
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data } = JSON.parse(cached);
        setData(data);
        setError("Using cached data");
      } else {
        setError("Unable to load LeetCode data");
      }
      setLoading(false);
    }
  };

  const totalSolved = data?.totalSolved || 0;
  const easyPercent =
    totalSolved > 0 ? ((data?.easySolved || 0) / totalSolved) * 100 : 0;
  const mediumPercent =
    totalSolved > 0 ? ((data?.mediumSolved || 0) / totalSolved) * 100 : 0;
  const hardPercent =
    totalSolved > 0 ? ((data?.hardSolved || 0) / totalSolved) * 100 : 0;

  return (
    <section className="relative min-h-screen py-24 z-10" id="leetcode">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs text-muted uppercase tracking-widest font-medium mb-4">
            Problem Solving
          </p>
          <div className="flex items-center gap-3 mb-2">
            <Terminal className="w-7 h-7 text-primary" />
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              LeetCode <span className="text-primary">Stats</span>
            </h2>
          </div>
          <a
            href={`https://leetcode.com/u/${LEETCODE_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-accent transition-colors mt-1"
          >
            @{LEETCODE_USERNAME} <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </motion.div>

        {loading && (
          <div className="animate-pulse space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-24 bg-white/[0.02] rounded-xl" />
              ))}
            </div>
          </div>
        )}

        {error && !loading && (
          <motion.div
            className="glass-card p-6 text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <AlertCircle className="w-8 h-8 text-amber-400 mx-auto mb-2" />
            <p className="text-sm text-muted mb-3">{error}</p>
            <button
              onClick={fetchLeetCodeData}
              className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/20 text-primary text-sm hover:bg-primary/20 transition-colors inline-flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Retry
            </button>
          </motion.div>
        )}

        {!loading && data && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="glass-card p-5 text-center">
                <CheckCircle className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
                <p className="text-3xl font-bold glow-text">
                  <CountUp to={data.totalSolved} />
                </p>
                <p className="text-xs text-muted mt-1">Total Solved</p>
              </div>
              <div className="glass-card p-5 text-center">
                <Trophy className="w-5 h-5 text-yellow-400 mx-auto mb-2" />
                <p className="text-3xl font-bold glow-text">
                  {data.ranking > 0
                    ? "#" + data.ranking.toLocaleString()
                    : "N/A"}
                </p>
                <p className="text-xs text-muted mt-1">Global Rank</p>
              </div>
              <div className="glass-card p-5 text-center">
                <Medal className="w-5 h-5 text-purple-400 mx-auto mb-2" />
                <p className="text-3xl font-bold glow-text">
                  {data.contributionPoints}
                </p>
                <p className="text-xs text-muted mt-1">Contributions</p>
              </div>
              <div className="glass-card p-5 text-center">
                <Code className="w-5 h-5 text-accent mx-auto mb-2" />
                <p className="text-3xl font-bold glow-text">
                  {data.badges.length}
                </p>
                <p className="text-xs text-muted mt-1">Badges Earned</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="glass-card p-6">
                <h4 className="text-sm font-semibold text-text mb-5">
                  Problems Solved
                </h4>
                <div className="space-y-4">
                  {[
                    {
                      label: "Easy",
                      count: data.easySolved,
                      color: "bg-emerald-400",
                      percent: easyPercent,
                    },
                    {
                      label: "Medium",
                      count: data.mediumSolved,
                      color: "bg-yellow-400",
                      percent: mediumPercent,
                    },
                    {
                      label: "Hard",
                      count: data.hardSolved,
                      color: "bg-red-400",
                      percent: hardPercent,
                    },
                  ].map((diff) => (
                    <div key={diff.label}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-muted">{diff.label}</span>
                        <span className="text-text font-mono">
                          {diff.count}
                        </span>
                      </div>
                      <div className="h-2.5 rounded-full bg-white/[0.04] overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${diff.color}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${diff.percent}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 h-3 rounded-full bg-white/[0.04] overflow-hidden flex">
                  <motion.div
                    className="h-full bg-emerald-400"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${easyPercent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  />
                  <motion.div
                    className="h-full bg-yellow-400"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${mediumPercent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                  <motion.div
                    className="h-full bg-red-400"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${hardPercent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  />
                </div>
              </div>

              <div className="glass-card p-6">
                <h4 className="text-sm font-semibold text-text mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-accent" /> Recent Submissions
                </h4>
                <div className="space-y-3">
                  {data.recentSubmissions.length === 0 && (
                    <p className="text-sm text-muted text-center py-6">
                      No recent submissions
                    </p>
                  )}
                  {data.recentSubmissions.map((sub, i) => (
                    <motion.a
                      key={sub.titleSlug + i}
                      href={`https://leetcode.com/problems/${sub.titleSlug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2.5 rounded-lg hover:bg-white/[0.02] transition-colors group"
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <div className="flex items-center gap-2.5 flex-1 min-w-0">
                        <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                        <span className="text-sm text-text truncate group-hover:text-primary transition-colors">
                          {sub.title}
                        </span>
                      </div>
                      <span className="text-xs text-muted flex-shrink-0 ml-3">
                        {getRelativeTime(sub.timestamp)}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {data.skillTags && data.skillTags.length > 0 && (
              <div className="glass-card p-6 mb-8">
                <h4 className="text-sm font-semibold text-text mb-4 flex items-center gap-2">
                  <Code className="w-4 h-4 text-primary" /> Topics
                </h4>
                <div className="flex flex-wrap gap-2">
                  {data.skillTags.map((tag) => (
                    <span
                      key={tag.name}
                      className={`px-3 py-1.5 rounded-full text-xs border ${
                        tag.level === "Advanced"
                          ? "bg-red-500/10 border-red-500/20 text-red-400"
                          : tag.level === "Intermediate"
                            ? "bg-yellow-500/10 border-yellow-500/20 text-yellow-400"
                            : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                      }`}
                    >
                      {tag.name} · {tag.solved}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {data.badges && data.badges.length > 0 && (
              <motion.div
                className="glass-card p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h4 className="text-sm font-semibold text-text mb-4 flex items-center gap-2">
                  <Medal className="w-4 h-4 text-yellow-400" /> Badges
                </h4>
                <div className="flex flex-wrap gap-3">
                  {data.badges.map((badge) => (
                    <motion.div
                      key={badge.id}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.02] border border-white/[0.05] hover:border-primary/30 transition-all cursor-default group"
                      whileHover={{ y: -2 }}
                    >
                      {badge.icon && (
                        <img
                          src={badge.icon}
                          alt={badge.name}
                          className="w-6 h-6 rounded group-hover:scale-110 transition-transform"
                        />
                      )}
                      <span className="text-xs text-muted group-hover:text-text transition-colors">
                        {badge.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
