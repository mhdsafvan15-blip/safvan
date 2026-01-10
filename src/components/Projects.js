import React from "react";
import "../Style/Projects.css";
import StarsBackground from "./StarsBackground";
import { motion } from "framer-motion";

import just from "../image/just.jpg";
import fb from "../image/fb.png";
import nav from "../image/nav-bar.jpg";
import gamehub from "../image/gamehub.png";
import weatherApp from "../image/weather-app.png";

function Projects() {
  const projects = [
    {
      id: 1,
      title: "Gamehub",
      description: "A gaming e-commerce website built with React.js and Tailwind CSS.",
      image: gamehub,
      githubUrl: "https://github.com/naheel0/gamehub",
      demoUrl: "https://gamehub-alpha-rose.vercel.app",
      technologies: ["React.js", "Tailwind CSS", "JavaScript"]
    },
    {
      id: 2,
      title: "justDial",
      description: "A clone of JustDial website built with HTML, CSS, and JavaScript.",
      image: just,
      githubUrl: "https://github.com/naheel0/justdial-clone",
      demoUrl: "https://naheel0.github.io/justdial-clone/",
      technologies: ["HTML", "CSS", "JavaScript"]
    },
    {
      id: 3,
      title: "weather App",
      description: "A weather application that provides current weather information using  API.",
      image: weatherApp,
      githubUrl: "https://github.com/naheel0/react-weather-app",
      demoUrl: "https://naheel0.github.io/react-weather-app/",
      technologies: ["React.js", "API","Tailwind CSS", "JavaScript"]
    },
    {
      id: 4,
      title: "W3 School Navbar",
      description: "A responsive navigation bar built with HTML, CSS, and JavaScript.",
      image: nav,
      githubUrl: "https://github.com/naheel0/w3school-nav-bar",
      demoUrl: "https://naheel0.github.io/w3school-nav-bar/",
      technologies: ["HTML", "CSS", "JavaScript"]
    },
    {
      id: 5,
      title: "Facebook Clone",
      description: "A clone of Facebook homepage built with HTML, CSS, and JavaScript.",
      image: fb,
      githubUrl: "https://github.com/naheel0/facebook-login-clone",
      demoUrl: "https://naheel0.github.io/facebook-login-clone/",
      technologies: ["HTML", "CSS", "JavaScript"]
    },
  ];  

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    },
    hover: {
      y: -10,
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 17
      }
    }
  };

  const headingVariants = {
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

  const buttonVariants = {
    hover: {
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const handleButtonClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="main-bg-prj">
      <StarsBackground />
      
      <motion.div 
        className="prj-heading"
        initial="hidden"
        animate="visible"
        variants={headingVariants}
      >
        <h3>
          My Recent <span>Works</span>
        </h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Here are some of my recent projects:
        </motion.p>
      </motion.div>

      <motion.div 
        className="prj-main-pg"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {projects.map((project) => (
          <motion.div
            key={project.id}
            className="my-prj-div"
            variants={itemVariants}
            whileHover="hover"
          >
            <motion.img
              src={project.image}
              alt={`${project.title} Screenshot`}
              className="project-image"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {project.title}
            </motion.h3>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {project.description}
            </motion.p>
            
            {/* Technologies tags */}
            <motion.div 
              className="technologies"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {project.technologies.map((tech, index) => (
                <span key={index} className="tech-tag">
                  {tech}
                </span>
              ))}
            </motion.div>
            
            <div className="project-buttons">
              <motion.button
                onClick={() => handleButtonClick(project.githubUrl)}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="github-btn"
              >
                GitHub
              </motion.button>
              
              <motion.button
                onClick={() => handleButtonClick(project.demoUrl)}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="demo-btn"
              >
                Demo
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default Projects;