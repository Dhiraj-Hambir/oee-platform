import "./AlertSetup.css";
import { useState, useEffect } from "react";
import EditAlertModal from "../../../models/ems/EditAlertModel";
import deleteIcon from "../../../assets/trash.png";
import editIcon from "../../../assets/edit.png";


function AlertSetup() {
  const [theme, setTheme] = useState("light");

  const [alerts, setAlerts] = useState(() => {
    const savedAlerts = localStorage.getItem("alertSetupAlerts");
    return savedAlerts ? JSON.parse(savedAlerts) : [];
  });

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingAlert, setEditingAlert] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [alertToDelete, setAlertToDelete] = useState(null);


  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("alertSetupAlerts", JSON.stringify(alerts));
  }, [alerts]);

  const handleEdit = (alert) => {
    setEditingAlert({ ...alert });
    setIsEditOpen(true);
  };

  const handleModalSave = (alertData) => {
    if (alertData.id) {

      setAlerts(
        alerts.map((a) => (a.id === alertData.id ? alertData : a))
      );
      setToastMessage("Alert updated successfully");
    } else {

      const newAlert = { ...alertData, id: Date.now() };
      setAlerts([...alerts, newAlert]);
      setToastMessage("Alert added successfully");
    }

    setIsEditOpen(false);
    setEditingAlert(null);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleDeleteClick = (id) => {
    setAlertToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (alertToDelete) {
      setAlerts(alerts.filter((a) => a.id !== alertToDelete));
      setIsDeleteModalOpen(false);
      setAlertToDelete(null);
    }
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setAlertToDelete(null);
  };

  return (
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
            "--edit-color": "#334155",
          }
          : {
            "--edit-color": "#e2e8f0",
          }
      }
    >
      <div className="eemd-toggle">
        <span className="sun-symbol">☀</span>
        <label className="switch">
          <input
            type="checkbox"
            onChange={() =>
              setTheme(theme === "light" ? "dark" : "light")
            }
          />
          <span className="slider"></span>
        </label>
        <span>🌙</span>
      </div>

      <div className="active-alert-section">
        <h1 className="alert-h1">Active Alert Rules</h1>

        <div className="meter-container">
          {alerts.length === 0 && (
            <p style={{ textAlign: "center", opacity: 0.6 }}>
              No alerts created yet
            </p>
          )}

          {alerts.map((alert) => (
            <div className="meter-row" key={alert.id}>
              <span className="meter-text">
                Meter {alert.meter}: {alert.parameter} &gt;{" "}
                {alert.threshold}
              </span>

              <div className="meter-actions">
                <button
                  className="btn edit"
                  onClick={() => handleEdit(alert)}
                  style={{ backgroundColor: "var(--edit-color)" }}
                >
                  <img
                    src={editIcon}
                    alt="editicon"
                    width={20}
                    height={20}
                    style={{ filter: theme === "dark" ? "brightness(0) invert(1)" : "none" }}
                  />
                </button>
                <button
                  className="btn delete"
                  onClick={() => handleDeleteClick(alert.id)}
                  style={{ backgroundColor: "var(--edit-color)" }}
                >
                  <img
                    src={deleteIcon}
                    alt="deleteicon"
                    width={20}
                    height={20}
                    style={{ filter: theme === "dark" ? "brightness(0) invert(1)" : "none" }}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr />

      <button className="btn add-alert" onClick={() => setIsEditOpen(true)}>
        Add Alert Rule
      </button>
      <EditAlertModal
        isOpen={isEditOpen}
        alert={editingAlert}
        onClose={() => {
          setIsEditOpen(false);
          setEditingAlert(null);
        }}
        onSave={handleModalSave}
        theme={theme}
      />

      {isDeleteModalOpen && (
        <div className="modal-overlay">
          <div className="delete-modal">
            <div className="modal-header">
              <h3>Delete Alert</h3>
              <button className="close-btn" onClick={cancelDelete}>
                ✕
              </button>
            </div>

            <div className="modal-body">
              <p className="modal-title">
                Are you sure you want to delete this alert rule?
              </p>
              <p className="modal-subtitle">
                This action is permanent and cannot be undone.
              </p>
            </div>

            <div className="modal-actions">
              <button className="cancel-btn" onClick={cancelDelete}>
                Cancel
              </button>
              <button className="delete-btn" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}


      {showToast && (
        <div className="success-toast">
          {toastMessage}
        </div>
      )}
    </div>
  );
}

export default AlertSetup;
