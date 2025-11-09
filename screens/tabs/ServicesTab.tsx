
import React from 'react';
import type { ServiceTask } from '../../types';

const mockServices: ServiceTask[] = [
  { id: '1', title: 'Oil Change', status: 'completed', date: '2024-07-15' },
  { id: '2', title: 'Battery Check', status: 'pending', date: '2024-08-01' },
  { id: '3', title: 'Tire Rotation', status: 'upcoming', date: '2024-08-20' },
  { id: '4', title: 'Brake Inspection', status: 'upcoming', date: '2024-09-10' },
  { id: '5', title: 'Air Filter Replacement', status: 'completed', date: '2024-06-25' },
];

const statusStyles = {
  completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  upcoming: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
};

const ServiceCard: React.FC<{ service: ServiceTask }> = ({ service }) => (
  <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md flex justify-between items-center">
    <div>
      <h3 className="font-semibold text-gray-800 dark:text-gray-200">{service.title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">{service.date}</p>
    </div>
    <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusStyles[service.status]}`}>
      {service.status}
    </span>
  </div>
);

const ServicesTab: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-[#33CC66]">Service Management</h1>
      <div className="space-y-4">
        {mockServices.map(service => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default ServicesTab;
