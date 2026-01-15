import React from "react";
import SettingsPanel from "./components/SettingsPanel";
import OfflineBanner from "./components/OfflineBanner";

function App() {
  return (
    <div>
      <SettingsPanel />

      <div>
        <OfflineBanner />
      </div>
    </div>
  );
}

export default App;
