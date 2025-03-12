import React, { useState } from 'react';
import { FaUser, FaTasks, FaUsers, FaBook, FaMedal, FaClock, FaChevronDown, FaChevronUp, FaPlus } from 'react-icons/fa';

const BadgesContent = ({ userData }) => {
    // Placeholder for lesson badges
    const lessonBadges = [
      { id: 1, name: "HTML Master", icon: "🔰", description: "Completed all HTML modules", earned: true },
      { id: 2, name: "CSS Wizard", icon: "🔮", description: "Styled 10 projects with CSS", earned: true },
      { id: 3, name: "JavaScript Ninja", icon: "⚔️", description: "Solved 20 JS challenges", earned: true },
      { id: 4, name: "React Guru", icon: "⚛️", description: "Built 5 React applications", earned: false },
      { id: 5, name: "Backend Pioneer", icon: "🚀", description: "Created a complete API", earned: false },
      { id: 6, name: "Database Expert", icon: "💾", description: "Mastered SQL queries", earned: true }
    ];
  
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Lesson Badges</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {lessonBadges.map(badge => (
            <div 
              key={badge.id} 
              className={`p-4 rounded-lg shadow text-center ${
                badge.earned ? 'bg-white' : 'bg-gray-100 opacity-60'
              }`}
            >
              <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 bg-blue-100 rounded-full">
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
        
        <div className="mt-8 bg-blue-50 p-4 rounded-lg">
          <h3 className="font-bold text-lg mb-2">Badge Progression</h3>
          <p className="mb-4">Your progress towards earning all available badges:</p>
          <div className="flex items-center mb-4">
            <div className="w-full bg-gray-200 rounded-full h-2 mr-4">
              <div 
                className="bg-blue-500 h-2 rounded-full" 
                style={{ width: `${(lessonBadges.filter(b => b.earned).length / lessonBadges.length) * 100}%` }}
              ></div>
            </div>
            <span className="text-sm font-bold">{lessonBadges.filter(b => b.earned).length}/{lessonBadges.length}</span>
          </div>
          <p className="text-sm text-gray-600">Complete more lessons to earn additional badges!</p>
        </div>
      </div>
    );
  };

export default BadgesContent