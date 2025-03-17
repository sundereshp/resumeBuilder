import React from 'react';
import Header from './sidebar/header';
import Stepper from './sidebar/stepper';
import Progress from './sidebar/progress';
import Footer from './sidebar/footer';
import './sidebar.css';

const Sidebar = () => {
  return (
      <div className="sidebar">
          <Header />
          <Stepper />
          <Progress />
          <Footer /> {/* Ensure Footer is included */}
      </div>
  );
};

export default Sidebar;
