import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AdvancedTypewriter = ({
  lines,
  lineDelay = 500,
  charSpeed = 30,
  cursor = true,
  onComplete,
  className = '',
  lineClassName = '',
  cursorStyle = {}
}) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentChars, setCurrentChars] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  // Cursor blinking
  useEffect(() => {
    if (cursor) {
      const interval = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [cursor]);

  // Typewriter logic
  useEffect(() => {
    if (currentLine < lines.length) {
      const currentLineText = lines[currentLine];
      
      if (currentChars < currentLineText.length) {
        const timer = setTimeout(() => {
          setCurrentChars(prev => prev + 1);
        }, charSpeed);
        
        return () => clearTimeout(timer);
      } else {
        // Move to next line
        const timer = setTimeout(() => {
          setDisplayedLines(prev => [...prev, currentLineText]);
          setCurrentLine(prev => prev + 1);
          setCurrentChars(0);
        }, lineDelay);
        
        return () => clearTimeout(timer);
      }
    } else if (onComplete && currentLine === lines.length) {
      onComplete();
    }
  }, [currentLine, currentChars, lines, charSpeed, lineDelay, onComplete]);

  // Get current line being typed
  const getCurrentLineText = () => {
    if (currentLine < lines.length) {
      return lines[currentLine].substring(0, currentChars);
    }
    return '';
  };

  return (
    <div className={className}>
      {displayedLines.map((line, index) => (
        <div key={index} className={lineClassName}>
          {line}
          <br />
        </div>
      ))}
      
      {currentLine < lines.length && (
        <div className={lineClassName}>
          {getCurrentLineText()}
          {cursor && (
            <motion.span
              animate={{ opacity: showCursor ? 1 : 0 }}
              style={{
                display: 'inline-block',
                width: '2px',
                height: '1.2em',
                backgroundColor: cursorStyle.color || '#00d4ff',
                marginLeft: '2px',
                verticalAlign: 'text-bottom',
                ...cursorStyle
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default AdvancedTypewriter;