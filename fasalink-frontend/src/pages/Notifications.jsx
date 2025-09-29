import React from 'react';
import { FaUserCircle, FaBell, FaStar, FaDollarSign, FaArrowRight } from 'react-icons/fa';
import './Notifications.css';

const NotificationItem = ({ icon, title, message, time }) => (
    <div className="notification-item">
        <div className="icon-container">{icon}</div>
        <div className="content-container">
            <span className="title">{title}</span>
            <p className="message">{message}</p>
        </div>
        <span className="time">{time}</span>
    </div>
);

const Notifications = () => {
    return (
        <div className="notifications-page">
            <div className="header-card">
                <FaUserCircle size={32} />
                <h1 className="main-title">Notifications</h1>
            </div>
            <div className="main-content-card">
                <input type="text" placeholder="Search lot" className="search-bar" />
                <div className="notifications-list">
                    <NotificationItem icon={<FaBell />} title="Brokerxyz" message="Your shipment of xyz product has arrived at..." time="17:30 - June 25" />
                    <NotificationItem icon={<FaStar />} title="Harvest" message="Harvest of 100 Kg apples is ready to be dispatched." time="17:00 - June 25" />
                    <NotificationItem icon={<FaDollarSign />} title="Transaction Alert" message="A new transaction has been registered" time="14:00 - June 25" />
                    <NotificationItem icon={<FaArrowRight />} title="Payment Due" message="Payment due from Brokerxyz on 27 June." time="17:00 - June 24" />
                </div>
            </div>
        </div>
    );
};

export default Notifications;