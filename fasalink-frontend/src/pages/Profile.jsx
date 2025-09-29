import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUserCircle, FaEdit } from 'react-icons/fa';
import './Profile.css'; // We'll create this new CSS file

const Profile = () => {
    const { user, token, logout } = useAuth();
    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone_number: '',
        address: ''
    });
    const [status, setStatus] = useState('');

    // When the component loads or the user object changes, populate the form
    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username || '',
                email: user.email || '',
                phone_number: user.phone_number || '',
                address: user.address || ''
            });
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setStatus('Saving...');
        try {
            const response = await fetch('http://localhost:8000/auth/users/me/', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to update profile.');
            }
            
            setStatus('Profile updated successfully!');
            setIsEditing(false);
            // Optionally, you can trigger a refresh of the user data in AuthContext
            // For now, we'll just show a success message.
            
        } catch (error) {
            setStatus(error.message);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!user) {
        return <div>Loading profile...</div>;
    }

    return (
        <div className="profile-page">
            <div className="profile-header-card">
                <h1>My Profile</h1>
            </div>
            <div className="profile-content-card">
                <div className="avatar-container">
                    <FaUserCircle className="avatar-placeholder" />
                    <button className="edit-btn" onClick={() => setIsEditing(!isEditing)}>
                        <FaEdit />
                    </button>
                </div>

                <form className="profile-form" onSubmit={handleSave}>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" name="username" value={formData.username} onChange={handleInputChange} disabled={!isEditing} />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} disabled={!isEditing} />
                    </div>
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input type="text" name="phone_number" value={formData.phone_number} onChange={handleInputChange} disabled={!isEditing} />
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <textarea name="address" value={formData.address} onChange={handleInputChange} disabled={!isEditing} rows="3"></textarea>
                    </div>

                    {isEditing && (
                        <div className="form-actions">
                            <button type="button" className="btn cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
                            <button type="submit" className="btn save-btn">Save Changes</button>
                        </div>
                    )}
                </form>

                <div className="logout-section">
                    <button className="btn logout-btn-main" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
                 {status && <p className="status-message">{status}</p>}
            </div>
        </div>
    );
};

export default Profile;