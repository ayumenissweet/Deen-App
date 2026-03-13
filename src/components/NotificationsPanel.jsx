import React, { useState } from "react";
import "../styles/NotificationsPanel.css";

// Mock notification data with timestamps
const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    type: "prayer",
    icon: "🕌",
    title: "Fajr Prayer",
    message: "Fajr prayer time is in 15 minutes",
    time: Date.now() - 1000 * 60 * 10, // 10 min ago
    read: false,
  },
  {
    id: 2,
    type: "adhkar",
    icon: "📿",
    title: "Morning Adhkār",
    message: "Don't forget your morning remembrance",
    time: Date.now() - 1000 * 60 * 45, // 45 min ago
    read: false,
  },
  {
    id: 3,
    type: "quiz",
    icon: "❓",
    title: "Daily Quiz Challenge",
    message: "A new quiz question is available! Test your knowledge.",
    time: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
    read: true,
  },
  {
    id: 4,
    type: "prayer",
    icon: "🕌",
    title: "Dhuhr Prayer",
    message: "Dhuhr prayer time is in 10 minutes",
    time: Date.now() - 1000 * 60 * 60 * 5, // 5 hours ago
    read: true,
  },
  {
    id: 5,
    type: "adhkar",
    icon: "🌙",
    title: "Evening Adhkār",
    message: "Time for your evening remembrance — start your dhikr now",
    time: Date.now() - 1000 * 60 * 60 * 8, // 8 hours ago
    read: false,
  },
  {
    id: 6,
    type: "quran",
    icon: "📖",
    title: "Quran Reading Goal",
    message: "You're 88% done with today's reading target!",
    time: Date.now() - 1000 * 60 * 60 * 12, // 12 hours ago
    read: true,
  },
];

function timeAgo(timestamp) {
  const diff = Date.now() - timestamp;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function NotificationsPanel({ isOpen, onClose }) {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [filter, setFilter] = useState("all");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filtered =
    filter === "all"
      ? notifications
      : notifications.filter((n) => n.type === filter);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const filters = [
    { key: "all", label: "All" },
    { key: "prayer", label: "🕌 Prayer" },
    { key: "adhkar", label: "📿 Adhkār" },
    { key: "quiz", label: "❓ Quiz" },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className={`notif-backdrop ${isOpen ? "visible" : ""}`}
        onClick={onClose}
      />

      {/* Panel */}
      <div className={`notif-panel ${isOpen ? "open" : ""}`}>
        {/* Panel Header */}
        <div className="notif-header">
          <div className="notif-header-left">
            <h2>Notifications</h2>
            {unreadCount > 0 && (
              <span className="notif-badge">{unreadCount}</span>
            )}
          </div>
          <div className="notif-header-actions">
            {notifications.length > 0 && (
              <button className="notif-clear-all" onClick={clearAll}>
                Clear all
              </button>
            )}
            {unreadCount > 0 && (
              <button className="notif-mark-all" onClick={markAllRead}>
                ✓ Read all
              </button>
            )}
            <button className="notif-close-btn" onClick={onClose}>
              ✕
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="notif-filters">
          {filters.map((f) => (
            <button
              key={f.key}
              className={`notif-filter-btn ${filter === f.key ? "active" : ""}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
              {f.key === "all" && unreadCount > 0 && (
                <span className="notif-filter-count">{unreadCount}</span>
              )}
            </button>
          ))}
        </div>

        {/* Notification List */}
        <div className="notif-list">
          {filtered.length === 0 ? (
            <div className="notif-empty">
              <div className="notif-empty-icon-wrap">
                <span className="notif-empty-icon">🔔</span>
              </div>
              <p className="notif-empty-title">
                {filter === "all"
                  ? "No notifications"
                  : `No ${filter} notifications`}
              </p>
              <p className="notif-empty-sub">You're all caught up!</p>
            </div>
          ) : (
            filtered.map((notif, i) => (
              <div
                key={notif.id}
                className={`notif-card ${notif.read ? "read" : "unread"}`}
                onClick={() => markAsRead(notif.id)}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className={`notif-card-icon-wrap type-${notif.type}`}>
                  <span className="notif-card-icon">{notif.icon}</span>
                </div>
                <div className="notif-card-content">
                  <div className="notif-card-top">
                    <p className="notif-card-title">{notif.title}</p>
                    <span className="notif-card-time">
                      {timeAgo(notif.time)}
                    </span>
                  </div>
                  <p className="notif-card-message">{notif.message}</p>
                </div>
                <button
                  className="notif-card-dismiss"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeNotification(notif.id);
                  }}
                  title="Dismiss"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default NotificationsPanel;
