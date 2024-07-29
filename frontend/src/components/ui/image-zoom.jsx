"use client"
import React, { useState } from 'react';

const ImageZoom = ({ children }) => {
  const [zoom, setZoom] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = () => {
    setZoom(true);
  };

  const handleMouseLeave = () => {
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
    //   className="relative overflow-hidden w-72 h-72/" 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {React.cloneElement(children, {
        className: `transition-transform duration-200 ${zoom ? 'transform scale-150 cursor-zoom-in' : 'transform scale-100'}`,
        style: {
          transformOrigin: `${position.x}% ${position.y}%`,
          ...children.props.style,
        }
      })}
    </div>
  );
};

export default ImageZoom;
