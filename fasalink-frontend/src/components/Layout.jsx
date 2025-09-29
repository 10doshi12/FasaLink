import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import BottomNav from './BottomNav';
import { FaUserCircle, FaBell } from 'react-icons/fa';
import { BsChatDotsFill } from 'react-icons/bs';
import FasalinkLogoText from '../assets/FasalinkLogoText.png';
import './Layout.css'; // Import CSS

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Define paths where the standard header should be hidden
  const noHeaderPaths = ['/chat', '/profile', '/notifications', '/create-lot', '/history'];
  const showHeader = !noHeaderPaths.includes(location.pathname);

  return (
    <div className="layout-container">
      {showHeader && (
        <header className="app-header">
          <FaUserCircle size={28} className="header-icon" onClick={() => navigate('/profile')} />
          <img src={FasalinkLogoText} alt="FasaLink" className="header-logo" />
          <div className="header-actions">
            <BsChatDotsFill size={24} className="header-icon" onClick={() => navigate('/chat')} />
            <FaBell size={24} className="header-icon" onClick={() => navigate('/notifications')} />
          </div>
        </header>
      )}
      <main className="main-content">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};

export default Layout;