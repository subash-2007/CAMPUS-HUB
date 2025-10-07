
import React from 'react';
import { Event } from '../types';

interface EventCardProps {
  event: Event;
  registeredCount: number;
  isRegistered: boolean;
  onRegister: (eventId: number) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, registeredCount, isRegistered, onRegister }) => {
  const seatsLeft = event.maxParticipants - registeredCount;
  const isFull = seatsLeft <= 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <img src={`https://picsum.photos/seed/${event.id}/400/200`} alt={event.title} className="w-full h-32 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold text-campus-blue-dark">{event.title}</h3>
        <p className="text-sm text-gray-600 mt-1">{event.department} - {event.category}</p>
        <div className="text-sm text-gray-800 mt-2">
            <p><strong>Date:</strong> {event.dateTime.toLocaleDateString()}</p>
            <p><strong>Time:</strong> {event.dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            <p><strong>Venue:</strong> {event.venue}</p>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div>
            <span className={`text-sm font-semibold ${isFull ? 'text-red-500' : 'text-green-600'}`}>
              {seatsLeft > 0 ? `${seatsLeft} seats left` : 'Event Full'}
            </span>
          </div>
          <button
            onClick={() => onRegister(event.id)}
            disabled={isRegistered || isFull}
            className={`px-4 py-2 text-sm font-medium text-white rounded-md ${isRegistered ? 'bg-gray-400 cursor-not-allowed' : isFull ? 'bg-red-400 cursor-not-allowed' : 'bg-campus-blue hover:bg-campus-blue-dark'}`}
          >
            {isRegistered ? 'Registered' : 'Register'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
