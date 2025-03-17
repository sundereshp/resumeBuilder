import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './stepper.css';

const Stepper = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const steps = [
    { id: 1, title: 'Personal Info', path: '/heading' },
    { id: 2, title: 'Education', path: '/education/tips' },
    { id: 3, title: 'Experience', path: '/experience/tips' },
    { id: 4, title: 'Skills', path: '/skills' },
    { id: 5, title: 'Summary', path: '/summary' },
    { id: 6, title: 'Finalize', path: '/finalize' }
  ];

  const getCurrentStepId = () => {
    const currentPath = location.pathname;
    const step = steps.find(step => 
      currentPath.startsWith(step.path) || 
      (step.id === 2 && currentPath.startsWith('/education/tips')) ||
      (step.id === 3 && currentPath.startsWith('/experience/tips'))
    );
    return step ? step.id : 1;
  };

  const handleStepClick = (step) => {
    const currentStepId = getCurrentStepId();
    if (step.id <= currentStepId + 1) {
      navigate(step.path);
    }
  };

  const activeStepId = getCurrentStepId();

  return (
    <div className="stepper">
      {steps.map((step) => (
        <div 
          key={step.id} 
          className="step-container"
          onClick={() => handleStepClick(step)}
          style={{ cursor: step.id <= activeStepId + 1 ? 'pointer' : 'not-allowed' }}
        >
          <div className={`step-circle ${activeStepId === step.id ? 'active' : ''} 
                          ${activeStepId > step.id ? 'completed' : ''}`}>
            {step.id}
          </div>
          <span className="step-label">{step.title}</span>
        </div>
      ))}
    </div>
  );
};

export default Stepper;
