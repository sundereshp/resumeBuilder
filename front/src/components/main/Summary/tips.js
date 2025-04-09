import React from 'react';
import { useNavigate } from 'react-router-dom';
import './tips.css';

const Summarytips = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <div className="main-content">

        <div className="header-section">
          <button 
            className="go-back-btn"
            onClick={() => navigate('/skills')}
          >
            ← Go Back
          </button>
          <div className="tips-header">
            <h1>Summary</h1>
            <div className="tips-icon">💡 Tips</div>
          </div>
        </div>

        <div className="tips-content">
          <h2 className="sub-heading">Let's write your professional summary</h2>
          <p className="description">
            A strong summary captures recruiters' attention and invites them to explore further.
            <br />
            Let us guide you in crafting a compelling introduction.
          </p>
        </div>

        <div className="navigation-buttons">
          <button 
            className="preview-btn"
            onClick={() => navigate('/dashboard/summary/section')}
          >
            👀 Preview
          </button>
          <button 
            className="next-btn"
            onClick={() => navigate('/dashboard/summary/section')}
          >
            ✍️ Next: Add Summary
          </button>
        </div>

      </div>
    </div>
  );
};

export default Summarytips;
