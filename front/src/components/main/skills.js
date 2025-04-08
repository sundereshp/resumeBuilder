import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SkillTips from './skillsFolder/skillTips';
import SkillSection from './skillsFolder/skillSection';
import SkillSummary from './skillsFolder/skillSummary';

const Skills = () => {
  return (
    <Routes>
      <Route path="/tips" element={<SkillTips />} />
      <Route path="/section" element={<SkillSection />} />
      <Route path="/summary" element={<SkillSummary />} />
    </Routes>
  );
};

export default Skills;