import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';
import LeftNav from '../../components/LeftNav';
import '../../App.css';

function EMSLayout() {
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

  return (
    <div className="app">
      <Header isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} showBackButton={true} />
      <div className="app-body">
        <LeftNav isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} isMobile={isMobile} />
        {isNavOpen && isMobile && (
          <div className="nav-backdrop" onClick={() => setIsNavOpen(false)} />
        )}
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default EMSLayout;

