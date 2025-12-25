import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { hasModuleAccess } from '../../utils/permissions';
import './Dashboard.css';
import '../../components/Header.css';

// Assets
import expand from "../../assets/expand.png";
import notification from "../../assets/notification.png";
import profile from "../../assets/user.png";

// Components
import NotificationPopup from "../../components/NotificationPopup";
import ProfilePopup from "../../components/ProfilePopup";

function Dashboard() {
  const navigate = useNavigate();

  // Header State
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Get user info from localStorage
  const userEmail = localStorage.getItem('userEmail') || '';
  const userRole = localStorage.getItem('userRole') || 'user';
  const isAdmin = userRole === 'admin';
  const userName = userEmail.split('@')[0] || 'User';

  const toggleNotification = () => {
    setIsNotificationOpen((prev) => !prev);
    setIsProfileOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen((prev) => !prev);
    setIsNotificationOpen(false);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const allModules = [
    { id: 'admin', name: 'ADMIN', icon: '⚙️', path: '/admin' },
    { id: 'configuration', name: 'CONFIGURATION', icon: '⚙️', path: '/configuration', adminOnly: true },
    { id: 'checklist', name: 'CHECKLIST', icon: '📄', path: '/checklist' },
    { id: 'mint', name: 'MINT', icon: '⚙️', path: '/mint' },
    { id: 'energy', name: 'ENERGY', icon: '⚡', path: '/digital-input' },
    { id: 'quality', name: 'QUALITY', icon: '🏆', path: '/quality' },
    { id: 'console', name: 'CONSOLE', icon: '🖥️', path: '/console' },
    { id: 'productivity', name: 'PRODUCTIVITY', icon: '📈', path: '/productivity' },
    { id: 'dfx-ai', name: 'DFX AI', icon: '🧠', path: '/dfx-ai' },
    { id: 'datonis-bi', name: 'DATONIS BI', icon: '📊', path: '/datonis-bi' },
    { id: 'documents', name: 'DOCUMENTS', icon: '📁', path: '/documents' },
    { id: 'maintenance', name: 'MAINTENANCE', icon: '🔧', path: '/maintenance' },
    { id: 'designer', name: 'DESIGNER', icon: '📐', path: '/designer' },
  ];

  // Filter modules based on user permissions
  const modules = allModules.filter(module => {
    // Admin-only modules (like Configuration)
    if (module.adminOnly && !isAdmin) {
      return false;
    }
    // Check module access using permissions system
    if (!isAdmin) {
      return hasModuleAccess(userEmail, module.id);
    }
    // Admin has access to everything
    return true;
  });

  const handleModuleClick = (module) => {
    if (module.path) {
      navigate(module.path);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="dashboard-banner">
          <h1>Demo</h1>

          <div className="header-right light-theme">
            <span className="icon" onClick={toggleFullscreen}>
              <img
                src={expand}
                alt="Expand"
                title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              />
            </span>
            <span className="icon" onClick={toggleNotification}>
              <img src={notification} alt="Notification" />
            </span>
            <div className="user-info">
              <div className="user-name">{userName}</div>
              <div className="user-role">{userRole}</div>
            </div>
            <span className="icon" onClick={toggleProfile}>
              <img src={profile} alt="Profile" />
            </span>
          </div>
        </div>
      </div>

      <NotificationPopup
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />
      <ProfilePopup
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />


      <div className="dashboard-content">
        <div className="modules-grid">
          {modules.map((module) => (
            <div
              key={module.id}
              className={`module-hex ${module.id === 'productivity' ? 'active' : ''}`}
              onClick={() => handleModuleClick(module)}
            >
              <div className="hex-icon">{module.icon}</div>
              <div className="hex-label">{module.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

