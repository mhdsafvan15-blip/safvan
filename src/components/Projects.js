import React from "react";
import "../Style/Projects.css";
import StarsBackground from "./StarsBackground";
import { motion } from "framer-motion";

import just from "../image/just.jpg";
import nav from "../image/nav-bar.jpg";
import filkart from "../image/filkart.jpeg";
import studentManagement from "../image/std.jpeg";

function Projects() {
  const projects = [
    {
      id: 1,
      title: "Flipkart Clone UI",
      description: "A Flipkart clone UI built using Flutter framework.",
      image: filkart,
      githubUrl: "https://github.com/mhdsafvan15-blip/Flipkart-Clone-Ui",
      demoUrl: "",
      technologies: ["dart", "Flutter"]
    },
    {
      id: 2,
      title: "justDial",
      description: "A clone of JustDial website built with HTML, CSS, and JavaScript.",
      image: just,
      githubUrl: "https://github.com/mhdsafvan15-blip/justdial_clone",
      demoUrl: "https://mhdsafvan15-blip.github.io/justdial_clone/",
      technologies: ["HTML", "CSS", "JavaScript"]
    },
    {
      id: 3,
      title: "Student Management System",
      description: "A student management system built with Flutter.",
      image: studentManagement,
      githubUrl: "https://github.com/mhdsafvan15-blip/student-management",
      demoUrl: "",
      technologies: ["dart", "Flutter"]
    },
    {
      id: 4,
      title: "W3 School Navbar",
      description: "A responsive navigation bar built with HTML, CSS, and JavaScript.",
      image: nav,
      githubUrl: "https://github.com/mhdsafvan15-blip/w3school_navigation",
      demoUrl: "https://mhdsafvan15-blip.github.io/w3school_navigation/",
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