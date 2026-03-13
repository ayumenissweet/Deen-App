import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Styles
import "../styles/PrayerPage.css";

// Assets
import notifIcon from "../assets/Notif.svg";
import settingsIcon from "../assets/Settings.svg";
import backIcon from "../assets/back.svg";

/* ---- Icônes état prière ---- */
const IconCheck = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <circle cx="11" cy="11" r="10" fill="#f6c90e" />
    <path
      d="M6.5 11.5L9.5 14.5L15.5 8"
      stroke="#021c2d"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconCircle = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <circle
      cx="11"
      cy="11"
      r="10"
      stroke="rgba(255,255,255,0.25)"
      strokeWidth="1.5"
    />
  </svg>
);

const IconNext = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <circle
      cx="11"
      cy="11"
      r="10"
      stroke="rgba(246,201,14,0.35)"
      strokeWidth="1.5"
    />
    <path
      d="M11 1.2 A9.8 9.8 0 0 1 20.8 11"
      stroke="#f6c90e"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

/* ================================================================ */

function PrayerPage({ onOpenNotif }) {
  const navigate = useNavigate();
  const prayers = [
    { name: "Fajr", time: "06:15" },
    { name: "Dhuhr", time: "12:00" },
    { name: "Asr", time: "16:14" },
    { name: "Maghrib", time: "19:02" },
    { name: "Isha", time: "20:38" },
  ];

  const [activePrayer, setActivePrayer] = useState("");
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  function isPassed(prayerTime) {
    const now = new Date();
    const [h, m] = prayerTime.split(":").map(Number);
    const t = new Date();
    t.setHours(h, m, 0, 0);
    return t < now;
  }

  function getNextPrayer() {
    const now = new Date();
    for (const prayer of prayers) {
      const [h, m] = prayer.time.split(":").map(Number);
      const t = new Date();
      t.setHours(h, m, 0, 0);
      if (t > now) return { name: prayer.name, time: t };
    }
    const [h, m] = prayers[0].time.split(":").map(Number);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(h, m, 0, 0);
    return { name: prayers[0].name, time: tomorrow };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const next = getNextPrayer();
      const diff = next.time - new Date();
      setActivePrayer(next.name);
      setTimeLeft({
        hours: Math.floor(diff / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <div className="container">
      {/* HEADER */}
      <div className="header">
        <img src={backIcon} alt="back" className="icon" />
        <div className="icons">
          <img src={notifIcon} alt="notification" className="icon" onClick={onOpenNotif} style={{ cursor: 'pointer' }} />
          <img src={settingsIcon} alt="settings" className="icon" onClick={() => navigate('/settings')} style={{ cursor: 'pointer' }} />
        </div>
      </div>

      {/* MOSQUE BANNER */}
      <div className="mosque-banner">
        <div className="skyline-container">
          {/* Back wave */}
          <div className="wave wave-back"></div>

          {/* Front wave */}
          <div className="wave wave-front"></div>

          {/* Mosque skyline */}
          <div className="mosque-skyline"></div>
        </div>
      </div>
      {/* TIMER */}
      <div className="timer">
        <div className="timer-blocks">
          <div className="time-block">
            <span className="time-value">{pad(timeLeft.hours)}</span>
            <span className="time-label">hours</span>
          </div>

          <span className="colon">:</span>

          <div className="time-block">
            <span className="time-value">{pad(timeLeft.minutes)}</span>
            <span className="time-label">minutes</span>
          </div>

          <span className="colon">:</span>

          <div className="time-block">
            <span className="time-value">{pad(timeLeft.seconds)}</span>
            <span className="time-label">seconds</span>
          </div>
        </div>
      </div>

      {/* PRAYER LIST */}
      <div className="prayer-list">
        <div className="list-header">
          <span>Prayer</span>
          <span>Time</span>
        </div>

        {prayers.map((prayer) => {
          const passed = isPassed(prayer.time);
          const active = activePrayer === prayer.name;
          return (
            <div
              key={prayer.name}
              className={`prayer-card ${active ? "active" : ""} ${passed && !active ? "passed" : ""}`}
            >
              <span className="prayer-name">{prayer.name}</span>
              <div className="prayer-right">
                {active ? (
                  <IconNext />
                ) : passed ? (
                  <IconCheck />
                ) : (
                  <IconCircle />
                )}
                <span className="prayer-time">{prayer.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PrayerPage;
