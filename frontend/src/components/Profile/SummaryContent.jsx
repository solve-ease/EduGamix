import React, { useState } from 'react'
import {
  FaUser,
  FaTasks,
  FaUsers,
  FaBook,
  FaMedal,
  FaClock,
  FaChevronDown,
  FaChevronUp,
  FaPlus
} from 'react-icons/fa'

const SummaryContent = ({ userData }) => {
  return (
    <div className='p-6'>
      <h2 className='text-2xl font-bold mb-6'>Recent Achievements</h2>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {userData.recentAchievements.map((achievement, index) => (
            <div key={index} className="flex items-center justify-center">
              <div className={`w-32 h-32 rounded-full flex items-center justify-center ${
                achievement.type === 'speed' ? 'bg-yellow-400' : 'bg-blue-400'
              }`}>
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="font-bold text-xl">{achievement.title.split(" ")[0]}</div>
                    <div className="text-sm">{achievement.title.split(" ")[1]}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div> */}

      <h2 className='text-2xl font-bold mb-6'>Summary</h2>

      <div className='mb-6'>
        <div className='flex justify-between mb-2'>
          <h3 className='font-bold'>Achievements Earned</h3>
          <span>
            {userData.achievements.total} /{' '}
            {userData.achievements.totalPossible} Earned
          </span>
        </div>
        <div className='w-full bg-gray-200 rounded-full h-2'>
          <div
            className='bg-blue-500 h-2 rounded-full'
            style={{
              width: `${
                (userData.achievements.total /
                  userData.achievements.totalPossible) *
                100
              }%`
            }}
          ></div>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {Object.entries(userData.achievements).map(([key, value]) => {
          // Skip the total fields
          if (key === 'total' || key === 'totalPossible') return null

          // Convert camelCase to Title Case
          const title = key
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, (str) => str.toUpperCase())

          return (
            <div key={key} className='mb-4'>
              <div
                className={`flex justify-between mb-2 p-2 rounded ${
                  key === 'avatarLevels'
                    ? 'bg-green-500 text-white'
                    : key === 'typingSpeed'
                    ? 'bg-blue-500 text-white'
                    : key === 'accuracyStars'
                    ? 'bg-blue-400 text-white'
                    : key === 'typingTests'
                    ? 'bg-blue-500 text-white'
                    : key === 'timeSpent'
                    ? 'bg-green-500 text-white'
                    : 'bg-green-500 text-white'
                }`}
              >
                <h3 className='font-bold'>{title}</h3>
                <span>
                  {value.earned} / {value.total} Earned
                </span>
              </div>
              <div className='w-full bg-gray-200 rounded-full h-2'>
                <div
                  className='bg-blue-500 h-2 rounded-full'
                  style={{ width: `${(value.earned / value.total) * 100}%` }}
                ></div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SummaryContent
