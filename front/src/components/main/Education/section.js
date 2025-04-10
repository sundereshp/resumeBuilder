import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import AdditionalCoursework from "./section/addiional";
import axios from "axios";

// Component rendering
const EducationSection = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();
    const isNewEntry = !id;

    const [loading, setLoading] = useState(false);
    
    const [formData, setFormData] = useState({
        school_name: "",
        school_location: "",
        degree: "",
        field_of_study: "",
        graduation_month: "",
        graduation_year: "",
    });

    const [text, setText] = useState(""); // Moved text state here

    const [error, setError] = useState(null);

    useEffect(() => {
        if (!isNewEntry && location.state?.education) {
            setFormData(location.state.education);
        }
    }, [isNewEntry, location.state]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
      
        const userEmail = localStorage.getItem("email");
        const userId = localStorage.getItem("userId");
      
        try {
            const response = await axios.post(
                "http://localhost:5000/education",
                {
                    section: "education",
                    data: {
                        userId,
                        institution: formData.school_name,
                        degree: formData.degree,
                        fieldOfStudy: formData.field_of_study,
                        startYear: formData.graduation_year,
                        endYear: formData.graduation_month,
                        description: text,
                    },
                },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
      
            if (response.status === 201) {
                console.log("Education data submitted successfully!");
                alert("Education details submitted successfully!");
    
                // Get the selected sections from the location state
                const selectedSections = location.state?.selectedSections || [];
                
                // Find the current section index
                const currentIndex = selectedSections.indexOf('education');
                
                // If education is not the last section, navigate to next
                if (currentIndex >= 0 && currentIndex < selectedSections.length - 1) {
                    const nextSection = selectedSections[currentIndex + 1];
                    navigate(`/dashboard/finalize/${nextSection}`, {
                        state: { selectedSections }
                    });
                } else {
                    // If education is the last section, navigate to congrats page
                    navigate("/dashboard/finalize/congrats");
                }
            } else {
                console.warn("Unexpected response:", response);
                setError("Unexpected error occurred!");
            }
        } catch (error) {
            console.error("Error submitting education data:", error);
            setError(
                error.response?.data?.error ||
                "Error submitting education data. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };
      

    return (
        <div className="education-section">
            <h2>{isNewEntry ? "Add Education Details" : "Edit Education Details"}</h2>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleFormSubmit}>
                <div className="form-row">
                    <div className="form-column">
                        <div className="form-group">
                            <label>School Name*</label>
                            <input
                                type="text"
                                name="school_name"
                                value={formData.school_name}
                                onChange={handleChange}
                                placeholder="e.g. Oxford Software Institute & Oxford School of English"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>School Location</label>
                            <input
                                type="text"
                                name="school_location"
                                value={formData.school_location}
                                onChange={handleChange}
                                placeholder="e.g. New Delhi, India"
                            />
                        </div>
                    </div>
                    <div className="form-column">
                        <div className="form-group">
                            <label>Degree</label>
                            <select
                                name="degree"
                                value={formData.degree}
                                onChange={handleChange}
                                style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px', width: '100%' }}
                            >
                                <option value="">Select</option>
                                <option value="Bachelor's">Bachelor's</option>
                                <option value="Master's">Master's</option>
                                <option value="Doctorate">Doctorate</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-column field-of-study-column">
                        <div className="form-group">
                            <label>Field of Study</label>
                            <input
                                type="text"
                                name="field_of_study"
                                value={formData.field_of_study}
                                onChange={handleChange}
                                placeholder="e.g. Financial Accounting"
                            />
                        </div>
                    </div>
                    <div className="form-column graduation-column">
                        <div className="form-group">
                            <label>Graduation Month*</label>
                            <select
                                name="graduation_month"
                                value={formData.graduation_month}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Month</option>
                                {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month) => (
                                    <option key={month} value={month}>{month}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="form-column graduation-column">
                        <div className="form-group">
                            <label>Graduation Year*</label>
                            <select
                                name="graduation_year"
                                value={formData.graduation_year}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Year</option>
                                {Array.from({ length: 50 }, (_, i) => (
                                    <option key={i} value={new Date().getFullYear() - i}>
                                        {new Date().getFullYear() - i}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="additioanal-courwork">
                    <AdditionalCoursework text={text} setText={setText} />
                </div>
                <div className="button-group">
                    <button type="button" onClick={() => navigate("/dashboard/education/summary")}>
                        Cancel
                    </button>
                    <button type="submit" onClick={handleFormSubmit}>{isNewEntry ? "Add Education" : "Save Changes"}</button>
                </div>
            </form>

            <style jsx>{`
                .education-section {
                    width: calc(100% - 250px);
                    
                    padding: 40px;
                    background-color: #f9f9f9;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }

                .form-row, .form-sub-row {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 20px;
                }

                .form-column, .form-sub-column {
                    flex: 1;
                    margin-right: 20px;
                }

                .form-column:last-child, .form-sub-column:last-child {
                    margin-right: 0;
                }

                .form-group {
                    margin-bottom: 20px;
                }

                .form-group label {
                    display: block;
                    margin-bottom: 5px;
                    font-weight: bold;
                }

                .form-group input, .form-group select {
                    width: 100%;
                    padding: 10px;
                    border-radius: 5px;
                    border: 1px solid #ccc;
                    font-size: 16px;
                }

                .button-group {
                    margin-top: 20px;
                    display: flex;
                    justify-content: flex-end;
                }

                .button-group button {
                    padding: 10px 20px;
                    border: none;
                    border-radius: 5px;
                    font-size: 16px;
                    cursor: pointer;
                    margin-left: 10px;
                }

                .button-group button:first-child {
                    background-color: #ccc;
                    color: #333;
                }

                .button-group button:last-child {
                    background-color: #007bff;
                    color: #fff;
                }

                .additional-coursework {
                    margin-top: 40px;
                }

                .additional-coursework h3 {
                    margin-bottom: 20px;
                    font-size: 20px;
                    font-weight: bold;
                }

                .additional-coursework ul {
                    list-style-type: disc;
                    padding-left: 20px;
                }

                .additional-coursework ul li {
                    margin-bottom: 10px;
                }

                .error-message {
                    color: red;
                    margin-bottom: 20px;
                }
            `}</style>
        </div>
    );
};

export default EducationSection;