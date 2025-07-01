import React from 'react';
import Sidebar from '../components/Sidebar';
import TopTabs from '../components/TopTabs';
import MapPanel from '../components/MapPanel';
import { useState } from 'react';
import diagnostics from "../data/diagnostics.json";



const Home = () => {
  const [selectedMarkerId, setSelectedMarkerId] = useState(null);
  const [showNotification, setShowNotification] = useState(true);
  const [selectedDiagnostic, setSelectedDiagnostic] = useState(null);

  const handleDiagnosticView = (id) => {
    const match = diagnostics.find((d) => d.id === id);
    setSelectedDiagnostic(match);
    setSelectedMarkerId(id); 
  };
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <TopTabs />
        <div className="flex-1 relative">
          <MapPanel jumpToMarkerId={selectedMarkerId} />

        </div>

      </div>
    </div>
  );
};

export default Home;
