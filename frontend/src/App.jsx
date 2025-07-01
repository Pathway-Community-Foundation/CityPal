import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import QualityManager from './pages/QualityManager';
import VisionAnalyzer from './pages/VisionAnalyzer';
import CitypalDashboard from './components/QualityManager/CitypalDashboard';
import NotificationDropdown from './components/NotificationDropdown';

function App() {
  return (
      <>
        <NotificationDropdown />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vision-analyzer" element={<VisionAnalyzer />} />
          <Route path="/quality-manager" element={<CitypalDashboard />} />
          <Route path="/dashboard" element={<QualityManager />} />
        </Routes>
      </>
  );
}

export default App;
