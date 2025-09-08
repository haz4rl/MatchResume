import React from 'react';

type CardProps = {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
};

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hoverEffect = false 
}) => {
  return (
    <div 
      className={`card ${hoverEffect ? 'transition-shadow hover:shadow-lg' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;