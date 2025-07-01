import React from 'react';

const FiltersBar = () => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 bg-white px-6 py-4 shadow-sm">
      <div className="flex flex-wrap gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Data Evaluation</label>
          <select className="mt-1 block w-52 rounded border border-gray-300 px-2 py-1 text-sm shadow-sm">
            <option>Simulated Prediction vs. Real Data</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Output</label>
          <select className="mt-1 block w-24 rounded border border-gray-300 px-2 py-1 text-sm shadow-sm">
            <option>QM</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">From</label>
          <input type="date" className="mt-1 block rounded border border-gray-300 px-2 py-1 text-sm shadow-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">To</label>
          <input type="date" className="mt-1 block rounded border border-gray-300 px-2 py-1 text-sm shadow-sm" />
        </div>
      </div>
    </div>
  );
};

export default FiltersBar;
