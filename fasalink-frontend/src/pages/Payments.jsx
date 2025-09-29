import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import './Payments.css';

const Payments = () => {
    // Dummy data
    const duePayments = [
        { name: 'X Traders', amount: '₹20,000' },
        { name: 'Y Traders', amount: '₹10,000' },
        { name: 'Z Traders', amount: '₹25,000' },
    ];
    const history = [
        { name: 'XYZ Traders', date: '5 August' },
        { name: 'Z Farm', date: '5 August' },
        { name: 'M market', date: '4 August' },
    ];

    return (
        <div className="payments-container">
            <div className="due-card">
                <h2 className="card-title">Payment due</h2>
                <div className="list">
                    {duePayments.map((item, index) => (
                        <div key={index} className="due-item">
                            <div className="item-info">
                                <FaUserCircle size={24} className="user-icon" />
                                <span>{item.name}</span>
                            </div>
                            <span className="amount">{item.amount}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="history-section">
                <div className="section-header">
                    <h2 className="section-title">Payment history</h2>
                    <a href="#" className="see-all-link">see all &gt;</a>
                </div>
                <div className="list">
                    {history.map((item, index) => (
                        <div key={index} className="history-item">
                           <FaUserCircle size={32} className="user-icon large" />
                           <div className="item-details">
                               <span className="name">{item.name}</span>
                               <span className="date">{item.date}</span>
                           </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Payments;