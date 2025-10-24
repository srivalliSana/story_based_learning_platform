import React from 'react';
import './Card.css';

// Main Card component
const Card = ({ children, className, ...props }) => {
  return (
    <div className={`card ${className || ''}`} {...props}>
      {children}
    </div>
  );
};

// Card Header component
export const CardHeader = ({ children, className, ...props }) => {
  return (
    <div className={`card-header ${className || ''}`} {...props}>
      {children}
    </div>
  );
};

// Card Title component
export const CardTitle = ({ children, className, ...props }) => {
  return (
    <h3 className={`card-title ${className || ''}`} {...props}>
      {children}
    </h3>
  );
};

// Card Content component
export const CardContent = ({ children, className, ...props }) => {
  return (
    <div className={`card-content ${className || ''}`} {...props}>
      {children}
    </div>
  );
};

// Card Footer component
export const CardFooter = ({ children, className, ...props }) => {
  return (
    <div className={`card-footer ${className || ''}`} {...props}>
      {children}
    </div>
  );
};

// Default export for the main Card component
export default Card;