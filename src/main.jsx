import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import "./styles/navbar.css";

import Home from "./pages/Home";
import AdhkarPage from "./pages/AdhkarPage";
import PrayerPage from "./pages/PrayerPage";
import Progress from "./pages/Progress";
import Quiz from "./pages/Quiz";
import SettingsPage from "./pages/SettingsPage";
import Navbar from "./components/Navbar";
import NotificationsPanel from "./components/NotificationsPanel";

function App() {
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <BrowserRouter basename="/Deen-App">
      <div className="app-container">
        <Navbar />
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />

            <Route path="/home" element={<Home />} />
            <Route
              path="/prayer"
              element={<PrayerPage onOpenNotif={() => setNotifOpen(true)} />}
            />
            <Route
              path="/progress"
              element={<Progress onOpenNotif={() => setNotifOpen(true)} />}
            />
            <Route path="/quiz" element={<Quiz />} />
            <Route
              path="/adhkar/*"
              element={<AdhkarPage onOpenNotif={() => setNotifOpen(true)} />}
            />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </div>

        {/* Notifications Panel (app-level overlay) */}
        <NotificationsPanel
          isOpen={notifOpen}
          onClose={() => setNotifOpen(false)}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;

// mount the app into the DOM
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
