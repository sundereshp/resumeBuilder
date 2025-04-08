import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './skillSection.css';
import SkillList from './skillListFolder/skillList';

const SkillSection = () => {
  const navigate = useNavigate();
  const handleBack = () => navigate('/dashboard/skills/tips');
  const handleNext = () => navigate('/dashboard/skills/summary');
  const handlePreview = () => navigate('/dashboard/skills/summary');

  const [text, setText] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);   
  return (
    <div>
      <button onClick={handleBack} className="back-button">← Back</button>
      <div className="page-title-container">
        <div className="title">
          <h1>What skills would you like to highlight?</h1>
          <p className="description">Choose from our pre-written examples below or write your own.</p>
        </div>
        <div className="tips">
          <h2>Tips</h2>
        </div>
      </div>
      <div>
        <SkillList text={text} setText={setText}/>
      </div>
      <div className="flex-container">
        <button className="Preview-button" onClick={handlePreview}>Preview</button>
        <button className="Next-button" onClick={handleNext}>Next</button>
      </div>      
    </div>
  );
};

export default SkillSection;
