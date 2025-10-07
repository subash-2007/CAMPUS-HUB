
import React, { useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { events as mockEvents, registrations as mockRegistrations, attendance as mockAttendance } from '../../services/mockData';
import { Attendance, Event, Registration } from '../../types';

const MyEventsPage: React.FC = () => {
  const { user } = useContext(UserContext);
  const [registrations, setRegistrations] = useState<Registration[]>(mockRegistrations);
  const [attendance, setAttendance] = useState<Attendance[]>(mockAttendance);

  const userRegistrations = registrations.filter(r => r.userId === user?.id);
  const userRegisteredEventIds = new Set(userRegistrations.map(r => r.eventId));
  const myEvents = mockEvents.filter(e => userRegisteredEventIds.has(e.id));
  const userAttendanceEventIds = new Set(attendance.filter(a => a.userId === user?.id).map(a => a.eventId));

  const handleCheckIn = (eventId: number) => {
    if (user && !userAttendanceEventIds.has(eventId)) {
      const newAttendance: Attendance = {
        id: attendance.length + 1,
        userId: user.id,
        eventId: eventId,
        checkInTime: new Date(),
      };
      setAttendance([...attendance, newAttendance]);

      // In a real app, you would update the user's profile in the DB.
      // Here we just show an alert.
      alert(`Checked in successfully! You've earned 10 points.`);
    }
  };

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-gray-800">My Registered Events</h1>
      {myEvents.length > 0 ? (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">Event Title</th>
                <th scope="col" className="px-6 py-3">Date</th>
                <th scope="col" className="px-6 py-3">Venue</th>
                <th scope="col" className="px-6 py-3">Attendance</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {myEvents.map(event => {
                const hasAttended = userAttendanceEventIds.has(event.id);
                return (
                  <tr key={event.id} className="bg-white border-b">
                    <td className="px-6 py-4 font-medium text-gray-900">{event.title}</td>
                    <td className="px-6 py-4">{event.dateTime.toLocaleDateString()}</td>
                    <td className="px-6 py-4">{event.venue}</td>
                    <td className="px-6 py-4">
                      {hasAttended ? (
                        <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">Attended</span>
                      ) : (
                        <span className="px-2 py-1 text-xs font-medium text-yellow-800 bg-yellow-100 rounded-full">Registered</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => handleCheckIn(event.id)}
                        disabled={hasAttended}
                        className="px-3 py-1 text-xs font-medium text-white rounded-md bg-campus-blue disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-campus-blue-dark"
                      >
                        {hasAttended ? 'Checked In' : 'Simulate Check-in'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="p-4 text-center text-gray-500 bg-white rounded-lg shadow">You haven't registered for any events yet. Visit the Volunteer Hub to get started!</p>
      )}
    </div>
  );
};

export default MyEventsPage;
