
import React, { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { BADGE_LEVELS } from '../../constants';

const ProfilePage: React.FC = () => {
  const { user } = useContext(UserContext);
  const profile = user?.profile;

  if (!profile) {
    return <p>Loading profile...</p>;
  }

  const currentLevel = [...BADGE_LEVELS].reverse().find(level => profile.attendedEvents >= level.minEvents);
  const nextLevel = BADGE_LEVELS.find(level => level.level === (currentLevel?.level || 0) + 1);
  const progress = nextLevel ? ((profile.attendedEvents - (currentLevel?.minEvents || 0)) / (nextLevel.minEvents - (currentLevel?.minEvents || 0))) * 100 : 100;
  const volunteerHours = profile.attendedEvents * 2; // Assuming 2 hours per event

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-gray-800">My Profile</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Profile Details Card */}
        <div className="p-6 bg-white rounded-lg shadow-md md:col-span-1">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-24 h-24 mb-4 text-4xl text-white rounded-full bg-campus-blue-dark">
                {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
            </div>
            <h2 className="text-2xl font-bold">{profile.firstName} {profile.lastName}</h2>
            <p className="text-gray-600">{user?.email}</p>
            <p className="mt-2 text-sm text-gray-500">Roll No: {profile.rollNumber}</p>
            <p className="text-sm text-gray-500">Year: {profile.year}</p>
            <p className="text-sm text-gray-500">Contact: {profile.contactNumber}</p>
          </div>
        </div>

        {/* Stats & Badges Card */}
        <div className="space-y-6 md:col-span-2">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div className="p-4 text-center bg-white rounded-lg shadow">
                    <p className="text-3xl font-bold text-campus-yellow-dark">{profile.points}</p>
                    <p className="text-sm text-gray-600">Total Points</p>
                </div>
                 <div className="p-4 text-center bg-white rounded-lg shadow">
                    <p className="text-3xl font-bold text-campus-blue-dark">{profile.attendedEvents}</p>
                    <p className="text-sm text-gray-600">Events Attended</p>
                </div>
                 <div className="p-4 text-center bg-white rounded-lg shadow">
                    <p className="text-3xl font-bold text-campus-blue-dark">{volunteerHours}</p>
                    <p className="text-sm text-gray-600">Volunteer Hours</p>
                </div>
            </div>
          
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-semibold">Your Level</h3>
                <div className="flex items-center mt-4">
                    <span className="text-4xl">{currentLevel?.icon}</span>
                    <div className="ml-4">
                        <p className="text-lg font-bold">{currentLevel?.name}</p>
                        <p className="text-sm text-gray-500">Level {currentLevel?.level}</p>
                    </div>
                </div>
                {nextLevel && (
                    <div className="mt-4">
                        <div className="flex justify-between mb-1 text-sm">
                            <span>Progress to Level {nextLevel.level}</span>
                            <span>{profile.attendedEvents}/{nextLevel.minEvents} Events</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-campus-yellow h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                        </div>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
