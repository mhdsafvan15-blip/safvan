import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TypewriterEffect = ({ 
  text, 
  speed = 50, // ms per character
  delay = 0, // initial delay
  cursor = true,
  cursorBlinkSpeed = 500,
  onComplete,
  className = '',
  style = {}
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  // Cursor blinking effect
  useEffect(() => {
    if (cursor) {
      const cursorInterval = setInterval(() => {
        setShowCursor(prev => !prev);
      }, cursorBlinkSpeed);
      return () => clearInterval(cursorInterval);
    }
  }, [cursor, cursorBlinkSpeed]);

  // Typewriter effect
  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      
      return () => clearTimeout(timeout);
    } else if (onComplete && currentIndex === text.length) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  // Reset effect when text changes
  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
  }, [text]);

  return (
    <span className={className} style={style}>
      {displayedText}
      {cursor && (
        <motion.span
          animate={{ opacity: showCursor ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          style={{
            display: 'inline-block',
            width: '2px',
            height: '1em',
            backgroundColor: '#00d4ff',
            marginLeft: '4px',
            verticalAlign: 'middle',
          }}
        />
      )}
    </span>
  );
};

export default TypewriterEffect;