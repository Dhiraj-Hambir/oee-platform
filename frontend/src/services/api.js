const API_BASE_URL = 'http://192.168.1.5';
const AUTH_HEADER = 'Basic cm9vdDowMDAwMDAwMA==';

// Parse XML response
const parseXML = (xmlString) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
  return xmlDoc;
};

// Get Digital Input values
export const getDigitalInputs = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/digitalinput/all/value`, {
      method: 'GET',
      headers: {
        'Authorization': AUTH_HEADER,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const xmlText = await response.text();
    const xmlDoc = parseXML(xmlText);
    
    const diElements = xmlDoc.getElementsByTagName('DI');
    const inputs = {};
    
    for (let i = 0; i < diElements.length; i++) {
      const id = diElements[i].getElementsByTagName('ID')[0]?.textContent;
      const value = diElements[i].getElementsByTagName('VALUE')[0]?.textContent;
      if (id !== undefined && value !== undefined) {
        inputs[`input${id}`] = value === '1';
      }
    }
    
    return inputs;
  } catch (error) {
    console.error('Error fetching digital inputs:', error);
    throw error;
  }
};

// Get Digital Output values
export const getDigitalOutputs = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/digitaloutput/all/value`, {
      method: 'GET',
      headers: {
        'Authorization': AUTH_HEADER,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const xmlText = await response.text();
    const xmlDoc = parseXML(xmlText);
    
    const doElements = xmlDoc.getElementsByTagName('DO');
    const outputs = {};
    
    for (let i = 0; i < doElements.length; i++) {
      const id = doElements[i].getElementsByTagName('ID')[0]?.textContent;
      const value = doElements[i].getElementsByTagName('VALUE')[0]?.textContent;
      if (id !== undefined && value !== undefined) {
        outputs[`output${id}`] = value === '1';
      }
    }
    
    return outputs;
  } catch (error) {
    console.error('Error fetching digital outputs:', error);
    throw error;
  }
};

// Set Digital Output values
export const setDigitalOutputs = async (do0, do1) => {
  try {
    const formData = new URLSearchParams();
    formData.append('DO0', do0 ? '1' : '0');
    formData.append('DO1', do1 ? '1' : '0');

    const response = await fetch(`${API_BASE_URL}/digitaloutput/all/value`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': AUTH_HEADER,
      },
      body: formData.toString(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const xmlText = await response.text();
    const xmlDoc = parseXML(xmlText);
    const status = xmlDoc.documentElement.getAttribute('status');
    
    return status === 'OK';
  } catch (error) {
    console.error('Error setting digital outputs:', error);
    throw error;
  }
};

