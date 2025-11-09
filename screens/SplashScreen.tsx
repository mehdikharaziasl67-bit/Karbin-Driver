
import React from 'react';

const SplashScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-[#33CC66] to-green-400">
      <div className="animate-pulse">
        <h1 className="text-6xl font-bold text-white tracking-wider">KARBIN</h1>
        <p className="text-white text-center text-lg mt-2">Your AI Driver Assistant</p>
      </div>
    </div>
  );
};

export default SplashScreen;
