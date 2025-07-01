import React from 'react';

const TopTabs = () => {
  const tabs = ['ANALYZE', 'MONITOR', 'MANAGE'];

  return (
    <div className="absolute top-0 left-56 right-0 z-50 bg-white px-6 py-2 flex flex-wrap items-center justify-between border-b border-gray-200 shadow-sm">
      {/* Tabs (left) */}
      <div className="flex space-x-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            className="text-purple-700 border border-purple-700 text-xs font-bold px-3 py-1 rounded-sm hover:bg-purple-50 transition-all duration-150 ease-in-out tracking-wide"
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Controls (center/right) */}
      <div className="flex flex-wrap items-center space-x-3">
        <button className="bg-purple-700 hover:bg-purple-800 text-white text-xs font-semibold px-3 py-1 rounded-sm transition duration-150">
          Live Data
        </button>

        <input
          type="datetime-local"
          className="text-xs border border-gray-300 rounded-sm px-2 py-1 focus:outline-none focus:ring-1 focus:ring-purple-500"
        />

        <select className="text-xs border border-gray-300 rounded-sm px-2 py-1 focus:outline-none focus:ring-1 focus:ring-purple-500">
          <option>Real Data</option>
        </select>

        <select className="text-xs border border-gray-300 rounded-sm px-2 py-1 focus:outline-none focus:ring-1 focus:ring-purple-500">
          <option>Pattern 4</option>
        </select>

        <select className="text-xs border border-gray-300 rounded-sm px-2 py-1 focus:outline-none focus:ring-1 focus:ring-purple-500">
          <option value="">All Risk Levels</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Critical">Critical</option>
        </select>

        <div className="text-purple-700 hover:text-purple-900 cursor-pointer text-xs">
          <span className="material-icons">layers</span>
        </div>
      </div>
    </div>
  );
};

export default TopTabs;
