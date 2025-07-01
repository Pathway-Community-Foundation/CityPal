import React, { useEffect, useRef, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  ZoomControl,
  useMap,
} from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';

const generateMarkers = () => {
  const baseLat = 35.267;
  const baseLng = -80.854;
  const markers = [];
  const incidentTypes = ['Pedestrian Crash', 'Speeding', 'Near Miss', 'Red Light Violation'];

  for (let i = 0; i < 40; i++) {
    const lat = baseLat + Math.random() * 0.01 - 0.005;
    const lng = baseLng + Math.random() * 0.015 - 0.0075;
    const crashCount = Math.floor(Math.random() * 10);
    const crimeIndex = Math.floor(Math.random() * 100);
    const lightingScore = Math.floor(Math.random() * 5);
    const riskScore = crashCount * 10 + crimeIndex - lightingScore * 5;
    const riskLevel = riskScore > 120 ? 'Critical' : riskScore > 90 ? 'High' : riskScore > 60 ? 'Medium' : 'Low';
    const incidentType = incidentTypes[Math.floor(Math.random() * incidentTypes.length)];

    markers.push({
      id: i + 1,
      position: [lat, lng],
      crashCount,
      crimeIndex,
      lightingScore,
      riskScore,
      location: `Intersection #${100 + i}`,
      incidentType,
      riskLevel,
      lastCrash: '2025-04-20',
      riskFactors: ['No crosswalk', 'High speed', 'Poor lighting']
    });
  }

  return markers;
};

const markers = generateMarkers();

const getColorByRisk = (score) => {
  if (score < 60) return 'green';
  if (score < 90) return 'yellow';
  if (score < 120) return 'orange';
  return 'red';
};

const ForceMapRefresh = () => {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 200);
  }, [map]);
  return null;
};

const HeatmapLayer = ({ points }) => {
  const map = useMap();

  useEffect(() => {
    const heat = window.L.heatLayer(points, {
      radius: 25,
      blur: 15,
      maxZoom: 17,
      gradient: {
        0.4: 'blue',
        0.6: 'lime',
        0.8: 'orange',
        1.0: 'red'
      }
    }).addTo(map);

    return () => {
      map.removeLayer(heat);
    };
  }, [map, points]);

  return null;
};

const MapPanel = ({ jumpToMarkerId }) => {
  const mapRef = useRef();
  const [selectedMarkerId, setSelectedMarkerId] = useState(null);
  const navigate = useNavigate();
  const handleViewImageAnalysis = (id) => {
    const marker = markers.find((m) => m.id === id);
    if (marker) {
      const imageId = marker.location.match(/#(\d+)/)?.[1]; 
      if (imageId) {
        navigate(`/vision-analyzer?id=${imageId}`);
      }
    }
  };
  

  useEffect(() => {
    if (jumpToMarkerId && mapRef.current) {
      const marker = markers.find((m) => m.id === jumpToMarkerId);
      if (marker) {
        const mapInstance = mapRef.current;
        mapInstance.setView(marker.position, 16);
        setSelectedMarkerId(marker.id);
      }
    }
  }, [jumpToMarkerId]);

  const heatmapPoints = markers.map((m) => {
    let weight = 0.3;
    if (m.riskLevel === "Medium") weight = 0.6;
    if (m.riskLevel === "High") weight = 0.8;
    if (m.riskLevel === "Critical") weight = 1.0;
    return [...m.position, weight];
  });

  return (
    <div className="relative flex-1 bg-gray-100 min-h-[600px]">
      <div className="absolute bottom-4 left-4 w-48 rounded-lg shadow-xl border border-gray-300 overflow-hidden z-[1000] bg-white">
      <div className="bg-purple-700 text-white text-xs font-bold px-4 py-2 tracking-wide">
    Predicted Risk Level
  </div>

        <div className="px-4 py-3 text-xs text-gray-800 space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
            <span>Low</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
            <span>Medium</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-400"></span>
            <span>High</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
            <span>Critical</span>
          </div>
        </div>
      </div>

      <MapContainer
        ref={mapRef}
        center={[35.2645, -80.8570]}

        zoom={15}
        style={{ height: '100vh', width: '100%' }}
        zoomControl={false}
        className="z-0"
      >
        <HeatmapLayer points={heatmapPoints} />
        <ForceMapRefresh />
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="bottomright" />

        {markers.map((marker) => (
          <CircleMarker
            key={marker.id}
            center={marker.position}
            radius={6}
            pathOptions={{
              color: 'white',
              fillColor: getColorByRisk(marker.riskScore),
              fillOpacity: 1,
              weight: 1,
            }}
          >
            <Popup>
  <div className="w-[270px] rounded-xl shadow-xl bg-white p-4 text-sm animate-scaleIn">
    
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <img
          src="https://ui-avatars.com/api/?name=City+Inspector&background=0D8ABC&color=fff&size=32"
          alt="avatar"
          className="w-8 h-8 rounded-full"
        />
        <div>
          <p className="text-gray-800 font-bold text-sm">{marker.location}</p>
          <p className="text-gray-500 text-xs">Updated 2 mins ago</p>
        </div>
      </div>
    </div>

    <div className="space-y-1 text-[13px] text-gray-700">
    <p><strong>📍 Location:</strong> {marker.location}</p>
    <p><strong>🚨 Incident:</strong> {marker.incidentType}</p>
    <p><strong>⚠️ Risk Level:</strong> {marker.riskLevel}</p>
    <p><strong>💥 Crash Count:</strong> {marker.crashCount}</p>
    <p><strong>🚔 Crime Index:</strong> {marker.crimeIndex}</p>
    <p><strong>💡 Lighting Score:</strong> {marker.lightingScore}</p>
    <p><strong>📊 Risk Score:</strong> {marker.riskScore}</p>
    <p><strong>📌 Risk Factors:</strong></p>
    </div>

    <div className="mt-2 flex items-center gap-2">
      <span className={`text-xs font-semibold px-2 py-1 rounded-full 
        ${marker.riskLevel === 'Critical' ? 'bg-red-100 text-red-700' :
          marker.riskLevel === 'High' ? 'bg-orange-100 text-orange-700' :
          marker.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
          'bg-green-100 text-green-700'}
      `}>
        {marker.riskLevel} Risk
      </span>
    </div>

    <div className="mt-3">
      <p className="font-semibold text-gray-700">Risk Factors:</p>
      <ul className="list-disc list-inside text-gray-600 text-xs mt-1">
        {marker.riskFactors.map((factor, idx) => (
          <li key={idx}>{factor}</li>
        ))}
      </ul>
    </div>

    <button
  className="mt-2 px-3 py-1 text-white bg-purple-600 rounded hover:bg-purple-700 transition duration-200"
  onClick={() => handleViewImageAnalysis(marker.id)}
>
  View Image Analysis
</button>

  </div>
</Popup>

          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapPanel;
