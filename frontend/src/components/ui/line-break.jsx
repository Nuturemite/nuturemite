"use client"
import React from 'react';

const LineBreak = ({ text }) => {
  const formattedText = text.replace(/\n/g, '<br>');

  return (
    <div dangerouslySetInnerHTML={{ __html: formattedText }} />
  );
};

export default LineBreak;
