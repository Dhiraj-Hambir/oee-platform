import "./Alerts.css";
import { useState, useEffect } from "react";

function Alerts() {
  const [theme, setTheme] = useState("light");
  const [alerts, setAlerts] = useState([]);

  const alertsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const generateDummyAlerts = () => {
    const alertMessages = [
      { message: "Machine M1 - OEE dropped below 70%", severity: "critical" },
      { message: "Machine M2 - Availability below threshold", severity: "warning" },
      { message: "Machine M3 - Performance degradation detected", severity: "warning" },
      { message: "Machine M4 - Quality issues detected", severity: "critical" },
      { message: "Machine M1 - Downtime exceeded 30 minutes", severity: "critical" },
      { message: "Machine M5 - Production rate below target", severity: "warning" },
      { message: "Machine M2 - Setup time exceeded limit", severity: "info" },
      { message: "Machine M6 - Minor stop detected", severity: "info" },
      { message: "Machine M3 - Speed loss detected", severity: "warning" },
      { message: "Machine M7 - Defect rate increased", severity: "critical" },
      { message: "Machine M4 - Cycle time variance detected", severity: "warning" },
      { message: "Machine M8 - Operator intervention required", severity: "info" },
      { message: "Machine M1 - Temperature threshold exceeded", severity: "critical" },
      { message: "Machine M9 - Maintenance required", severity: "warning" },
      { message: "Machine M2 - Tool change needed", severity: "info" },
      { message: "Machine M10 - Material shortage detected", severity: "critical" },
      { message: "Machine M3 - Energy consumption spike", severity: "warning" },
      { message: "Machine M5 - Scrap rate increased", severity: "critical" },
      { message: "Machine M6 - Idle time exceeded", severity: "warning" },
      { message: "Machine M7 - Shift target not met", severity: "info" }
    ];

    const now = new Date();
    const dummyAlerts = alertMessages.map((alert, index) => {
      const timestamp = new Date(now);
      timestamp.setHours(8 + Math.floor(index / 2));
      timestamp.setMinutes(Math.floor(Math.random() * 60));
      timestamp.setSeconds(Math.floor(Math.random() * 60));

      return {
        id: `alert-${index + 1}`,
        message: alert.message,
        severity: alert.severity,
        timestamp: timestamp.toISOString()
      };
    });

    return dummyAlerts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  };

  useEffect(() => {
    setAlerts(generateDummyAlerts());
  }, []);

  const totalPages = Math.ceil(alerts.length / alertsPerPage);
  const startIndex = (currentPage - 1) * alertsPerPage;
  const currentAlerts = alerts.slice(
    startIndex,
    startIndex + alertsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [alerts]);

  return (
    <div
      className="a-alert-setup-container"
      style={
        theme === "dark"
          ? {
            "--bg-main": "#020617",
            "--text-main": "#f9fafb",
            "--card-bg": "#0f172a",
            "--border-color": "rgba(255,255,255,0.15)",
            "--input-bg": "#1e293b",
            "--shadow": "0 4px 12px rgba(0,0,0,0.4)",
          }
          : {}
      }
    >
      <div className="a-eemd-toggle">
        <span className="a-sun-symbol">☀</span>
        <label className="a-switch">
          <input
            type="checkbox"
            onChange={() =>
              setTheme(theme === "light" ? "dark" : "light")
            }
          />
          <span className="a-slider"></span>
        </label>
        <span>🌙</span>
      </div>

      <div className="a-alert-container">
        <h1 className="a-alert-h1">Triggered Alerts (Today)</h1>

        <div className="a-meter-container">
          {alerts.length === 0 && (
            <p style={{ textAlign: "center", opacity: 0.6 }}>
              No alerts triggered today
            </p>
          )}

          {currentAlerts.map((alert) => (
            <div className="a-meter-row" key={alert.id}>
              <span className="a-meter-text">
                [{new Date(alert.timestamp).toLocaleTimeString()}]{" "}
                {alert.message}
              </span>
            </div>
          ))}
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
    </div>
  );
}

export default Alerts;
