import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { hasRouteAccess } from "../utils/permissions";
import "./LeftNav.css";

function NavDropdown({ title, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="nav-group">
      <div
        className="nav-group-title"
        onClick={() => setOpen(!open)}
      >
        {title}
        <span className="arrow">{open ? "˄" : "˅"}</span>
      </div>

      {open && <div className="nav-submenu">{children}</div>}
    </div>
  );
}

function LeftNav({ isNavOpen = true, setIsNavOpen, isMobile = false }) {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail') || '';
  const userRole = localStorage.getItem('userRole') || 'user';
  const isAdmin = userRole === 'admin';
  
  const handleLinkClick = () => {
    if (isMobile && setIsNavOpen) setIsNavOpen(false);
  };

  // Check if user has access to a route
  const canAccessRoute = (route) => {
    if (isAdmin) return true;
    return hasRouteAccess(userEmail, route);
  };

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    // Redirect to login page
    navigate('/login');
    if (isMobile && setIsNavOpen) setIsNavOpen(false);
  };

  // Filter routes based on permissions
  const ioManagementRoutes = [
    { path: '/digital-input', name: 'Digital Input' },
    { path: '/digital-output', name: 'Digital Output' },
    { path: '/analog-input', name: 'Analog Input' },
    { path: '/analog-output', name: 'Analog Output' },
  ].filter(route => canAccessRoute(route.path.replace('/', '')));

  const machineRoutes = [
    { path: '/machine-dashboard', name: 'Machine Dashboard' },
    { path: '/report', name: 'Report' },
    { path: '/oee-dashboard', name: 'OEE Dashboard' },
    { path: '/energy-consumption', name: 'Energy Consumption' },
  ].filter(route => canAccessRoute(route.path.replace('/', '')));

  const energyManagementRoutes = [
    { path: '/energy-monitoring-dashboard', name: 'Energy Monitoring Dashboard' },
    { path: '/power-quality-monitoring', name: 'Power Quality Monitoring Dashboard' },
    { path: '/event-data', name: 'Event Data' },
    { path: '/alerts', name: 'Alerts' },
    { path: '/alert-setup', name: 'Alert Setup' },
  ].filter(route => canAccessRoute(route.path.replace('/', '')));

  return (
    <nav className={`left-nav ${isNavOpen ? "open" : "closed"}`}>
      {ioManagementRoutes.length > 0 && (
        <NavDropdown title="IO Management">
          {ioManagementRoutes.map((route) => (
            <NavLink
              key={route.path}
              to={route.path}
              onClick={handleLinkClick}
              className={({ isActive }) => `nav-button sub ${isActive ? "active" : ""}`}
            >
              {route.name}
            </NavLink>
          ))}
        </NavDropdown>
      )}

      {machineRoutes.length > 0 && (
        <NavDropdown title="Machine">
          {machineRoutes.map((route) => (
            <NavLink
              key={route.path}
              to={route.path}
              onClick={handleLinkClick}
              className={({ isActive }) => `nav-button sub ${isActive ? "active" : ""}`}
            >
              {route.name}
            </NavLink>
          ))}
        </NavDropdown>
      )}

      {energyManagementRoutes.length > 0 && (
        <NavDropdown title="Energy Management">
          {energyManagementRoutes.map((route) => (
            <NavLink
              key={route.path}
              to={route.path}
              onClick={handleLinkClick}
              className={({ isActive }) => `nav-button sub ${isActive ? "active" : ""}`}
            >
              {route.name}
            </NavLink>
          ))}
        </NavDropdown>
      )}

      <div className="nav-logout-container">
        <button className="nav-logout-button" onClick={handleLogout}>
          <span className="logout-icon">🚪</span>
          <span>Logout</span>
        </button>
      </div>

    </nav>
  );
}

export default LeftNav;
