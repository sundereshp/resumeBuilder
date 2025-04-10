import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './certification.css'
import { FaSearch, FaPlus, FaCheck, FaTimes, FaBold, FaItalic, FaUnderline, FaUndo, FaRedo } from "react-icons/fa";
const jobDescriptions = [
    {
        id: 1,
        title: "Area of expertise",
        keywords: ["expertise"],
        description:
            "[Area of expertise] - [TimeFrame]",
    },
    {
        id: 2,
        title: "Area of certification",
        keywords: ["certification"],
        description:
            "[Area of certification] Training - [TimeFrame]",
    },
    {
        id: 3,
        title: "Job Title",
        keywords: ["jobtitle"],
        description:
            "Licensed [Job Title] - [TimeFrame]",
    }
];

function Certifications() {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSummaries, setSelectedSummaries] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [keywordSuggestions, setKeywordSuggestions] = useState([]);
    const [editorContent, setEditorContent] = useState('');
    const [editorHistory, setEditorHistory] = useState(['']);
    const [historyIndex, setHistoryIndex] = useState(0);
    const [selectedContentMap, setSelectedContentMap] = useState({});
    const editorRef = useRef(null);


    // Initialize filtered jobs on component mount (only runs once)
    useEffect(() => {
        setFilteredJobs(jobDescriptions);
    }, []); // Empty dependency array

    // Filter jobs when search term changes
    useEffect(() => {
        // Filter suggestions and jobs based on search term
        if (searchTerm.trim() === '') {
            setFilteredJobs(jobDescriptions);
            setKeywordSuggestions([]);
            setShowSuggestions(false);
        } else {
            // ...rest of your filtering logic...
        }
    }, [searchTerm]); // Remove jobDescriptions from dependencies
    // Filter jobs when search term changes

    useEffect(() => {
        // Set initial empty content for history tracking
        setEditorHistory(['']);
        setHistoryIndex(0);
    }, []);

    // Format plain text into paragraphs for proper HTML rendering
    const formatContentWithParagraphs = (text) => {
        if (!text) return '';

        // Split by double newlines to identify paragraphs
        const paragraphs = text.split(/\n\n+/);

        // Format each paragraph with proper HTML
        return paragraphs
            .map(para => {
                // Skip empty paragraphs
                if (!para.trim()) return '';

                // Format single newlines as <br> tags
                const lines = para.split(/\n/)
                    .map(line => line.trim())
                    .filter(line => line);

                if (lines.length === 0) return '';

                // Join lines with <br> tags for single line breaks
                return `<p>${lines.join('<br>')}</p>`;
            })
            .filter(para => para)
            .join('');
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSelectSummary = (id) => {
        // Check if the summary is already selected
        if (selectedSummaries.includes(id)) {
            // If clicking on an already selected summary, deselect it
            const newSelectedSummaries = selectedSummaries.filter(summaryId => summaryId !== id);
            setSelectedSummaries(newSelectedSummaries);

            // Remove the content from the map
            const newContentMap = { ...selectedContentMap };
            delete newContentMap[id];
            setSelectedContentMap(newContentMap);

            // Update editor content based on remaining selections
            if (newSelectedSummaries.length === 0) {
                setEditorContent('');
                setEditorHistory(['']);
                setHistoryIndex(0);
            } else {
                // Rebuild the content from remaining selections
                const newContent = newSelectedSummaries
                    .map(selectedId => selectedContentMap[selectedId])
                    .join('<div class="summary-divider"></div>');

                setEditorContent(newContent);
                setEditorHistory([newContent]);
                setHistoryIndex(0);
            }
        } else {
            // If selecting a new summary, add it to the list of selected summaries
            const newSelectedSummaries = [...selectedSummaries, id];
            setSelectedSummaries(newSelectedSummaries);

            // Get the newly selected job
            const selectedJob = jobDescriptions.find(job => job.id === id);
            if (selectedJob) {
                // Format the content for the new selection
                const formattedContent = formatContentWithParagraphs(selectedJob.description);

                // Update the content map
                const newContentMap = {
                    ...selectedContentMap,
                    [id]: formattedContent
                };
                setSelectedContentMap(newContentMap);

                // Update the editor content
                const newContent = newSelectedSummaries
                    .map(selectedId => newContentMap[selectedId])
                    .join('<div class="summary-divider"></div>');

                setEditorContent(newContent);
                setEditorHistory([newContent]);
                setHistoryIndex(0);
            }
        }
    };

    const clearAllSelections = () => {
        setSelectedSummaries([]);
        setEditorContent('');
        setEditorHistory(['']);
        setHistoryIndex(0);
    };

    const handleClearSearch = () => {
        setSearchTerm('');
        setShowSuggestions(false);
    };

    const handleSelectSuggestion = (suggestion) => {
        setSearchTerm(suggestion);
        setShowSuggestions(false);
    };

    const handleEditorChange = (e) => {
        const newContent = e.target.innerHTML;
        setEditorContent(newContent);

        // Add to history if content has changed
        if (newContent !== editorHistory[historyIndex]) {
            // Remove any future history if we're in the middle of the history
            const newHistory = editorHistory.slice(0, historyIndex + 1);
            setEditorHistory([...newHistory, newContent]);
            setHistoryIndex(newHistory.length);
        }
    };

    const applyFormatting = (command, value = null) => {
        document.execCommand(command, false, value);
        // Focus back on the editor after applying formatting
        if (editorRef.current) {
            editorRef.current.focus();
        }

        // Update history after formatting
        const updatedContent = editorRef.current.innerHTML;
        if (updatedContent !== editorHistory[historyIndex]) {
            const newHistory = editorHistory.slice(0, historyIndex + 1);
            setEditorHistory([...newHistory, updatedContent]);
            setHistoryIndex(newHistory.length);
        }
    };

    // Create a new paragraph
    const createNewParagraph = () => {
        if (editorRef.current) {
            // Insert new paragraph
            document.execCommand('insertParagraph', false, null);
            editorRef.current.focus();

            // Update history
            const updatedContent = editorRef.current.innerHTML;
            if (updatedContent !== editorHistory[historyIndex]) {
                const newHistory = editorHistory.slice(0, historyIndex + 1);
                setEditorHistory([...newHistory, updatedContent]);
                setHistoryIndex(newHistory.length);
            }
        }
    };

    const handleKeyDown = (e) => {
        // Handle keyboard shortcuts
        if (e.ctrlKey) {
            switch (e.key) {
                case 'b':
                    e.preventDefault();
                    applyFormatting('bold');
                    break;
                case 'i':
                    e.preventDefault();
                    applyFormatting('italic');
                    break;
                case 'u':
                    e.preventDefault();
                    applyFormatting('underline');
                    break;
                case 'z':
                    e.preventDefault();
                    handleUndo();
                    break;
                case 'y':
                    e.preventDefault();
                    handleRedo();
                    break;
                default:
                    break;
            }
        }
    };

    const handleUndo = () => {
        if (historyIndex > 0) {
            setHistoryIndex(historyIndex - 1);
            setEditorContent(editorHistory[historyIndex - 1]);
        }
    };

    const handleRedo = () => {
        if (historyIndex < editorHistory.length - 1) {
            setHistoryIndex(historyIndex + 1);
            setEditorContent(editorHistory[historyIndex + 1]);
        }
    };

    return (
        <div className="tips-container">
            <button onClick={() => navigate('../tips')} className="back-button">
                <span>←</span>Go Back
            </button>

            <h1 className="summary-title">What certifications do you have?</h1>
            <p className="summary-text">Choose from our pre-written examples below or write your own.</p>

            <div className="summary-layout">
                <div className="summary-content">
                    <div className="unified-container">
                        <div className="search-container">
                            <div className="search-box">
                                <FaSearch className="search-icon" />
                                <input
                                    type="text"
                                    className="search-input"
                                    placeholder="Search for a summary by job title or keyword"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                                {searchTerm && (
                                    <button className="clear-search" onClick={handleClearSearch}>
                                        <FaTimes />
                                    </button>
                                )}
                            </div>
                            {showSuggestions && (
                                <div className="suggestions">
                                    {keywordSuggestions.map((suggestion, index) => (
                                        <div
                                            key={index}
                                            className="suggestion-item"
                                            onClick={() => handleSelectSuggestion(suggestion)}
                                        >
                                            {suggestion}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="recommendations-header">
                            <div className="recommendations-title">Expert Recommended Summaries</div>
                            <div className="recommendations-count">
                                {filteredJobs.length} options
                                {selectedSummaries.length > 0 && (
                                    <button
                                        className="clear-all-button"
                                        onClick={clearAllSelections}
                                        title="Clear all selections"
                                    >
                                        Clear All
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="scrollable-container">
                            {filteredJobs.length > 0 ? (
                                <div className="job-descriptions">
                                    {filteredJobs.map((job) => (
                                        <div key={job.id} className={`job-card ${selectedSummaries.includes(job.id) ? 'selected' : ''}`}>
                                            <div className="job-card-content">
                                                <div
                                                    className="select-circle"
                                                    onClick={() => handleSelectSummary(job.id)}
                                                >
                                                    {selectedSummaries.includes(job.id) ? <FaCheck /> : <FaPlus />}
                                                </div>
                                                <div className="job-text">
                                                    <h3>{job.title}</h3>
                                                    <p>{job.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="no-results">
                                    <p>No matching summaries found.</p>
                                    <p>Try different keywords or browse all options by clearing your search.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Text Editor Component - Always visible */}
                <div className="editor-container">
                    <div className="editor-header">
                        <h3>Edit Your Summary</h3>
                        <div className="formatting-toolbar">
                            <button
                                className="format-button"
                                onClick={() => applyFormatting('bold')}
                                title="Bold (Ctrl+B)"
                            >
                                <FaBold />
                            </button>
                            <button
                                className="format-button"
                                onClick={() => applyFormatting('italic')}
                                title="Italic (Ctrl+I)"
                            >
                                <FaItalic />
                            </button>
                            <button
                                className="format-button"
                                onClick={() => applyFormatting('underline')}
                                title="Underline (Ctrl+U)"
                            >
                                <FaUnderline />
                            </button>
                            <button
                                className="format-button"
                                onClick={createNewParagraph}
                                title="New Paragraph"
                            >
                                ¶
                            </button>
                            <div className="divider"></div>
                            <button
                                className={`format-button ${historyIndex <= 0 ? 'disabled' : ''}`}
                                onClick={handleUndo}
                                disabled={historyIndex <= 0}
                                title="Undo (Ctrl+Z)"
                            >
                                <FaUndo />
                            </button>
                            <button
                                className={`format-button ${historyIndex >= editorHistory.length - 1 ? 'disabled' : ''}`}
                                onClick={handleRedo}
                                disabled={historyIndex >= editorHistory.length - 1}
                                title="Redo (Ctrl+Y)"
                            >
                                <FaRedo />
                            </button>
                        </div>
                    </div>
                    <div
                        ref={editorRef}
                        className="editor-area"
                        contentEditable={true}
                        dangerouslySetInnerHTML={{ __html: editorContent }}
                        onInput={handleEditorChange}
                        onKeyDown={handleKeyDown}
                        data-placeholder="Select a summary or write your own..."
                    ></div>
                </div>

            </div>

            <div className="navigation-buttons">
                <button
                    className="preview-btn"
                    onClick={() => navigate('/dashboard/finalize/firstpage')}
                >
                    Preview
                </button>
                <button
                    className="next-btn"
                    onClick={() => {
                        // Get the selected sections from the location state
                        const selectedSections = location.state?.selectedSections || [];
                        
                        // Find the current section index
                        const currentIndex = selectedSections.indexOf('certifications');
                        
                        // If certifications is not the last section, navigate to next
                        if (currentIndex >= 0 && currentIndex < selectedSections.length - 1) {
                            const nextSection = selectedSections[currentIndex + 1];
                            navigate(`/dashboard/finalize/${nextSection}`, {
                                state: { selectedSections }
                            });
                        } else {
                            // If certifications is the last section, navigate to congrats page
                            navigate("/dashboard/finalize/congrats");
                        }
                    }}
                >
                    Next: Add Summary
                </button>
            </div>
        </div>
    );
}

export default Certifications;