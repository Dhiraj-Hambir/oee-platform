import React, { useState, useRef, useEffect } from "react";
import "./oee-dashboard.css";

function OeeDashboard() {
  const [timeTypeOpen, setTimeTypeOpen] = useState(false);
  const [timeType, setTimeType] = useState("Hour");
  const [rangeOpen, setRangeOpen] = useState(false);
  const [range, setRange] = useState("Today so far");

  const timeTypeOptions = ["Hour", "Day"];

  const timeRangeOptions = [
    "Custom time range",
    "Last 5 minutes",
    "Last 15 minutes",
    "Last 30 minutes",
    "Last 1 hour",
    "Last 3 hours",
    "Last 6 hours",
    "Last 12 hours",
    "Last 24 hours",
    "Last 2 days",
    "Last 7 days",
    "Last 30 days",
    "Last 90 days",
    "Last 6 months"
  ];

  const timeTypeRef = useRef(null);
  const rangeRef = useRef(null);

  useEffect(() => {
    function handleDocClick(e) {
      if (timeTypeOpen && timeTypeRef.current && !timeTypeRef.current.contains(e.target)) {
        setTimeTypeOpen(false);
      }
      if (rangeOpen && rangeRef.current && !rangeRef.current.contains(e.target)) {
        setRangeOpen(false);
      }
    }

    document.addEventListener("mousedown", handleDocClick);
    return () => document.removeEventListener("mousedown", handleDocClick);
  }, [timeTypeOpen, rangeOpen]);

  return (
    <div className="oee-root">
      <div className="oee-toolbar">
        <div className="oee-header-row">
          <div className="oee-title oee-range-btn-box">OEE, Linkou Board, SMT</div>
        </div>
        <div
          ref={timeTypeRef}
          className={`oee-filter-btn oee-range-btn-box ${timeTypeOpen ? "active" : ""}`}
          onClick={() => setTimeTypeOpen(!timeTypeOpen)}
        >
          <span className="oee-filter-icon">⏳</span>
          <span className="oee-filter-label">{timeType}</span>
          <span className="oee-filter-arrow">{timeTypeOpen ? "▴" : "▾"}</span>
          {timeTypeOpen && (
            <div className="oee-dropdown oee-dropdown-time-type">
              <div className="oee-dropdown-header">Time Type</div>
              <div className="oee-dropdown-field">
                <span>{timeType}</span>
                <span className="oee-filter-arrow-inner">▴</span>
              </div>
              <div className="oee-dropdown-list">
                {timeTypeOptions.map(option => (
                  <div
                    key={option}
                    className="oee-dropdown-item"
                    onClick={() => {
                      setTimeType(option);
                      setTimeTypeOpen(false);
                    }}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div
          ref={rangeRef}
          className={`oee-range-btn oee-range-btn-box ${rangeOpen ? "active" : ""}`}
          onClick={() => setRangeOpen(!rangeOpen)}
        >
          <span className="oee-range-label">{range}</span>
          <span className="oee-range-arrow">{rangeOpen ? "▴" : "▾"}</span>
          <span className="oee-range-search">🔍</span>
          {rangeOpen && (
            <div className="oee-dropdown oee-dropdown-range">
              <div className="oee-dropdown-list long">
                {timeRangeOptions.map(option => (
                  <div
                    key={option}
                    className={`oee-dropdown-item ${
                      option === "Last 1 hour" ? "selected" : ""
                    }`}
                    onClick={() => {
                      setRange(option);
                      setRangeOpen(false);
                    }}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="oee-summary-row">
        <div className="oee-summary-card">
          <div className="oee-summary-title">Machine Qty</div>
          <div className="oee-summary-value">34</div>
        </div>
        <div className="oee-summary-card">
          <div className="oee-summary-title">Today online Machine Qty</div>
          <div className="oee-summary-value">20</div>
        </div>
        <div className="oee-summary-card">
          <div className="oee-summary-title">Total Machine Failure Time</div>
          <div className="oee-summary-value">00:52:15</div>
        </div>
        <div className="oee-summary-card">
          <div className="oee-summary-title">OEE</div>
          <div className="oee-summary-value">92%</div>
        </div>
      </div>

      <div className="oee-status-row">
        <div className="oee-status-card green">
          <div className="oee-status-title">Operation</div>
          <div className="oee-status-value">16</div>
        </div>
        <div className="oee-status-card red">
          <div className="oee-status-title">Error</div>
          <div className="oee-status-value">0</div>
        </div>
        <div className="oee-status-card yellow">
          <div className="oee-status-title">Idle</div>
          <div className="oee-status-value">4</div>
        </div>
        <div className="oee-status-card gray">
          <div className="oee-status-title">Stop</div>
          <div className="oee-status-value">0</div>
        </div>
        <div className="oee-status-card blue">
          <div className="oee-status-title">Scheduled</div>
          <div className="oee-status-value">9</div>
        </div>
        <div className="oee-status-card dark">
          <div className="oee-status-title">Availability</div>
          <div className="oee-status-value oee-status-percent yellow-text">
            79%
          </div>
        </div>
        <div className="oee-status-card dark">
          <div className="oee-status-title">Performance</div>
          <div className="oee-status-value oee-status-percent orange-text">
            117%
          </div>
        </div>
        <div className="oee-status-card dark">
          <div className="oee-status-title">Quality</div>
          <div className="oee-status-value oee-status-percent green-text">
            99.7%
          </div>
        </div>
      </div>

      <div className="oee-table-wrapper">
        <div className="oee-table-title">
          Availability/Production Output/Quality Monitoring
        </div>
        <div className="oee-table">
          <table className="oee-table-table">
            <thead>
              <tr>
                <th title="Group Name">Group Name</th>
                <th title="Machine Name">Machine Name</th>
                <th title="Availability Rate">Availability Rate</th>
                <th title="Actual Output">Actual Output</th>
                <th title="Defect">Defect</th>
                <th title="Unfinished">Unfinished</th>
                <th title="Standard Output">Standard Output</th>
                <th title="Performance Rate">Performance Rate</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((row) => (
                <tr key={row}>
                  <td title={`SMT-L${row < 5 ? 1 : 2}`}>SMT-L{row < 5 ? 1 : 2}</td>
                  <td title={`Machine${row}`}>Machine{row}</td>
                  <td title={row === 6 ? "100.0" : "9" + (5 - row) + ".6"}>
                    {row === 6 ? "100.0" : "9" + (5 - row) + ".6"}
                  </td>
                  <td title={row < 5 ? "493" : "310"}>{row < 5 ? "493" : "310"}</td>
                  <td title={row < 5 ? "3" : "0"}>{row < 5 ? "3" : "0"}</td>
                  <td title={row === 6 ? "19" : "0"}>{row === 6 ? "19" : "0"}</td>
                  <td title={row < 5 ? "31" + (8 - row) : row === 5 ? "306" : "329"}>
                    {row < 5 ? "31" + (8 - row) : row === 5 ? "306" : "329"}
                  </td>
                  <td
                    title={
                      row < 5 ? "15" + (7 - row) + ".0" : row === 5 ? "101.2" : "94.3"
                    }
                  >
                    {row < 5 ? "15" + (7 - row) + ".0" : row === 5 ? "101.2" : "94.3"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default OeeDashboard;
