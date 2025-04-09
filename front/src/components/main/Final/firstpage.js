import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './firstpage.css'

function Firstpage() {
    const navigate = useNavigate()
    const [checkboxes, setCheckboxes] = useState({
        spellCheck: false,
        formatting: false,
        contactInfo: false,
        education: false,
        experience: false,
        skills: false,
        finished: false
    })

    const sectionMap = {
        spellCheck: 'Personal details',
        formatting: 'Website,Portfolios,Profiles',
        contactInfo: 'Certifications',
        education: 'Language',
        experience: 'Accomplishment',
        skills: 'Additional Information',
        finished: 'Affiliation'
    }

    const handleCheckboxChange = (name) => {
        setCheckboxes(prev => ({
            ...prev,
            [name]: !prev[name]
        }))
    }

    return (
        <div className="tips-container">
            <button onClick={() => navigate(-1)} className="back-button">
                <span>←</span>Go Back
            </button>

            <h1 className="final-title">Finalize Your Resume</h1>
            <p className="final-text">Review your resume and make any final adjustments</p>

            <div className="final-content">
                <div className="checklist-container">
                    {Object.entries(sectionMap).map(([key, label]) => (
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
                    <button
                        onClick={() => {
                            const selectedSections = Object.keys(checkboxes)
                                .filter(key => checkboxes[key])
                                .map(key => sectionMap[key])

                            const keyMap = {
                                'Personal details': 'personalDetails',
                                'Website,Portfolios,Profiles': 'websites',
                                'Certifications': 'certifications',
                                'Language': 'language',
                                'Accomplishment': 'accomplishment',
                                'Additional Information': 'additionalInfo',
                                'Affiliation': 'affiliation'
                            }

                            const firstSection = selectedSections[0]
                            const path = keyMap[firstSection]

                            navigate(`/dashboard/finalize/${path}`, {
                                state: { selectedSections }
                            })
                        }}
                    >
                        Finalize
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Firstpage
