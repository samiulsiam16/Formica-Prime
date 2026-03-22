import React from 'react';

interface ChamberProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

const Chamber: React.FC<ChamberProps> = ({ children, className = '', style = {}, id }) => {
  return (
    <div 
      id={id}
      className={`chamber p-8 flex flex-col items-center justify-center text-center ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

export default Chamber;
