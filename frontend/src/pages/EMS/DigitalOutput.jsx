import { useState, useEffect } from 'react';
import { setDigitalOutputs, getDigitalOutputs } from '../../services/api';
import './DigitalOutput.css';

function DigitalOutput() {
  const [digitalOutput1, setDigitalOutput1] = useState(false);
  const [digitalOutput2, setDigitalOutput2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetchingStatus, setFetchingStatus] = useState(false);

  // Continuously fetch digital output status
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        setFetchingStatus(true);
        const outputs = await getDigitalOutputs();
        // Bind digital output values to indicators
        setDigitalOutput1(outputs.output0 || false);
        setDigitalOutput2(outputs.output1 || false);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch digital output status:', err);
        // Don't set error here to avoid blocking the UI, just log it
      } finally {
        setFetchingStatus(false);
      }
    };

    // Fetch immediately
    fetchStatus();

    // Then fetch every second continuously
    const interval = setInterval(fetchStatus, 1000);

    return () => clearInterval(interval);
  }, []);

  const toggleDigitalOutput1 = async () => {
    const newValue = !digitalOutput1;
    setLoading(true);
    setError(null);
    
    try {
      const success = await setDigitalOutputs(newValue, digitalOutput2);
      if (success) {
        // Status will be updated by the continuous polling
        // But update immediately for better UX
        setDigitalOutput1(newValue);
      } else {
        setError('Failed to update digital output 1');
      }
    } catch (err) {
      console.error('Failed to set digital output 1:', err);
      setError('Failed to update digital output 1');
    } finally {
      setLoading(false);
    }
  };

  const toggleDigitalOutput2 = async () => {
    const newValue = !digitalOutput2;
    setLoading(true);
    setError(null);
    
    try {
      const success = await setDigitalOutputs(digitalOutput1, newValue);
      if (success) {
        setDigitalOutput2(newValue);
      } else {
        setError('Failed to update digital output 2');
      }
    } catch (err) {
      console.error('Failed to set digital output 2:', err);
      setError('Failed to update digital output 2');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">  
      <div className="toggle-container">
        <h2>Digital Output Status</h2>
        {error && <div className="error-message">{error}</div>}
        {loading && <div className="loading-message">Updating...</div>}
        <div className="digital-outputs-wrapper">
          <div className="digital-output-item">
            <h3>Digital Output 1 Status</h3>
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
                disabled={loading}
              >
                <span className="toggle-label">{digitalOutput1 ? 'ON' : 'OFF'}</span>
              </button>
            </div>
          </div>
          
          <div className="digital-output-item">
            <h3>Digital Output 2 Status</h3>
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
                disabled={loading}
              >
                <span className="toggle-label">{digitalOutput2 ? 'ON' : 'OFF'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DigitalOutput;

