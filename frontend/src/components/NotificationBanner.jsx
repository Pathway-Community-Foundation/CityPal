import React, { useState, useEffect } from "react";
import "./NotificationBanner.css";

const mockAlerts = [
  {
    id: 1,
    location: "Intersection #103",
    risk: "High",
    time: "2025-04-23 23:47",
  },
  {
    id: 2,
    location: "Intersection #107",
    risk: "Critical",
    time: "2025-04-23 23:48",
  },
  {
    id: 3,
    location: "Intersection #112",
    risk: "Medium",
    time: "2025-04-23 23:49",
  },
];

export default function NotificationBanner() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newAlert = mockAlerts[Math.floor(Math.random() * mockAlerts.length)];
      setAlerts(prev => [newAlert, ...prev]);
    }, 100000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="notification-banner">
      {alerts.map((alert, idx) => (
        <div className="alert-card" key={idx}>
          ⚠️ <strong>{alert.location}</strong> – {alert.risk} Risk<br />
          <small>{alert.time}</small>
        </div>
      ))}
    </div>
  );
}
