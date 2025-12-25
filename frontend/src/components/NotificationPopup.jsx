import { useState, useEffect } from 'react'
import Data from '../services/Data.json'
import './NotificationPopup.css'

function NotificationPopup({ isOpen, onClose }) {
    const [activeTab] = useState('all')
    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        if (Data && Data.length > 0) {
            const newNotifications = [];
            let index = 1;

            Data.slice().reverse().forEach(item => {
                Object.keys(item).forEach(key => {
                    if (key.startsWith('#DEVICE_ERROR_')) {
                        const value = item[key];
                        if (value !== 0) {
                            const deviceName = key.replace('#DEVICE_ERROR_', '').replace(/_/g, ' ');
                            const timeStr = item.ts
                                ? new Date(item.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                : "Just now";

                            newNotifications.push({
                                id: index++,
                                title: `Device Error Detected: ${deviceName}`,
                                device: deviceName,
                                value: value,
                                severity: "critical",
                                time: timeStr
                            });
                        }
                    }
                });
            });
            console.log("Processed Notifications:", newNotifications);
            setNotifications(newNotifications);
        }
    }, [isOpen]);

    if (!isOpen) return null

    return (
        <>
            <div className="notification-overlay" onClick={onClose}></div>

            <div className="notification-popup">
                <div className="notification-header">
                    <h3>Notifications</h3>
                    <button className="close-btn" onClick={onClose}>✕</button>
                </div>

                <div className="notification-list">
                    {notifications.map(alarm => (
                        <div key={alarm.id} className={`alarm-card ${alarm.severity}`}> 
                            <div className="alarm-left">🔔</div>

                            <div className="alarm-content">
                                <div className="alarm-title">{alarm.title}</div>
                                <div className="alarm-meta">
                                    Severity: <strong>{alarm.severity}</strong>, originator: Device '{alarm.device}'
                                    <br />
                                    <span style={{ color: '#ef4444' }}>Error Code: {alarm.value}</span>
                                </div>
                            </div>

                            <div className="alarm-right">
                                <span className={`severity-badge ${alarm.severity}`}>
                                    {alarm.severity.charAt(0).toUpperCase() + alarm.severity.slice(1)}
                                </span>
                                <span className="alarm-time">{alarm.time}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="notification-footer">
                    <a href="#" className="see-all-link">View All</a>
                </div>
            </div>
        </>
    )
}

export default NotificationPopup
