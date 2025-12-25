import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import expand from "../assets/expand.png";
import notification from "../assets/notification.png";
import profile from "../assets/user.png";
import NotificationPopup from "./NotificationPopup";
import ProfilePopup from "./ProfilePopup";

function Header({ isNavOpen, setIsNavOpen, showBackButton = false }) {
  const navigate = useNavigate();
  const toggle = () => setIsNavOpen((prev) => !prev);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Get user info from localStorage
  const userEmail = localStorage.getItem('userEmail') || 'User';
  const userName = userEmail.split('@')[0] || 'User';
  const userRole = localStorage.getItem('userRole') || 'user';

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

  return (
    <header className="header">
      <div className="header-left">
        <button
          className={`nav-toggle ${isNavOpen ? "open" : ""}`}
          onClick={toggle}
          aria-label={isNavOpen ? "Close navigation" : "Open navigation"}
        >
          {isNavOpen ? "✕" : "☰"}
        </button>

        {showBackButton && (
          <button onClick={() => navigate('/dashboard')} className="back-to-dashboard-button">
            ← Dashboard
          </button>
        )}

        <span className="header-text">Demo</span>
      </div>


      <div className="header-right">

           
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

      <NotificationPopup
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />
      <ProfilePopup
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
    </header>
  );
}

export default Header;
