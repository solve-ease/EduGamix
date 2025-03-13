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

// write the import statements for the components
import Sidebar from '../components/Profile/Sidebar'
import HeaderStats from '../components/Profile/HeaderStats'
import SummaryContent from '../components/Profile/SummaryContent'
import AvatarLevelsContent from '../components/Profile/AvatarLevels'
import TasksContent from '../components/Profile/TasksContent'
import FriendsContent from '../components/Profile/FriendsContent'
import CoursesContent from '../components/Profile/CoursesContent'
import BadgesContent from '../components/Profile/BadgesContent'
import TimeSpentContent from '../components/Profile/TimeSpentContent'

// Main Profile Page Component
const ProfilePage = () => {
  // User data state (would typically come from an API)
  const [userData, setUserData] = useState({
    name: 'Alex Johnson',
    avatarLevel: 'Old Growth',
    avatarProgress: 5, // Out of 5
    stats: {
      avgSpeed: 53,
      avgAccuracy: 97,
      typingTime: '17:52',
      dailyGoal: '00:00',
      dailyGoalTarget: '15:00'
    },
    achievements: {
      total: 107,
      totalPossible: 249,
      avatarLevels: { earned: 45, total: 45 },
      typingSpeed: { earned: 6, total: 13 },
      accuracyStars: { earned: 4, total: 22 },
      typingTests: { earned: 17, total: 21 },
      timeSpent: { earned: 11, total: 11 },
      charactersTyped: { earned: 15, total: 15 }
    },
    tasks: [
      {
        id: 1,
        title: 'Complete JavaScript Basics',
        deadline: 'March 15',
        type: 'course'
      },
      {
        id: 2,
        title: 'Frontend Mockup for Client',
        deadline: 'March 18',
        type: 'freelance'
      },
      { id: 3, title: 'Team Code Review', deadline: 'March 20', type: 'job' }
    ],
    friends: [
      { id: 1, name: 'Sarah Chen', skill: 'UX Design', avatarLevel: 'Tree' },
      {
        id: 2,
        name: 'Marcus Lee',
        skill: 'Backend Dev',
        avatarLevel: 'Sapling'
      },
      {
        id: 3,
        name: 'Priya Sharma',
        skill: 'Data Science',
        avatarLevel: 'Old Growth'
      }
    ],
    courses: [
      {
        id: 1,
        title: 'Advanced React Patterns',
        progress: 65,
        totalLessons: 12,
        completedLessons: 8
      },
      {
        id: 2,
        title: 'Data Structures & Algorithms',
        progress: 30,
        totalLessons: 20,
        completedLessons: 6
      },
      {
        id: 3,
        title: 'UI/UX Fundamentals',
        progress: 90,
        totalLessons: 10,
        completedLessons: 9
      }
    ]
  })

  // State for active sidebar item
  const [activeSidebarItem, setActiveSidebarItem] = useState('summary')

  return (
    <div className='flex flex-col md:flex-row min-h-screen bg-gray-100'>
      {/* Sidebar */}
      <Sidebar
        activeSidebarItem={activeSidebarItem}
        setActiveSidebarItem={setActiveSidebarItem}
        avatarLevel={userData.avatarLevel}
        avatarProgress={userData.avatarProgress}
      />

      {/* Main Content */}
      <div className='flex-1 p-4'>
        {/* Header Stats */}
        <HeaderStats
          stats={userData.stats}
          avatarLevel={userData.avatarLevel}
          avatarProgress={userData.avatarProgress}
        />

        {/* Main Content Area */}
        <div className='bg-white rounded-lg shadow-md mt-4 overflow-hidden'>
          {/* Content based on active sidebar item */}
          {activeSidebarItem === 'summary' && (
            <SummaryContent userData={userData} />
          )}
          {activeSidebarItem === 'avatarLevels' && (
            <AvatarLevelsContent userData={userData} />
          )}
          {activeSidebarItem === 'tasks' && (
            <TasksContent userData={userData} />
          )}
          {activeSidebarItem === 'friends' && (
            <FriendsContent userData={userData} />
          )}
          {activeSidebarItem === 'courses' && (
            <CoursesContent userData={userData} />
          )}
          {activeSidebarItem === 'badges' && (
            <BadgesContent userData={userData} />
          )}
          {activeSidebarItem === 'timeSpent' && (
            <TimeSpentContent userData={userData} />
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
