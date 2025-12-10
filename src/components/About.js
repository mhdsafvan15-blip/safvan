import React from 'react';
import { motion } from 'framer-motion';
import '../Style/About.css';
import aboutImg from "../image/about.png";
import StarsBackground from './StarsBackground';
import ScrambledText from '../Animations/ScrambledText';

const About = () => {
  // Same animation variants as Home page
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 10
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        duration: 0.8
      }
    }
  };

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
        <motion.div 
          className="about-me"
          variants={textVariants}
        >
          <motion.h2
            variants={itemVariants}
            whileHover={{ 
              color: "#9d4edd",
              textShadow: "0 0 10px rgba(157, 78, 221, 0.5)"
            }}
            className='about-me-title'
          >
            ABOUT ME
          </motion.h2>
          <ScrambledText
          className="scrambled-text-demo"
          radius={100}
          duration={1.2}
          speed={0.5}
          scrambleChars=".:"
        >
          I am a web developer with a passion for creating beautiful and
          functional websites. My journey in web development started a few years
          ago, and since then, I have honed my skills in various technologies.<br/><br/> I
          enjoy working with both front-end and back-end technologies, and I am
          always eager to learn more and improve my skills.<br/><br/> In my free time, I
          love exploring new frameworks, contributing to open-source projects,
          and staying updated with the latest trends in web development.
        </ScrambledText>
        </motion.div>
        
        <div className="about-image">
          <img src={aboutImg} alt="About Me" />
        </div>
      </motion.div>
    </div>
  );
};

export default About;