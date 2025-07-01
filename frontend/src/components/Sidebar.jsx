import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className=" bg-purple-800 text-white w-48 h-screen flex flex-col py-4 px-3 space-y-4">
      <h2 className="text-lg font-bold pl-1">Tools</h2>
      <Link to="/rp-evaluations" className="hover:text-orange-400">RP Evaluations</Link>
      <Link to="/tasks" className="hover:text-orange-400">Tasks</Link>
      <Link to="/quality-manager" className="hover:text-orange-400">Quality Manager</Link>
      <Link to="/notifications" className="hover:text-orange-400">Notifications</Link>
      <Link to="/system-status" className="hover:text-orange-400">System Status</Link>
    </div>
  );
};

export default Sidebar;
