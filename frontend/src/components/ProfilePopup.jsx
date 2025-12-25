import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePopup.css';

function ProfilePopup({ isOpen, onClose }) {
    const navigate = useNavigate();
    const [view, setView] = useState('menu');
    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
        language: "English (United States)",
        unitSystem: "Auto"
    });

    // Get user info from localStorage
    const userEmail = localStorage.getItem('userEmail') || '';
    const userName = userEmail ? userEmail.split('@')[0] : 'User';
    const userRole = localStorage.getItem('userRole') || 'user';

    if (!isOpen) return null;

    const handleClose = () => {
        setView('menu');
        onClose();
    };

    const handleLogout = () => {
        // Clear authentication data
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userRole');
        // Redirect to login page
        navigate('/login');
        onClose();
    };

    return (
        <>
            <div className="profile-overlay" onClick={handleClose}></div>
            <div className={view === 'menu' ? "profile-popup" : "profile-popup-centered"}>

                {view === 'menu' ? (
                    <>
                        <div className="profile-header">
                            <div className="profile-avatar-large">👤</div>
                            <div className="profile-info">
                                <h3>{userName.charAt(0).toUpperCase() + userName.slice(1)}</h3>
                                <p className="profile-email">{userEmail || 'No email'}</p>
                            </div>
                        </div>

                        <div className="profile-menu">
                            <button
                                className="profile-menu-item"
                                onClick={() => setView('edit-profile')}
                            >
                                <span className="menu-icon">👤</span>
                                <span>My Profile</span>
                            </button>
                            <button className="profile-menu-item" onClick={() => setView('security')}>
                                <span className="menu-icon">🔒</span>
                                <span>Security</span>
                            </button>
                            <button className="profile-menu-item">
                                <span className="menu-icon">⚙️</span>
                                <span> Notification Settings</span>
                            </button>

                            <div className="menu-divider"></div>
                            <button className="profile-menu-item logout" onClick={handleLogout}>
                                <span className="menu-icon">🚪</span>
                                <span>Logout</span>
                            </button>
                        </div>
                    </>
                ) : view === 'edit-profile' ? (
                    <div className="profile-edit-view">
                        <div className="profile-edit-header">
                            <button className="back-btn" onClick={() => setView('menu')}>X</button>
                            <h3>Profile</h3>
                            <div style={{ width: '24px' }}></div>
                        </div>
                        <div className="profile-edit-body">
                            <div className="form-group-sm">
                                <label>Email*</label>
                                <input type="email" className="form-input-sm" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                            </div>
                            <div className="form-group-sm">
                                <label>First name</label>
                                <input type="text" className="form-input-sm" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
                            </div>
                            <div className="form-group-sm">
                                <label>Last name</label>
                                <input type="text" className="form-input-sm" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
                            </div>
                            <div className="form-group-sm">
                                <div className="phone-group-sm">
                                    <select className="country-select-sm"><option value="US">US</option><option value="IN">IN</option></select>
                                    <input type="tel" className="phone-input-sm" placeholder="Phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                                </div>
                            </div>
                            <div className="form-group-sm">
                                <label>Language</label>
                                <select className="form-select-sm" value={formData.language} onChange={(e) => setFormData({ ...formData, language: e.target.value })}>
                                    <option>English (United States)</option>
                                    <option>Spanish</option>
                                    <option>India</option>
                                </select>
                            </div>
                            <div className="form-group-sm">
                                <label>Unit system</label>
                                <select className="form-select-sm" value={formData.unitSystem} onChange={(e) => setFormData({ ...formData, unitSystem: e.target.value })}>
                                    <option>Auto</option>
                                    <option>Metric</option>
                                    <option>Imperial</option>
                                </select>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="profile-edit-view">
                        <div className="profile-edit-header">
                            <button className="back-btn" onClick={() => setView('menu')}>X</button>
                            <h3>Security</h3>
                            <div style={{ width: '24px' }}></div>
                        </div>
                        <div className="profile-edit-body security-body">
                            <div className="security-form">
                                <h4>Change Password</h4>
                                <div className="form-group-sm">
                                    <input type="password" className="form-input-sm" placeholder="Current password" />
                                </div>
                                <div className="form-group-sm">
                                    <input type="password" className="form-input-sm" placeholder="New password" />
                                </div>
                                <div className="form-group-sm">
                                    <input type="password" className="form-input-sm" placeholder="Confirm new password" />
                                </div>
                            </div>
                            <div className="security-divider"></div>
                            <div className="security-requirements">
                                <h4>Password requirements</h4>
                                <p className="req-label">At least:</p>
                                <ul>
                                    <li>6 characters</li>
                                </ul>
                                <p className="req-label">At most:</p>
                                <ul>
                                    <li>72 characters</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default ProfilePopup;
