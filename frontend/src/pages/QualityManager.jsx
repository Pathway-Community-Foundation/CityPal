import React, { useState } from 'react';
import FiltersBar from '../components/FiltersBar';
import MiniNav from '../components/MiniNav';
import ChartView from '../components/QualityManager/ChartView';

const QualityManager = () => {
  const [activeTab, setActiveTab] = useState('Heatmap');

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <FiltersBar />

      <MiniNav activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex-1 overflow-auto p-4">

        {activeTab === 'Table' && (
          <div className="bg-blue-100 w-full h-64 rounded-md shadow-inner flex items-center justify-center text-gray-500 text-sm">
            [Table Placeholder]
          </div>
        )}

        {activeTab === 'Chart' && (
          <div className="w-full h-[420px] bg-white rounded shadow p-4">
            <h2 className="text-md font-semibold text-gray-700 mb-4">System Accuracy Trend</h2>
            <ChartView />
          </div>
        )}
      </div>
    </div>
  );
};

export default QualityManager;
