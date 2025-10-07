
import React, { useState, useContext } from 'react';
import { Event, Registration } from '../../types';
import { events as mockEvents, registrations as mockRegistrations } from '../../services/mockData';
import EventCard from '../../components/EventCard';
import { UserContext } from '../../contexts/UserContext';
import { DEPARTMENTS, CATEGORIES, VENUES } from '../../constants';

const VolunteerHubPage: React.FC = () => {
  const { user } = useContext(UserContext);
  const [allEvents, setAllEvents] = useState<Event[]>(mockEvents);
  const [registrations, setRegistrations] = useState<Registration[]>(mockRegistrations);

  const [departmentFilter, setDepartmentFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [venueFilter, setVenueFilter] = useState<string>('All');

  const handleRegister = (eventId: number) => {
    if (user) {
      const newRegistration: Registration = {
        id: registrations.length + 1,
        userId: user.id,
        eventId,
        registrationDate: new Date(),
      };
      setRegistrations([...registrations, newRegistration]);
      alert('Successfully registered!');
    }
  };

  const filteredEvents = allEvents.filter(event => {
    return (departmentFilter === 'All' || event.department === departmentFilter) &&
           (categoryFilter === 'All' || event.category === categoryFilter) &&
           (venueFilter === 'All' || event.venue === venueFilter);
  });

  const userRegisteredEventIds = new Set(registrations.filter(r => r.userId === user?.id).map(r => r.eventId));
  const registrationCounts = registrations.reduce((acc, reg) => {
    acc[reg.eventId] = (acc[reg.eventId] || 0) + 1;
    return acc;
  }, {} as { [key: number]: number });

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Volunteer Hub</h1>
      
      <div className="p-4 mb-6 bg-white rounded-lg shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
            <select id="department" className="block w-full mt-1 border-gray-300 rounded-md shadow-sm" onChange={e => setDepartmentFilter(e.target.value)}>
              <option>All</option>
              {DEPARTMENTS.map(dep => <option key={dep}>{dep}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
            <select id="category" className="block w-full mt-1 border-gray-300 rounded-md shadow-sm" onChange={e => setCategoryFilter(e.target.value)}>
              <option>All</option>
              {CATEGORIES.map(cat => <option key={cat}>{cat}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="venue" className="block text-sm font-medium text-gray-700">Venue</label>
            <select id="venue" className="block w-full mt-1 border-gray-300 rounded-md shadow-sm" onChange={e => setVenueFilter(e.target.value)}>
              <option>All</option>
              {VENUES.map(venue => <option key={venue.name}>{venue.name}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredEvents.map(event => (
          <EventCard
            key={event.id}
            event={event}
            registeredCount={registrationCounts[event.id] || 0}
            isRegistered={userRegisteredEventIds.has(event.id)}
            onRegister={handleRegister}
          />
        ))}
      </div>
    </div>
  );
};

export default VolunteerHubPage;
