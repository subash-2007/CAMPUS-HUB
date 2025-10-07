
import React, { useState } from 'react';
import { Event } from '../../types';
import { events as mockEvents } from '../../services/mockData';
import { VENUES, DEPARTMENTS, CATEGORIES } from '../../constants';

const EventManagementPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [showModal, setShowModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Partial<Event> | null>(null);

  const handleOpenModal = (event: Partial<Event> | null = null) => {
    setCurrentEvent(event || { title: '', description: '', department: DEPARTMENTS[0], category: CATEGORIES[0], maxParticipants: 50, venue: VENUES[0].name, dateTime: new Date() });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentEvent(null);
  };

  const handleSaveEvent = () => {
    if (!currentEvent) return;
    
    if (currentEvent.id) {
      // Update event
      setEvents(events.map(e => e.id === currentEvent.id ? { ...e, ...currentEvent } as Event : e));
    } else {
      // Create new event
      const newEvent: Event = {
        ...currentEvent,
        id: Math.max(...events.map(e => e.id)) + 1,
        organizerId: 1, // Assuming admin is organizer
      } as Event;
      setEvents([...events, newEvent]);
    }
    handleCloseModal();
  };

  const handleDeleteEvent = (eventId: number) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter(e => e.id !== eventId));
    }
  };

  const EventModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-xl">
        <h2 className="mb-4 text-2xl font-bold">{currentEvent?.id ? 'Edit Event' : 'Create Event'}</h2>
        <div className="space-y-4">
            <input type="text" placeholder="Title" value={currentEvent?.title || ''} onChange={e => setCurrentEvent({...currentEvent, title: e.target.value})} className="w-full p-2 border rounded"/>
            <textarea placeholder="Description" value={currentEvent?.description || ''} onChange={e => setCurrentEvent({...currentEvent, description: e.target.value})} className="w-full p-2 border rounded"></textarea>
            <div className="grid grid-cols-2 gap-4">
                <input type="datetime-local" value={currentEvent?.dateTime ? new Date(currentEvent.dateTime.getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16) : ''} onChange={e => setCurrentEvent({...currentEvent, dateTime: new Date(e.target.value)})} className="w-full p-2 border rounded"/>
                <input type="number" placeholder="Max Participants" value={currentEvent?.maxParticipants || ''} onChange={e => setCurrentEvent({...currentEvent, maxParticipants: parseInt(e.target.value)})} className="w-full p-2 border rounded"/>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <select value={currentEvent?.department || ''} onChange={e => setCurrentEvent({...currentEvent, department: e.target.value})} className="w-full p-2 border rounded">{DEPARTMENTS.map(d=><option key={d}>{d}</option>)}</select>
                <select value={currentEvent?.category || ''} onChange={e => setCurrentEvent({...currentEvent, category: e.target.value})} className="w-full p-2 border rounded">{CATEGORIES.map(c=><option key={c}>{c}</option>)}</select>
            </div>
            <select value={currentEvent?.venue || ''} onChange={e => setCurrentEvent({...currentEvent, venue: e.target.value})} className="w-full p-2 border rounded">{VENUES.map(v=><option key={v.name}>{v.name}</option>)}</select>
        </div>
        <div className="flex justify-end mt-6 space-x-4">
            <button onClick={handleCloseModal} className="px-4 py-2 text-gray-700 bg-gray-200 rounded">Cancel</button>
            <button onClick={handleSaveEvent} className="px-4 py-2 text-white rounded bg-campus-blue">Save</button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Event Management</h1>
        <button onClick={() => handleOpenModal()} className="px-4 py-2 font-bold text-white rounded-lg bg-campus-blue hover:bg-campus-blue-dark">Create Event</button>
      </div>
      
      <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th className="px-6 py-3">Title</th>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Venue</th>
                    <th className="px-6 py-3">Max Participants</th>
                    <th className="px-6 py-3">Actions</th>
                </tr>
            </thead>
            <tbody>
                {events.map(event => (
                    <tr key={event.id} className="border-b">
                        <td className="px-6 py-4 font-medium text-gray-900">{event.title}</td>
                        <td className="px-6 py-4">{event.dateTime.toLocaleString()}</td>
                        <td className="px-6 py-4">{event.venue}</td>
                        <td className="px-6 py-4">{event.maxParticipants}</td>
                        <td className="px-6 py-4">
                            <button onClick={() => handleOpenModal(event)} className="mr-2 font-medium text-campus-blue hover:underline">Edit</button>
                            <button onClick={() => handleDeleteEvent(event.id)} className="font-medium text-red-600 hover:underline">Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
          </table>
      </div>

      {showModal && <EventModal />}
    </div>
  );
};

export default EventManagementPage;
