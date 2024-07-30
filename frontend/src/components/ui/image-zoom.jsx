"use client"
import React, { useState } from 'react';

const ImageZoom = ({ children }) => {
  const [zoom, setZoom] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [timeoutId, setTimeoutId] = useState(null);

  const zoomDelay = 300; // Delay in milliseconds

  const handleMouseEnter = () => {
    // Clear any existing timeout to avoid unwanted zoom if mouse leaves
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    // Set a timeout to apply zoom after the delay
    const id = setTimeout(() => setZoom(true), zoomDelay);
    setTimeoutId(id);
  };

  const handleMouseLeave = () => {
    // Clear the timeout if the mouse leaves before the delay is complete
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }

    // Remove zoom immediately on mouse leave
    setZoom(false);
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setPosition({ x, y });
  };

  return (
    <div 
      className="overflow-hidden" 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {React.cloneElement(children, {
        className: `transition-transform duration-200 ${zoom ? 'transform scale-[3] cursor-zoom-in' : 'transform scale-100'}`,
        style: {
          transformOrigin: `${position.x}% ${position.y}%`,
          ...children.props.style,
        }
      })}
    </div>
  );
};

export default ImageZoom;
