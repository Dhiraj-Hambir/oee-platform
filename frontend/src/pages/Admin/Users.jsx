import React from 'react';
import './Admin.css';

const DUMMY_USERS = [
    { id: 1, name: 'Amit Sharma', email: 'amit.sharma@example.com', role: 'Admin', status: 'Active', joined: '2023-10-15' },
    { id: 2, name: 'Priya Patel', email: 'priya.patel@example.com', role: 'user', status: 'Active', joined: '2023-11-20' },
    { id: 3, name: 'Rahul Verma', email: 'rahul.verma@example.com', role: 'user', status: 'Inactive', joined: '2024-01-05' },
    { id: 4, name: 'Surbhi Gupta', email: 'surbhi.gupta@example.com', role: 'Admin', status: 'Active', joined: '2023-12-12' },
    { id: 5, name: 'Vikram Singh', email: 'vikram.singh@example.com', role: 'user', status: 'Active', joined: '2024-02-10' },
];

function Users({ onCreateClick, onEditClick }) {
    return (
        <div className="admin-container">
            <div className="admin-header">
                <h2>User Management</h2>
            </div>

            <div className="table-container">
                <table className="modern-table">
                    <thead>
                        <tr>
                            <th className='user-th'>User</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Joined Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {DUMMY_USERS.map((user) => (
                            <tr key={user.id}>
                                <td className="user-td">
                                    <div className="table-user-info">
                                        <div className="table-user-avatar">
                                            {user.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div className="table-user-details">
                                            <span className="table-user-name">{user.name}</span>
                                            <span className="table-user-email">{user.email}</span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className="role-badge">{user.role}</span>
                                </td>
                                <td>
                                    <span className={`status-badge ${user.status === 'Active' ? 'status-active' : 'status-inactive'}`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td>{user.joined}</td>
                                <td>
                                    <div className="action-buttons">
                                        <button
                                            className="action-btn edit-btn"
                                            title="Edit"
                                            onClick={() => onEditClick(user)}
                                        >
                                            ✏️
                                        </button>
                                        <button className="action-btn delete-btn" title="Delete">🗑️</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}


export default Users;
