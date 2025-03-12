import React, { useState } from 'react';
import { FaUser, FaTasks, FaUsers, FaBook, FaMedal, FaClock, FaChevronDown, FaChevronUp, FaPlus } from 'react-icons/fa';

const FriendsContent = ({ userData }) => {
    const [expandedSection, setExpandedSection] = useState('friends');
    
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Friends & Colleagues</h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded flex items-center">
            <FaPlus className="mr-2" /> Add Friend
          </button>
        </div>
        
        {/* Current Friends Section */}
        <div className="mb-6">
          <div 
            className="flex justify-between items-center bg-gray-100 p-3 rounded cursor-pointer"
            onClick={() => setExpandedSection(expandedSection === 'friends' ? '' : 'friends')}
          >
            <h3 className="font-bold">Current Friends</h3>
            {expandedSection === 'friends' ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          
          {expandedSection === 'friends' && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userData.friends.map(friend => (
                <div key={friend.id} className="bg-white p-4 rounded-lg shadow flex items-center">
                  <div className="w-12 h-12 bg-green-300 rounded-full flex items-center justify-center mr-4">
                    <span className="text-xl">
                      {friend.avatarLevel === 'Seedling' ? '🌱' :
                       friend.avatarLevel === 'Sprout' ? '🌿' :
                       friend.avatarLevel === 'Sapling' ? '🌴' :
                       friend.avatarLevel === 'Tree' ? '🌲' :
                       '🌳'}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold">{friend.name}</h4>
                    <p className="text-sm text-gray-600">{friend.skill}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Suggested Collaborators Section */}
        <div>
          <div 
            className="flex justify-between items-center bg-gray-100 p-3 rounded cursor-pointer"
            onClick={() => setExpandedSection(expandedSection === 'suggested' ? '' : 'suggested')}
          >
            <h3 className="font-bold">Suggested Collaborators</h3>
            {expandedSection === 'suggested' ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          
          {expandedSection === 'suggested' && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { id: 4, name: "Jamie Wong", skill: "UI Design", avatarLevel: "Tree" },
                { id: 5, name: "Raj Patel", skill: "DevOps", avatarLevel: "Sapling" },
                { id: 6, name: "Emma Clark", skill: "Project Management", avatarLevel: "Sprout" }
              ].map(collaborator => (
                <div key={collaborator.id} className="bg-white p-4 rounded-lg shadow flex items-center">
                  <div className="w-12 h-12 bg-green-300 rounded-full flex items-center justify-center mr-4">
                    <span className="text-xl">
                      {collaborator.avatarLevel === 'Seedling' ? '🌱' :
                       collaborator.avatarLevel === 'Sprout' ? '🌿' :
                       collaborator.avatarLevel === 'Sapling' ? '🌴' :
                       collaborator.avatarLevel === 'Tree' ? '🌲' :
                       '🌳'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold">{collaborator.name}</h4>
                    <p className="text-sm text-gray-600">{collaborator.skill}</p>
                  </div>
                  <button className="bg-blue-500 text-white px-2 py-1 rounded text-sm">
                    Connect
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };


export default FriendsContent