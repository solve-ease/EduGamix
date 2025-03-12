import React, { useState } from 'react';
import { FaUser, FaTasks, FaUsers, FaBook, FaMedal, FaClock, FaChevronDown, FaChevronUp, FaPlus } from 'react-icons/fa';

const TimeSpentContent = ({ userData }) => {
  // Placeholder for time spent badges
  const timeSpentBadges = [
    { id: 1, name: "20 Minute Focus", icon: "⏱️", description: "Completed a 20-minute study session", earned: true },
    { id: 2, name: "40 Minute Scholar", icon: "⏲️", description: "Completed a 40-minute study session", earned: true },
    { id: 3, name: "60 Minute Achiever", icon: "🕐", description: "Completed a 60-minute study session", earned: true },
    { id: 4, name: "80 Minute Master", icon: "🕑", description: "Completed an 80-minute study session", earned: false },
    { id: 5, name: "3 Day Streak", icon: "🔥", description: "Studied for 3 days in a row", earned: true },
    { id: 6, name: "7 Day Streak", icon: "🔥🔥", description: "Studied for 7 days in a row", earned: false },
    { id: 7, name: "30 Day Streak", icon: "🔥🔥🔥", description: "Studied for 30 days in a row", earned: false },
    { id: 8, name: "Night Owl", icon: "🦉", description: "Studied after 10 PM", earned: true }
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Time Spent Badges</h2>
      
      <div className="mb-6 bg-blue-50 p-4 rounded-lg">
        <h3 className="font-bold text-lg mb-2">Your Study Stats</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-3 rounded-lg shadow">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-500">17:52</div>
              <div className="text-sm text-gray-600">Total Study Time</div>
            </div>
          </div>
          <div className="bg-white p-3 rounded-lg shadow">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-500">5</div>
              <div className="text-sm text-gray-600">Current Streak (days)</div>
            </div>
          </div>
          <div className="bg-white p-3 rounded-lg shadow">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-500">43</div>
              <div className="text-sm text-gray-600">Sessions Completed</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {timeSpentBadges.map(badge => (
          <div 
            key={badge.id} 
            className={`p-4 rounded-lg shadow text-center ${
              badge.earned ? 'bg-white' : 'bg-gray-100 opacity-60'
            }`}
          >
            <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 bg-purple-100 rounded-full">
              <span className="text-3xl">{badge.icon}</span>
            </div>
            <h3 className="font-bold text-lg mb-2">{badge.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{badge.description}</p>
            {badge.earned ? (
              <div className="inline-block bg-green-500 text-white px-3 py-1 rounded text-sm">
                Earned
              </div>
            ) : (
              <div className="inline-block bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm">
                Not Earned
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-8">
        <h3 className="font-bold text-lg mb-4">Time Tracking History</h3>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 28 }).map((_, index) => {
              // Generate random study time for demonstration
              const studyTime = Math.random() > 0.3 ? Math.floor(Math.random() * 120) : 0;
              const intensity = studyTime > 0 ? Math.min(studyTime / 120, 1) : 0;
              
              return (
                <div key={index} className="flex flex-col items-center">
                  <div 
                    className={`w-8 h-8 rounded-sm mb-1 ${
                      studyTime === 0 ? 'bg-gray-200' : `bg-green-${Math.max(Math.floor(intensity * 5) * 100, 100)}`
                    }`}
                    style={{ 
                      opacity: studyTime === 0 ? 0.5 : 0.3 + (intensity * 0.7),
                      backgroundColor: studyTime === 0 ? '#edf2f7' : `rgba(72, 187, 120, ${intensity})`
                    }}
                  ></div>
                  <span className="text-xs text-gray-500">
                    {new Date(Date.now() - (27 - index) * 24 * 60 * 60 * 1000).getDate()}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSpentContent