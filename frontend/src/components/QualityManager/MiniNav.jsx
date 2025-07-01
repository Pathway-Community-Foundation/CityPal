import React from 'react';

const MiniNav = () => {
  return (
    <div className="flex items-center border-b px-6 pt-4 text-sm font-medium text-gray-600">
      <button className="mr-6 border-b-2 border-red-500 pb-1 text-red-500">Heatmap</button>
      <button className="mr-6 hover:text-red-400">Table</button>
      <button className="hover:text-red-400">Chart</button>
    </div>
  );
};

export default MiniNav;
