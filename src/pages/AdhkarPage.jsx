import React, { useState, useMemo } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "./../styles/AdhkarPage.css";
import adhkarData from "../data/AdhkarData";
import AdhkarDetail from "../components/AdhkarDetail";

// Import images
import NotifIcon from "../assets/Notif.svg";
import SettingsIcon from "../assets/Settings.svg";
import MoonIcon from "../assets/Moon.svg";

import AdhkarIcon from "../assets/fjer.svg";
import MorningIcon from "../assets/chems.svg";
import EveningIcon from "../assets/lil.svg";
import WakeUpIcon from "../assets/ghorob.svg";
import SleepIcon from "../assets/lil.svg";

// Petit composant pour les icônes de prière
const PrayerIcon = ({ name, isDone, onClick, children }) => (
  <div className="name-element" onClick={onClick} style={{ cursor: "pointer" }}>
    <svg
      className={`prayer-icon ${isDone ? "active" : ""}`}
      viewBox="0 0 50 50"
      width="35"
      height="35"
      fill="none"
      stroke={isDone ? "var(--success)" : "var(--font-weak)"}
      strokeWidth="2"
    >
      {children}
    </svg>
    <span
      style={{
        color: isDone ? "var(--success)" : "var(--font-main)",
        fontSize: "0.8rem",
      }}
    >
      {name}
    </span>
  </div>
);

function AdhkarPage({ onOpenNotif }) {
  const navigate = useNavigate();
  const [prayers, setPrayers] = useState([false, false, false, false, false]);
  const [refresh, setRefresh] = useState(0);
  const completedCount = prayers.filter((p) => p === true).length;
  const percentage = Math.round((completedCount / 5) * 100);

  const togglePrayer = (index) => {
    const newPrayers = [...prayers];
    newPrayers[index] = !newPrayers[index];
    setPrayers(newPrayers);
  };

  // On calcule le progrès pour chaque catégorie
  const categories = useMemo(() => {
    const cats = [
      {
        id: "1",
        title: "Wake up Adkar",
        key: "wakeup",
        icon: WakeUpIcon,
        color: "#FFB347",
      },
      {
        id: "2",
        title: "Morning Adkar",
        key: "morning",
        icon: MorningIcon,
        color: "#FFD93D",
      },
      {
        id: "3",
        title: "Evening Adkar",
        key: "evening",
        icon: EveningIcon,
        color: "#A29BFE",
      },
      {
        id: "4",
        title: "Sleep Adkar",
        key: "sleep",
        icon: SleepIcon,
        color: "#74B9FF",
      },
      {
        id: "5",
        title: "After Prayers Adkar",
        key: "after_prayer",
        icon: AdhkarIcon,
        color: "#55E6C1",
      },
    ];

    return cats.map((cat) => {
      const saved = JSON.parse(
        localStorage.getItem(`progress-${cat.id}`) || "{}",
      );
      const data = adhkarData[cat.key] || { quran: [], hadith: [] };
      const allItems = [...data.quran, ...data.hadith];

      const completed = allItems.filter(
        (item) => (saved[item.id] || 0) >= item.count,
      ).length;
      const total = allItems.length;
      const percent = total > 0 ? (completed / total) * 100 : 0;

      return { ...cat, total, completed, percent };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);
  return (
    <div className="adhkar-page">
      <Routes>
        <Route
          path="/"
          element={
            <main key={refresh}>
              <div className="adhkar-icons">
                <img
                  src={NotifIcon}
                  alt="Notif"
                  onClick={onOpenNotif}
                  style={{ cursor: "pointer" }}
                />
                <img
                  src={SettingsIcon}
                  alt="Settings"
                  onClick={() => navigate("/settings")}
                  style={{ cursor: "pointer" }}
                />
              </div>
              {/* Adhkars List with Bars */}
              <h1 className="page-title">Adhkars</h1>
              <div className="adhkar-grid">
                {categories.map((item) => (
                  <Link
                    to={`${item.id}`}
                    key={item.id}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="card-adhkar">
                      <div className="card-adhkar-left">
                        <h3>{item.title}</h3>
                        <p className="mini-progress-text">
                          <b>
                            {item.completed}/{item.total}
                          </b>{" "}
                          Adkhar read today :
                        </p>
                        {/* LA BARRE VERTE */}
                        <div className="mini-progress-bar">
                          <div
                            className="mini-progress-fill"
                            style={{
                              width: `${item.total > 0 ? (item.completed / item.total) * 100 : 0}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <div
                        className="icon-circle"
                        style={{ backgroundColor: item.color }}
                      >
                        <img src={item.icon} alt={item.title} />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </main>
          }
        />
        <Route
          path="/:id"
          element={
            <AdhkarDetail setRefresh={setRefresh} onOpenNotif={onOpenNotif} />
          }
        />
      </Routes>
    </div>
  );
}

export default AdhkarPage;
