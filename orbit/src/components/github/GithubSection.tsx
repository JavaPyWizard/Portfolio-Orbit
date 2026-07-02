"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Github,
  ExternalLink,
  Star,
  GitFork,
  BookOpen,
  Users,
  GitCommit,
  Flame,
  Trophy,
  CheckCircle,
  Clock,
} from "lucide-react";

const GITHUB_USERNAME = "JavaPyWizard";
const CACHE_KEY = "orbit-github-data";
const CACHE_DURATION = 30 * 60 * 1000;

interface GitHubUser {
  login: string;
  avatar_url: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  topics: string[];
}

interface GitHubEvent {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
  payload: any;
}

function getRelativeTime(dateString: string): string {
  const now = Date.now();
  const diff = now - new Date(dateString).getTime();
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

function getEventIcon(type: string) {
  switch (type) {
    case "PushEvent":
      return <GitCommit className="w-4 h-4 text-success" />;
    case "PullRequestEvent":
      return <GitFork className="w-4 h-4 text-accent" />;
    case "WatchEvent":
      return <Star className="w-4 h-4 text-yellow-400" />;
    case "ForkEvent":
      return <GitFork className="w-4 h-4 text-secondary" />;
    default:
      return <CheckCircle className="w-4 h-4 text-muted" />;
  }
}

function getEventAction(event: GitHubEvent): string {
  switch (event.type) {
    case "PushEvent":
      return `Pushed to ${event.repo.name.split("/")[1] || event.repo.name}`;
    case "PullRequestEvent":
      return `Pull request in ${event.repo.name}`;
    case "WatchEvent":
      return `Starred ${event.repo.name}`;
    case "ForkEvent":
      return `Forked ${event.repo.name}`;
    case "CreateEvent":
      return `Created repository`;
    default:
      return `Activity in ${event.repo.name}`;
  }
}

function ContributionGrid() {
  const [days, setDays] = useState<{ date: string; count: number }[]>([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://github-contributions-api.jogruber.de/v4/JavaPyWizard?y=last")
      .then((r) => r.json())
      .then((data) => {
        const allDays: { date: string; count: number }[] = [];
        let total = 0;
        data.contributions.forEach((week: any) => {
          week.forEach((day: any) => {
            if (day) {
              allDays.push({ date: day.date, count: day.count || 0 });
              total += day.count || 0;
            }
          });
        });
        setDays(allDays.slice(-371));
        setTotalContributions(total);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="glass-card p-6 animate-pulse">
        <div className="h-[120px] bg-white/[0.02] rounded-lg" />
      </div>
    );
  }

  if (days.length === 0) return null;

  const weeks: { date: string; count: number }[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  function getColor(count: number): string {
    if (count === 0) return "rgba(255,255,255,0.03)";
    if (count <= 2) return "rgba(59,130,246,0.2)";
    if (count <= 5) return "rgba(59,130,246,0.4)";
    if (count <= 10) return "rgba(59,130,246,0.65)";
    return "rgba(59,130,246,0.9)";
  }

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-text">Contribution Graph</h4>
        <span className="text-xs text-muted font-mono">
          {totalContributions} contributions
        </span>
      </div>
      <div className="flex gap-[3px] overflow-x-auto pb-2 justify-center md:justify-start">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px] flex-shrink-0">
            {week.map((day, di) => (
              <motion.div
                key={`${wi}-${di}`}
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: getColor(day.count) }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (wi * 7 + di) * 0.0005 }}
                title={`${day.count} contributions on ${day.date}`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1 mt-3 justify-end text-[10px] text-muted/50">
        <span>Less</span>
        {[0, 2, 5, 10, 20].map((level) => (
          <div
            key={level}
            className="w-3 h-3 rounded-sm"
            style={{ backgroundColor: getColor(level) }}
          />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}

function LanguageBar({ repos }: { repos: GitHubRepo[] }) {
  const languages: Record<string, number> = {};
  let total = 0;

  repos
    .filter((r) => !r.fork && r.language)
    .forEach((r) => {
      languages[r.language] = (languages[r.language] || 0) + 1;
      total++;
    });

  const sorted = Object.entries(languages)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const barColors: Record<string, string> = {
    Java: "bg-orange-500",
    Python: "bg-blue-500",
    JavaScript: "bg-yellow-400",
    TypeScript: "bg-blue-600",
    C: "bg-gray-400",
    "C++": "bg-pink-500",
    HTML: "bg-red-500",
    CSS: "bg-purple-500",
    SQL: "bg-cyan-500",
  };

  if (sorted.length === 0) return null;

  return (
    <div className="glass-card p-6">
      <h4 className="text-sm font-semibold text-text mb-4">Languages</h4>
      <div className="space-y-3">
        {sorted.map(([lang, count]) => {
          const percent = Math.round((count / total) * 100);
          return (
            <div key={lang}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-text">{lang}</span>
                <span className="text-muted font-mono">{percent}%</span>
              </div>
              <div className="h-2 rounded-full bg-white/[0.04] overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${barColors[lang] || "bg-primary"}`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${percent}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function GithubSection() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [contributions, setContributions] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGitHubData();
  }, []);

  const fetchGitHubData = async () => {
    setLoading(true);
    setError(null);

    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
          setUser(data.user);
          setRepos(data.repos);
          setEvents(data.events);
          setContributions(data.contributions || 0);
          setLoading(false);
          return;
        }
      } catch {}
    }

    try {
      const [userRes, reposRes, eventsRes] = await Promise.all([
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
        fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=10`,
        ),
        fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=6`,
        ),
      ]);

      if (userRes.status === 403 || userRes.status === 429) {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { data } = JSON.parse(cached);
          setUser(data.user);
          setRepos(data.repos);
          setEvents(data.events);
          setError("Using cached data");
        } else {
          setError("Rate limited. Try again later.");
        }
        setLoading(false);
        return;
      }

      const userData = userRes.ok ? await userRes.json() : null;
      const reposData = reposRes.ok ? await reposRes.json() : [];
      const eventsData = eventsRes.ok ? await eventsRes.json() : [];

      if (!userData) throw new Error("Failed to load");

      // Get total contributions from events (approximate)
      let contribCount = userData.public_repos * 5;

      setUser(userData);
      setRepos(reposData);
      setEvents(eventsData);
      setContributions(contribCount);
      setLoading(false);

      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          data: {
            user: userData,
            repos: reposData,
            events: eventsData,
            contributions: contribCount,
          },
          timestamp: Date.now(),
        }),
      );
    } catch (err: any) {
      console.error("GitHub error:", err);
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data } = JSON.parse(cached);
        setUser(data.user);
        setRepos(data.repos);
        setEvents(data.events);
        setError("Using cached data");
      } else {
        setError("Unable to load");
      }
      setLoading(false);
    }
  };

  const topRepos = repos
    .filter((r) => !r.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 4);

  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
  const totalForks = repos.reduce((sum, r) => sum + r.forks_count, 0);

  return (
    <section className="relative min-h-screen py-24 z-10" id="github">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs text-muted uppercase tracking-widest font-medium mb-4">
            Open Source
          </p>
          <div className="flex items-center gap-3 mb-2">
            <Github className="w-7 h-7 text-primary" />
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              GitHub <span className="text-primary">Activity</span>
            </h2>
          </div>
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-accent transition-colors mt-1"
          >
            @{GITHUB_USERNAME} <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="animate-pulse space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-white/[0.02] rounded-xl" />
              ))}
            </div>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="glass-card p-8 text-center mb-8">
            <p className="text-muted text-sm">{error}</p>
          </div>
        )}

        {/* Data */}
        {!loading && user && (
          <>
            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="glass-card p-4 text-center">
                <Star className="w-5 h-5 text-yellow-400 mx-auto mb-2" />
                <p className="text-2xl font-bold glow-text">{totalStars}</p>
                <p className="text-xs text-muted">Stars</p>
              </div>
              <div className="glass-card p-4 text-center">
                <GitFork className="w-5 h-5 text-accent mx-auto mb-2" />
                <p className="text-2xl font-bold glow-text">{totalForks}</p>
                <p className="text-xs text-muted">Forks</p>
              </div>
              <div className="glass-card p-4 text-center">
                <BookOpen className="w-5 h-5 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold glow-text">
                  {user.public_repos}
                </p>
                <p className="text-xs text-muted">Repositories</p>
              </div>
              <div className="glass-card p-4 text-center">
                <Users className="w-5 h-5 text-secondary mx-auto mb-2" />
                <p className="text-2xl font-bold glow-text">{user.followers}</p>
                <p className="text-xs text-muted">Followers</p>
              </div>
            </div>

            {/* Top Repos */}
            <h3 className="text-lg font-semibold mb-4 text-text">
              Top Repositories
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {topRepos.map((repo, i) => (
                <motion.a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card p-5 hover:border-primary/30 transition-all group block"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-text group-hover:text-primary transition-colors truncate pr-4">
                      {repo.name}
                    </h4>
                    <div className="flex items-center gap-3 text-xs text-muted flex-shrink-0">
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3" /> {repo.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="w-3 h-3" /> {repo.forks_count}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted mb-3 line-clamp-2">
                    {repo.description || "No description"}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {repo.language && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                        {repo.language}
                      </span>
                    )}
                    {repo.topics?.slice(0, 3).map((topic: string) => (
                      <span
                        key={topic}
                        className="text-xs px-2 py-0.5 rounded-full bg-white/[0.03] text-muted border border-white/[0.05]"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Language Bar + Recent Activity */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <LanguageBar repos={repos} />

              <div className="glass-card p-6">
                <h4 className="text-sm font-semibold text-text mb-4">
                  Recent Activity
                </h4>
                <div className="space-y-3">
                  {events.length === 0 && (
                    <p className="text-sm text-muted text-center py-4">
                      No recent activity
                    </p>
                  )}
                  {events.slice(0, 5).map((event) => (
                    <div key={event.id} className="flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0">
                        {getEventIcon(event.type)}
                      </div>
                      <div className="flex-1 min-w-0 flex items-center justify-between">
                        <p className="text-sm text-text truncate">
                          {getEventAction(event)}
                        </p>
                        <span className="text-xs text-muted flex-shrink-0 ml-3 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {getRelativeTime(event.created_at)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contribution Graph */}
            <ContributionGrid />
          </>
        )}
      </div>
    </section>
  );
}
