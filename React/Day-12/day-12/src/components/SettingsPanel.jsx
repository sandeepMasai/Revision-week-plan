import { useState, useEffect } from "react";

const DEFAULT_SETTINGS = {
  theme: "light",
  language: "en",
  notifications: true,
};

function getStoredValue(key, defaultValue) {
  try {
    const stored = localStorage.getItem(key);
    return stored !== null ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
}

export default function SettingsPanel() {
  const [theme, setTheme] = useState(() =>
    getStoredValue("theme", DEFAULT_SETTINGS.theme)
  );

  const [language, setLanguage] = useState(() =>
    getStoredValue("language", DEFAULT_SETTINGS.language)
  );

  const [notifications, setNotifications] = useState(() =>
    getStoredValue("notifications", DEFAULT_SETTINGS.notifications)
  );

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("language", JSON.stringify(language));
  }, [language]);

  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  const resetToDefaults = () => {
    setTheme(DEFAULT_SETTINGS.theme);
    setLanguage(DEFAULT_SETTINGS.language);
    setNotifications(DEFAULT_SETTINGS.notifications);
  };

  return (
    <div>
      <h2>Settings Panel</h2>

      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>

      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="hi">Hindi</option>
      </select>

      <label>
        <input
          type="checkbox"
          checked={notifications}
          onChange={(e) => setNotifications(e.target.checked)}
        />
        Notifications
      </label>

      <button onClick={resetToDefaults}>Reset</button>
    </div>
  );
}
