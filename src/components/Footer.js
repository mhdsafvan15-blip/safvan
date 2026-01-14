import React from 'react'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import '../Style/Footer.css';
export default function Footer() {
  return (
    <div>
      
              <footer className="footer-simple">
                <div className="footer-simple-content">
                  <p>&copy; {new Date().getFullYear()} Safvan. Built with React.</p>
                  <div className="footer-simple-links">
                    <a
                      href="https://github.com/mhdsafvan15-blip"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="GitHub"
                    >
                      <FaGithub />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/muhammed-safvan-90b508385"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="LinkedIn"
                    >
                      <FaLinkedin />
                    </a>
                    <a
                      href="mailto:mhdsafvan15@gmail.com"
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
