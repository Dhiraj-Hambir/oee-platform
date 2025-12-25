import { useState } from 'react';
import './Page1.css';

function Page1() {
  const [digitalInput1, setDigitalInput1] = useState(false);
  const [digitalInput2, setDigitalInput2] = useState(false);
  const [digitalOutput1, setDigitalOutput1] = useState(false);
  const [digitalOutput2, setDigitalOutput2] = useState(false);

  const toggleDigitalOutput1 = () => {
    setDigitalOutput1(!digitalOutput1);
  };

  const toggleDigitalOutput2 = () => {
    setDigitalOutput2(!digitalOutput2);
  };

  return (
    <div className="page-container">  
      <div className="toggle-container">
        <h2>Digital Status</h2>
        <div className="digital-sections-wrapper">
   
          <div className="digital-section">
            <h3 className="section-title">Digital Input</h3>
            <div className="digital-inputs-wrapper">
              <div className="digital-input-item">
                <h4>Digital Input 1 Status</h4>
                <div className="status-indicator-wrapper">
                  <div className={`status-indicator ${digitalInput1 ? 'on' : 'off'}`}>
                    <div className="led-light"></div>
                    <span className="indicator-label">{digitalInput1 ? 'ON' : 'OFF'}</span>
                  </div>
                </div>
              </div>
              
              <div className="digital-input-item">
                <h4>Digital Input 2 Status</h4>
                <div className="status-indicator-wrapper">
                  <div className={`status-indicator ${digitalInput2 ? 'on' : 'off'}`}>
                    <div className="led-light"></div>
                    <span className="indicator-label">{digitalInput2 ? 'ON' : 'OFF'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

  
          <div className="digital-section">
            <h3 className="section-title">Digital Output</h3>
            <div className="digital-outputs-wrapper">
              <div className="digital-output-item">
                <h4>Digital Output 1 Status</h4>
                <div className="status-indicator-wrapper">
                  <div className={`status-indicator ${digitalOutput1 ? 'on' : 'off'}`}>
                    <div className="led-light"></div>
                    <span className="indicator-label">{digitalOutput1 ? 'ON' : 'OFF'}</span>
                  </div>
                </div>
                <div className="toggle-wrapper">
                  <button 
                    className={`toggle-button ${digitalOutput1 ? 'on' : 'off'}`}
                    onClick={toggleDigitalOutput1}
                  >
                    <span className="toggle-label">{digitalOutput1 ? 'ON' : 'OFF'}</span>
                  </button>
                </div>
              </div>
              
              <div className="digital-output-item">
                <h4>Digital Output 2 Status</h4>
                <div className="status-indicator-wrapper">
                  <div className={`status-indicator ${digitalOutput2 ? 'on' : 'off'}`}>
                    <div className="led-light"></div>
                    <span className="indicator-label">{digitalOutput2 ? 'ON' : 'OFF'}</span>
                  </div>
                </div>
                <div className="toggle-wrapper">
                  <button 
                    className={`toggle-button ${digitalOutput2 ? 'on' : 'off'}`}
                    onClick={toggleDigitalOutput2}
                  >
                    <span className="toggle-label">{digitalOutput2 ? 'ON' : 'OFF'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page1;

