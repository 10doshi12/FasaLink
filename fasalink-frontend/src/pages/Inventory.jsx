import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Inventory.css';

const Inventory = () => {
    const navigate = useNavigate();
    const { token } = useAuth();

    // State to hold lots, loading status, and errors
    const [lots, setLots] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    // useEffect hook to fetch data when the component loads
    useEffect(() => {
        const fetchInventory = async () => {
            if (!token) return;

            try {
                const response = await fetch('http://localhost:8000/api/lot-history/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch inventory from the blockchain.');
                }
                const data = await response.json();
                setLots(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchInventory();
    }, [token]); // The effect runs when the token is available

    // Helper function to render the list of lots based on the current state
    const renderLots = () => {
        // 1. Show a loading message while fetching
        if (isLoading) {
            return <p className="info-text">Loading lots from the blockchain...</p>;
        }
        // 2. Show an error if the fetch failed
        if (error) {
            return <p className="error-text">{error}</p>;
        }
        // 3. Show a message if no lots are found
        if (lots.length === 0) {
            return <p className="info-text">No existing lots found.</p>;
        }
        // 4. If data exists, render the list
        return (
            <div className="lots-list">
                {lots.map(lot => (
                    <div key={lot.Key} className="lot-item">
                        {/* Displaying product name and quantity from the blockchain record */}
                        <span>{lot.Record.produce}</span>
                        <span>{lot.Record.quantity}</span>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="inventory-container">
            <button
                onClick={() => navigate('/create-lot')} // This functionality remains the same
                className="btn create-lot-btn"
            >
                <FaPlus /> Create a Lot
            </button>

            <div className="lots-card">
                <h2 className="lots-title">Existing Lots</h2>
                <div className="lots-header">
                    <span>Product</span>
                    <span>Quantity</span>
                </div>
                {renderLots()} {/* The renderLots function is called here */}
            </div>
        </div>
    );
};

export default Inventory;