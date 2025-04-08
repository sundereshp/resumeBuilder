import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Summary = () => {
  const navigate = useNavigate();
  const [education, setEducation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await axios.get('http://localhost:5000/education', {
          withCredentials: true
        });
        setEducation(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch education details');
        setLoading(false);
      }
    };

    fetchEducation();
  }, []);

  const handleAddMore = () => {
    navigate('/dashboard/education/section');
  };

  const handleContinue = () => {
    navigate('/dashboard/experience/tips');
  };

  const styles = `
    .summary-container {
      padding: 1.5rem;
      max-width: 56rem;
      margin: 0 auto;
    }

    .summary-header {
      margin-bottom: 2rem;
    }

    .summary-header h2 {
      font-size: 1.875rem;
      color: #111827;
      margin-bottom: 0.5rem;
    }

    .summary-header p {
      color: #6B7280;
    }

    .education-card {
      background: white;
      border-radius: 0.5rem;
      padding: 1.5rem;
      margin-bottom: 1rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .school-name {
      font-size: 1.25rem;
      font-weight: 600;
      color: #111827;
      margin-bottom: 0.5rem;
    }

    .degree {
      color: #374151;
      margin-bottom: 0.25rem;
    }

    .field-study {
      color: #4B5563;
      margin-bottom: 0.5rem;
    }

    .dates {
      color: #6B7280;
      font-size: 0.875rem;
      margin-bottom: 1rem;
    }

    .gpa {
      color: #4B5563;
      margin-bottom: 0.5rem;
    }

    .section-title {
      font-size: 0.875rem;
      font-weight: 500;
      color: #374151;
      margin-bottom: 0.25rem;
    }

    .section-content {
      color: #4B5563;
      margin-bottom: 1rem;
    }

    .button-container {
      display: flex;
      justify-content: space-between;
      margin-top: 2rem;
      padding-top: 1rem;
      border-top: 1px solid #E5E7EB;
    }

    .add-button {
      padding: 0.5rem 1rem;
      color: #7C3AED;
      border: 1px solid #7C3AED;
      border-radius: 0.375rem;
      background: white;
      cursor: pointer;
      transition: all 0.2s;
    }

    .add-button:hover {
      background: #F5F3FF;
    }

    .next-button {
      padding: 0.5rem 1rem;
      background: #7C3AED;
      color: white;
      border: none;
      border-radius: 0.375rem;
      cursor: pointer;
      transition: background 0.2s;
    }

    .next-button:hover {
      background: #6D28D9;
    }

    .loading-error {
      text-align: center;
      padding: 2rem;
      color: #374151;
    }

    .error-message {
      color: #DC2626;
      background: #FEE2E2;
      padding: 1rem;
      border-radius: 0.375rem;
      margin-bottom: 1rem;
    }
  `;

  // Add styles to document
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);

  if (loading) {
    return (
      <div className="summary-container">
        <div className="loading-error">
          Loading education details...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="summary-container">
        <div className="error-message">
          {error}
        </div>
        <div className="button-container">
          <button onClick={handleAddMore} className="add-button">
            Add Education
          </button>
        </div>
      </div>
    );
  }

  const noEducation = !education || Object.keys(education).length === 0;

  return (
    <div className="summary-container">
      <div className="summary-header">
        <h2>Education Summary</h2>
        <p>Review your education details before moving to the next section</p>
      </div>

      {noEducation ? (
        <div className="education-card">
          <p className="section-content">No education details added yet.</p>
        </div>
      ) : (
        <div className="education-card">
          <h3 className="school-name">{education.school_name}</h3>
          <p className="degree">{education.degree}</p>
          {education.field_of_study && (
            <p className="field-study">{education.field_of_study}</p>
          )}
          <p className="dates">
            {new Date(education.start_date).toLocaleDateString()} - {education.current ? 'Present' : new Date(education.end_date).toLocaleDateString()}
          </p>
          {education.gpa && (
            <p className="gpa">GPA: {education.gpa}</p>
          )}
          {education.activities && (
            <>
              <p className="section-title">Activities and Societies</p>
              <p className="section-content">{education.activities}</p>
            </>
          )}
          {education.description && (
            <>
              <p className="section-title">Description</p>
              <p className="section-content">{education.description}</p>
            </>
          )}
        </div>
      )}

      <div className="button-container">
        <button onClick={handleAddMore} className="add-button">
          {noEducation ? 'Add Education' : 'Edit Education'}
        </button>
        <button onClick={handleContinue} className="next-button">
          Continue to Experience
        </button>
      </div>
    </div>
  );
};

export default Summary;
