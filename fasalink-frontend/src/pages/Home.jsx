import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { FiMapPin } from 'react-icons/fi';
import { GoHistory } from 'react-icons/go';
import { BsFillPersonFill, BsQuestionCircleFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import PayoutImage from '../assets/payout.png';
import './Home.css'; 
import './Inventory.css';


const Home = () => {
  const { user } = useAuth()
  const navigate = useNavigate();
  return (
    <div className="home-container">
      {/* Welcome Message */}
      <div className="section">
      <h2 className="welcome-subtitle">Hello {user ? user.username : 'Welcome'}!</h2>
        <h1 className="welcome-title">Welcome!</h1>
      </div>

      {/* Local Produce Price */}
      <div className="section">
        <div className="section-header">
          <h3 className="section-title">Local Produce Price:</h3>
          <a href="#" className="find-more">Find More &gt;</a>
        </div>
        <div className="produce-list">
          <p>Kashmiri Apples: ₹80/Kg</p>
          <p>Kashmiri Apples: ₹80/Kg</p>
        </div>
      </div>

      {/* Payment Card */}
      <div className="payout-card">
        <div>
          <p className="payout-label">Payout Today:</p>
          <p className="payout-amount">₹5,800</p>
          <p className="payout-date">6th June 2025</p>
        </div>
        <img src={PayoutImage} alt="Payout" className="payout-image" />
      </div>

      {/* Daily Record */}
      <div className="section">
        <h3 className="section-title">Quick Access</h3>
        <div className="grid-2-col">
            <button
                onClick={() => navigate('/create-lot')} // This functionality remains the same
                className="action-card"
            >
                <FaPlus /> Create a Lot
            </button>
          <button
                onClick={() => navigate('/tracking')} // This functionality remains the same
                className="action-card"
            >
                <FiMapPin size={24}/> Track Lot
            </button>
        </div>
      </div>
      
      {/* For You */}
      <div className="section">
        <h3 className="section-title">For You</h3>
        <div className="grid-3-col">
            <div className="for-you-card"><BsFillPersonFill size={32} /></div>
            <div className="for-you-card"><GoHistory size={32} /></div>
            <div className="for-you-card"><BsQuestionCircleFill size={32} /></div>
        </div>
      </div>
    </div>
  );
};

export default Home;