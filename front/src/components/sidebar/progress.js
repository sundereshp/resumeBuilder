import React from 'react';
import './progress.css';

const Progress = ({ currentStep }) => {
  // Calculate progress percentage based on current step (6 total steps)
  const progressPercentage = Math.round((currentStep / 6) * 100);

  return (
    <div className="progress-container">
      <span className="progress-label">Progress</span>
      <div className="progress-bar-container">
        <div 
          className="progress-bar"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <span className="progress-percentage">{progressPercentage}%</span>
    </div>
  );
};

export default Progress;
