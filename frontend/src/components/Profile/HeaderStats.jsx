import React, { useState } from 'react';
import { FaUser, FaTasks, FaUsers, FaBook, FaMedal, FaClock, FaChevronDown, FaChevronUp, FaPlus } from 'react-icons/fa';

const HeaderStats = ({ stats, avatarLevel, avatarProgress }) => {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center mr-4">
            <span>🌳</span>
          </div>
          <div>
            <div className="font-bold text-lg">{avatarLevel} ({avatarProgress}/5)</div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(avatarProgress / 5) * 100}%` }}></div>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-6">
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-yellow-400 rounded-full mx-auto">
              <span role="img" aria-label="lightning">⚡</span>
            </div>
            <div className="mt-1">Avg. Speed</div>
            <div className="font-bold text-lg">{stats.avgSpeed} <span className="text-sm">WPM</span></div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-red-400 rounded-full mx-auto">
              <span role="img" aria-label="target">🎯</span>
            </div>
            <div className="mt-1">Avg. Acc.</div>
            <div className="font-bold text-lg">{stats.avgAccuracy}<span className="text-sm">%</span></div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-green-400 rounded-full mx-auto">
              <span role="img" aria-label="clock">⏱️</span>
            </div>
            <div className="mt-1">Typing Time</div>
            <div className="font-bold text-lg">{stats.typingTime}</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-white border-4 border-orange-400 rounded-full mx-auto relative">
              <div className="font-bold text-lg">
                {stats.dailyGoal}
                <div className="text-xs text-gray-500">/{stats.dailyGoalTarget}</div>
              </div>
            </div>
            <div className="mt-1">Daily Goal</div>
          </div>
        </div>
      </div>
    );
  };

export default HeaderStats