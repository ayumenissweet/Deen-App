import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SettingsPage.css";

import BackIcon from "../assets/back.svg";

function SettingsPage() {
  const navigate = useNavigate();

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("deen-app-settings");
    return saved
      ? JSON.parse(saved)
      : {
          theme: "dark",
          language: "en",
          prayerNotif: true,
          adhkarNotif: true,
          quizNotif: false,
          soundEnabled: true,
          vibration: true,
          fontSize: "medium",
        };
  });

  useEffect(() => {
    localStorage.setItem("deen-app-settings", JSON.stringify(settings));
    document.documentElement.setAttribute("data-theme", settings.theme);
  }, [settings]);

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="settings-page">
      {/* Header */}
      <div className="settings-header">
        <button className="settings-back-btn" onClick={() => navigate(-1)}>
          <img src={BackIcon} alt="Back" />
        </button>
        <h1>Settings</h1>
        <div style={{ width: 36 }} />
      </div>

      {/* Profile Card */}
      <div className="settings-profile-card">
        <div className="settings-avatar">
          <span>O</span>
        </div>
        <div className="settings-profile-info">
          <h2>Omar</h2>
          <p>May Allah bless your journey 🤲</p>
        </div>
      </div>

      {/* Appearance Section */}
      <section className="settings-section">
        <h2 className="settings-section-title">
          <span className="settings-icon">🎨</span> Appearance
        </h2>

        <div className="settings-item">
          <div className="settings-item-info">
            <p className="settings-label">Dark Mode</p>
            <p className="settings-desc">Use dark theme for the app</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.theme === "dark"}
              onChange={(e) =>
                updateSetting("theme", e.target.checked ? "dark" : "light")
              }
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="settings-item">
          <div className="settings-item-info">
            <p className="settings-label">Font Size</p>
            <p className="settings-desc">Adjust text size for readability</p>
          </div>
          <div className="settings-font-btns">
            {["small", "medium", "large"].map((size) => (
              <button
                key={size}
                className={`font-btn ${settings.fontSize === size ? "active" : ""}`}
                onClick={() => updateSetting("fontSize", size)}
              >
                {size === "small" ? "A" : size === "medium" ? "A" : "A"}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Language Section */}
      <section className="settings-section">
        <h2 className="settings-section-title">
          <span className="settings-icon">🌐</span> Language
        </h2>

        <div className="settings-item">
          <div className="settings-item-info">
            <p className="settings-label">App Language</p>
            <p className="settings-desc">Choose your preferred language</p>
          </div>
          <select
            className="settings-select"
            value={settings.language}
            onChange={(e) => updateSetting("language", e.target.value)}
          >
            <option value="en">🇬🇧 English</option>
            <option value="fr">🇫🇷 Français</option>
            <option value="ar">🇸🇦 العربية</option>
          </select>
        </div>
      </section>

      {/* Notifications Section */}
      <section className="settings-section">
        <h2 className="settings-section-title">
          <span className="settings-icon">🔔</span> Notifications
        </h2>

        <div className="settings-item">
          <div className="settings-item-info">
            <p className="settings-label">Prayer Reminders</p>
            <p className="settings-desc">Get notified before prayer times</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.prayerNotif}
              onChange={(e) => updateSetting("prayerNotif", e.target.checked)}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="settings-item">
          <div className="settings-item-info">
            <p className="settings-label">Adhkār Reminders</p>
            <p className="settings-desc">Morning & evening adhkār alerts</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.adhkarNotif}
              onChange={(e) => updateSetting("adhkarNotif", e.target.checked)}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="settings-item">
          <div className="settings-item-info">
            <p className="settings-label">Quiz Challenges</p>
            <p className="settings-desc">Daily quiz notification</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.quizNotif}
              onChange={(e) => updateSetting("quizNotif", e.target.checked)}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="settings-item">
          <div className="settings-item-info">
            <p className="settings-label">Sound</p>
            <p className="settings-desc">Play sound with notifications</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.soundEnabled}
              onChange={(e) =>
                updateSetting("soundEnabled", e.target.checked)
              }
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="settings-item">
          <div className="settings-item-info">
            <p className="settings-label">Vibration</p>
            <p className="settings-desc">Vibrate on notification</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.vibration}
              onChange={(e) => updateSetting("vibration", e.target.checked)}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </section>

      {/* About Section */}
      <section className="settings-section">
        <h2 className="settings-section-title">
          <span className="settings-icon">ℹ️</span> About
        </h2>

        <div className="settings-item">
          <div className="settings-item-info">
            <p className="settings-label">Deen App</p>
            <p className="settings-desc">Version 1.0.0</p>
          </div>
          <span className="settings-version-badge">v1.0</span>
        </div>

        <div className="settings-item">
          <div className="settings-item-info">
            <p className="settings-label">Made with ❤️</p>
            <p className="settings-desc">
              For the Muslim community worldwide
            </p>
          </div>
        </div>
      </section>

      {/* Reset Button */}
      <button
        className="settings-reset-btn"
        onClick={() => {
          localStorage.removeItem("deen-app-settings");
          setSettings({
            theme: "dark",
            language: "en",
            prayerNotif: true,
            adhkarNotif: true,
            quizNotif: false,
            soundEnabled: true,
            vibration: true,
            fontSize: "medium",
          });
        }}
      >
        Reset to Defaults
      </button>
    </div>
  );
}

export default SettingsPage;
