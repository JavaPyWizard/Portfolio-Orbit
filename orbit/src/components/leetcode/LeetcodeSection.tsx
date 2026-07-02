'use client'

import { motion } from 'framer-motion'
import { Terminal, Trophy, Target, TrendingUp, Code, CheckCircle, ExternalLink } from 'lucide-react'

const leetcodeStats = {
  username: 'divyansh',
  totalSolved: 520,
  easy: 180,
  medium: 280,
  hard: 60,
  contestRating: 1750,
  globalRank: 'Top 15%',
  streak: 45,
  badges: ['Dynamic Programming', 'Graph Algorithms', 'SQL', 'Binary Search', 'Tree'],
}

const recentProblems = [
  { name: 'Longest Increasing Path in a Matrix', difficulty: 'Hard', date: 'Today' },
  { name: 'Course Schedule IV', difficulty: 'Medium', date: 'Yesterday' },
  { name: 'Number of Islands', difficulty: 'Medium', date: '2 days ago' },
  { name: 'Merge k Sorted Lists', difficulty: 'Hard', date: '3 days ago' },
  { name: 'Valid Parentheses', difficulty: 'Easy', date: '4 days ago' },
]

export default function LeetcodeSection() {
  const total = leetcodeStats.totalSolved
  const easyPercent = (leetcodeStats.easy / total) * 100
  const mediumPercent = (leetcodeStats.medium / total) * 100
  const hardPercent = (leetcodeStats.hard / total) * 100

  return (
    <section className="relative min-h-screen py-24 z-10" id="leetcode">
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
              LeetCode <span className="glow-text">Stats</span>
            </h2>
          </div>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Data structures, algorithms, and problem-solving practice.
          </p>
          <a
            href={`https://leetcode.com/${leetcodeStats.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-primary hover:text-accent transition-colors text-sm"
          >
            @{leetcodeStats.username} <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Stats Cards */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Total Solved', value: leetcodeStats.totalSolved, icon: CheckCircle },
                { label: 'Contest Rating', value: leetcodeStats.contestRating, icon: Trophy },
                { label: 'Global Rank', value: leetcodeStats.globalRank, icon: Target },
                { label: 'Day Streak', value: leetcodeStats.streak, icon: TrendingUp },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="glass-card p-4 text-center hover:border-primary/30 transition-all"
                >
                  <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold glow-text">{stat.value}</p>
                  <p className="text-xs text-muted">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Difficulty Distribution */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">Problem Distribution</h3>
              <div className="space-y-4">
                {[
                  { label: 'Easy', count: leetcodeStats.easy, color: 'bg-success', percent: easyPercent },
                  { label: 'Medium', count: leetcodeStats.medium, color: 'bg-yellow-500', percent: mediumPercent },
                  { label: 'Hard', count: leetcodeStats.hard, color: 'bg-danger', percent: hardPercent },
                ].map((diff) => (
                  <div key={diff.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted">{diff.label}</span>
                      <span className="text-text font-mono">{diff.count}</span>
                    </div>
                    <div className="h-2 rounded-full bg-surface overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${diff.color}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${diff.percent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 h-3 rounded-full bg-surface overflow-hidden flex">
                <div className="bg-success" style={{ width: `${easyPercent}%` }} />
                <div className="bg-yellow-500" style={{ width: `${mediumPercent}%` }} />
                <div className="bg-danger" style={{ width: `${hardPercent}%` }} />
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Badges */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                Badges
              </h3>
              <div className="flex flex-wrap gap-2">
                {leetcodeStats.badges.map((badge) => (
                  <span
                    key={badge}
                    className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Code className="w-5 h-5 text-accent" />
                Recent Problems
              </h3>
              <div className="space-y-3">
                {recentProblems.map((problem, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-primary/5 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-text truncate">{problem.name}</p>
                      <p className="text-xs text-muted">{problem.date}</p>
                    </div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ml-2 ${
                        problem.difficulty === 'Easy'
                          ? 'bg-success/10 text-success'
                          : problem.difficulty === 'Medium'
                          ? 'bg-yellow-500/10 text-yellow-500'
                          : 'bg-danger/10 text-danger'
                      }`}
                    >
                      {problem.difficulty}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}