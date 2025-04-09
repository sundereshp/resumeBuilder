import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Summarytips from './Summary/tips';
import SummarySection from './Summary/section';

const Summary = () => {
  return (
    <Routes>
      <Route path="/tips" element={<Summarytips />} />
      <Route path="/section" element={<SummarySection />} />
    </Routes>
  );
};

export default Summary;