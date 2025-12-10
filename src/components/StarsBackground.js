import React, { useEffect, useState } from 'react';
 import '../Style/StarsBackground.css'; 

const StarsBackground = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const newStars = Array.from({ length: 100 }, () => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 3 + 2}s`,
    }));

    setStars(newStars);
  }, []);

  return (
    <div id="stars-background">
      {stars.map((star, index) => (
        <div
          key={index}
          className="star"
          style={{
            top: star.top,
            left: star.left,
            animationDuration: star.animationDuration,
            position: 'absolute',
          }}
        />
      ))}
    </div>
  );
};

export default StarsBackground;
