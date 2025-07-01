import React, { useState, useEffect, useRef } from 'react';
import { BellIcon } from '@heroicons/react/24/outline'; 
import './NotificationDropdown.css'; 

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

export default function NotificationDropdown() {
  const [alerts, setAlerts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const bellRef = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      const newAlert = mockAlerts[Math.floor(Math.random() * mockAlerts.length)];
      setAlerts(prev => [newAlert, ...prev.slice(0, 4)]); 
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const toggleDropdown = () => setShowDropdown(prev => !prev);

  return (
    <div className="fixed top-4 right-6 z-[2000]">
      <div className="relative" ref={bellRef}>
        <button
          className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100"
          onClick={toggleDropdown}
        >
          <BellIcon className="w-6 h-6 text-gray-800" />
          {alerts.length > 0 && (
            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full" />
          )}
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border z-50">
            <div className="p-3 font-semibold border-b text-gray-800">Notifications</div>
            <ul className="max-h-60 overflow-y-auto">
              {alerts.map((alert, idx) => (
                <li key={idx} className="px-4 py-2 hover:bg-gray-100 text-sm">
                  <span className="text-orange-500">⚠️</span>{' '}
                  <strong>{alert.location}</strong> – {alert.risk} Risk
                  <br />
                  <small className="text-gray-500">{alert.time}</small>
                </li>
              ))}
              {alerts.length === 0 && (
                <li className="px-4 py-2 text-gray-500 text-sm">No new notifications</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
