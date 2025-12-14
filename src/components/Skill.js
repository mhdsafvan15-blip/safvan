import React, { Component } from "react";
import StarsBackground from "./StarsBackground";
import "../Style/Skill.css";
import {
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
} from "react-icons/fa";
import { SiDart, SiFlutter } from "react-icons/si";
import { motion } from "framer-motion";

export class Skill extends Component {
  state = {
    contributions: [],
    loading: true,
    error: null,
    totalContributions: 0,
  };

  componentDidMount() {
    this.fetchGitHubData();
  }

  fetchGitHubData = async () => {
    const token = process.env.REACT_APP_GITHUB_TOKEN;

    console.log("Environment:", process.env.NODE_ENV);
    console.log("GitHub token available:", !!token);

    if (!token) {
      console.log("No GitHub token found - using demo data");
      this.useDemoData(
        "Add REACT_APP_GITHUB_TOKEN to Vercel environment variables for real GitHub data"
      );
      return;
    }

    try {
      console.log("Fetching real GitHub contribution data...");

      const response = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "User-Agent": "Naheel-Portfolio",
        },
        body: JSON.stringify({
          query: `
            query {
              user(login: "naheel0") {
                contributionsCollection {
                  contributionCalendar {
                    totalContributions
                    weeks {
                      contributionDays {
                        contributionCount
                        date
                      }
                    }
                  }
                }
              }
            }
          `,
        }),
      });

      console.log("GitHub API response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`GitHub API returned ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      console.log("GitHub API response received");

      if (result.errors) {
        throw new Error(`GitHub API Error: ${result.errors[0].message}`);
      }

      if (!result.data || !result.data.user) {
        throw new Error("Invalid response format from GitHub API");
      }

      const calendarData =
        result.data.user.contributionsCollection.contributionCalendar;
      const contributions = [];
      let totalContributions = calendarData.totalContributions || 0;

      calendarData.weeks.forEach((week) => {
        week.contributionDays.forEach((day) => {
          contributions.push({
            date: day.date,
            count: day.contributionCount,
          });
        });
      });

      console.log("✅ Real GitHub data loaded successfully!", {
        totalContributions,
        contributionDays: contributions.length,
      });

      this.setState({
        contributions,
        totalContributions,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error("❌ Error fetching real GitHub data:", error);
      this.useDemoData(`Real data unavailable: ${error.message}`);
    }
  };

  useDemoData = (errorMessage) => {
    const demoContributions = this.getRealisticMockData();
    const demoTotal = demoContributions.reduce(
      (sum, day) => sum + day.count,
      0
    );

    this.setState({
      error: errorMessage,
      loading: false,
      contributions: demoContributions,
      totalContributions: demoTotal,
    });
  };

  getRealisticMockData = () => {
    const data = [];
    const today = new Date();

    let currentStreak = 0;
    let lastCount = 1;

    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);

      const dayOfWeek = date.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const month = date.getMonth();
      const isHolidaySeason = month === 11 || month === 0;

      let count;

      if (isWeekend) {
        if (Math.random() < 0.6) count = 0;
        else if (Math.random() < 0.8) count = 1;
        else count = 2;
      } else if (isHolidaySeason) {
        if (Math.random() < 0.4) count = 0;
        else if (Math.random() < 0.7) count = 1;
        else if (Math.random() < 0.9) count = 2;
        else count = 3;
      } else {
        const rand = Math.random();
        if (rand < 0.2) count = 0;
        else if (rand < 0.5) count = 1;
        else if (rand < 0.75) count = 2;
        else if (rand < 0.9) count = 3;
        else count = 4;
      }

      if (currentStreak > 0 && currentStreak < 5) {
        if (Math.random() < 0.7) {
          count = Math.min(4, lastCount);
          currentStreak++;
        } else {
          currentStreak = 0;
        }
      } else if (!isWeekend && count > 0 && Math.random() < 0.4) {
        currentStreak = 1;
      }

      lastCount = count;

      data.push({
        date: date.toISOString().split("T")[0],
        count,
      });
    }

    console.log("Generated realistic demo data");
    return data;
  };

  getColor = (count) => {
    if (count === 0) return "rgba(255, 255, 255, 0.1)";
    if (count === 1) return "#80e5ff";  
    if (count === 2) return "#00d4ff";  
    if (count === 3) return "#00a8cc";  
    return "#0077b6";                   
};

  render() {
    const { contributions, loading, totalContributions, error } = this.state;

    const displayTotal =
      totalContributions > 0
        ? totalContributions
        : contributions.reduce((sum, day) => sum + day.count, 0);

    const skills = [
      { name: "Javascript", icon: <FaJs />, color: "#F7DF1E" },
      { name: "HTML", icon: <FaHtml5 />, color: "#E34F26" },
      { name: "CSS", icon: <FaCss3Alt />, color: "#1572B6" },
      { name: "Dart", icon: <SiDart />, color: "#61DAFB" },
      { name: "Git", icon: <FaGitAlt />, color: "#F05032" },
      { name: "Redux", icon: < SiFlutter  />, color: "#764ABC" },
    ];

    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.2,
        }
      }
    };

    const skillItemVariants = {
      hidden: { 
        opacity: 0, 
        y: 20,
        scale: 0.9 
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 10
        }
      },
      hover: {
        y: -5,
        scale: 1.05,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 17
        }
      }
    };

    const titleVariants = {
      hidden: { opacity: 0, y: -30 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: {
          type: "spring",
          stiffness: 100,
          delay: 0.1
        }
      }
    };

    const contributionDayVariants = {
      hidden: { opacity: 0, scale: 0.5 },
      visible: (custom) => ({
        opacity: 1,
        scale: 1,
        transition: {
          delay: custom * 0.003, 
          type: "spring",
          stiffness: 200,
          damping: 20
        }
      }),
      hover: {
        scale: 1.3,
        transition: { type: "spring", stiffness: 400, damping: 10 }
      }
    };

    const calendarVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.01,
          delayChildren: 0.3
        }
      }
    };

    if (loading) {
      return (
        <div className="main-bg">
          <StarsBackground />
          <div className="contributions-section">
            <motion.h2 
              className="contributions-title"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Days I Code
            </motion.h2>
            <div className="loading">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Loading GitHub contributions...
              </motion.div>
              <motion.div
                style={{ fontSize: "0.9rem", opacity: 0.7, marginTop: "10px" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Fetching real data from GitHub...
              </motion.div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="main-bg">
        <StarsBackground />

        {/* Skills Section */}
        <div className="skills-section">
          <div className="container">
            <motion.h2 
              className="skills-title"
              variants={titleVariants}
              initial="hidden"
              animate="visible"
            >
              Professional <span>Skillset</span>
            </motion.h2>
            <motion.div 
              className="skills-grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {skills.map((skill, index) => (
                <motion.div 
                  key={index} 
                  className="skill-item"
                  variants={skillItemVariants}
                  whileHover="hover"
                  custom={index}
                >
                  <motion.div 
                    className="skill-icon" 
                    style={{ color: skill.color }}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6, type: "spring" }}
                  >
                    {skill.icon}
                  </motion.div>
                  <motion.div 
                    className="skill-name"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    {skill.name}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* GitHub Contributions Section */}
        <div className="contributions-section">
          <motion.h2 
            className="contributions-title"
            variants={titleVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            Days I Spent <span>Coding</span>
          </motion.h2>

          {error ? console.error(error) : console.log("showing real github data")}
          
          <motion.div 
            className="calendar-container"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.div 
              className="calendar-grid"
              variants={calendarVariants}
              initial="hidden"
              animate="visible"
            >
              {Array.from({ length: 53 }).map((_, weekIndex) => (
                <div key={weekIndex} className="week-column">
                  {Array.from({ length: 7 }).map((_, dayIndex) => {
                    const index = weekIndex * 7 + dayIndex;
                    const day =
                      index < contributions.length
                        ? contributions[index]
                        : { count: 0, date: "" };
                    return (
                      <motion.div
                        key={`${weekIndex}-${dayIndex}`}
                        className="contribution-day"
                        style={{ backgroundColor: this.getColor(day.count) }}
                        title={
                          day.date
                            ? `${day.count} contributions on ${new Date(
                                day.date
                              ).toLocaleDateString()}`
                            : "No contributions"
                        }
                        variants={contributionDayVariants}
                        custom={index}
                        whileHover="hover"
                        initial="hidden"
                        animate="visible"
                      />
                    );
                  })}
                </div>
              ))}
            </motion.div>

            <motion.div 
              className="calendar-footer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <div className="calendar-legend">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  Less
                </motion.span>
                <div className="legend-colors">
                  {[0, 1, 2, 3, 4].map((level, index) => (
                    <motion.div
                      key={level}
                      className="legend-color"
                      style={{ backgroundColor: this.getColor(level) }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                    />
                  ))}
                </div>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  More
                </motion.span>
              </div>

              <motion.div 
                className="contributions-count"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
              >
                <motion.strong
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 1.4 }}
                >
                  {displayTotal.toLocaleString()}
                </motion.strong>{" "}
                contributions in the last year
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }
}

export default Skill;