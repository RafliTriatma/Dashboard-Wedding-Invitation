import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, title, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow-card p-6 ${className}`}>
      {title && (
        <h2 className="text-xl font-bold text-center mb-6">{title}</h2>
      )}
      {children}
    </div>
  );
};

export default Card;