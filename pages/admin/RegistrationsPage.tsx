
import React, { useState, useMemo } from 'react';
import { registrations as mockRegistrations, events as mockEvents, users as mockUsers } from '../../services/mockData';

const RegistrationsPage: React.FC = () => {
  const [selectedEventId, setSelectedEventId] = useState<number | null>(mockEvents.length > 0 ? mockEvents[0].id : null);

  const registrationsForEvent = useMemo(() => {
    if (!selectedEventId) return [];
    return mockRegistrations
      .filter(r => r.eventId === selectedEventId)
      .map(reg => {
        const user = mockUsers.find(u => u.id === reg.userId);
        return {
          ...reg,
          userEmail: user?.email,
          userName: `${user?.profile?.firstName} ${user?.profile?.lastName}`,
        };
      });
  }, [selectedEventId]);
  
  const handleExportCSV = () => {
    if (!selectedEventId) return;

    const event = mockEvents.find(e => e.id === selectedEventId);
    const headers = ["Registration ID", "User ID", "User Name", "User Email", "Registration Date"];
    const rows = registrationsForEvent.map(reg => [
      reg.id,
      reg.userId,
      reg.userName,
      reg.userEmail,
      reg.registrationDate.toISOString()
    ].join(','));

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${event?.title.replace(/\s+/g, '_')}_registrations.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-gray-800">View Registrations</h1>
      <div className="flex items-center justify-between p-4 mb-6 bg-white rounded-lg shadow-sm">
        <div>
          <label htmlFor="event-select" className="mr-2 text-sm font-medium">Select Event:</label>
          <select 
            id="event-select"
            className="p-2 border-gray-300 rounded-md shadow-sm"
            value={selectedEventId ?? ''}
            onChange={(e) => setSelectedEventId(Number(e.target.value))}
          >
            {mockEvents.map(event => (
              <option key={event.id} value={event.id}>{event.title}</option>
            ))}
          </select>
        </div>
        <button 
          onClick={handleExportCSV}
          disabled={!selectedEventId || registrationsForEvent.length === 0}
          className="px-4 py-2 font-bold text-white rounded-lg bg-campus-blue hover:bg-campus-blue-dark disabled:bg-gray-400"
        >
          Export CSV
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th className="px-6 py-3">Student Name</th>
                    <th className="px-6 py-3">Email</th>
                    <th className="px-6 py-3">Registration Date</th>
                </tr>
            </thead>
            <tbody>
                {registrationsForEvent.length > 0 ? registrationsForEvent.map(reg => (
                    <tr key={reg.id} className="border-b">
                        <td className="px-6 py-4 font-medium text-gray-900">{reg.userName}</td>
                        <td className="px-6 py-4">{reg.userEmail}</td>
                        <td className="px-6 py-4">{reg.registrationDate.toLocaleDateString()}</td>
                    </tr>
                )) : (
                    <tr>
                        <td colSpan={3} className="px-6 py-4 text-center">No registrations for this event yet.</td>
                    </tr>
                )}
            </tbody>
          </table>
      </div>
    </div>
  );
};

export default RegistrationsPage;
