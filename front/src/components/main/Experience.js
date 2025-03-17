import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AskJobTitle from './Experiencefolder/askjobtitle';
import JobDetails from './Experiencefolder/jobdetails';
import JobDescription from './Experiencefolder/jobdescription';
import Tips from './Experiencefolder/tips';
import Jobs from './Experiencefolder/jobs';

const Experience = () => {
  return (
    <Routes>
      <Route path="/" element={<AskJobTitle />} />
      <Route path="/jobdetails" element={<JobDetails />} />
      <Route path="/jobdescription/:title" element={<JobDescription />} />
      <Route path="/tips" element={<Tips />} />
      <Route path="/jobs" element={<Jobs />} />
    </Routes>
  );
};

export default Experience;