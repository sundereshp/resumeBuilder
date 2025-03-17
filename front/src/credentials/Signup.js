import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import axios from 'axios';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/signup', {
                name,
                email,
                password
            });
            alert(response.data.message);
            navigate('/login'); // Redirect to login page after successful signup
        } catch (error) {
            console.error('Error signing up:', error);
            alert('Signup failed!');
        }
    };

    return (
        <div className="signup-container">
            <h2>Signup Page</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Signup</button>
            </form>
            <p>Already have an account? <button onClick={() => navigate('/login')}>Login</button></p>
        </div>
    );
};

export default Signup;
