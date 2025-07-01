import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

// mock data simulating performance trends
const generateChartData = () => {
  const data = [];
  for (let i = 1; i <= 30; i++) {
    data.push({
      date: `04/${i < 10 ? '0' + i : i}/2025`,
      accuracy: Math.floor(70 + Math.sin(i / 2) * 20),
    });
  }
  return data;
};

const data = generateChartData();

const ChartView = () => {
  return (
    <div className="p-6 bg-white rounded shadow w-full h-[400px]">
      <h2 className="text-md font-bold text-gray-700 mb-4">System Accuracy Trend</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
          <XAxis dataKey="date" fontSize={10} angle={-45} textAnchor="end" height={60} />
          <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
          <Tooltip formatter={(value) => `${value}%`} />
          <Line type="monotone" dataKey="accuracy" stroke="#2563eb" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartView;
