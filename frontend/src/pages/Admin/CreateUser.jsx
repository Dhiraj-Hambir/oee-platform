import React, { useState } from 'react';
import './Admin.css';

function CreateUser({ onCancel }) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        role: 'Admin',
        status: 'Active',
        password: '',
        confirmPassword: ''
    });

    const [photoPreview, setPhotoPreview] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('User Data:', formData);
        // Logic to handle user creation would go here
        if (onCancel) onCancel();
    };

    return (
        <div className="admin-container">
            <div className="admin-header">
                <h2>Create New User</h2>
            </div>

            <div className="form-container">
                <form className="create-user-form" onSubmit={handleSubmit}>
                    {/* Photo Upload Section */}
                    <div className="photo-upload-section">
                        <div className="photo-preview-container">
                            {photoPreview ? (
                                <img src={photoPreview} alt="Preview" className="photo-preview" />
                            ) : (
                                <div className="photo-placeholder">
                                    <span>👤</span>
                                </div>
                            )}
                            <label htmlFor="photo-input" className="photo-upload-label">
                                <span className="upload-icon">📷</span>
                            </label>
                            <input
                                id="photo-input"
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoChange}
                                style={{ display: 'none' }}
                            />
                        </div>
                        <p className="photo-hint">Upload Profile Photo</p>
                    </div>

                    <div className="form-grid">
                        {/* Left Column */}
                        <div className="form-column">
                            <div className="form-group">
                                <label>First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="Enter first name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter email address"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Role</label>
                                <select name="role" value={formData.role} onChange={handleChange} required>
                                    <option value="Admin">Admin</option>
                                    <option value="Manager">User</option>

                                </select>
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Create password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="form-column">
                            <div className="form-group">
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Enter last name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Enter phone number"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Status</label>
                                <select name="status" value={formData.status} onChange={handleChange}>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Confirm Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="button" className="secondary-btn" onClick={onCancel}>Cancel</button>
                        <button type="submit" className="primary-btn">Create User</button>
                    </div>
                </form>
            </div>
        </div>
    );
}


export default CreateUser;

