'use client'

import React from 'react';

interface LabelProps {
  htmlFor: string;
  className?: string;
  children: React.ReactNode;
}

const Label: React.FC<LabelProps> = ({ htmlFor, className, children }) => {
  return (
    <Label htmlFor={htmlFor} className={`block text-sm font-medium ${className}`}>
      {children}
    </Label>
  );
};

export default Label; 