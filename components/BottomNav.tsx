
import React from 'react';
import { NavLink } from 'react-router-dom';
import { CogIcon, WrenchScrewdriverIcon, CalendarDaysIcon, CreditCardIcon, ChatBubbleLeftRightIcon } from './Icons';

const navItems = [
  { path: '/diagnose', label: 'AI Diagnosis', icon: <CogIcon /> },
  { path: '/services', label: 'Services', icon: <WrenchScrewdriverIcon /> },
  { path: '/appointments', label: 'Appointments', icon: <CalendarDaysIcon /> },
  { path: '/plans', label: 'Plans', icon: <CreditCardIcon /> },
  { path: '/support', label: 'Support', icon: <ChatBubbleLeftRightIcon /> },
];

const BottomNav: React.FC = () => {
  const activeLinkClass = 'text-[#33CC66]';
  const inactiveLinkClass = 'text-gray-500 dark:text-gray-400';

  return (
    <nav className="absolute bottom-0 left-0 right-0 bg-white dark:bg-[#333333] border-t border-gray-200 dark:border-gray-700 shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
      <div className="flex justify-around items-center h-20">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center space-y-1 transition-transform duration-200 ease-in-out hover:scale-110 ${isActive ? activeLinkClass : inactiveLinkClass}`
            }
          >
            <div className="w-7 h-7">{item.icon}</div>
            <span className="text-xs font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
