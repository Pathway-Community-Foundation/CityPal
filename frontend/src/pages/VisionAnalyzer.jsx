import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const VisionAnalyzer = () => {
  const [mode, setMode] = useState('image');
  const [loading, setLoading] = useState(true);
  const { search } = useLocation();
  const id = new URLSearchParams(search).get('id') || '103';

  const annotatedImages = [`${id}_1`, `${id}_2`, `${id}_3`];

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timeout);
  }, [mode, id]);

  return (
    <div className="relative p-8 min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-purple-800">AI Vision-Based Infrastructure Detection</h1>
        <div className="flex gap-3">
          <button
            className={`px-4 py-2 rounded-md text-sm font-semibold transition ${
              mode === 'image'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-300 text-gray-800'
            }`}
            onClick={() => setMode('image')}
          >
            Analyze Image
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-semibold transition ${
              mode === 'video'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-300 text-gray-800'
            }`}
            onClick={() => setMode('video')}
          >
            Analyze Video
          </button>
        </div>
      </div>

      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="text-white text-xl font-semibold animate-pulse">🔍 Analyzing Vision Data...</div>
        </div>
      )}

      {!loading && mode === 'image' && (
        <div className="space-y-6">
          <h2 className="text-lg font-medium text-gray-700 text-center">Street View Image Analysis</h2>
          {annotatedImages.map((img, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 max-w-5xl mx-auto"
            >
              <p className="text-sm font-medium text-gray-600 mb-2">Annotated View {idx + 1}</p>
              <img
                src={`/annotated/${img}.jpg`}
                alt={`Annotated View ${idx + 1}`}
                className="w-full rounded-lg"
              />
            </div>
          ))}
        </div>
      )}

      {!loading && mode === 'video' && (
        <div className="flex flex-col items-center space-y-4">
          <h2 className="text-lg font-medium text-gray-700">Annotated Video Analysis</h2>
          <video
            src="/annotated/streetview_annotated.mp4"
            controls
            className="w-full max-w-4xl rounded-xl shadow-md border"
          />
          <ul className="mt-4 text-sm text-gray-600 space-y-1">
            <li>🚶 Pedestrian Detected at 0:05</li>
            <li>⚠️ No Sidewalk Detected (Frame 140)</li>
            <li>✅ Vehicle Traffic Normal</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default VisionAnalyzer;
