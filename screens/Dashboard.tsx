
import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-800">
      <main className="flex-grow overflow-y-auto pb-20">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};

export default Dashboard;
