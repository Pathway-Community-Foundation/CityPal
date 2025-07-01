import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line
} from 'recharts';

const issueData = [
  { date: 'Apr 1', high: 24, low: 12 },
  { date: 'Apr 5', high: 12, low: 8 },
  { date: 'Apr 13', high: 29, low: 11 },
  { date: 'Apr 21', high: 15, low: 9 },
  { date: 'Apr 30', high: 17, low: 10 },
];

const resolutionData = [
  { date: 'Apr 1', avg: 4.5 },
  { date: 'Apr 10', avg: 5.0 },
  { date: 'Apr 17', avg: 3.8 },
  { date: 'Apr 24', avg: 6.1 },
  { date: 'Apr 30', avg: 4.2 },
];

export default function CitypalDashboard() {
  return (
    <div className="bg-gray-50 p-6 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">📊 CityPal Analytics Dashboard</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          ['285', 'Total Issues', 'text-gray-800'],
          ['76', 'High Priority', 'text-red-500'],
          ['4.6 hrs', 'Avg. Resolution Time', 'text-blue-500'],
          ['102', 'Open Issues', 'text-yellow-500'],
        ].map(([value, label, color], i) => (
          <div key={i} className="bg-white p-4 shadow rounded text-center">
            <p className={`text-2xl font-semibold ${color}`}>{value}</p>
            <p className="text-sm text-gray-500 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Issue Priority Trend */}
      <div className="bg-white p-6 rounded shadow mb-8">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Issue Priority Trends</h2>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={issueData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="high" stroke="#3b82f6" fill="#93c5fd" name="High Priority" />
            <Area type="monotone" dataKey="low" stroke="#60a5fa" fill="#dbeafe" name="Low Priority" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Resolution Time Chart */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Avg. Resolution Time</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={resolutionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="avg" stroke="#3b82f6" strokeWidth={2} name="Hours" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
