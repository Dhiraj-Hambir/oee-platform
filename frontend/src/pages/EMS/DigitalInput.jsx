import { useState, useEffect } from 'react';
import { getDigitalInputs } from '../../services/api';
import './DigitalInput.css';

function DigitalInput() {
  const [digitalInput1, setDigitalInput1] = useState(false);
  const [digitalInput2, setDigitalInput2] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInputs = async () => {
      try {
        const inputs = await getDigitalInputs();
        setDigitalInput1(inputs.input0 || false);
        setDigitalInput2(inputs.input1 || false);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch digital inputs:', err);
        setError('Failed to fetch digital input values');
      } finally {
      }
    };

    // Fetch immediately
    fetchInputs();

    // Then fetch every second
    const interval = setInterval(fetchInputs, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page-container">  
      <div className="toggle-container">
        <h2>Digital Input Status</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="digital-inputs-wrapper">
          <div className="digital-input-item">
            <h3>Digital Input 1 Status</h3>
            <div className="status-indicator-wrapper">
              <div className={`status-indicator ${digitalInput1 ? 'on' : 'off'}`}>
                <div className="led-light"></div>
                <span className="indicator-label">{digitalInput1 ? 'ON' : 'OFF'}</span>
              </div>
            </div>
          </div>
          
          <div className="digital-input-item">
            <h3>Digital Input 2 Status</h3>
            <div className="status-indicator-wrapper">
              <div className={`status-indicator ${digitalInput2 ? 'on' : 'off'}`}>
                <div className="led-light"></div>
                <span className="indicator-label">{digitalInput2 ? 'ON' : 'OFF'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DigitalInput;

