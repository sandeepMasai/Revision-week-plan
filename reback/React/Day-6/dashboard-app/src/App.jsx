import { useEffect, useState } from "react";

export default function App() {
  const [widgets, setWidgets] = useState(() => {
    const saved = localStorage.getItem("dashboard-widgets");
    return saved
      ? JSON.parse(saved)
      : {
          stats: true,
          activity: true,
          actions: true,
        };
  });

  useEffect(() => {
    localStorage.setItem("dashboard-widgets", JSON.stringify(widgets));
  }, [widgets]);

  const toggleWidget = (key) => {
    setWidgets((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const noWidgetSelected =
    !widgets.stats && !widgets.activity && !widgets.actions;

  if (noWidgetSelected) {
    return (
      <div style={containerStyle}>
        <h2>Dashboard</h2>

        <Controls widgets={widgets} toggleWidget={toggleWidget} />

        <h3 style={{ marginTop: "20px", color: "red" }}>No widgets selected</h3>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <h2>Dashboard</h2>

      <Controls widgets={widgets} toggleWidget={toggleWidget} />

      {widgets.stats && <UserStats />}
      {widgets.activity && <RecentActivity />}
      {widgets.actions && <QuickActions />}
    </div>
  );
}

/* ---------------- Controls ---------------- */

function Controls({ widgets, toggleWidget }) {
  return (
    <div style={buttonContainer}>
      <button onClick={() => toggleWidget("stats")}>
        {widgets.stats ? "Hide" : "Show"} User Stats
      </button>

      <button onClick={() => toggleWidget("activity")}>
        {widgets.activity ? "Hide" : "Show"} Recent Activity
      </button>

      <button onClick={() => toggleWidget("actions")}>
        {widgets.actions ? "Hide" : "Show"} Quick Actions
      </button>
    </div>
  );
}

/* ---------------- Widgets ---------------- */

function UserStats() {
  return (
    <div style={widgetStyle}>
      <h4> User Stats</h4>
      <p>Total Users: 1,245</p>
      <p>Active Today: 312</p>
    </div>
  );
}

function RecentActivity() {
  return (
    <div style={widgetStyle}>
      <h4> Recent Activity</h4>
      <ul>
        <li>User logged in</li>
        <li>Profile updated</li>
        <li>Password changed</li>
      </ul>
    </div>
  );
}

function QuickActions() {
  return (
    <div style={widgetStyle}>
      <h4>⚡ Quick Actions</h4>
      <button>Create User</button>
      <button>Generate Report</button>
    </div>
  );
}

/* ---------------- Styles ---------------- */

const containerStyle = {
  padding: "20px",
  fontFamily: "Arial",
};

const buttonContainer = {
  display: "flex",
  gap: "10px",
  marginBottom: "20px",
};

const widgetStyle = {
  border: "1px solid #ccc",
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "6px",
};
