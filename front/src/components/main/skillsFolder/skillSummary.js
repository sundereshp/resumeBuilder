import React from 'react';
import { useNavigate } from 'react-router-dom';
import './skillSummary.css';

const SkillSummary = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/dashboard/skills/section');
  };
  const handleNext = () => {
    navigate('/dashboard/summary/tips');
  };
  const handlePreview = () => {
    navigate('/dashboard/summary/tips');
  };
  return (
    <div>
      <button onClick={handleBack} className="back-button">
        ← Back
      </button>
      <h1>Summary</h1>
      <div className="flex-container">
        <button className="Preview-button" onClick={handlePreview}>Preview</button>
        <button className="Next-button" onClick={handleNext}>Next</button>
      </div>      
    </div>  
  );
};

export default SkillSummary;