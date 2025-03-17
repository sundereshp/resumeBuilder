import React, { useState } from "react";

const AdditionalCoursework = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [expandedCards, setExpandedCards] = useState({}); // Object to track multiple expanded courses
    const [selectedSubCourses, setSelectedSubCourses] = useState({}); // Track sub-course selection

    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
    };

    const toggleCard = (index) => {
        setExpandedCards((prev) => ({
            ...prev,
            [index]: !prev[index], // Toggle only the clicked course
        }));
    };

    const handleAddCourse = (subCourse) => {
        setSelectedSubCourses((prev) => ({
            ...prev,
            [subCourse]: !prev[subCourse], // Toggle selection
        }));
    };

    const buttons = [
        { label: "Course 1", subCourses: ["Course 1.1", "Course 1.2"] },
        { label: "Course 2", subCourses: ["Course 2.1", "Course 2.2"] },
        { label: "Course 3", subCourses: ["Course 3.1", "Course 3.2"] },
        { label: "Course 4", subCourses: ["Course 4.1", "Course 4.2"] },
        { label: "Course 5", subCourses: ["Course 5.1", "Course 5.2"] },
        { label: "Course 6", subCourses: ["Course 6.1", "Course 6.2"] },
        { label: "Course 7", subCourses: ["Course 7.1", "Course 7.2"] }
    ];

    return (
        <div className="additional-coursework">
            <div className="flex-column">
                <div className="title-card" onClick={toggleExpansion}>
                    <button className="dropdown-btn">{isExpanded ? "▲" : "▼"}</button>
                    <h2>Add any additional coursework you're proud to showcase.</h2>
                </div>
                <div className="pro-tip">
                    <p>
                        <strong>💡 Pro Tip: </strong>
                        If your bachelor's degree is in progress, you can include international exchange,
                        educational achievements, or any certification that corresponds to your desired job.
                        An above-average grade, rank, or CGPA (8.0 or higher) would be good to add too.
                    </p>
                </div>
            </div>

            {isExpanded && (
                <div className="blue-box">
                    <div className="content">
                        <div className="ready-to-add">
                            <div className="ready-title">Ready to use example</div>
                            <div className="buttons">
                                {buttons.map((btn, index) => (
                                    <div key={index} className="button-card-container">
                                        <div className="button-card" onClick={() => toggleCard(index)}>
                                            <span>{btn.label}</span>
                                            <button className="dropdown-btn">
                                                {expandedCards[index] ? "▲" : "▼"}
                                            </button>
                                        </div>

                                        {expandedCards[index] && (
                                            <div className="sub-courses">
                                                {btn.subCourses.map((subCourse, subIndex) => (
                                                    <div key={subIndex} className="sub-course-card">
                                                        <button
                                                            className="add-btn"
                                                            style={{
                                                                background: selectedSubCourses[subCourse] ? "grey" : "#064284",
                                                            }}
                                                            onClick={() => handleAddCourse(subCourse)}
                                                        >
                                                            {selectedSubCourses[subCourse] ? "✔" : "+"}
                                                        </button>
                                                        <span>{subCourse}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="text-box">
                            <h3>Education Description</h3>
                            
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .additional-coursework {
                    background: #fff;
                    padding: 15px;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    margin-top: 10px;
                    cursor: pointer;
                }

                .flex-column {
                    display: flex;
                    flex-direction: column;
                    background-color: #092346;
                    padding: 10px;
                    justify-content: space-evenly;
                    border-radius: 8px;
                }

                .title-card {
                    display: flex;
                    gap: 10px;
                    padding: 20px;
                    color: white;
                    align-items: center;
                }

                .dropdown-btn {
                    background: none;
                    border: none;
                    font-size: 18px;
                    cursor: pointer;
                    color: white;
                }

                h2 {
                    font-size: 18px;
                    font-weight: bold;
                    margin: 0;
                }

                .pro-tip {
                    background: #fff3cd;
                    padding: 10px;
                    border-radius: 5px;
                    font-size: 14px;
                    color: #856404;
                    border-left: 5px solid #ffcc00;
                }

                .blue-box {
                    background: rgb(255, 255, 255);
                    padding: 15px;
                    border-radius: 8px;
                    margin-top: 10px;
                    border: 1px solid #ddd;
                }

                .content {
                    display: flex;
                    justify-content: space-between;
                    gap: 10px;
                }

                .ready-to-add {
                    flex: 1;
                    padding: 10px;
                    background: #f6f5f0;
                    border-radius: 5px;
                    border: 1px solid #ccc;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                }

                .text-box {
                    flex: 1;
                    margin: 0 10px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    padding: 10px;
                    background-color: #f6f5f0;
                }

                .ready-title {
                    padding: 10px;
                    border-bottom: 2px solid #ccc;
                    font-weight: bold;
                }

                .buttons {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    margin-top: 10px;
                    max-height: 400px;
                    overflow-y: auto;
                }

                .button-card-container {
                    display: flex;
                    flex-direction: column;
                    width: 95%;
                }

                .button-card {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background: #f1faff;
                    border-radius: 8px;
                    border: 1px solid #064284;
                    cursor: pointer;
                    padding: 14px 15px;
                }

                .button-card:hover {
                    background: #d3e6ff;
                }

                .sub-courses {
                    margin-top: 5px;
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                }

                .sub-course-card {
                    display: flex;
                    align-items: center;
                    background: white;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    padding: 10px;
                    width: 95%;
                }

                .add-btn {
                    color: white;
                    border: none;
                    border-radius: 50%;
                    width: 24px;
                    height: 24px;
                    font-size: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 10px;
                    cursor: pointer;
                }
            `}</style>
        </div>
    );
};

export default AdditionalCoursework;
