import React from 'react';
import { useNavigate } from 'react-router-dom';
import './skillTips.css';

const SkillTips = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/dashboard/section/experience');
  };

  const handleNext = () => {
    navigate('/dashboard/skills/section');
  };

  const handlePreview = () => {
    navigate('/dashboard/skills/section');
  };

  return (
    <div className="container">
      <button onClick={handleBack} className="back-button">
        ← Back
      </button>
      <h2 className="sub-heading">Next, let's take care of your</h2>
      <h1 className="heading">Skills</h1>
      <p className="description">
        Employers scan skills for relevant keywords.
        <br />
        We'll help you choose the best ones.
      </p>
      <div className="flex-container">
        <button className="Preview-button" onClick={handlePreview}>Preview</button>
        <button className="Next-button" onClick={handleNext}>Next</button>
      </div>
    </div>

  );
};

export default SkillTips;
