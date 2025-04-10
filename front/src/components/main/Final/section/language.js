import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Language() {
    const navigate = useNavigate();
    const location = useLocation();
    const [languages, setLanguages] = useState([{ id: 1, language: '', proficiency: '' }]);
    const [error, setError] = useState('');

    const handleInputChange = (index, field, value) => {
        const newLanguages = [...languages];
        newLanguages[index][field] = value;
        setLanguages(newLanguages);
    };

    const addLanguage = () => {
        const newId = languages.length + 1;
        setLanguages([...languages, { id: newId, language: '', proficiency: '' }]);
        setError('');
    };

    const removeLanguage = (index) => {
        if (languages.length > 1) {
            const newLanguages = [...languages];
            newLanguages.splice(index, 1);
            setLanguages(newLanguages);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validate that at least one language is entered
        const hasValidLanguage = languages.some(lang => lang.language.trim() !== '');
        
        if (!hasValidLanguage) {
            setError('Please enter at least one language');
            return;
        }

        // Get the selected sections from the location state
        const selectedSections = location.state?.selectedSections || [];
        
        // Find the current section index
        const currentIndex = selectedSections.indexOf('language');
        
        // If language is not the last section, navigate to next
        if (currentIndex >= 0 && currentIndex < selectedSections.length - 1) {
            const nextSection = selectedSections[currentIndex + 1];
            navigate(`/dashboard/finalize/${nextSection}`, {
                state: { selectedSections }
            });
        } else {
            // If language is the last section, navigate to congrats page
            navigate("/dashboard/finalize/congrats");
        }
    };

    return (
        <div className="language-container">
            <button onClick={() => navigate('/dashboard/finalize/firstpage')} className="back-button">
                ← Back
            </button>

            <h2>Language Skills</h2>
            <p>Please enter your language proficiency. At least one language is required.</p>

            <form onSubmit={handleSubmit} className="language-form">
                {languages.map((lang, index) => (
                    <div key={lang.id} className="language-group">
                        <div className="language-inputs">
                            <input
                                type="text"
                                placeholder="Language (e.g., English)"
                                value={lang.language}
                                onChange={(e) => handleInputChange(index, 'language', e.target.value)}
                                required
                            />
                            <select
                                value={lang.proficiency}
                                onChange={(e) => handleInputChange(index, 'proficiency', e.target.value)}
                                required
                            >
                                <option value="">Select Proficiency</option>
                                <option value="Native">Native</option>
                                <option value="Fluent">Fluent</option>
                                <option value="Professional">Professional</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Basic">Basic</option>
                            </select>
                        </div>
                        {languages.length > 1 && (
                            <button
                                type="button"
                                className="remove-button"
                                onClick={() => removeLanguage(index)}
                            >
                                Remove
                            </button>
                        )}
                    </div>
                ))}

                <div className="add-language">
                    <button type="button" onClick={addLanguage}>
                        + Add Another Language
                    </button>
                </div>

                {error && <div className="error-message">{error}</div>}

                <div className="form-buttons">
                    <button type="submit" className="next-button">
                        Save & Continue
                    </button>
                </div>
            </form>

            <style jsx>{`
                .language-container {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                }

                .back-button {
                    margin-bottom: 20px;
                    padding: 8px 16px;
                    background-color: #f0f0f0;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    cursor: pointer;
                }

                .language-form {
                    width: 100%;
                }

                .language-group {
                    margin-bottom: 20px;
                    padding: 15px;
                    background-color: #f8f9fa;
                    border-radius: 8px;
                }

                .language-inputs {
                    display: flex;
                    gap: 20px;
                    margin-bottom: 10px;
                }

                input, select {
                    flex: 1;
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    font-size: 16px;
                }

                input::placeholder {
                    color: #999;
                }

                .remove-button {
                    background: none;
                    border: none;
                    color: #dc3545;
                    cursor: pointer;
                    padding: 5px 10px;
                    font-size: 14px;
                }

                .add-language {
                    margin: 20px 0;
                    text-align: center;
                }

                .add-language button {
                    background-color: #007bff;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 16px;
                }

                .error-message {
                    color: #dc3545;
                    margin-bottom: 15px;
                    text-align: center;
                }

                .form-buttons {
                    display: flex;
                    justify-content: flex-end;
                    margin-top: 20px;
                }

                .next-button {
                    padding: 12px 24px;
                    background-color: #28a745;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 16px;
                }

                .next-button:hover {
                    background-color: #218838;
                }
            `}</style>
        </div>
    );
}

export default Language;