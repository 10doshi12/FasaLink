import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './SignUp.css'; // You can reuse styles from Login.css or create a new file

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [userType, setUserType] = useState('farmer'); // Default to farmer
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await register(username, password, email, userType);
            navigate('/'); // Navigate to the main app page on successful registration
        } catch (err) {
            // Parse error from backend if possible
            try {
                const errorData = JSON.parse(err.message);
                const errorMessages = Object.entries(errorData).map(([key, value]) => `${key}: ${value.join(', ')}`);
                setError(errorMessages.join(' '));
            } catch {
                setError('Registration failed. Please try again.');
            }
        }
    };

    return (
        <div className="signup-container">
            <h1 className="signup-title">Create an Account</h1>
            <form onSubmit={handleSubmit} className="signup-form">
                <input
                    type="text"
                    placeholder="Username"
                    className="input-field"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email Address"
                    className="input-field"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="input-field"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <select 
                    className="input-field" 
                    value={userType} 
                    onChange={(e) => setUserType(e.target.value)}
                >
                    <option value="farmer">Farmer</option>
                    <option value="distributor">Distributor</option>
                    <option value="retailer">Retailer</option>
                </select>
                
                {error && <p className="error-text">{error}</p>}

                <button type="submit" className="btn primary-btn">Sign Up</button>
            </form>
            <div className="login-link">
                <p>
                    Already have an account?{' '}
                    <button onClick={() => navigate('/login')} className="link-btn">Login</button>
                </p>
            </div>
        </div>
    );
};

export default SignUp;