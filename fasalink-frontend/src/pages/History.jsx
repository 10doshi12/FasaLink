import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { IoArrowBack } from 'react-icons/io5';
import './History.css'; // Your existing CSS for this page

const History = () => {
    const navigate = useNavigate();
    const { token } = useAuth();
    const [lots, setLots] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchHistory = async () => {
            if (!token) return;
            
            try {
                const response = await fetch('http://localhost:8000/api/lot-history/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch lot history.');
                }
                const data = await response.json();
                setLots(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchHistory();
    }, [token]);

    const renderContent = () => {
        if (isLoading) {
            return <p>Loading history...</p>;
        }
        if (error) {
            return <p className="error-text">{error}</p>;
        }
        if (lots.length === 0) {
            return <p>No lot history found for your account.</p>;
        }
        return (
            <div className="history-list">
                {lots.map(lot => (
                    <div key={lot.Key} className="history-log-item">
                        <div className="item-details">
                            <span className="item-title">Lot #{lot.Key}</span>
                            <span className="item-info">Product: {lot.Record.produce}</span>
                            <span className="item-info">Quantity: {lot.Record.quantity}</span>
                        </div>
                        <span className="item-status">{lot.Record.status}</span>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="page-container white-bg">
            <div className="page-header">
                <button onClick={() => navigate('/home')} className="back-button"><IoArrowBack size={24} /></button>
                <h1 className="page-title">My Lot History</h1>
            </div>
            {renderContent()}
        </div>
    );
};

export default History;