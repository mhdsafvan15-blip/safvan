import React from 'react'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import '../Style/Footer.css';
export default function Footer() {
  return (
    <div>
      
              <footer className="footer-simple">
                <div className="footer-simple-content">
                  <p>&copy; {new Date().getFullYear()} Naheel. Built with React.</p>
                  <div className="footer-simple-links">
                    <a
                      href="https://github.com/naheel0"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="GitHub"
                    >
                      <FaGithub />
                    </a>
                    <a
                      href="https://linkedin.com/in/naheel-muhammad-6b7077378"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="LinkedIn"
                    >
                      <FaLinkedin />
                    </a>
                    <a
                      href="mailto:naheelmuhammedpk@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Email"
                    >
                      <FaEnvelope />
                    </a>
                  </div>
                </div>
              </footer>
    </div>
  )
}
