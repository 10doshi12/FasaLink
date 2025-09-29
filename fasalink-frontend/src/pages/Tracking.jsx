import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import { FiFilter } from 'react-icons/fi';
import { BiSortAlt2 } from 'react-icons/bi';
import MapImage from '../assets/map-placeholder.png'; // Add the map image to your assets folder
import './Tracking.css'; // Import the CSS for this page

const Tracking = () => {
    const navigate = useNavigate();
    
    // Dummy data for demonstration
    const lots = [
        { id: 123, broker: 'XYZ', arriving: '23-07-2025' },
        { id: 143, broker: 'ABC Farms', arriving: '24-07-2025' },
        { id: 153, broker: 'PQR Logistics', arriving: '25-07-2025' },
    ];

    return (
        <div className="page-container white-bg">
            {/* Header */}
            <div className="page-header">
                <button onClick={() => navigate(-1)} className="back-button">
                    <IoArrowBack size={24} />
                </button>
                <h1 className="page-title">Track Lot</h1>
            </div>

            {/* Filter and Search Controls */}
            <div className="controls-container">
                <button className="sort-btn"><BiSortAlt2 /> Sort</button>
                <input type="text" placeholder="Search lot" className="search-input" />
                <button className="filter-btn"><FiFilter /> Filter</button>
            </div>

            {/* List of Tracking Cards */}
            <div className="lot-list">
                {lots.map((lot) => (
                    <div key={lot.id} className="lot-card">
                        <div className="lot-details">
                            <h2 className="lot-title">Lot #{lot.id}</h2>
                            <p className="lot-info">Broker: {lot.broker}</p>
                            <p className="lot-info">Arriving Date: {lot.arriving}</p>
                        </div>
                        <img src={MapImage} alt="Map of route" className="lot-map-image" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tracking;