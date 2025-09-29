import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import './LiveHyperledgerPage.css';
import './History.css';

const LiveHyperledgerPage = () => {
    const [lotId, setLotId] = useState('LOT001');
    const [lotData, setLotData] = useState(null);
    const [status, setStatus] = useState('Ready.');
    const [error, setError] = useState('');
    const { token, logout } = useAuth();
    const navigate = useNavigate();

    if (!token) {
        navigate('/login');
        return null;
    }
    
    const getAuthHeaders = () => ({
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
    });

    const handleQuery = async () => {
        setStatus(`Querying Lot: ${lotId}...`);
        setError('');
        setLotData(null);
        try {
            const response = await fetch(`http://localhost:8000/api/query-lot/${lotId}/`, {
                headers: getAuthHeaders()
            });
            if (!response.ok) throw new Error('Query failed or lot not found.');
            const data = await response.json();
            setLotData(data);
            setStatus('Query successful!');
        } catch (err) {
            setError(err.message);
            setStatus('Query failed.');
        }
    };

    const handleCreate = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const newLot = {
            id: formData.get('id'),
            produce: formData.get('produce'),
            quantity: formData.get('quantity'),
        };
        
        setStatus(`Creating Lot: ${newLot.id}...`);
        setError('');
        try {
            const response = await fetch('http://localhost:8000/api/create-lot/', {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify(newLot)
            });
            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.details?.error || 'Failed to create lot.');
            }
            const data = await response.json();
            setStatus(data.message);
            event.target.reset();
        } catch (err) {
            setError(err.message);
            setStatus('Creation failed.');
        }
    };

    return (
        // All class names are now updated to match the new CSS file
        <div className="live-container"> 
            <header className="live-header">
                {/* <button onClick={logout} className="logout-btn">Logout</button> */}
                <button onClick={() => navigate('/inventory')} className="back-button"><IoArrowBack size={24} /></button>
                <h1>FasaLink Live Application</h1>
            </header>

            <section className="live-card">
                <h2>1. Create a New Lot on the Ledger</h2>
                <form onSubmit={handleCreate} className="live-form">
                    <input name="id" type="text" className="live-input" placeholder="Lot ID (e.g., LOT001)" required />
                    <input name="produce" type="text" className="live-input" placeholder="Produce Name (e.g., Apples)" required />
                    <input name="quantity" type="text" className="live-input" placeholder="Quantity (e.g., 500 Kg)" required />
                    <button type="submit" className="primary-btn">Create Lot</button>
                </form>
            </section>
            
            <section className="live-card">
                <h2>2. Query a Lot from the Ledger</h2>
                <div className="query-form-layout">
                    <input type="text" value={lotId} onChange={(e) => setLotId(e.target.value)} className="live-input" placeholder="Enter Lot ID" />
                    <button onClick={handleQuery} className="primary-btn">Query Lot</button>
                </div>
            </section>
            
            <section className="live-card">
                <h2>3. Results</h2>
                <p className="status-text"><strong>Status:</strong> {status}</p>
                {error && <p className="error-text"><strong>Error:</strong> {error}</p>}
                {lotData && (
                    <div className="results-box">
                        <pre>{JSON.stringify(lotData, null, 2)}</pre>
                    </div>
                )}
            </section>
        </div>
    );
};

export default LiveHyperledgerPage;