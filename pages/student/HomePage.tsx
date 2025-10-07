
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Event, StudentProfile } from '../../types';
import { events as mockEvents } from '../../services/mockData';
import { getEventRecommendations } from '../../services/geminiService';

const HomePage: React.FC = () => {
  const { user } = useContext(UserContext);
  const [recommendations, setRecommendations] = useState<string>('');
  const [loadingRecs, setLoadingRecs] = useState<boolean>(true);

  const upcomingEvents = mockEvents
    .filter(event => event.dateTime > new Date())
    .sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime())
    .slice(0, 3);
  
  useEffect(() => {
    const fetchRecommendations = async () => {
      if (user && user.profile) {
        setLoadingRecs(true);
        const recs = await getEventRecommendations(user.profile as StudentProfile, mockEvents);
        setRecommendations(recs);
        setLoadingRecs(false);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetchRecommendations();
  }, [user]);

  return (
    <div>
      <div className="p-8 mb-6 text-white rounded-lg bg-campus-blue-dark" style={{backgroundImage: "url('https://picsum.photos/seed/campus/1200/200')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="bg-black bg-opacity-50 p-6 rounded-lg">
            <h1 className="text-4xl font-bold">Welcome back, {user?.profile?.firstName || 'Student'}!</h1>
            <p className="mt-2 text-lg">Ready to make an impact? Here's what's happening on campus.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">Upcoming Events</h2>
          <div className="space-y-4">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map(event => (
                <div key={event.id} className="flex items-center p-4 bg-white rounded-lg shadow">
                  <div className="p-3 mr-4 text-white rounded-full bg-campus-yellow">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{event.title}</p>
                    <p className="text-sm text-gray-500">{event.dateTime.toLocaleDateString()} at {event.venue}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No upcoming events right now. Check back soon!</p>
            )}
          </div>
        </div>
        
        <div className="p-6 rounded-lg shadow bg-campus-blue-light">
            <h2 className="mb-4 text-2xl font-bold text-white">For You</h2>
            <div className="p-4 bg-white rounded-lg">
                {loadingRecs ? (
                    <div className="flex items-center justify-center h-24">
                        <div className="w-8 h-8 border-4 border-t-4 rounded-full border-campus-blue-light border-t-campus-blue animate-spin"></div>
                        <p className="ml-4 text-gray-600">Generating recommendations...</p>
                    </div>
                ) : (
                    <p className="text-gray-700">{recommendations}</p>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
