import React from 'react';

const mockIncidents = [
  { id: 103, location: 'Intersection #103', risk: 'High' },
  { id: 107, location: 'Intersection #107', risk: 'Critical' },
  { id: 112, location: 'Intersection #112', risk: 'Medium' },
];


const IncidentList = ({ onView }) => {
  return (
    <div className="p-4 bg-white border shadow rounded-lg w-80">
      <h2 className="text-sm font-bold text-gray-700 mb-3">Recent Incidents</h2>
      <ul className="space-y-2">
        {mockIncidents.map((incident) => (
          <li key={incident.id} className="flex justify-between items-center">
            <div>
              <p className="text-xs font-medium">{incident.location}</p>
              <p className="text-xs text-gray-500">{incident.risk} Risk</p>
            </div>
            <button
              onClick={() => onView(incident.id)}
              className="text-xs text-blue-600 underline"
            >
              View on Map
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IncidentList;
