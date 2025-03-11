import React from 'react';

const ProgressBar = ({ progress, className = '', height = 8 }) => {
  return (
    <div 
      className={`w-full bg-gray-200 rounded-full overflow-hidden ${height === 8 ? 'h-2' : `h-${height}`}`}
    >
      <div 
        className={`${className || 'bg-blue-600'} h-full rounded-full transition-all duration-500 ease-out`}
        style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
      />
    </div>
  );
};

export default ProgressBar;