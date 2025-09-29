import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/FasalinkLogo.png'; // Make sure this path is correct
import './Landing.css'; // Import the new CSS file

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-container">
            <div className="logo-section">
                <img src={Logo} alt="FasaLink Logo" className="logo-image" />
            </div>

            <div className="button-section">
                <button
                    onClick={() => navigate('/login')}
                    className="btn btn-primary"
                >
                    Log In
                </button>
                <button
                    onClick={() => navigate('/signup')}
                    className="btn btn-secondary"
                >
                    Create account
                </button>
            </div>
        </div>
    );
};

export default Landing;