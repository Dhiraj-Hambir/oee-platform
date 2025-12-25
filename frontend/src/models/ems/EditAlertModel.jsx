import "./EditAlertModel.css";
import { useState, useEffect } from "react";

function EditAlertModal({
    isOpen,
    alert,
    onClose,
    onSave,
    theme
}) {
    const [editedAlert, setEditedAlert] = useState(null);

    const isEditMode = !!alert;

    useEffect(() => {
        if (alert) {
            setEditedAlert({ ...alert });
        } else {
            setEditedAlert({
                meter: "101 - Shop-1",
                parameter: "AvgVoltage",
                threshold: "",
                message: ""
            });
        }
    }, [alert]);

    if (!isOpen || !editedAlert) return null;

    const handleUpdate = () => {
        onSave(editedAlert);
    };

    const isChanged =
        !isEditMode ||
        (alert &&
            editedAlert &&
            (alert.meter !== editedAlert.meter ||
                alert.parameter !== editedAlert.parameter ||
                String(alert.threshold) !== String(editedAlert.threshold) ||
                alert.message !== editedAlert.message));

    const themeStyles = theme === "dark" ? {
        "--bg-main": "#020617",
        "--text-main": "#f9fafb",
        "--card-bg": "#0f172a",
        "--border-color": "rgba(255,255,255,0.15)",
        "--input-bg": "#1e293b",
        "--shadow": "0 4px 12px rgba(0,0,0,0.4)",
    } : {};

    return (
        <div className="modal-overlay" style={themeStyles}>
            <div className="modal-card">
                <h2>{isEditMode ? "Edit Alert" : "Add Alert Rule"}</h2>

                <div className="alert-form">
                    <div className="form-group">
                        <label>Meter</label>
                        <select
                            value={editedAlert.meter}
                            onChange={(e) =>
                                setEditedAlert({ ...editedAlert, meter: e.target.value })
                            }
                        >
                            <option>101 - Shop-1</option>
                            <option>102 - Shop-2</option>
                            <option>103 - Warehouse</option>
                            <option>104 - Office Block</option>
                            <option>105 - Main Panel</option>
                            <option>106 - Generator</option>
                            <option>107 - Server Room</option>
                            <option>108 - Parking Area</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Parameter</label>
                        <select
                            value={editedAlert.parameter}
                            onChange={(e) =>
                                setEditedAlert({ ...editedAlert, parameter: e.target.value })
                            }
                        >
                            <option>AvgVoltage</option>
                            <option>MinVoltage</option>
                            <option>MaxVoltage</option>
                            <option>AvgCurrent</option>
                            <option>MaxCurrent</option>
                            <option>Power</option>
                            <option>Energy</option>
                            <option>Frequency</option>
                            <option>Power Factor</option>
                            <option>Load</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Threshold</label>
                        <input
                            type="number"
                            placeholder="Enter Threshold"
                            value={editedAlert.threshold}
                            onChange={(e) =>
                                setEditedAlert({ ...editedAlert, threshold: e.target.value })
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label>Message</label>
                        <input
                            type="text"
                            placeholder="Enter Message"
                            value={editedAlert.message}
                            onChange={(e) =>
                                setEditedAlert({ ...editedAlert, message: e.target.value })
                            }
                        />
                    </div>
                </div>

                <div className="modal-actions">
                    <button className="btn delete" onClick={onClose}>
                        Cancel
                    </button>
                    <button
                        className="save-btn"
                        onClick={handleUpdate}
                        disabled={!isChanged}
                    >
                        {isEditMode ? "Update" : "Save"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditAlertModal;
