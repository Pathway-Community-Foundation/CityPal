import React from 'react';

const tabs = ['Heatmap', 'Table', 'Chart'];

const MiniNav = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex space-x-4 px-6 py-2 bg-white border-b">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`text-sm font-medium pb-2 border-b-2 transition ${
            activeTab === tab
              ? 'border-orange-500 text-orange-500'
              : 'border-transparent text-gray-500 hover:text-orange-400'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default MiniNav;
