import React from "react";
import { useNavigate } from "react-router-dom";

const DiagnosticPanel = ({ data, onClose }) => {
  const navigate = useNavigate();

  if (!data) return null;

  const handleAnalyzeClick = () => {
    navigate(`/vision?id=${data.id}`);
  };

  return (
    <div className="absolute top-20 right-6 bg-white shadow-lg p-5 rounded-md w-80 z-50">
      <h2 className="text-lg font-bold mb-2">{data.location}</h2>
      <p><strong>Risk Level:</strong> {data.risk}</p>
      <p><strong>Crash Count:</strong> {data.crashCount}</p>
      <p><strong>Last Crash:</strong> {data.lastCrash}</p>
      <p><strong>Risk Factors:</strong></p>
      <ul className="list-disc ml-5">
        {data.factors.map((f, idx) => <li key={idx}>{f}</li>)}
      </ul>
      <button
        onClick={handleAnalyzeClick}
        className="w-full bg-blue-600 text-white px-3 py-2 rounded mt-4 font-semibold text-sm"
      >
        View Image Analysis →
      </button>
      <button
        onClick={onClose}
        className="mt-2 bg-red-500 text-white px-3 py-1 rounded text-sm"
      >
        Close
      </button>
    </div>
  );
};

export default DiagnosticPanel;
