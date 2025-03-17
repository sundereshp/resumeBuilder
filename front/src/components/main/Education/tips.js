import React from 'react';
import { useNavigate } from 'react-router-dom';

function Tips() {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/dashboard/education/section');
  };

  const styles = `
    .tips-container {
      padding: 1.5rem;
      max-width: 56rem;
      margin: 0 auto;
    }

    .back-button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #374151;
      font-size: 0.875rem;
      margin-bottom: 2rem;
      border: none;
      background: none;
      cursor: pointer;
    }

    .back-button:hover {
      color: #111827;
    }

    .tips-content {
      margin-bottom: 3rem;
    }

    .tips-content h1 {
      font-size: 1.875rem;
      color: #111827;
      margin-bottom: 1.5rem;
    }

    .tips-content p {
      font-size: 1rem;
      color: #374151;
      margin-bottom: 1rem;
    }

    .tips-content ul {
      list-style-type: disc;
      margin-left: 1.5rem;
      color: #374151;
    }

    .tips-content li {
      margin-bottom: 0.5rem;
    }

    .button-container {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 2rem;
    }

    .skip-button {
      padding: 0.5rem 1rem;
      border: 1px solid #7C3AED;
      color: #7C3AED;
      border-radius: 0.375rem;
      background: none;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .skip-button:hover {
      background-color: #F5F3FF;
    }

    .next-button {
      padding: 0.5rem 1rem;
      background-color: #7C3AED;
      color: white;
      border: none;
      border-radius: 0.375rem;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .next-button:hover {
      background-color: #6D28D9;
    }
  `;

  // Add styles to document
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);

  return (
    <div className="tips-container">
      <button onClick={() => navigate('/dashboard/heading')} className="back-button">
        ← Back
      </button>

      <div className="tips-content">
        <h1>Great, let's work on your education</h1>
        <p>Here's what you need to know:</p>
        <ul>
          <li>Employers quickly scan the education section.</li>
          <li>We'll take care of the formatting so it's easy to find.</li>
        </ul>
      </div>

      <div className="button-container">
        <button 
          onClick={() => navigate('/dashboard/preview')}
          type="button" 
          className="skip-button"
        >
          Preview
        </button>
        <button 
          onClick={handleNext}
          className="next-button"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Tips;
