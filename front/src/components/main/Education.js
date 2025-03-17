import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Section from './Education/section';
import Summary from './Education/summary';
import Tips from './Education/tips';

const Education = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="tips" replace />} />
      <Route path="/tips" element={<Tips />} />
      <Route path="/section" element={<Section />} />
      <Route path="/summary" element={<Summary />} />
    </Routes>
  );
};

export default Education;