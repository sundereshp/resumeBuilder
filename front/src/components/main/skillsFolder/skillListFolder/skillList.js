import React, { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css"; // Import Quill styles

const SkillList = ({ text, setText }) => {
    const [selectedSubCourses, setSelectedSubCourses] = useState({}); // Tracks selected pre-defined skills
    const [skillRatings, setSkillRatings] = useState({}); // Tracks skill ratings
    const [activeTab, setActiveTab] = useState("education"); // Toggle between education and skills
    const [editableSkills, setEditableSkills] = useState({}); // Tracks edited skill names
    const [customSkills, setCustomSkills] = useState([]); // Tracks custom added skills
    const quillRef = useRef(null); // Create a ref for Quill
    const newSkillInputRef = useRef(null); // Reference for new skill input auto-focus
    const [previousText, setPreviousText] = useState(text); // Track previous text state for comparison
    const [isAddingNewSkill, setIsAddingNewSkill] = useState(false); // Track if we're adding a new skill
    const [nextCustomId, setNextCustomId] = useState(0); // Unique IDs for custom skills
    const [textLines, setTextLines] = useState([]); // Store text lines for better comparison

    const formats = ["bold", "italic", "underline", "list", "bullet"];
    const modules = {
        toolbar: "#quill-toolbar", // Use external toolbar
    };

    const predefinedSkills = [
        "Time management",
        "Organizational skills",
        "Attention to detail",
        "Flexible and adaptable",
        "Multitasking",
        "Excellence in communication",
        "Critical thinking",
        "Calm Under Pressure",
        "Active listening",
        "Problem resolution",
        "Decision making",
        "Teamwork",
        "Customer service",
        "Vertical communication",
    ];

    // And update the extractLines function for better HTML handling
    const extractLines = (text) => {
        if (!text) return [];

        // First convert ReactQuill's HTML to text with proper line breaks
        // ReactQuill wraps content in <p> tags or uses <br> for line breaks
        let processedText = text;

        // Replace paragraph tags with newlines
        processedText = processedText.replace(/<p[^>]*>/gi, '').replace(/<\/p>/gi, '\n');

        // Replace div tags with newlines
        processedText = processedText.replace(/<div[^>]*>/gi, '').replace(/<\/div>/gi, '\n');

        // Replace <br> tags with newlines
        processedText = processedText.replace(/<br\s*\/?>/gi, '\n');

        // Replace all other HTML tags
        processedText = processedText.replace(/<[^>]*>/g, '');

        // Decode HTML entities
        processedText = processedText.replace(/&nbsp;/g, ' ')
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>');

        // Split by newline, trim each line, and filter empty lines
        return processedText.split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);
    };

    // On component load, initialize from text
    useEffect(() => {
        const lines = extractLines(text);
        setTextLines(lines);

        // Initial synchronization
        syncFromText(text);

        setPreviousText(text);
    }, []);

    const syncFromText = (editorText) => {
        // Improve how we extract lines from HTML content
        const lines = extractLines(editorText);
        setTextLines(lines);

        // Process all predefined skills
        const foundPredefined = {};
        const foundEditable = {};

        predefinedSkills.forEach(skill => {
            // Check if any line contains this predefined skill
            const found = lines.some(line => line === skill);
            if (found) {
                foundPredefined[skill] = true;
                foundEditable[skill] = skill;
            }
        });

        // Find custom skills (lines that don't match predefined skills)
        const customLines = lines.filter(line =>
            !predefinedSkills.includes(line) &&
            line.length > 0
        );

        // Create custom skills objects with better IDs
        const newCustomSkills = customLines.map((line, idx) => ({
            id: `custom_${idx}`,
            name: line
        }));

        // Update states
        setSelectedSubCourses(foundPredefined);
        setEditableSkills(foundEditable);
        setCustomSkills(newCustomSkills);
        setNextCustomId(newCustomSkills.length);
    };

    // Helper function to ensure text ends with newline
    const ensureNewline = (currentText) => {
        // If text is empty, just return empty string
        if (currentText === "") {
            return currentText;
        }

        // If the last character isn't a newline, add one
        if (!currentText.endsWith('\n')) {
            return currentText + '\n';
        }

        // Text already ends with newline
        return currentText;
    };

    // Handle adding or removing predefined skills
    const handleAddCourse = (skillName) => {
        // Get the current state to determine action
        const isCurrentlySelected = selectedSubCourses[skillName] || false;
        const willBeSelected = !isCurrentlySelected;

        if (willBeSelected) {
            // Add the skill to text editor if it's not already there
            if (!textLines.includes(skillName)) {
                // Ensure there's a newline before adding the new skill
                const newText = text === "" ? skillName : ensureNewline(text) + skillName;

                setText(newText);
                setPreviousText(newText);

                // Update our tracking of text lines
                setTextLines(prev => [...prev, skillName]);

                // Update skill states
                setSelectedSubCourses(prev => ({ ...prev, [skillName]: true }));
                setEditableSkills(prev => ({ ...prev, [skillName]: skillName }));

                // Move cursor to end
                setTimeout(() => {
                    if (quillRef.current) {
                        const quill = quillRef.current.getEditor();
                        const length = quill.getLength();
                        quill.setSelection(length, 0);
                    }
                }, 0);
            }
        } else {
            // Remove the skill from text editor
            const updatedLines = textLines.filter(line => line !== skillName);
            const newText = updatedLines.join('\n');

            setText(newText);
            setPreviousText(newText);
            setTextLines(updatedLines);

            // Update skill states
            setSelectedSubCourses(prev => ({ ...prev, [skillName]: false }));

            // Remove from ratings
            setSkillRatings(prev => {
                const updated = { ...prev };
                delete updated[skillName];
                return updated;
            });

            // Remove from editable skills
            setEditableSkills(prev => {
                const updated = { ...prev };
                delete updated[skillName];
                return updated;
            });
        }
    };

    // Handle skill name changes
    const handleSkillNameChange = (originalSkill, newName) => {
        // First update the editable skills record
        setEditableSkills(prev => ({ ...prev, [originalSkill]: newName }));

        // Then update the text in the editor
        const updatedLines = textLines.map(line =>
            line === originalSkill || line === editableSkills[originalSkill]
                ? newName
                : line
        );

        const newText = updatedLines.join('\n');
        setText(newText);
        setPreviousText(newText);
        setTextLines(updatedLines);
    };

    // Handle custom skill name changes
    const handleCustomSkillChange = (id, newName) => {
        setIsAddingNewSkill(true);

        // Find the old name
        const oldSkill = customSkills.find(skill => skill.id === id);
        const oldName = oldSkill ? oldSkill.name : '';

        // Update custom skills list
        setCustomSkills(prev => {
            const updated = prev.map(skill =>
                skill.id === id
                    ? { ...skill, name: newName }
                    : skill
            );
            return updated;
        });

        // Update text editor if this wasn't a new skill
        if (oldName && textLines.includes(oldName)) {
            const updatedLines = textLines.map(line =>
                line === oldName ? newName : line
            );

            const newText = updatedLines.join('\n');
            setText(newText);
            setPreviousText(newText);
            setTextLines(updatedLines);
        }
        // If it's a new skill with content, add it to the editor on a new line
        else if (newName && !textLines.includes(newName)) {
            // Only add to text if it has a name and is not already in text
            // Make sure we add on a new line
            // Check if text is empty, has content without ending newline, or already ends with newline
            let newText;
            if (text === "") {
                newText = newName;
            } else if (text.endsWith('\n')) {
                newText = text + newName;
            } else {
                newText = text + '\n' + newName;
            }

            setText(newText);
            setPreviousText(newText);
            setTextLines(prev => [...prev, newName]);
        }

        // Reset flag after a delay
        setTimeout(() => {
            setIsAddingNewSkill(false);
        }, 100);
    };

    // Handle skill rating changes
    const handleRatingChange = (skill, rating) => {
        setSkillRatings(prev => ({
            ...prev,
            [skill]: rating,
        }));
    };

    // Handle custom skill rating changes
    const handleCustomSkillRating = (id, rating) => {
        setSkillRatings(prev => ({
            ...prev,
            [id]: rating,
        }));
    };

    // Reset rating for a skill
    const resetRating = (skill) => {
        setSkillRatings(prev => ({
            ...prev,
            [skill]: 0,
        }));
    };

    // Reset rating for a custom skill
    const resetCustomRating = (id) => {
        setSkillRatings(prev => ({
            ...prev,
            [id]: 0,
        }));
    };

    // Delete a predefined skill
    const deleteSkill = (skill) => {
        // Remove from text editor
        const updatedLines = textLines.filter(line =>
            line !== skill && line !== editableSkills[skill]
        );

        const newText = updatedLines.join('\n');
        setText(newText);
        setPreviousText(newText);
        setTextLines(updatedLines);

        // Update skill states
        setSelectedSubCourses(prev => ({ ...prev, [skill]: false }));

        // Remove from ratings
        setSkillRatings(prev => {
            const updated = { ...prev };
            delete updated[skill];
            return updated;
        });

        // Remove from editable skills
        setEditableSkills(prev => {
            const updated = { ...prev };
            delete updated[skill];
            return updated;
        });
    };

    // Delete a custom skill
    const deleteCustomSkill = (id) => {
        // Find the skill to delete
        const skillToDelete = customSkills.find(skill => skill.id === id);
        if (!skillToDelete) return;

        // Remove from custom skills list
        setCustomSkills(prev => prev.filter(skill => skill.id !== id));

        // Remove from text editor
        if (skillToDelete.name) {
            const updatedLines = textLines.filter(line => line !== skillToDelete.name);
            const newText = updatedLines.join('\n');

            setText(newText);
            setPreviousText(newText);
            setTextLines(updatedLines);
        }

        // Remove from ratings
        setSkillRatings(prev => {
            const updated = { ...prev };
            delete updated[id];
            return updated;
        });
    };

    // Add a new custom skill
    const addNewCustomSkill = () => {
        // Set flag to prevent unwanted syncing
        setIsAddingNewSkill(true);

        // Create a new custom skill with unique ID
        const newId = `custom_${nextCustomId}`;
        setNextCustomId(prev => prev + 1);

        // Add empty skill for editing
        setCustomSkills(prev => [...prev, { id: newId, name: '' }]);

        // Force skills tab to be active
        setActiveTab("skills");

        // Keep flag active for a while to avoid sync issues
        setTimeout(() => {
            setIsAddingNewSkill(false);
        }, 500);
    };

    // Handle text editor changes
    const handleEditorChange = (value) => {
        if (isAddingNewSkill) {
            // If adding a new skill, just update the text
            setText(value);
            setPreviousText(value);
        } else {
            // Otherwise, sync skills from text
            setText(value);
            syncFromText(value);
            setPreviousText(value);
        }
    };

    // Handle skill input focus
    const handleSkillInputFocus = () => {
        setIsAddingNewSkill(true);
    };

    // Handle skill input blur
    const handleSkillInputBlur = () => {
        setTimeout(() => {
            setIsAddingNewSkill(false);
        }, 100);
    };

    // Get selected skills for Skills tab
    const selectedSkills = Object.keys(selectedSubCourses).filter(
        (skill) => selectedSubCourses[skill]
    );

    return (
        <>
            <div className="additional-coursework">
                <div className="blue-box">
                    <div className="content">
                        {/* Left Side - Add Skills Buttons */}
                        <div className="skills-buttons-box">
                            <h3>Add Skills</h3>
                            <div className="buttons">
                                {predefinedSkills.map((skill, index) => {
                                    // Check if skill is selected based on textLines
                                    const isSelected = textLines.includes(skill);

                                    return (
                                        <div key={index} className="sub-course-card">
                                            <button
                                                className="add-btn"
                                                type="button"
                                                style={{
                                                    background: isSelected
                                                        ? "grey"
                                                        : "#064284",
                                                }}
                                                onClick={() => handleAddCourse(skill)}
                                            >
                                                {isSelected ? "✔" : "+"}
                                            </button>
                                            <span>{skill}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Right Side - Education & Skills Toggle */}
                        <div className="right-section">
                            <div className="toggle-buttons">
                                <button
                                    className={`tab-btn ${activeTab === "education" ? "active" : ""}`}
                                    onClick={() => {
                                        setIsAddingNewSkill(false);
                                        setActiveTab("education");
                                    }}
                                >
                                    Education
                                </button>
                                <button
                                    className={`tab-btn ${activeTab === "skills" ? "active" : ""}`}
                                    onClick={() => setActiveTab("skills")}
                                >
                                    Skills
                                </button>
                            </div>

                            <div className="right-content">
                                {activeTab === "education" ? (
                                    <div className="text-box">
                                        <div className="text-box-title">
                                            <h3>Education Description</h3>
                                        </div>

                                        {/* Single Toolbar Used by All Quill Editors */}
                                        <div id="quill-toolbar">
                                            <span className="ql-formats">
                                                <button className="ql-bold"></button>
                                                <button className="ql-italic"></button>
                                                <button className="ql-underline"></button>
                                            </span>
                                            <span className="ql-formats">
                                                <button className="ql-list" value="ordered"></button>
                                                <button className="ql-list" value="bullet"></button>
                                            </span>
                                            <span className="ql-formats">
                                                <button className="ql-clean"></button>
                                            </span>
                                        </div>

                                        {/* ReactQuill Editor */}
                                        <ReactQuill
                                            ref={quillRef}
                                            value={text}
                                            onChange={handleEditorChange}
                                            modules={modules}
                                            formats={formats}
                                            theme="snow"
                                        />
                                    </div>
                                ) : (
                                    <div className="skills-box">
                                        <h3>Summary of Skills</h3>
                                        <ul>
                                            {(selectedSkills.length > 0 || customSkills.length > 0) ? (
                                                <>
                                                    {/* Predefined skills */}
                                                    {selectedSkills.filter(skill => textLines.includes(editableSkills[skill] || skill)).map((skill, index) => (
                                                        <li key={`skill-${index}`} className="skill-item">
                                                            <div className="skill-rating">
                                                                <div className="rating-controls">
                                                                    <button
                                                                        className="minus-btn"
                                                                        onClick={() => resetRating(skill)}
                                                                        title="Reset rating"
                                                                    >
                                                                        -
                                                                    </button>
                                                                    <div className="rating">
                                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                                            <span
                                                                                key={star}
                                                                                className={`star ${(skillRatings[skill] || 0) >= star
                                                                                    ? "filled"
                                                                                    : ""
                                                                                    }`}
                                                                                onClick={() =>
                                                                                    handleRatingChange(
                                                                                        skill,
                                                                                        star
                                                                                    )
                                                                                }
                                                                            >
                                                                                ★
                                                                            </span>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                                <div className="skill-name-container">
                                                                    <input
                                                                        type="text"
                                                                        className="editable-skill-name"
                                                                        value={editableSkills[skill] || skill}
                                                                        onChange={(e) => handleSkillNameChange(skill, e.target.value)}
                                                                        onFocus={handleSkillInputFocus}
                                                                        onBlur={handleSkillInputBlur}
                                                                    />
                                                                    <button
                                                                        className="delete-skill-btn"
                                                                        onClick={() => deleteSkill(skill)}
                                                                        title="Delete skill"
                                                                    >
                                                                        ×
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))}

                                                    {/* Custom skills */}
                                                    {customSkills.map((skillObj, index) => (
                                                        <li key={skillObj.id} className="skill-item">
                                                            <div className="skill-rating">
                                                                <div className="rating-controls">
                                                                    <button
                                                                        className="minus-btn"
                                                                        onClick={() => resetCustomRating(skillObj.id)}
                                                                        title="Reset rating"
                                                                    >
                                                                        -
                                                                    </button>
                                                                    <div className="rating">
                                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                                            <span
                                                                                key={star}
                                                                                className={`star ${(skillRatings[skillObj.id] || 0) >= star
                                                                                    ? "filled"
                                                                                    : ""
                                                                                    }`}
                                                                                onClick={() =>
                                                                                    handleCustomSkillRating(
                                                                                        skillObj.id,
                                                                                        star
                                                                                    )
                                                                                }
                                                                            >
                                                                                ★
                                                                            </span>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                                <div className="skill-name-container">
                                                                    <input
                                                                        type="text"
                                                                        className="editable-skill-name custom-skill"
                                                                        value={skillObj.name}
                                                                        onChange={(e) => handleCustomSkillChange(skillObj.id, e.target.value)}
                                                                        placeholder="Enter skill name..."
                                                                        ref={index === customSkills.length - 1 && skillObj.name === '' ? newSkillInputRef : null}
                                                                        onFocus={handleSkillInputFocus}
                                                                        onBlur={handleSkillInputBlur}
                                                                    />
                                                                    <button
                                                                        className="delete-skill-btn"
                                                                        onClick={() => deleteCustomSkill(skillObj.id)}
                                                                        title="Delete skill"
                                                                    >
                                                                        ×
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </>
                                            ) : (
                                                <p>No skills selected yet.</p>
                                            )}
                                        </ul>
                                        <button
                                            className="add-more-btn"
                                            onClick={addNewCustomSkill}
                                        >
                                            + Add More
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CSS-in-JS Styles - Unchanged */}
            <style jsx>{`
                .additional-coursework {
                    background: #fff;
                    padding: 15px;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    margin-top: 10px;
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
                    gap: 20px;
                    width: 100%;
                }

                /* Left Side - Add Skills Buttons */
                .skills-buttons-box {
                    width: 25%;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    padding: 10px;
                    background-color: #f6f5f0;
                    max-height: 500px;
                    overflow-y: auto;
                    flex: 0 0 50%;
                }
                .buttons {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }
                .sub-course-card {
                    display: flex;
                    align-items: center;
                    background: white;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    padding: 10px;
                    cursor: pointer;
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

                /* Right Side - Editor & Skills */
                .right-section {
                    width: 75%;
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }
                .toggle-buttons {
                    display: flex;
                    gap: 10px;
                    margin-bottom: 10px;
                }
                .tab-btn {
                    padding: 8px 12px;
                    border-radius: 5px;
                    border: 1px solid #ccc;
                    cursor: pointer;
                    background-color: #f5f5f5;
                    flex: 0 0 50%;
                }
                .tab-btn.active {
                    background-color: #064284;
                    color: white;
                    border-color: #064284;
                    flex: 0 0 50%;
                }
                .right-content {
                    display: flex;
                    gap: 10px;
                }
                .text-box {
                    width: 100%;
                }
                .skills-box {
                    width: 100%;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    padding: 10px;
                    background-color: #f6f5f0;
                }
                .skills-box ul {
                    list-style-type: none;
                    padding: 0;
                }
                .skills-box li {
                    padding: 5px 0;
                    border-bottom: 1px solid #ccc;
                }
                .skill-rating {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .rating {
                    display: flex;
                    gap: 5px;
                }
                .star {
                    cursor: pointer;
                    font-size: 20px;
                    color: #ccc;
                }
                .star.filled {
                    color: #ffd700;
                }
                .text-box-title {
                    margin-bottom: 10px;
                }
                #quill-toolbar {
                    margin-bottom: 10px;
                }

                /* New CSS for additional elements */
                .rating-controls {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                }
                .minus-btn {
                    border: none;
                    background: #f0f0f0;
                    color: #333;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                }
                .minus-btn:hover {
                    background: #ddd;
                }
                .skill-name-container {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    flex: 1;
                }
                .editable-skill-name {
                    flex: 1;
                    padding: 5px;
                    border: 1px solid transparent;
                    border-radius: 3px;
                    background-color: #f0f8ff;  /* Light blue background to indicate editable field */
                }
                .editable-skill-name:focus {
                    border-color: #ccc;
                    background-color: white;
                    outline: none;
                }
                .editable-skill-name.custom-skill {
                    background-color: #e6f7ff;  /* Slightly different color for custom skills */
                }
                .delete-skill-btn {
                    border: none;
                    background: none;
                    color: #777;
                    font-size: 18px;
                    cursor: pointer;
                    width: 24px;
                    height: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                }
                .delete-skill-btn:hover {
                    background: #f0f0f0;
                    color: #d32f2f;
                }
                .add-more-btn {
                    margin-top: 15px;
                    padding: 8px 12px;
                    background-color: #064284;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    width: 100%;
                }
                .add-more-btn:hover {
                    background-color: #043366;
                }
            `}</style>
        </>
    );
};

export default SkillList;