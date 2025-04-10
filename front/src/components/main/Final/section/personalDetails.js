import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PersonalDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({
        dateofbirth: "",
        nationality: "",
        martialstatus: "",
        visastatus: "",
        gender: "",
        religion: "",
        passport: "",
        other: "",
    });

    const [showFields, setShowFields] = useState({
        gender: false,
        religion: false,
        passport: false,
        other: false,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleBack = () => {
        navigate("/dashboard");
    };

    // Simplified handleSubmit - navigate to the next selected section
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Get the selected sections from the location state
        const selectedSections = location.state?.selectedSections || [];
        
        // Find the current section index
        const currentIndex = selectedSections.indexOf('personalDetails');
        
        // If personalDetails is not the last section, navigate to next
        if (currentIndex >= 0 && currentIndex < selectedSections.length - 1) {
            const nextSection = selectedSections[currentIndex + 1];
            navigate(`/dashboard/finalize/${nextSection}`, {
                state: { selectedSections }
            });
        } else {
            // If personalDetails is the last section, navigate to congrats page
            navigate("/dashboard/finalize/congrats");
        }
    };

    // Add field dynamically when button is clicked
    const handleAddField = (fieldName) => {
        setShowFields((prev) => ({
            ...prev,
            [fieldName]: true,
        }));
    };

    // Remove field when user clicks delete
    const handleRemoveField = (fieldName) => {
        setFormData((prev) => ({
            ...prev,
            [fieldName]: "", // Clear the field value
        }));

        setShowFields((prev) => ({
            ...prev,
            [fieldName]: false,
        }));
    };

    // Check if all fields are added to hide the "Add additional info" message
    const allFieldsAdded =
        showFields.gender && showFields.religion && showFields.passport && showFields.other;

    return (
        <div className="personal-details-container">
            <button onClick={handleBack} className="back-button">
                ← Back
            </button>

            <div className="form-header">
                <h2>Personal Details</h2>
                <p>Add personal information that might be relevant for your application.</p>
                <p className="required-note">* indicates a required field</p>
            </div>

            <form className="form-container" onSubmit={handleSubmit}>
                {/* First Row: Date of Birth & Nationality */}
                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label" htmlFor="dateofbirth">
                            Date of Birth *
                        </label>
                        <input
                            className="form-input"
                            type="date"
                            id="dateofbirth"
                            name="dateofbirth"
                            value={formData.dateofbirth}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="nationality">
                            Nationality *
                        </label>
                        <input
                            className="form-input"
                            type="text"
                            id="nationality"
                            name="nationality"
                            placeholder="e.g. Indian"
                            value={formData.nationality}
                            onChange={handleChange}
                    
                        />
                    </div>
                </div>

                {/* Second Row: Martial Status & Visa Status */}
                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label" htmlFor="martialstatus">
                            Martial Status
                        </label>
                        <input
                            className="form-input"
                            type="text"
                            id="martialstatus"
                            name="martialstatus"
                            placeholder="e.g. Single, Married"
                            value={formData.martialstatus}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="visastatus">
                            Visa Status
                        </label>
                        <input
                            className="form-input"
                            type="text"
                            id="visastatus"
                            name="visastatus"
                            placeholder="e.g. Permanent Resident"
                            value={formData.visastatus}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Additional Fields */}
                <div>
                    {/* Gender Field */}
                    {showFields.gender && (
                        <div className="form-row">
                            <div className="form-group field-with-delete">
                                <label className="form-label" htmlFor="gender">
                                    Gender
                                </label>
                                <div className="input-wrapper">
                                    <input
                                        className="form-input"
                                        type="text"
                                        id="gender"
                                        name="gender"
                                        placeholder="e.g. Male, Female, Non-binary"
                                        value={formData.gender}
                                        onChange={handleChange}
                                    />
                                    <button
                                        type="button"
                                        className="delete-button"
                                        onClick={() => handleRemoveField("gender")}
                                        aria-label="Remove gender field"
                                    >
                                        ❌
                                    </button>
                                </div>
                            </div>

                            <div className="form-group"></div>
                        </div>
                    )}

                    {/* Religion Field */}
                    {showFields.religion && (
                        <div className="form-row">
                            <div className="form-group field-with-delete">
                                <label className="form-label" htmlFor="religion">
                                    Religion
                                </label>
                                <div className="input-wrapper">
                                    <input
                                        className="form-input"
                                        type="text"
                                        id="religion"
                                        name="religion"
                                        placeholder="e.g. Hindu, Christian, Muslim"
                                        value={formData.religion}
                                        onChange={handleChange}
                                    />
                                    <button
                                        type="button"
                                        className="delete-button"
                                        onClick={() => handleRemoveField("religion")}
                                        aria-label="Remove religion field"
                                    >
                                        ❌
                                    </button>
                                </div>
                            </div>

                            <div className="form-group"></div>
                        </div>
                    )}

                    {/* Passport Field */}
                    {showFields.passport && (
                        <div className="form-row">
                            <div className="form-group field-with-delete">
                                <label className="form-label" htmlFor="passport">
                                    Passport Number
                                </label>
                                <div className="input-wrapper">
                                    <input
                                        className="form-input"
                                        type="text"
                                        id="passport"
                                        name="passport"
                                        placeholder="e.g. A1234567"
                                        value={formData.passport}
                                        onChange={handleChange}
                                    />
                                    <button
                                        type="button"
                                        className="delete-button"
                                        onClick={() => handleRemoveField("passport")}
                                        aria-label="Remove passport field"
                                    >
                                        ❌
                                    </button>
                                </div>
                            </div>

                            <div className="form-group"></div>
                        </div>
                    )}

                    {/* Other Field */}
                    {showFields.other && (
                        <div className="form-row">
                            <div className="form-group field-with-delete">
                                <label className="form-label" htmlFor="other">
                                    Other Information
                                </label>
                                <div className="input-wrapper">
                                    <textarea
                                        className="form-input"
                                        id="other"
                                        name="other"
                                        placeholder="Any other relevant personal information"
                                        value={formData.other}
                                        onChange={handleChange}
                                        rows="3"
                                    ></textarea>
                                    <button
                                        type="button"
                                        className="delete-button"
                                        onClick={() => handleRemoveField("other")}
                                        aria-label="Remove other field"
                                    >
                                        ❌
                                    </button>
                                </div>
                            </div>

                            <div className="form-group"></div>
                        </div>
                    )}
                </div>

                {/* Add Additional Information Section */}
                {!allFieldsAdded && (
                    <div className="additional-info">
                        <p className="additional-heading">
                            Add additional information to your resume (optional)
                        </p>
                        <div className="additional-buttons">
                            {!showFields.gender && (
                                <button
                                    type="button"
                                    className="add-info-button"
                                    onClick={() => handleAddField("gender")}
                                >
                                    Gender +
                                </button>
                            )}
                            {!showFields.religion && (
                                <button
                                    type="button"
                                    className="add-info-button"
                                    onClick={() => handleAddField("religion")}
                                >
                                    Religion +
                                </button>
                            )}
                            {!showFields.passport && (
                                <button
                                    type="button"
                                    className="add-info-button"
                                    onClick={() => handleAddField("passport")}
                                >
                                    Passport Number +
                                </button>
                            )}
                            {!showFields.other && (
                                <button
                                    type="button"
                                    className="add-info-button"
                                    onClick={() => handleAddField("other")}
                                >
                                    Other Information +
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Error Message */}
                {error && <div className="error-message">{error}</div>}

                {/* Submit Button */}
                <div className="button-container">
                    <button type="submit" className="next-button">
                        Save & Continue
                    </button>
                </div>
            </form>

            {/* Custom styles */}
            <style jsx>{`
                .personal-details-container {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                }

                .form-header {
                    margin-bottom: 30px;
                }

                .form-header h2 {
                    margin-bottom: 10px;
                }

                .required-note {
                    color: #666;
                    font-size: 14px;
                    margin-top: 5px;
                }

                .form-row {
                    display: flex;
                    gap: 20px;
                    margin-bottom: 20px;
                    width: 100%;
                }

                .form-group {
                    flex: 1;
                    position: relative;
                    width: 100%;
                }

                .field-with-delete {
                    display: flex;
                    flex-direction: column;
                }

                .input-wrapper {
                    display: flex;
                    align-items: center;
                    width: 90%;
                }

                .form-input {
                    width: 95%;
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    font-size: 16px;
                }

                .delete-button {
                    background: none;
                    border: none;
                    cursor: pointer;
                    color: red;
                    font-size: 16px;
                    margin-left: 10px;
                    margin-top:10px;
                    padding: 5px;
                    flex-shrink: 0;
                }

                .additional-info {
                    margin-top: 20px;
                    margin-bottom: 20px;
                }

                .additional-heading {
                    font-weight: bold;
                    margin-bottom: 10px;
                }

                .additional-buttons {
                    display: flex;
                    gap: 10px;
                    flex-wrap: wrap;
                }

                .add-info-button {
                    padding: 10px 20px;
                    border: 1px solid #ccc;
                    border-radius: 20px;
                    background-color: #f9f9f9;
                    font-size: 14px;
                    cursor: pointer;
                    margin-right: 10px;
                    margin-bottom: 10px;
                    transition: background-color 0.3s ease;
                }

                .add-info-button:hover {
                    background-color: #e6e6e6;
                }

                .error-message {
                    color: red;
                    margin-bottom: 15px;
                }

                .button-container {
                    display: flex;
                    justify-content: flex-end;
                    margin-top: 20px;
                }

                .back-button {
                    padding: 8px 16px;
                    background-color: #f0f0f0;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    cursor: pointer;
                    margin-bottom: 20px;
                    margin-left: 10px;
                }

                .next-button {
                    padding: 10px 20px;
                    background-color: #4caf50;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 16px;
                }

                .next-button:disabled {
                    background-color: #cccccc;
                    cursor: not-allowed;
                }
            `}</style>
        </div>
    );
};

export default PersonalDetails;