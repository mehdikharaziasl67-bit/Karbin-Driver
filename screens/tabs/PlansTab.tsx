
import React from 'react';
import type { Plan } from '../../types';

const mockPlans: Plan[] = [
  { id: '1', name: 'Basic', price: 'Free', features: ['Standard AI Diagnosis', 'Service Reminders'], isCurrent: false },
  { id: '2', name: 'Premium', price: '$9.99/mo', features: ['Advanced AI Diagnosis', '24/7 Support Chat', 'Voice Assistant Mode', 'Priority Booking'], isCurrent: true },
  { id: '3', name: 'Pro', price: '$19.99/mo', features: ['All Premium Features', 'On-road Assistance', 'Exclusive Discounts'], isCurrent: false },
];

const PlanCard: React.FC<{ plan: Plan }> = ({ plan }) => (
  <div className={`p-6 rounded-xl border-2 ${plan.isCurrent ? 'border-[#33CC66] bg-green-50 dark:bg-green-900/20' : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600'} shadow-lg transition-transform hover:scale-105`}>
    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{plan.name}</h3>
    <p className="text-3xl font-bold my-3 text-[#33CC66]">{plan.price}</p>
    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-6">
      {plan.features.map((feature, index) => (
        <li key={index} className="flex items-center">
          <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
          {feature}
        </li>
      ))}
    </ul>
    <button className={`w-full py-2 rounded-lg font-semibold transition ${plan.isCurrent ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-[#33CC66] text-white hover:bg-green-500'}`}>
      {plan.isCurrent ? 'Current Plan' : 'Upgrade'}
    </button>
  </div>
);

const PlansTab: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-[#33CC66]">Plans & Subscriptions</h1>
      <div className="space-y-6">
        {mockPlans.map(plan => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
};

export default PlansTab;
