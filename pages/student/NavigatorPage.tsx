
import React, { useState } from 'react';
import { VENUES } from '../../constants';
import { getNavigationDirections } from '../../services/geminiService';

const NavigatorPage: React.FC = () => {
  const [startVenue, setStartVenue] = useState<string>(VENUES[0].name);
  const [endVenue, setEndVenue] = useState<string>(VENUES[1].name);
  const [directions, setDirections] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGetDirections = async () => {
    if (startVenue === endVenue) {
      setDirections("Start and destination venues cannot be the same.");
      return;
    }
    setIsLoading(true);
    const result = await getNavigationDirections(startVenue, endVenue);
    setDirections(result);
    setIsLoading(false);
  };

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Campus Navigator</h1>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="p-6 bg-white rounded-lg shadow-md lg:col-span-1">
          <h2 className="mb-4 text-xl font-semibold">Plan Your Route</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="start" className="block text-sm font-medium text-gray-700">Start Location</label>
              <select id="start" value={startVenue} onChange={e => setStartVenue(e.target.value)} className="block w-full mt-1 border-gray-300 rounded-md shadow-sm">
                {VENUES.map(v => <option key={v.name} value={v.name}>{v.name}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="end" className="block text-sm font-medium text-gray-700">Destination</label>
              <select id="end" value={endVenue} onChange={e => setEndVenue(e.target.value)} className="block w-full mt-1 border-gray-300 rounded-md shadow-sm">
                {VENUES.map(v => <option key={v.name} value={v.name}>{v.name}</option>)}
              </select>
            </div>
            <button
              onClick={handleGetDirections}
              disabled={isLoading}
              className="flex items-center justify-center w-full px-4 py-2 font-medium text-white rounded-md bg-campus-blue hover:bg-campus-blue-dark disabled:bg-gray-400"
            >
              {isLoading && <div className="w-5 h-5 mr-2 border-2 border-t-2 rounded-full border-white border-t-transparent animate-spin"></div>}
              {isLoading ? 'Generating...' : 'Get Directions'}
            </button>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md lg:col-span-2">
           <h2 className="mb-4 text-xl font-semibold">Your Route</h2>
           {directions ? (
             <div className="p-4 space-y-3 prose-sm text-gray-700 bg-gray-50 rounded-lg">
                {directions.split('\n').map((line, index) => <p key={index}>{line}</p>)}
             </div>
           ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
                <p>Select your start and destination to see route details here.</p>
            </div>
           )}
        </div>
      </div>
       <div className="mt-6 p-4 text-sm text-center text-gray-600 bg-yellow-100 border border-yellow-300 rounded-lg">
        <strong>Note:</strong> This is a simulation using Gemini for directions. For a real campus map, please use an official map provider.
      </div>
    </div>
  );
};

export default NavigatorPage;
