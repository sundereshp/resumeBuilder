import React from 'react';
import { useNavigate } from 'react-router-dom';
import './startbuilding.css';

const StartBuilding = () => {
    const navigate = useNavigate(); // React Router hook for navigation

    const handleStartClick = () => {
        navigate('/dashboard/heading'); // Navigate to the desired page
    };

    return (
        <div className='flex-container'>
            <div className='main-content'>
                <div className="start-building-container">
                    <h1>Welcome to the Resume Builder!</h1>
                    <button className="start-button" onClick={handleStartClick}>
                        Start Building
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StartBuilding;
