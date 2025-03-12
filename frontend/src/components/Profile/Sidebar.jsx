import React, { useState } from 'react';
import { FaUser, FaTasks, FaUsers, FaBook, FaMedal, FaClock, FaChevronDown, FaChevronUp, FaPlus } from 'react-icons/fa';
const Sidebar = ({ activeSidebarItem, setActiveSidebarItem, avatarLevel, avatarProgress }) => {
    const sidebarItems = [
      { id: 'summary', title: 'Summary', icon: <FaUser /> },
      { id: 'avatarLevels', title: 'Avatar Levels', icon: <FaUser /> },
      { id: 'tasks', title: 'Tasks Assigned', icon: <FaTasks /> },
      { id: 'friends', title: 'Friends & Colleagues', icon: <FaUsers /> },
      { id: 'courses', title: 'Courses', icon: <FaBook /> },
      { id: 'badges', title: 'Lesson Badges', icon: <FaMedal /> },
      { id: 'timeSpent', title: 'Time Spent Badges', icon: <FaClock /> },
    ];
  
    return (
      <div className="w-full md:w-64 bg-blue-500 text-white md:min-h-screen">
        {/* Avatar Display */}
        <div className="p-4 flex flex-col items-center">
          <div className="w-32 h-32 bg-green-400 rounded-full flex items-center justify-center relative">
            {/* This would be replaced with actual avatar image */}
            <div className="w-24 h-24 bg-green-300 rounded-full flex items-center justify-center">
              <span className="text-4xl">🌳</span>
            </div>
            <div className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-2">
              <span className="text-xs font-bold">{avatarProgress}/5</span>
            </div>
          </div>
          <h2 className="mt-2 text-xl font-bold">{avatarLevel}</h2>
        </div>
  
        {/* Sidebar Navigation */}
        <nav className="mt-4">
          <ul>
            {sidebarItems.map((item) => (
              <li key={item.id} className="mb-1">
                <button
                  onClick={() => setActiveSidebarItem(item.id)}
                  className={`w-full p-3 flex items-center ${
                    activeSidebarItem === item.id ? 'bg-blue-700' : 'hover:bg-blue-600'
                  } transition-colors duration-200`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    );
  };


export default Sidebar