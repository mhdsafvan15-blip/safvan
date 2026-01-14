import React, { useState, useEffect, useMemo } from "react";
import StarsBackground from "./StarsBackground";
import "../Style/Skill.css";
import { FaJs, FaHtml5, FaCss3Alt, FaGitAlt } from "react-icons/fa";
import { SiDart, SiFlutter } from "react-icons/si";
import { motion } from "framer-motion";

// Move static data outside to optimize performance
const SKILLS = [
  { name: "Javascript", icon: <FaJs />, color: "#F7DF1E" },
  { name: "HTML", icon: <FaHtml5 />, color: "#E34F26" },
  { name: "CSS", icon: <FaCss3Alt />, color: "#1572B6" },
  { name: "Dart", icon: <SiDart />, color: "#61DAFB" },
  { name: "Git", icon: <FaGitAlt />, color: "#F05032" },
  { name: "Flutter", icon: <SiFlutter />, color: "#764ABC" },
];

const CONTAINER_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const SKILL_ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 10 },
  },
  hover: {
    y: -5,
    scale: 1.05,
    transition: { type: "spring", stiffness: 400, damping: 17 },
  },
};

const TITLE_VARIANTS = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, delay: 0.1 },
  },
};

const CONTRIBUTION_DAY_VARIANTS = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.003, type: "spring", stiffness: 200, damping: 20 },
  }),
  hover: { scale: 1.3, transition: { type: "spring", stiffness: 400, damping: 10 } },
};

const CALENDAR_VARIANTS = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.01, delayChildren: 0.3 } },
};

const Skill = () => {
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalContributions, setTotalContributions] = useState(0);

  useEffect(() => {
    fetchGitHubData();
  }, []);

  const getColor = (count) => {
    if (count === 0) return "rgba(255, 255, 255, 0.1)";
    if (count === 1) return "#80e5ff";
    if (count === 2) return "#00d4ff";
    if (count === 3) return "#00a8cc";
    return "#0077b6";
  };

  const getRealisticMockData = () => {
    const data = [];
    const today = new Date();
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const count = Math.floor(Math.random() * 5); // Simplified for logic
      data.push({ date: date.toISOString().split("T")[0], count });
    }
    return data;
  };

  const useDemoData = (msg) => {
    const demo = getRealisticMockData();
    setContributions(demo);
    setTotalContributions(demo.reduce((a, b) => a + b.count, 0));
    setError(msg);
    setLoading(false);
  };

  const fetchGitHubData = async () => {
    const token = process.env.REACT_APP_GITHUB_TOKEN;

    if (!token) {
      useDemoData("No Token Found");
      return;
    }

    try {
      const response = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `query { user(login: "naheel0") { contributionsCollection { contributionCalendar { totalContributions weeks { contributionDays { contributionCount date } } } } } }`,
        }),
      });

      const result = await response.json();
      if (result.errors || !result.data) throw new Error("API Error");

      const calendar = result.data.user.contributionsCollection.contributionCalendar;
      const flatDays = calendar.weeks.flatMap(w => w.contributionDays.map(d => ({
        date: d.date,
        count: d.contributionCount
      })));

      setContributions(flatDays);
      setTotalContributions(calendar.totalContributions);
      setLoading(false);
    } catch (err) {
      useDemoData(err.message);
    }
  };

  if (loading) {
    return (
      <div className="main-bg">
        <StarsBackground />
        <div className="loading-container">Loading Activity...</div>
      </div>
    );
  }

  return (
    <div className="main-bg">
      <StarsBackground />

      <section className="skills-section">
        <div className="container">
          <motion.h2 className="skills-title" variants={TITLE_VARIANTS} initial="hidden" animate="visible">
            Professional <span>Skillset</span>
          </motion.h2>
          <motion.div className="skills-grid" variants={CONTAINER_VARIANTS} initial="hidden" animate="visible">
            {SKILLS.map((skill, index) => (
              <motion.div key={index} className="skill-item" variants={SKILL_ITEM_VARIANTS} whileHover="hover">
                <motion.div className="skill-icon" style={{ color: skill.color }} whileHover={{ rotate: 360 }}>
                  {skill.icon}
                </motion.div>
                <div className="skill-name">{skill.name}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="contributions-section">
        <motion.h2 className="contributions-title" variants={TITLE_VARIANTS} initial="hidden" animate="visible">
          Days I Spent <span>Coding</span>
        </motion.h2>

        <motion.div className="calendar-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <motion.div className="calendar-grid" variants={CALENDAR_VARIANTS} initial="hidden" animate="visible">
            {contributions.map((day, i) => (
              <motion.div
                key={i}
                className="contribution-day"
                style={{ backgroundColor: getColor(day.count) }}
                variants={CONTRIBUTION_DAY_VARIANTS}
                custom={i}
                whileHover="hover"
                title={`${day.count} contributions on ${day.date}`}
              />
            ))}
          </motion.div>
          
          <div className="calendar-footer">
             <div className="calendar-legend">
                <span>Less</span>
                {[0, 1, 2, 3, 4].map(v => (
                  <div key={v} className="legend-color" style={{ backgroundColor: getColor(v) }} />
                ))}
                <span>More</span>
             </div>
             <div className="contributions-count">
               <strong>{totalContributions.toLocaleString()}</strong> contributions last year
             </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Skill;