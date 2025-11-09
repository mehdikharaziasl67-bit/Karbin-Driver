
import React from 'react';
import type { Appointment } from '../../types';

const mockAppointments: Appointment[] = [
  { id: '1', provider: 'Speedy Auto Repair', service: 'Brake Pad Replacement', date: '2024-08-05', time: '10:00 AM', status: 'confirmed' },
  { id: '2', provider: 'Mike\'s Garage', service: 'Engine Diagnostic', date: '2024-08-12', time: '02:30 PM', status: 'pending' },
  { id: '3', provider: 'City Tires', service: 'Tire Alignment', date: '2024-07-20', time: '11:00 AM', status: 'cancelled' },
];

const statusStyles = {
  confirmed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
};

const AppointmentCard: React.FC<{ appointment: Appointment }> = ({ appointment }) => (
  <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
    <div className="flex justify-between items-start mb-2">
      <div>
        <h3 className="font-bold text-gray-900 dark:text-gray-100">{appointment.provider}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">{appointment.service}</p>
      </div>
      <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusStyles[appointment.status]}`}>
        {appointment.status}
      </span>
    </div>
    <p className="text-sm text-gray-500 dark:text-gray-400">{appointment.date} at {appointment.time}</p>
  </div>
);

const AppointmentsTab: React.FC = () => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-[#33CC66]">Appointments</h1>
        <button className="bg-[#33CC66] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-500 transition">
          Book New
        </button>
      </div>
      <div className="space-y-4">
        {mockAppointments.map(app => (
          <AppointmentCard key={app.id} appointment={app} />
        ))}
      </div>
    </div>
  );
};

export default AppointmentsTab;
