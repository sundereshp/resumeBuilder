import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', {
                email,
                password
            }, {
                withCredentials: true,
            });
            alert(response.data.message);
    
            if (response.status === 200) {
                onLogin(); // Call onLogin to notify App.js
                navigate('/dashboard'); // Navigate to /dashboard after login
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Invalid credentials!');
        }
    };

    return (
        <div className="login-container">
            <h2>Login Page</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <div className="password-container">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            console.log(e.target.value); // Log the entered password
                        }}
                        required
                    />
                    <span
                        className="toggle-password"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? '👁️' : '🙈'}
                    </span>
                </div>

                <button type="submit">Login</button>
            </form>
            <p>New account? <button onClick={() => navigate('/')}>Signup</button></p>
        </div>
    );
};

export default Login;
