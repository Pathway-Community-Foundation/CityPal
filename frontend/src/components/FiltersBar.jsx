import React from 'react';

const FiltersBar = () => {
  return (
    <div className="flex items-center justify-between px-6 py-3 bg-white border-b">
      {/* Dropdowns */}
      <div className="flex gap-4">
        <select className="text-xs border border-gray-300 rounded-sm px-2 py-1">
          <option>Simulated Prediction vs. Real Data</option>
          <option>Prediction Accuracy</option>
        </select>

        <select className="text-xs border border-gray-300 rounded-sm px-2 py-1">
          <option>QM</option>
          <option>PM</option>
        </select>

        <input
          type="date"
          className="text-xs border border-gray-300 rounded-sm px-2 py-1"
          placeholder="Start Date"
        />
        <input
          type="date"
          className="text-xs border border-gray-300 rounded-sm px-2 py-1"
          placeholder="End Date"
        />
      </div>
    </div>
  );
};

export default FiltersBar;
