import React, { useState } from 'react';
import { FaUser, FaTasks, FaUsers, FaBook, FaMedal, FaClock, FaChevronDown, FaChevronUp, FaPlus } from 'react-icons/fa';

const AvatarLevelsContent = ({ userData }) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Avatar Levels</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {['Seedling', 'Sprout', 'Sapling', 'Tree', 'Old Growth'].map((level, index) => {
          const isCurrentLevel = userData.avatarLevel === level;
          const isUnlocked = index < ['Seedling', 'Sprout', 'Sapling', 'Tree', 'Old Growth'].indexOf(userData.avatarLevel) + 1;
          
          return (
            <div 
              key={level} 
              className={`p-4 rounded-lg ${
                isCurrentLevel ? 'bg-green-100 border-2 border-green-500' : 
                isUnlocked ? 'bg-white' : 'bg-gray-100'
              } text-center`}
            >
              <div className="w-24 h-24 mx-auto bg-green-300 rounded-full flex items-center justify-center mb-4">
                <span className="text-4xl">{
                  level === 'Seedling' ? '🌱' :
                  level === 'Sprout' ? '🌿' :
                  level === 'Sapling' ? '🌴' :
                  level === 'Tree' ? '🌲' :
                  '🌳'
                }</span>
              </div>
              <h3 className="font-bold text-lg mb-2">{level}</h3>
              <p className="text-sm text-gray-600">
                {isUnlocked ? 'Unlocked' : 'Locked'} - Level {index + 1}
              </p>
              {isCurrentLevel && (
                <div className="mt-2 bg-green-500 text-white text-sm py-1 px-2 rounded">
                  Current Level
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="mt-8 bg-blue-50 p-4 rounded-lg">
        <h3 className="font-bold text-lg mb-2">How to Level Up</h3>
        <p className="mb-4">Complete activities and earn points to level up your avatar:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Complete course lessons: +10 points</li>
          <li>Finish assignments: +20 points</li>
          <li>Participate in group activities: +15 points</li>
          <li>Complete freelance tasks: +25 points</li>
          <li>Help colleagues: +10 points</li>
        </ul>
      </div>
    </div>
  );
};

export default AvatarLevelsContent