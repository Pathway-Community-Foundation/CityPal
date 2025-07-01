import React from 'react';

const HeatmapGrid = () => {
  const colorMap = {
    100: 'bg-green-600',
    90: 'bg-green-500',
    80: 'bg-lime-400',
    70: 'bg-yellow-400',
    60: 'bg-orange-400',
    50: 'bg-red-400',
    40: 'bg-red-500',
    30: 'bg-red-600',
    20: 'bg-red-700',
    10: 'bg-gray-300',
    0: 'bg-gray-200',
  };

  const getRandomPercent = () => Math.floor(Math.random() * 11) * 10;
  const days = Array.from({ length: 15 }).map((_, i) => new Date(2025, 3, i + 1).toLocaleDateString());
  const hours = Array.from({ length: 24 }).map((_, i) => `${i}:00`);

  return (
    <div className="p-6 bg-white rounded shadow overflow-x-auto w-full">
      <div className="min-w-[900px]">
        <div className="flex items-center mb-2">
          <div className="w-24"></div>
          <div className="grid grid-cols-24 gap-[1px] w-full">
            {hours.map((h) => (
              <div
                key={h}
                className="text-[10px] text-gray-400 text-center"
              >
                {h}
              </div>
            ))}
          </div>
        </div>

        {days.map((date, rowIndex) => (
          <div key={rowIndex} className="flex items-center mb-[2px]">
            <div className="w-24 text-xs text-gray-600 mr-2 whitespace-nowrap">{date}</div>
            <div className="grid grid-cols-24 gap-[1px] w-full">
              {hours.map((_, colIndex) => {
                const val = getRandomPercent();
                return (
                  <div
                    key={colIndex}
                    className={`h-4 rounded-sm ${colorMap[val]}`}
                    title={`${val}% accuracy`}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeatmapGrid;
