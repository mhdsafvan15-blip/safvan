import React from 'react';
import { motion } from 'framer-motion';
import '../Style/Home.css';
import StarsBackground from './StarsBackground';  
import homeImg from "../image/home-main.svg";
const Home = () => {
  // Animation variants
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

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, x: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        duration: 1
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  // Split text by words instead of letters
  const hiWords = ["Hi", "There!"];
  const imWords = ["I'M"];
  const nameWords = ["NAHEEL", "MUHAMMED", "PK"];

  return (
    <div className="home-section" id="home">
      <StarsBackground />
      <motion.div 
        className="name"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="display-name"
          variants={textVariants}
        >
          <motion.h2>
            {/* Animate "Hi There!" word by word */}
            <motion.div className="text-line">
              {hiWords.map((word, index) => (
                <motion.span
                  key={`hi-${index}`}
                  variants={wordVariants}
                  style={{ display: 'inline-block', marginRight: '8px' }}
                  whileHover={{ 
                    scale: 1.1, 
                    color: index === 0 ? "white" : "#9d4edd",
                    y: -3,
                    transition: { type: "spring", stiffness: 500 }
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>
            
            {/* Animate "I'M" and name */}
            <motion.div className="text-line">
              {imWords.map((word, index) => (
                <motion.span
                  key={`im-${index}`}
                  variants={wordVariants}
                  style={{ display: 'inline-block', marginRight: '8px' }}
                   whileHover={{ 
                    scale: 1.1, 
                    color: index === 0 ? "white" : "#9d4edd",
                    y: -3,
                    transition: { type: "spring", stiffness: 500 }
                  }}
                >
                  {word}
                </motion.span>
              ))}
              
              {/* Animate name with different color */}
              <motion.span 
                className="name-highlight"
                variants={wordVariants}
              >
                {nameWords.map((word, index) => (
                  <motion.span
                    key={`name-${index}`}
                    variants={wordVariants}
                    style={{ display: 'inline-block', marginRight: '8px' }}
                    whileHover={{ 
                      scale: 1.1, 
                      color: "#9d4edd",
                      y: -3,
                      textShadow: "0 0 10px rgba(157, 78, 221, 0.8)",
                      transition: { type: "spring", stiffness: 500 }
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.span>
            </motion.div>
          </motion.h2>
        </motion.div>

        <motion.div 
          className="min-image"
          variants={imageVariants}
          whileHover="hover"
        >
          <img src={homeImg} alt="Developer" />
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="intro"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div 
          className="intro-min"
          variants={itemVariants}
        >
          <motion.h2 
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05, 
              color: "#9d4edd",
              textShadow: "0 0 10px rgba(157, 78, 221, 0.5)"
            }}
          >
            LET ME INTRODUCE MYSELF
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            whileHover={{ x: 10 }}
          >
            Hi! I'm Naheel, a passionate web developer with a knack for creating stunning and functional websites. Welcome to my portfolio!
          </motion.p>
          <motion.p 
            variants={itemVariants}
            whileHover={{ x: 10 }}
          >
            In this portfolio, you'll find a selection of my work, showcasing my skills in front-end and back-end development. I'm always eager to learn new technologies and improve my craft.
          </motion.p>
          <motion.p 
            variants={itemVariants}
            whileHover={{ x: 10 }}
          >
            Feel free to explore and reach out if you'd like to collaborate!
          </motion.p>
        </motion.div>
        <motion.div 
          className="avatar"
          variants={imageVariants}
          whileHover="hover"
        >
          <img src="avatar.svg" alt="Avatar" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;