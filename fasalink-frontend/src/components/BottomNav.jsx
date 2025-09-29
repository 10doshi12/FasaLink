import React from 'react';
import { NavLink } from 'react-router-dom';
import { GoHome, GoHistory } from 'react-icons/go';
import { MdOutlineInventory, MdPayment } from 'react-icons/md';
import { FaMapMarkedAlt } from 'react-icons/fa';
import './BottomNav.css'; // Import the CSS file

const BottomNav = () => {
  const navItems = [
    { path: '/home', icon: GoHome, label: 'Home' },
    { path: '/payments', icon: MdPayment, label: 'Payment' },
    { path: '/inventory', icon: MdOutlineInventory, label: 'Inventory' },
    { path: '/tracking', icon: FaMapMarkedAlt, label: 'Tracking' },
    { path: '/history', icon: GoHistory, label: 'History' },
  ];

  return (
    <nav className="bottom-nav">
      <div className="bottom-nav-container">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className="nav-item"
          >
            <item.icon size={24} />
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;