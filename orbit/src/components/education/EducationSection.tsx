"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  School,
  ChevronRight,
  X,
  Calendar,
  Lock,
} from "lucide-react";

// ===== DATA =====
const educationData = [
  {
    id: "school",
    title: "Schooling",
    institution: "Boy's High School & College",
    location: "Prayagraj, Uttar Pradesh",
    period: "2011 - 2022",
    icon: School,
    accentColor: "#3B82F6",
    summary: "ICSE 10th — 91.17% | ISC 12th — 72.00%",
    details: {
      tenth: {
        board: "ICSE",
        year: "2020",
        percentage: "91.17%",
        total: "547/600",
        subjects: [
          { name: "English", marks: 93 },
          { name: "Hindi", marks: 90 },
          { name: "History, Civics & Geography", marks: 88 },
          { name: "Mathematics", marks: 97 },
          { name: "Science", marks: 83 },
          { name: "Computer Applications", marks: 99 },
        ],
        scienceBreakdown: [
          { name: "Physics", marks: 79 },
          { name: "Chemistry", marks: 80 },
          { name: "Biology", marks: 91 },
        ],
      },
      twelfth: {
        board: "ISC",
        year: "2022",
        percentage: "72.00%",
        total: "360/500",
        subjects: [
          { name: "English", marks: 87 },
          { name: "Mathematics", marks: 66 },
          { name: "Physics", marks: 61 },
          { name: "Chemistry", marks: 55 },
          { name: "Computer Science", marks: 91 },
        ],
      },
    },
  },
  {
    id: "bachelors",
    title: "Bachelor of Technology",
    institution: "UPES",
    location: "Dehradun, Uttarakhand",
    period: "2024 - 2028",
    icon: GraduationCap,
    accentColor: "#8B5CF6",
    summary: "Computer Science & Engineering · CGPA 8.18",
    details: {
      semesters: [
        {
          sem: "Semester 1",
          result: "Pass",
          credits: 22,
          sgpa: "8.82",
          courses: [
            {
              code: "MATH1059",
              name: "Advanced Engineering Mathematics - I",
              credits: 4,
              grade: "A",
            },
            {
              code: "PHYS1036",
              name: "Physics for Computer Engineers",
              credits: 5,
              grade: "A",
            },
            {
              code: "CSEG1027",
              name: "Problem Solving",
              credits: 2,
              grade: "A+",
            },
            { code: "CSEG1126", name: "Linux Lab", credits: 2, grade: "A+" },
            {
              code: "SSEN0101",
              name: "Environment Sustainability & Climate Change",
              credits: 2,
              grade: "A+",
            },
            {
              code: "CSEG1041",
              name: "Programming in C",
              credits: 5,
              grade: "O",
            },
            {
              code: "SFLS0001",
              name: "Managing Self",
              credits: 2,
              grade: "A+",
            },
          ],
        },
        {
          sem: "Semester 2",
          result: "Pass",
          credits: 23,
          sgpa: "8.74",
          courses: [
            {
              code: "ECEG1012",
              name: "Digital Electronics",
              credits: 3,
              grade: "A+",
            },
            {
              code: "CSEG1032",
              name: "Computer Organization and Architecture",
              credits: 3,
              grade: "A",
            },
            {
              code: "CSEG1043",
              name: "Data Structures and Algorithms",
              credits: 5,
              grade: "A",
            },
            {
              code: "SFLS0002",
              name: "Time & Priority Management",
              credits: 2,
              grade: "O",
            },
            {
              code: "SSEN0102",
              name: "Environment Sustainability & Climate Change (Lab)",
              credits: 2,
              grade: "A+",
            },
            {
              code: "MATH1065",
              name: "Advanced Engineering Mathematics - II",
              credits: 4,
              grade: "A",
            },
            {
              code: "CSEG1021",
              name: "Python Programming",
              credits: 4,
              grade: "O",
            },
          ],
        },
        {
          sem: "Semester 3",
          result: "Pass",
          credits: 23,
          sgpa: "8.22",
          courses: [
            {
              code: "CSEG2060",
              name: "Operating Systems",
              credits: 3,
              grade: "A",
            },
            {
              code: "SLLS2001",
              name: "Social Internship",
              credits: 0,
              grade: "S",
            },
            {
              code: "SOB20B001",
              name: "Introduction to Management",
              credits: 3,
              grade: "O",
            },
            {
              code: "SFLS0003",
              name: "Leading Conversations",
              credits: 2,
              grade: "O",
            },
            {
              code: "CSEG3053",
              name: "Design and Analysis of Algorithms",
              credits: 4,
              grade: "A",
            },
            {
              code: "CSEG2072",
              name: "Database Management Systems",
              credits: 5,
              grade: "B+",
            },
            {
              code: "CSEG2006",
              name: "Discrete Mathematical Structures",
              credits: 3,
              grade: "A",
            },
            {
              code: "CSAI2018",
              name: "Elements of AI/ML",
              credits: 3,
              grade: "A",
            },
          ],
        },
        {
          sem: "Semester 4",
          result: "Pass",
          credits: 27,
          sgpa: "7.15",
          courses: [
            {
              code: "SLLS2004",
              name: "Indian Constitution",
              credits: 0,
              grade: "S",
            },
            {
              code: "EMPL002",
              name: "EDGE - SoftSkills",
              credits: 0,
              grade: "S",
            },
            {
              code: "INTB2021",
              name: "Foreign Trade and Policies",
              credits: 3,
              grade: "A",
            },
            {
              code: "SFLS0004",
              name: "Writing with Impact",
              credits: 2,
              grade: "O",
            },
            {
              code: "INTB2022",
              name: "Trade Documentation & Customs",
              credits: 3,
              grade: "B+",
            },
            {
              code: "MATH2059",
              name: "Linear Algebra",
              credits: 3,
              grade: "B",
            },
            {
              code: "CSAI2017P",
              name: "Applied Machine Learning",
              credits: 5,
              grade: "B",
            },
            {
              code: "CSEG2065",
              name: "Data Communication and Networks",
              credits: 4,
              grade: "C+",
            },
            {
              code: "CSEG1044",
              name: "Object Oriented Programming",
              credits: 4,
              grade: "A+",
            },
            {
              code: "CSEG2064",
              name: "Software Engineering",
              credits: 3,
              grade: "A",
            },
          ],
        },
      ],
    },
  },
];

