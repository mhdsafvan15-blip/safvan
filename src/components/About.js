import React, { useState } from "react";
import { motion } from "framer-motion";
import "../Style/About.css";
import aboutImg from "../image/about.png";
import StarsBackground from "./StarsBackground";
import AdvancedTypewriter from "./../Animations/AdvancedTypewriter";

const About = () => {
  const [typingComplete, setTypingComplete] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 10,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        duration: 0.8,
      },
    },
  };
  // For multi-line typewriter
  const aboutLines = [
  "I am a Flutter developer with a passion for building beautiful and high-performance mobile applications.",
  "My journey in Flutter development started a few years ago, and since then,",
  "I have honed my skills in creating cross-platform apps with seamless user experiences.",
  "",
  "I enjoy working on both the UI and the underlying logic,",
  "and I am always eager to explore new tools, libraries, and best practices to improve my craft.",
  "",
  "In my free time, I love experimenting with new Flutter packages,",
  "contributing to open-source projects,",
  "and staying updated with the latest trends in mobile app development.",
];


  return (
    <div className="about-section">
      <StarsBackground />
      <motion.div
        className="about"
        id="about"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div className="about-me" variants={textVariants}>
          <motion.h2
            variants={itemVariants}
            whileHover={{
              color: "#00d4ff",
              textShadow: "0 0 10px rgba(0, 212, 255, 0.5)",
            }}
            className="about-me-title"
          >
            ABOUT ME
          </motion.h2>

          <motion.div
            className="about-text"
            variants={itemVariants}
            style={{
              fontSize: "1.1rem",
              lineHeight: "1.6",
              color: "#ccc",
              fontFamily: '"Fira Code", monospace',
              fontWeight: "500",
              marginBottom: "20px",
            }}
          >
            <AdvancedTypewriter
              lines={aboutLines}
              charSpeed={20}
              lineDelay={200}
              cursor={true}
              onComplete={() => setTypingComplete(true)}
              cursorStyle={{
                color: "#00d4ff",
                boxShadow: "0 0 8px rgba(0, 212, 255, 0.8)",
              }}
              lineClassName="typewriter-line"
            />
          </motion.div>

          {/* Optional: Show something after typing completes */}
          {typingComplete && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                marginTop: "20px",
                color: "#00d4ff",
                fontSize: "0.9rem",
                fontStyle: "italic",
              }}
            >
              Ready to build amazing things together!
            </motion.div>
          )}
        </motion.div>

        <motion.div
          className="about-image"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
        >
          <img src={aboutImg} alt="About Me" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;
