import React, { useState } from "react";
import "../Style/Contact.css";
import StarsBackground from "./StarsBackground";
import emailjs from "emailjs-com";
import { motion } from "framer-motion";

emailjs.init("QGS5M-l4D22imH3Bv");

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const serviceID = "service_fzxbhy9";
    const templateID = "template_1uxasla";

    const templateParams = {
      from_name: formData.name,
      reply_to: formData.email,
      message: formData.message,
    };

    emailjs
      .send(serviceID, templateID, templateParams)
      .then((res) => {
        console.log("✅ Email sent:", res);
        
        // Success animation
        setTimeout(() => {
          setIsSubmitting(false);
          alert("Your message has been sent successfully!");
          setFormData({ name: "", email: "", message: "" });
        }, 500);
      })
      .catch((err) => {
        console.error("❌ Email failed:", err);
        setIsSubmitting(false);
        alert("Failed to send message. Please try again.");
      });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12
      }
    }
  };

  const formVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.3
      }
    }
  };

  const inputVariants = {
    focus: {
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    },
    submitting: {
      scale: [1, 1.05, 1],
      transition: {
        repeat: Infinity,
        duration: 1
      }
    }
  };

  return (
    <div className="main-bg-contact position-relative">
      <StarsBackground />
      <div style={{ height: "100px" }}></div>
      
      <motion.div 
        className="container mt-5 position-relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2 
          className="text-center mb-4 contact-title"
          variants={titleVariants}
        >
          CONTACT ME
        </motion.h2>
        
        <div className="row">
          <motion.div 
            className="col-md-6 p-3 contact-info"
            variants={itemVariants}
          >
            <motion.h4 
              className="contact-subtitle"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Get in Touch
            </motion.h4>
            <motion.p 
              className="contact-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              If you have any questions or would like to collaborate, feel free
              to reach out!
            </motion.p>
          
            <motion.div 
              className="contact-details"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.div 
                className="contact-item"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="contact-label">📧 Email: </span>
                <span className="contact-value">safvanmuhammed@gmail.com</span>
              </motion.div>
              <motion.div 
                className="contact-item"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
              >
                <span className="contact-label">📍 Location: </span>
                <span className="contact-value">kerala, India</span>
              </motion.div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="col-md-6"
            variants={formVariants}
          >
            <form onSubmit={sendEmail}>
              <motion.div 
                className="form-group mb-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label htmlFor="name" className="form-label">Name</label>
                <motion.input
                  type="text"
                  className="form-control transparent-input"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  variants={inputVariants}
                  whileFocus="focus"
                />
              </motion.div>
              
              <motion.div 
                className="form-group mb-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label htmlFor="email" className="form-label">Email</label>
                <motion.input
                  type="email"
                  className="form-control transparent-input"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  variants={inputVariants}
                  whileFocus="focus"
                />
              </motion.div>
              
              <motion.div 
                className="form-group mb-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <label htmlFor="message" className="form-label">Message</label>
                <motion.textarea
                  className="form-control transparent-input"
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  required
                  variants={inputVariants}
                  whileFocus="focus"
                ></motion.textarea>
              </motion.div>
              
              <motion.button 
                type="submit" 
                className="btn transparent-btn w-100"
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                animate={isSubmitting ? "submitting" : "initial"}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    Sending...
                  </motion.span>
                ) : (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    Send Message
                  </motion.span>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default Contact;