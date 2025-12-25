import './EventData.css';
import { useState } from 'react';
import ClearFilter from '../../../assets/remove.png';

function EventData() {
  const [theme, setTheme] = useState("light");



  const initialData = [
    { id: 6607, meter: 101, time: "2025-09-09 20:08:00", cur: 25.47, volt: 230.10, pf: 0.98, kw: 17.50, kwh: 1024.75 },
    { id: 6592, meter: 102, time: "2025-09-09 14:29:51", cur: 28.18, volt: 229.62, pf: 0.98, kw: 5.43, kwh: 304.11 },
    { id: 7592, meter: 103, time: "2025-09-09 14:29:51", cur: 28.18, volt: 229.62, pf: 0.98, kw: 5.43, kwh: 304.11 },
    { id: 9592, meter: 104, time: "2025-09-09 14:29:51", cur: 28.18, volt: 229.62, pf: 0.98, kw: 5.43, kwh: 304.11 },
    { id: 9492, meter: 105, time: "2025-09-09 14:29:51", cur: 28.18, volt: 229.62, pf: 0.98, kw: 5.43, kwh: 304.11 },
    { id: 3592, meter: 106, time: "2025-09-09 14:29:51", cur: 28.18, volt: 229.62, pf: 0.98, kw: 5.43, kwh: 304.11 },
    { id: 3192, meter: 107, time: "2025-09-09 14:29:51", cur: 28.18, volt: 229.62, pf: 0.98, kw: 5.43, kwh: 304.11 },
    { id: 7692, meter: 108, time: "2025-09-09 14:29:51", cur: 28.18, volt: 229.62, pf: 0.98, kw: 5.43, kwh: 304.11 },
    { id: 1692, meter: 109, time: "2025-09-09 14:29:51", cur: 28.18, volt: 229.62, pf: 0.98, kw: 5.43, kwh: 304.11 },
    { id: 2692, meter: 110, time: "2025-09-09 14:29:51", cur: 28.18, volt: 229.62, pf: 0.98, kw: 5.43, kwh: 304.11 },
    { id: 6618, meter: 111, time: "2025-12-17 09:08:00", cur: 26.47, volt: 231.10, pf: 0.99, kw: 18.50, kwh: 1025.75 },
    { id: 6619, meter: 112, time: "2025-12-17 09:08:00", cur: 27.47, volt: 232.10, pf: 0.97, kw: 19.50, kwh: 1026.75 },
    
  ];

  
  const formatDateTime = (date) => {
    const pad = (num) => String(num).padStart(2, '0');
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const now = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(now.getDate() - 30);

  const defaultEndDate = formatDateTime(now);
  const defaultStartDate = formatDateTime(thirtyDaysAgo);

  const [alerts, setAlerts] = useState(() => {
    
    return initialData.filter(item => {
      const itemDate = new Date(item.time);
      return itemDate >= thirtyDaysAgo && itemDate <= now;
    });
  });

  const [selectedMeter, setSelectedMeter] = useState("All Meters");
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);

  const alertsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const handleFilter = () => {
    let filtered = initialData;


    if (selectedMeter !== "All Meters") {
      filtered = filtered.filter(
        (item) => String(item.meter) === selectedMeter
      );
    }


    if (startDate) {
      filtered = filtered.filter(
        (item) => new Date(item.time) >= new Date(startDate)
      );
    }

    if (endDate) {
      filtered = filtered.filter(
        (item) => new Date(item.time) <= new Date(endDate)
      );
    }

    setAlerts(filtered);
    setCurrentPage(1);
  };

  const handleClearFilter = () => {
    setSelectedMeter("All Meters");
    setStartDate("");
    setEndDate("");
    setAlerts(initialData);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(alerts.length / alertsPerPage);
  const startIndex = (currentPage - 1) * alertsPerPage;
  const currentAlerts = alerts.slice(startIndex, startIndex + alertsPerPage);

  return (<>

    <div
      className="alert-setup-container"
      style={
        theme === "dark"
          ? {
            "--bg-main": "#020617",
            "--text-main": "#f9fafb",
            "--card-bg": "#0f172a",
            "--border-color": "rgba(255,255,255,0.15)",
            "--input-bg": "#1e293b",
            "--shadow": "0 4px 12px rgba(0,0,0,0.4)",
            colorScheme: "dark",
          }
          : {
            colorScheme: "light",
          }
      }
    >

      <div className="eemd-toggle">
        <span className="symbol">☀</span>
        <label className="switch">
          <input
            type="checkbox"
            onChange={() =>
              setTheme(theme === "light" ? "dark" : "light")
            }
          />
          <span className="slider"></span>
        </label>
        <span className='symbol'>🌙</span>
      </div>
      <h1 className="event-data-h1">
        Event Data
      </h1>

      <div className="filter-bar">
        <div className="filter-group">
          <label>Meter</label>
          <select
            value={selectedMeter}
            onChange={(e) => setSelectedMeter(e.target.value)}
          >
            <option>All Meters</option>
            <option>101</option>
            <option>102</option>
            <option>103</option>
            <option>104</option>
            <option>105</option>
            <option>106</option>
            <option>107</option>
            <option>108</option>
            <option>109</option>
            <option>110</option>
            <option>111</option>
            <option>112</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Start Date</label>
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>End Date</label>
          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <img
          src={ClearFilter}
          alt="Clear Filter"
          onClick={handleClearFilter}
          style={{
            width: "20px",
            height: "20px",
            cursor: "pointer",
            marginBottom: "5px",
            filter: theme === "dark" ? "brightness(0) invert(1)" : "none"
          }}
        />
        <button className="filter-btn" onClick={handleFilter}>

          Filter Events
        </button>
      </div>


      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>EventID</th>
              <th>MeterID</th>
              <th>Timestamp</th>
              <th>AvgCurrent</th>
              <th>AvgVoltage</th>
              <th>AvgPowerFactor</th>
              <th>Total_KW</th>
              <th>Total_KWH</th>
            </tr>
          </thead>
          <tbody>
            {currentAlerts.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.meter}</td>
                <td>{row.time}</td>
                <td>{row.cur}</td>
                <td>{row.volt}</td>
                <td>{row.pf}</td>
                <td>{row.kw}</td>
                <td>{row.kwh}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {alerts.length > alertsPerPage && (
        <div className="pagination">
          <button
            className="page-btn prev"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`page-btn ${currentPage === i + 1 ? "active" : ""
                }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="page-btn next"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}

    </div>
  </>
  );
}

export default EventData;

