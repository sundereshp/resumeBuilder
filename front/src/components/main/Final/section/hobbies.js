import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Hobbies = () => {
    const navigate = useNavigate();
    const [content, setContent] = useState("");
    const editorRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleBack = () => {
        navigate(-1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/dashboard/finalize/congrats");
    };

    // Text formatting functions
    const formatText = (command) => {
        document.execCommand(command, false, null);
        if (editorRef.current) {
            editorRef.current.focus();
        }
    };

    // Handle content changes
    const handleContentChange = () => {
        if (editorRef.current) {
            setContent(editorRef.current.innerHTML);
        }
    };

    return (
        <div className="hobbies-container">
            <button onClick={handleBack} className="back-button">
                ← Back
            </button>

            <div className="form-header">
                <h2>Hobbies & Interests</h2>
                <p>Add hobbies and interests that might be relevant for your application.</p>
            </div>

            <form className="form-container" onSubmit={handleSubmit}>
                <div className="editor-container">
                    <div className="toolbar">
                        <button 
                            type="button" 
                            className="toolbar-button" 
                            onClick={() => formatText('bold')}
                            title="Bold"
                        >
                            <strong>B</strong>
                        </button>
                        <button 
                            type="button" 
                            className="toolbar-button" 
                            onClick={() => formatText('italic')}
                            title="Italic"
                        >
                            <em>I</em>
                        </button>
                        <button 
                            type="button" 
                            className="toolbar-button" 
                            onClick={() => formatText('underline')}
                            title="Underline"
                        >
                            <u>U</u>
                        </button>
                        <span className="separator">|</span>
                        <button 
                            type="button" 
                            className="toolbar-button" 
                            onClick={() => formatText('undo')}
                            title="Undo"
                        >
                            ↩
                        </button>
                        <button 
                            type="button" 
                            className="toolbar-button" 
                            onClick={() => formatText('redo')}
                            title="Redo"
                        >
                            ↪
                        </button>
                    </div>
                    <div
                        ref={editorRef}
                        className="text-editor"
                        contentEditable="true"
                        onInput={handleContentChange}
                        placeholder="Describe your hobbies and interests..."
                    ></div>
                </div>

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
                .hobbies-container {
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

                .editor-container {
                    width: 100%;
                    margin-bottom: 30px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    overflow: hidden;
                }

                .toolbar {
                    display: flex;
                    padding: 10px;
                    background-color: #f5f5f5;
                    border-bottom: 1px solid #ccc;
                }

                .toolbar-button {
                    background: none;
                    border: none;
                    cursor: pointer;
                    margin-right: 10px;
                    padding: 5px 10px;
                    border-radius: 3px;
                    font-size: 16px;
                }

                .toolbar-button:hover {
                    background-color: #e0e0e0;
                }

                .separator {
                    margin: 0 10px;
                    color: #ccc;
                }

                .text-editor {
                    min-height: 200px;
                    padding: 15px;
                    font-size: 16px;
                    line-height: 1.6;
                    overflow-y: auto;
                }

                .text-editor:empty:before {
                    content: attr(placeholder);
                    color: #888;
                }

                .text-editor:focus {
                    outline: none;
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

export default Hobbies;