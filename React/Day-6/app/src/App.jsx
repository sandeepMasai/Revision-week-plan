import { useState } from "react";

export default function App() {
  const [alerts, setAlerts] = useState([]);

  const removeAlert = (id) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  const showSampleAlerts = () => {
    setAlerts([
      { id: 1, type: "success", message: "Operation successful!" },
      { id: 2, type: "error", message: "Something went wrong!" },
      { id: 3, type: "warning", message: "Please check your input." },
      { id: 4, type: "info", message: "New update available." },
    ]);
  };

  return (
    <div style={containerStyle}>
      <h2>Alert System</h2>

      <button onClick={showSampleAlerts}>Show Sample Alerts</button>

      <AlertContainer>
        {alerts.map((alert) => (
          <Alert
            key={alert.id}
            type={alert.type}
            onClose={() => removeAlert(alert.id)}
          >
            {alert.message}
          </Alert>
        ))}
      </AlertContainer>
    </div>
  );
}

/* ---------------- Alert Container ---------------- */

function AlertContainer({ children }) {
  return <div style={{ marginTop: "20px" }}>{children}</div>;
}

/* ---------------- Alert Component ---------------- */

function Alert({ type, children, onClose }) {
  const config = ALERT_CONFIG[type];

  return (
    <div style={{ ...alertStyle, backgroundColor: config.bg }}>
      <span style={{ marginRight: "8px" }}>{config.icon}</span>

      {/*  CHILDREN PATTERN */}
      <span style={{ flex: 1 }}>{children}</span>

      {/* CALLBACK PROP */}
      <button onClick={onClose} style={closeBtn}>
        ✖
      </button>
    </div>
  );
}

/* ---------------- Alert Config ---------------- */

const ALERT_CONFIG = {
  success: { bg: "#d4edda", icon: "✅" },
  error: { bg: "#f8d7da", icon: "❌" },
  warning: { bg: "#fff3cd", icon: "⚠️" },
  info: { bg: "#d1ecf1", icon: "ℹ️" },
};

/* ---------------- Styles ---------------- */

const containerStyle = {
  padding: "20px",
  fontFamily: "Arial",
};

const alertStyle = {
  display: "flex",
  alignItems: "center",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "6px",
};

const closeBtn = {
  background: "transparent",
  border: "none",
  cursor: "pointer",
  fontSize: "14px",
};
