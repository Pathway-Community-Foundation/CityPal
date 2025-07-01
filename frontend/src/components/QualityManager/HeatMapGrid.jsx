import React from 'react';

const HeatmapGrid = () => {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-12">
      <div className="h-[400px] w-full max-w-6xl bg-gradient-to-br from-green-100 to-green-200 border rounded shadow-inner" />
      <p className="mt-6 text-red-500 text-lg font-light">Evaluate system performance on the go</p>
    </div>
  );
};

export default HeatmapGrid;
