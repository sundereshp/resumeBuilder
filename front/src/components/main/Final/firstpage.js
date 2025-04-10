import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './firstpage.css'

function Firstpage() {
  const navigate = useNavigate()

  const [checkboxes, setCheckboxes] = useState({
    personalDetails: false,
    certifications: false,
    language: false,
    hobbies: false
  })

  // Map checkbox keys to section info (label + route path)
  const sectionMap = {
    personalDetails: { label: 'Personal details', path: 'personalDetails' },
    certifications: { label: 'Certifications', path: 'certifications' },
    language: { label: 'Language', path: 'language' },
    hobbies:{label:'Hobbies',path:'hobbies'}
  }

  const handleCheckboxChange = (name) => {
    setCheckboxes(prev => ({
      ...prev,
      [name]: !prev[name]
    }))
  }

  const handleFinalize = () => {
    const selectedSections = Object.keys(checkboxes)
      .filter(key => checkboxes[key])
      .map(key => sectionMap[key].path)

    if (selectedSections.length === 0) return

    // Navigate directly to the first selected section
    navigate(`/dashboard/finalize/${selectedSections[0]}`, {
      state: { selectedSections }
    })
  }

  return (
    <div className="tips-container">
      <button onClick={() => navigate(-1)} className="back-button">
        <span>←</span> Go Back
      </button>

      <h1 className="final-title">Finalize Your Resume</h1>
      <p className="final-text">Review your resume and make any final adjustments</p>

      <div className="final-content">
        <div className="checklist-container">
          {Object.entries(sectionMap).map(([key, { label }]) => (
            <div className="checkbox-item" key={key}>
              <input
                type="checkbox"
                id={key}
                checked={checkboxes[key]}
                onChange={() => handleCheckboxChange(key)}
              />
              <label htmlFor={key}>{label}</label>
            </div>
          ))}
        </div>

        <div className="navigation-buttons">
          <button
            className="preview-btn"
            onClick={() => navigate('/summary')}
          >
            Preview
          </button>
          <button onClick={handleFinalize}>
            Finalize
          </button>
        </div>
      </div>
    </div>
  )
}

export default Firstpage