function gradeColor(grade: string) {
  switch (grade) {
    case "O":
      return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
    case "A+":
      return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
    case "A":
      return "text-green-400 bg-green-400/10 border-green-400/20";
    case "B+":
      return "text-blue-400 bg-blue-400/10 border-blue-400/20";
    case "B":
      return "text-sky-400 bg-sky-400/10 border-sky-400/20";
    case "C+":
      return "text-amber-400 bg-amber-400/10 border-amber-400/20";
    case "S":
      return "text-violet-400 bg-violet-400/10 border-violet-400/20";
    default:
      return "text-muted bg-surface border-muted/20";
  }
}

function getGradeFromMarks(marks: number) {
  if (marks >= 95)
    return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
  if (marks >= 90)
    return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
  if (marks >= 80) return "text-green-400 bg-green-400/10 border-green-400/20";
  if (marks >= 70) return "text-blue-400 bg-blue-400/10 border-blue-400/20";
  return "text-amber-400 bg-amber-400/10 border-amber-400/20";
}

function getGradeLabel(marks: number) {
  if (marks >= 95) return "A+";
  if (marks >= 90) return "A";
  if (marks >= 80) return "B+";
  if (marks >= 70) return "B";
  return "C";
}

function getGradeFromPercentage(pct: number) {
  if (pct >= 90) return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
  if (pct >= 80)
    return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
  if (pct >= 70) return "text-green-400 bg-green-400/10 border-green-400/20";
  if (pct >= 60) return "text-blue-400 bg-blue-400/10 border-blue-400/20";
  return "text-amber-400 bg-amber-400/10 border-amber-400/20";
}

