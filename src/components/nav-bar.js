import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import "../Style/nav-bar.css";

const Navbar = () => {
  const location = useLocation();

  // Navbar entrance animation
  const navVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  // Item fade-up animation
  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.nav 
      className="navbar navbar-expand-lg navbar-dark fixed-top transparent-navbar"
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container">

        {/* Logo */}
        <Link className="navbar-brand" to="/">
          Sm.
        </Link>

        {/* Toggler (Mobile) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Items */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">

            {[
              { path: "/", icon: "fa-solid fa-house", text: "Home" },
              { path: "/About", icon: "fa-solid fa-circle-info", text: "About" },
              { path: "/Projects", icon: "fa-solid fa-briefcase", text: "Projects" },
              { path: "/Skills", icon: "fa-solid fa-cogs", text: "Skills" },
              { path: "/Contact", icon: "fa-solid fa-user", text: "Contact" }
            ].map((item, index) => (
              <motion.li 
                key={item.path}
                className="nav-item"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
              >
                <Link 
                  className={`nav-link ${location.pathname === item.path ? "active" : ""}`}
                  to={item.path}
                >
                  <i className={item.icon}></i> {item.text}
                </Link>
              </motion.li>
            ))}

          </ul>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
