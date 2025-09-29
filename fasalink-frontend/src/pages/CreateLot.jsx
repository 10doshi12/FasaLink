import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import { FaImage } from 'react-icons/fa';
import './CreateLot.css';

const CreateLot = () => {
    const navigate = useNavigate();

    return (
        <div className="page-container">
            <div className="page-header">
                <button onClick={() => navigate(-1)} className="back-button">
                    <IoArrowBack size={24} />
                </button>
                <h1 className="page-title">Create Lot</h1>
            </div>

            <form className="create-lot-form">
                <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input type="text" id="date" placeholder="DD-MM-YYYY" className="form-input" />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select id="category" className="form-input">
                        <option>Select the category</option>
                        <option>Fruits</option>
                        <option>Vegetables</option>
                        <option>Grains</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Amount</label>
                    <input type="text" id="amount" placeholder="Eg: 10 Tonnes" className="form-input" />
                </div>
                <div className="form-group">
                    <label htmlFor="produceName">Name Of Produce</label>
                    <input type="text" id="produceName" className="form-input" />
                </div>
                <div className="form-group">
                    <label>Add Image</label>
                    <div className="drop-zone">
                        <FaImage size={40} className="drop-zone-icon" />
                        <span>Drop Image Here</span>
                    </div>
                </div>
                <button type="submit" className="btn next-btn">
                    Next &rarr;
                </button>
            </form>
        </div>
    );
};

export default CreateLot;