function getGradeLabelFromPercentage(pct: number) {
  if (pct >= 90) return "A+";
  if (pct >= 80) return "A";
  if (pct >= 70) return "B+";
  if (pct >= 60) return "B";
  return "C";
}

function TenthResult({ data }: { data: any }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="overflow-hidden rounded-lg border border-white/5">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-white/[0.02]">
              <th className="text-left px-5 py-3 text-xs font-medium text-muted uppercase tracking-wider">
                Subject
              </th>
              <th className="text-right px-5 py-3 text-xs font-medium text-muted uppercase tracking-wider w-24">
                Marks
              </th>
              <th className="text-right px-5 py-3 text-xs font-medium text-muted uppercase tracking-wider w-20">
                Grade
              </th>
            </tr>
          </thead>
          <tbody>
            {data.subjects.map((sub: any) => (
              <tr
                key={sub.name}
                className="border-t border-white/[0.02] hover:bg-white/[0.02] transition-colors"
              >
                <td className="px-5 py-3 text-text text-sm">{sub.name}</td>
                <td className="px-5 py-3 text-right font-mono text-sm text-text">
                  {sub.marks}
                </td>
                <td className="px-5 py-3 text-right">
                  <span
                    className={`inline-flex px-2 py-0.5 rounded text-xs font-mono font-medium border ${getGradeFromMarks(sub.marks)}`}
                  >
                    {getGradeLabel(sub.marks)}
                  </span>
                </td>
              </tr>
            ))}
            <tr className="border-t border-white/10 bg-white/[0.03]">
              <td className="px-5 py-3.5 text-sm font-semibold text-text">
                Overall
              </td>
              <td className="px-5 py-3.5 text-right font-mono text-sm font-semibold text-text">
                {data.total}
              </td>
              <td className="px-5 py-3.5 text-right font-mono text-sm font-bold text-primary">
                {data.percentage}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-4 p-4 rounded-lg bg-white/[0.02] border border-white/[0.03]">
        <p className="text-[11px] text-muted uppercase tracking-wider font-medium mb-3">
          Science Breakdown
        </p>
        <div className="grid grid-cols-3 gap-3">
          {data.scienceBreakdown.map((sub: any) => (
            <div
              key={sub.name}
              className="text-center p-3 rounded-md bg-background/50"
            >
              <p className="text-[11px] text-muted uppercase tracking-wider">
                {sub.name}
              </p>
              <p className="text-xl font-bold text-text mt-1">{sub.marks}</p>
              <p className="text-[10px] text-muted">/ 100</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function TwelfthResult({ data }: { data: any }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="overflow-hidden rounded-lg border border-white/5">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-white/[0.02]">
              <th className="text-left px-5 py-3 text-xs font-medium text-muted uppercase tracking-wider">
                Subject
              </th>
              <th className="text-right px-5 py-3 text-xs font-medium text-muted uppercase tracking-wider w-24">
                Marks
              </th>
              <th className="text-right px-5 py-3 text-xs font-medium text-muted uppercase tracking-wider w-20">
                Grade
              </th>
            </tr>
          </thead>
          <tbody>
            {data.subjects.map((sub: any) => (
              <tr
                key={sub.name}
                className="border-t border-white/[0.02] hover:bg-white/[0.02] transition-colors"
              >
                <td className="px-5 py-3 text-text text-sm">{sub.name}</td>
                <td className="px-5 py-3 text-right font-mono text-sm text-text">
                  {sub.marks}
                </td>
                <td className="px-5 py-3 text-right">
                  <span
                    className={`inline-flex px-2 py-0.5 rounded text-xs font-mono font-medium border ${getGradeFromPercentage(sub.marks)}`}
                  >
                    {getGradeLabelFromPercentage(sub.marks)}
                  </span>
                </td>
              </tr>
            ))}
            <tr className="border-t border-white/10 bg-white/[0.03]">
              <td className="px-5 py-3.5 text-sm font-semibold text-text">
                Overall
              </td>
              <td className="px-5 py-3.5 text-right font-mono text-sm font-semibold text-text">
                {data.total}
              </td>
              <td className="px-5 py-3.5 text-right font-mono text-sm font-bold text-primary">
                {data.percentage}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

function SemesterDetail({ semester }: { semester: any }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      key={semester.sem}
    >
      <div className="flex items-center gap-6 mb-6">
        <div>
          <p className="text-xs text-muted uppercase tracking-wider">SGPA</p>
          <p className="text-2xl font-bold text-text font-mono">
            {semester.sgpa}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted uppercase tracking-wider">Credits</p>
          <p className="text-2xl font-bold text-text font-mono">
            {semester.credits}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted uppercase tracking-wider">Result</p>
          <p className="text-2xl font-bold text-emerald-400">
            {semester.result}
          </p>
        </div>
      </div>
      <div className="overflow-hidden rounded-lg border border-white/5">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-white/[0.02]">
              <th className="text-left px-5 py-3 text-xs font-medium text-muted uppercase tracking-wider">
                Course
              </th>
              <th className="text-center px-5 py-3 text-xs font-medium text-muted uppercase tracking-wider w-16">
                Cr
              </th>
              <th className="text-right px-5 py-3 text-xs font-medium text-muted uppercase tracking-wider w-20">
                Grade
              </th>
            </tr>
          </thead>
          <tbody>
            {semester.courses.map((course: any, j: number) => (
              <tr
                key={j}
                className="border-t border-white/[0.02] hover:bg-white/[0.02] transition-colors"
              >
                <td className="px-5 py-3">
                  <p className="text-text text-sm">{course.name}</p>
                  <p className="text-[10px] text-muted font-mono mt-0.5">
                    {course.code}
                  </p>
                </td>
                <td className="px-5 py-3 text-center font-mono text-sm text-muted">
                  {course.credits}
                </td>
                <td className="px-5 py-3 text-right">
                  <span
                    className={`inline-flex px-2 py-0.5 rounded text-xs font-mono font-semibold border ${gradeColor(course.grade)}`}
                  >
                    {course.grade}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

export default function EducationSection() {
  const [selectedEdu, setSelectedEdu] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [activeSchoolTab, setActiveSchoolTab] = useState<"10th" | "12th">(
    "10th",
  );
  const [activeSemester, setActiveSemester] = useState<number>(0);

  const handleCardClick = (id: string) => {
    if (selectedEdu === id) {
      setShowDetails(false);
      setTimeout(() => setSelectedEdu(null), 350);
    } else {
      setSelectedEdu(id);
      if (id === "school") setActiveSchoolTab("10th");
      if (id === "bachelors") setActiveSemester(0);
      setTimeout(() => setShowDetails(true), 150);
    }
  };

  const handleSchoolTab = (tab: "10th" | "12th") => {
    setActiveSchoolTab(tab);
    if (selectedEdu !== "school") {
      setSelectedEdu("school");
      setTimeout(() => setShowDetails(true), 150);
    }
  };

  const handleSemesterClick = (index: number) => {
    setActiveSemester(index);
    if (selectedEdu !== "bachelors") {
      setSelectedEdu("bachelors");
      setTimeout(() => setShowDetails(true), 150);
    }
  };

  const selected = educationData.find((e) => e.id === selectedEdu);

  return (
    <section className="relative min-h-screen py-24 z-10" id="education">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs text-muted uppercase tracking-widest font-medium mb-4">
            Academic Background
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Education
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {/* School Card */}
          <div>
            <motion.button
              onClick={() => handleCardClick("school")}
              className={`w-full text-left p-6 rounded-xl border transition-all duration-500 ${
                selectedEdu === "school"
                  ? "border-white/15 bg-white/[0.04]"
                  : "border-white/[0.05] bg-transparent hover:border-white/[0.1] hover:bg-white/[0.02]"
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                  <School className="w-5 h-5 text-primary/70" />
                </div>
                <ChevronRight
                  className={`w-4 h-4 text-muted/40 transition-all duration-300 ${
                    selectedEdu === "school" ? "rotate-90 text-primary" : ""
                  }`}
                />
              </div>
              <h3 className="text-lg font-semibold text-text mb-1">
                Schooling
              </h3>
              <p className="text-sm text-muted mb-1">
                Boy&apos;s High School & College
              </p>
              <p className="text-xs text-muted/60 mb-3">
                Prayagraj, Uttar Pradesh
              </p>
              <div className="flex items-center gap-2 text-xs text-muted/80">
                <Calendar className="w-3 h-3" />
                <span>2011 - 2022</span>
              </div>
              <div className="mt-3 pt-3 border-t border-white/[0.04]">
                <p className="text-xs text-primary/70 font-medium">
                  ICSE 10th — 91.17% | ISC 12th — 72.00%
                </p>
              </div>
            </motion.button>

            <div className="relative h-20 mt-3">
              {["10th", "12th"].map((tab, index) => (
                <motion.button
                  key={tab}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSchoolTab(tab as "10th" | "12th");
                  }}
                  className={`absolute px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-300 ${
                    selectedEdu === "school" && activeSchoolTab === tab
                      ? "bg-primary/20 border-primary/50 text-primary shadow-xl shadow-primary/20 z-20 scale-110"
                      : "bg-white/[0.04] border-white/[0.12] text-text/80 hover:border-white/25 hover:text-white hover:shadow-xl hover:shadow-white/10 z-10"
                  }`}
                  style={{
                    left: index === 0 ? "12%" : "52%",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                  animate={{
                    y: [0, -8, 0, 4, 0],
                    x: index === 0 ? [0, 8, -4, 6, 0] : [0, -6, 8, -4, 0],
                    rotate: [
                      0,
                      index === 0 ? 2 : -2,
                      0,
                      index === 0 ? -1 : 1,
                      0,
                    ],
                  }}
                  transition={{
                    y: {
                      repeat: Infinity,
                      duration: 4 + index,
                      ease: "easeInOut",
                    },
                    x: {
                      repeat: Infinity,
                      duration: 5 + index,
                      ease: "easeInOut",
                    },
                    rotate: {
                      repeat: Infinity,
                      duration: 6 + index,
                      ease: "easeInOut",
                    },
                  }}
                  whileHover={{
                    y: -15,
                    scale: 1.15,
                    boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
                    transition: { duration: 0.3, ease: "easeOut" },
                  }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <motion.span
                      className={`w-2 h-2 rounded-full ${selectedEdu === "school" && activeSchoolTab === tab ? "bg-primary" : "bg-white/50"}`}
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    />
                    {tab === "10th" ? "10th Result" : "12th Result"}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Bachelors Card */}
          <div>
            <motion.button
              onClick={() => handleCardClick("bachelors")}
              className={`w-full text-left p-6 rounded-xl border transition-all duration-500 ${
                selectedEdu === "bachelors"
                  ? "border-white/15 bg-white/[0.04]"
                  : "border-white/[0.05] bg-transparent hover:border-white/[0.1] hover:bg-white/[0.02]"
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-primary/70" />
                </div>
                <ChevronRight
                  className={`w-4 h-4 text-muted/40 transition-all duration-300 ${
                    selectedEdu === "bachelors" ? "rotate-90 text-primary" : ""
                  }`}
                />
              </div>
              <h3 className="text-lg font-semibold text-text mb-1">
                Bachelor of Technology
              </h3>
              <p className="text-sm text-muted mb-1">UPES</p>
              <p className="text-xs text-muted/60 mb-3">
                Dehradun, Uttarakhand
              </p>
              <div className="flex items-center gap-2 text-xs text-muted/80">
                <Calendar className="w-3 h-3" />
                <span>2024 - 2028</span>
              </div>
              <div className="mt-3 pt-3 border-t border-white/[0.04]">
                <p className="text-xs text-primary/70 font-medium">
                  Computer Science & Engineering · CGPA 8.18
                </p>
              </div>
            </motion.button>

            {/* Floating semester buttons - more spacious & dramatic */}
            <div className="relative h-32 mt-4">
              {[1, 2, 3, 4].map((sem, index) => {
                const positions = [
                  { left: "0%", top: "5%" },
                  { left: "32%", top: "58%" },
                  { left: "58%", top: "0%" },
                  { left: "82%", top: "50%" },
                ];
                const orbits = [
                  { xAmp: 15, yAmp: 12, xDur: 4.5, yDur: 3.8 },
                  { xAmp: -14, yAmp: -10, xDur: 4.2, yDur: 4.5 },
                  { xAmp: 12, yAmp: -13, xDur: 5, yDur: 4 },
                  { xAmp: -16, yAmp: 11, xDur: 4.8, yDur: 5 },
                ];
                return (
                  <motion.button
                    key={sem}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSemesterClick(sem - 1);
                    }}
                    className={`absolute px-5 py-3 rounded-full text-sm font-semibold border transition-all duration-300 whitespace-nowrap ${
                      selectedEdu === "bachelors" && activeSemester === sem - 1
                        ? "bg-primary/20 border-primary/50 text-primary shadow-xl shadow-primary/20 z-20 scale-110"
                        : "bg-white/[0.04] border-white/[0.12] text-text/80 hover:border-white/25 hover:text-white hover:shadow-xl hover:shadow-white/10 z-10"
                    }`}
                    style={{
                      left: positions[index].left,
                      top: positions[index].top,
                    }}
                    animate={{
                      x: [
                        0,
                        orbits[index].xAmp * 0.25,
                        -orbits[index].xAmp * 0.2,
                        orbits[index].xAmp * 0.15,
                        0,
                      ],

                      y: [
                        0,
                        -orbits[index].yAmp * 0.35,
                        orbits[index].yAmp * 0.25,
                        -orbits[index].yAmp * 0.15,
                        0,
                      ],

                      rotate: [
                        0,
                        index % 2 === 0 ? 3 : -3,
                        index % 2 === 0 ? -2 : 2,
                        0,
                      ],

                      scale: [1, 1.02, 1, 0.99, 1],
                    }}
                    transition={{
                      x: {
                        duration: 8 + index,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut",
                      },

                      y: {
                        duration: 7 + index * 0.8,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut",
                      },

                      rotate: {
                        duration: 10 + index,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut",
                      },

                      scale: {
                        duration: 5 + index * 0.3,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut",
                      },
                    }}
                    whileHover={{
                      y: -22,
                      scale: 1.2,
                      boxShadow: "0 25px 50px rgba(139, 92, 246, 0.4)",
                      transition: { duration: 0.3, ease: "easeOut" },
                    }}
                    whileTap={{ scale: 0.85 }}
                  >
                    <span className="relative z-10 flex items-center gap-2.5">
                      <motion.span
                        className={`w-2.5 h-2.5 rounded-full ${selectedEdu === "bachelors" && activeSemester === sem - 1 ? "bg-primary" : "bg-white/50"}`}
                        animate={{ scale: [1, 1.8, 1], opacity: [1, 0.3, 1] }}
                        transition={{
                          repeat: Infinity,
                          duration: 1.8,
                          delay: index * 0.3,
                        }}
                      />
                      {sem}
                      {sem === 1
                        ? "st"
                        : sem === 2
                          ? "nd"
                          : sem === 3
                            ? "rd"
                            : "th"}{" "}
                      Semester
                    </span>
                  </motion.button>
                );
              })}

              {/* Locked semesters */}
              {[5, 6, 7, 8].map((sem, index) => {
                const lockedPositions = [
                  { left: "5%", bottom: "5%" },
                  { left: "38%", bottom: "12%" },
                  { left: "62%", bottom: "3%" },
                  { left: "85%", bottom: "15%" },
                ];
                return (
                  <motion.div
                    key={sem}
                    className="absolute px-5 py-3 rounded-full text-sm font-medium border border-white/[0.04] bg-white/[0.015] text-muted/30 cursor-not-allowed flex items-center gap-2.5 whitespace-nowrap"
                    style={{
                      left: lockedPositions[index].left,
                      bottom: lockedPositions[index].bottom,
                    }}
                    animate={{
                      y: [0, -8, 0, 5, -3, 0],
                      x: [
                        0,
                        index % 2 === 0 ? 8 : -8,
                        index % 2 === 0 ? -5 : 5,
                        0,
                        index % 2 === 0 ? 4 : -4,
                        0,
                      ],
                    }}
                    transition={{
                      y: {
                        repeat: Infinity,
                        duration: 5 + index * 0.6,
                        ease: "easeInOut",
                        delay: index * 0.4,
                      },
                      x: {
                        repeat: Infinity,
                        duration: 6 + index * 0.5,
                        ease: "easeInOut",
                        delay: index * 0.5,
                      },
                    }}
                    title="Not yet unlocked"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    Semester {sem}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        <AnimatePresence>
          {selectedEdu && showDetails && selected && (
            <motion.div
              className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-8 overflow-hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                    <selected.icon className="w-4 h-4 text-primary/70" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-text">
                      {selected.title}
                    </h3>
                    <p className="text-xs text-muted">
                      {selected.institution} · {selected.location}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowDetails(false);
                    setTimeout(() => setSelectedEdu(null), 350);
                  }}
                  className="p-2 rounded-lg hover:bg-white/[0.04] transition-colors"
                >
                  <X className="w-4 h-4 text-muted" />
                </button>
              </div>

              {selected.id === "school" && (
                <>
                  <div className="flex gap-2 mb-8">
                    {["10th", "12th"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() =>
                          setActiveSchoolTab(tab as "10th" | "12th")
                        }
                        className={`px-5 py-2 rounded-lg text-sm font-medium border transition-all duration-300 ${
                          activeSchoolTab === tab
                            ? "bg-white/[0.06] border-white/15 text-text"
                            : "border-white/[0.04] text-muted hover:border-white/10 hover:text-text"
                        }`}
                      >
                        Class {tab} —{" "}
                        {tab === "10th" ? "ICSE 2020" : "ISC 2022"}
                      </button>
                    ))}
                  </div>
                  {activeSchoolTab === "10th" && (
                    <TenthResult data={selected.details.tenth} />
                  )}
                  {activeSchoolTab === "12th" && (
                    <TwelfthResult data={selected.details.twelfth} />
                  )}
                </>
              )}

              {selected.id === "bachelors" && (
                <>
                  <div className="flex gap-2 mb-8 flex-wrap">
                    {selected.details.semesters.map((sem: any, i: number) => (
                      <button
                        key={i}
                        onClick={() => setActiveSemester(i)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-300 ${
                          activeSemester === i
                            ? "bg-white/[0.06] border-white/15 text-text"
                            : "border-white/[0.04] text-muted hover:border-white/10 hover:text-text"
                        }`}
                      >
                        {sem.sem}{" "}
                        <span className="ml-2 text-xs text-muted font-mono">
                          {sem.sgpa}
                        </span>
                      </button>
                    ))}
                  </div>
                  <SemesterDetail
                    semester={selected.details.semesters[activeSemester]}
                  />
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
