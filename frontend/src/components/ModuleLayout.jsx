import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import './ModuleLayout.css';

function ModuleLayout({ children, moduleName, sidebarItems = [], activeItem, onItemClick }) {
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia && window.matchMedia('(max-width: 768px)');
    const update = () => {
      const mobile = mq ? mq.matches : false;
      setIsMobile(mobile);
      setIsNavOpen(!mobile);
    };
    update();
    if (mq && mq.addEventListener) mq.addEventListener('change', update);
    else if (mq && mq.addListener) mq.addListener(update);
    return () => {
      if (mq && mq.removeEventListener) mq.removeEventListener('change', update);
      else if (mq && mq.removeListener) mq.removeListener(update);
    };
  }, []);

  useEffect(() => {
    if (isNavOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isNavOpen, isMobile]);

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    // Redirect to login page
    navigate('/login');
    if (isMobile && setIsNavOpen) setIsNavOpen(false);
  };

  return (
    <div className="module-layout app">
      <Header isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} showBackButton={true} />
      <div className="app-body">
        <nav className={`module-sidebar ${isNavOpen ? "open" : "closed"}`}>
          <div className="module-sidebar-content">
            {sidebarItems.length > 0 ? (
              <ul className="module-nav-list">
                {sidebarItems.map((item, index) => (
                  <li key={index}>
                    <button
                      className={`module-nav-item ${activeItem === item ? 'active' : ''}`}
                      onClick={() => onItemClick && onItemClick(item)}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="module-sidebar-placeholder">
                <p>Navigation menu</p>
                <p className="sidebar-hint">Add menu items here</p>
              </div>
            )}
          </div>
          <div className="module-sidebar-footer">
            <button className="module-logout-button" onClick={handleLogout}>
              <span className="module-logout-icon">🚪</span>
              <span>Logout</span>
            </button>
          </div>
        </nav>
        {isNavOpen && isMobile && (
          <div className="nav-backdrop" onClick={() => setIsNavOpen(false)} />
        )}
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}

export default ModuleLayout;

