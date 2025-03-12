import React from 'react'

const LeaderboardPage = () => {
  // Sample data for leaderboard
  const leaderboardData = [
    {
      id: 1,
      username: 'DataNinja',
      xp: 9450,
      badges: ['AI Master', 'Quiz Champion', 'Fast Learner']
    },
    {
      id: 2,
      username: 'CodeWizard',
      xp: 8720,
      badges: ['Coder', 'Mentor', 'Problem Solver']
    },
    {
      id: 3,
      username: 'LearningQueen',
      xp: 8150,
      badges: ['Consistent', 'Team Player', 'Creative']
    },
    {
      id: 4,
      username: 'PythonDev',
      xp: 7640,
      badges: ['Data Science', '100 Days Streak']
    },
    { id: 5, username: 'TechGuru', xp: 7120, badges: ['AI Ethics', 'Mentor'] },
    { id: 6, username: 'DataScientist23', xp: 6890, badges: ['Quiz Champion'] },
    {
      id: 7,
      username: 'WebMaster',
      xp: 6740,
      badges: ['Frontend Pro', 'Design Star']
    },
    {
      id: 8,
      username: 'AlgoAce',
      xp: 6320,
      badges: ['Problem Solver', 'Fast Learner']
    },
    { id: 9, username: 'MLenthusiast', xp: 5980, badges: ['AI Master'] },
    { id: 10, username: 'CodeArtisan', xp: 5830, badges: ['Clean Coder'] },
    { id: 11, username: 'DevLearner', xp: 5720, badges: ['Consistent'] },
    { id: 12, username: 'AIresearcher', xp: 5650, badges: ['Research Pro'] },
    {
      id: 13,
      username: 'CloudExpert',
      xp: 5430,
      badges: ['AWS Pro', 'Azure Expert']
    },
    {
      id: 14,
      username: 'DataVisualizer',
      xp: 5280,
      badges: ['Dashboard King']
    },
    { id: 15, username: 'CyberNinja', xp: 5150, badges: ['Security Expert'] }
  ]

  // Medal icons
  const MedalIcon = ({ rank }) => {
    if (rank === 1) {
      return (
        <svg
          className='w-8 h-8 text-yellow-500'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            d='M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z'
            clipRule='evenodd'
          />
        </svg>
      )
    } else if (rank === 2) {
      return (
        <svg
          className='w-8 h-8 text-gray-400'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            d='M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z'
            clipRule='evenodd'
          />
        </svg>
      )
    } else if (rank === 3) {
      return (
        <svg
          className='w-8 h-8 text-yellow-700'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            d='M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z'
            clipRule='evenodd'
          />
        </svg>
      )
    }
    return null
  }

  // Badge component
  const Badge = ({ text }) => (
    <span className='inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full mr-1 mb-1'>
      {text}
    </span>
  )

  return (
    <div className='min-h-screen pb-12 mt-20'>
      {/* Main content */}
      <main className='container mx-auto px-4 mt-8'>
        <div className='max-w-5xl mx-auto'>
          {/* Title and subtitle */}
          <div className='text-center mb-12'>
            <h1 className='text-4xl font-bold text-indigo-900 mb-2'>
              Leaderboard
            </h1>
            <p className='text-gray-600'>
              See how you rank among the top learners on EduGami
            </p>
          </div>

          {/* Top 3 winners section */}
          <div className='flex flex-col md:flex-row justify-center gap-6 mb-12'>
            {/* Second place */}
            <div className='order-2 md:order-1 transform md:translate-y-4'>
              <div className='bg-white rounded-xl shadow-lg overflow-hidden border-t-4 border-gray-400'>
                <div className='bg-gray-100 py-3 px-4 text-center'>
                  <span className='inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-400 text-white text-lg font-bold mb-1'>
                    2
                  </span>
                  <h3 className='font-bold text-lg text-gray-800'>
                    {leaderboardData[1].username}
                  </h3>
                </div>
                <div className='p-4 text-center'>
                  <p className='text-2xl font-bold text-indigo-600 mb-2'>
                    {leaderboardData[1].xp.toLocaleString()} XP
                  </p>
                  <div className='flex flex-wrap justify-center'>
                    {leaderboardData[1].badges.map((badge, index) => (
                      <Badge key={index} text={badge} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* First place */}
            <div className='order-1 md:order-2 -mt-2'>
              <div className='bg-white rounded-xl shadow-lg overflow-hidden border-t-4 border-yellow-500 transform scale-110'>
                <div className='bg-gradient-to-b from-yellow-100 to-white py-4 px-4 text-center'>
                  <div className='inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-500 text-white text-xl font-bold mb-1'>
                    1
                  </div>
                  <h3 className='font-bold text-xl text-gray-800'>
                    {leaderboardData[0].username}
                  </h3>
                </div>
                <div className='p-6 text-center'>
                  <p className='text-3xl font-bold text-indigo-600 mb-3'>
                    {leaderboardData[0].xp.toLocaleString()} XP
                  </p>
                  <div className='flex flex-wrap justify-center'>
                    {leaderboardData[0].badges.map((badge, index) => (
                      <Badge key={index} text={badge} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Third place */}
            <div className='order-3 transform md:translate-y-8'>
              <div className='bg-white rounded-xl shadow-lg overflow-hidden border-t-4 border-yellow-700'>
                <div className='bg-yellow-50 py-3 px-4 text-center'>
                  <span className='inline-flex items-center justify-center w-10 h-10 rounded-full bg-yellow-700 text-white text-lg font-bold mb-1'>
                    3
                  </span>
                  <h3 className='font-bold text-lg text-gray-800'>
                    {leaderboardData[2].username}
                  </h3>
                </div>
                <div className='p-4 text-center'>
                  <p className='text-2xl font-bold text-indigo-600 mb-2'>
                    {leaderboardData[2].xp.toLocaleString()} XP
                  </p>
                  <div className='flex flex-wrap justify-center'>
                    {leaderboardData[2].badges.map((badge, index) => (
                      <Badge key={index} text={badge} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Leaderboard table */}
          <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
            <div className='bg-indigo-600 py-4 px-6'>
              <h2 className='text-xl font-bold text-white'>Top 15 Learners</h2>
            </div>
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead>
                  <tr className='bg-indigo-50'>
                    <th className='px-6 py-3 text-left text-sm font-medium text-indigo-800'>
                      Rank
                    </th>
                    <th className='px-6 py-3 text-left text-sm font-medium text-indigo-800'>
                      Username
                    </th>
                    <th className='px-6 py-3 text-left text-sm font-medium text-indigo-800'>
                      XP
                    </th>
                    <th className='px-6 py-3 text-left text-sm font-medium text-indigo-800'>
                      Badges
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200'>
                  {leaderboardData.slice(3).map((user, index) => (
                    <tr key={user.id} className='hover:bg-gray-50'>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <span className='inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-800 font-bold text-sm'>
                          {index + 4}
                        </span>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='font-medium text-gray-900'>
                          {user.username}
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='text-indigo-600 font-bold'>
                          {user.xp.toLocaleString()} XP
                        </div>
                      </td>
                      <td className='px-6 py-4'>
                        <div className='flex flex-wrap'>
                          {user.badges.map((badge, badgeIndex) => (
                            <Badge key={badgeIndex} text={badge} />
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Your current rank */}
          <div className='mt-8 bg-indigo-50 rounded-xl p-6 shadow-sm border border-indigo-100'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <span className='inline-flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 text-white font-bold mr-4'>
                  24
                </span>
                <div>
                  <h3 className='font-bold text-lg text-gray-800'>
                    Your Current Rank
                  </h3>
                  <p className='text-gray-600'>
                    Keep learning to climb the leaderboard!
                  </p>
                </div>
              </div>
              <div className='text-right'>
                <p className='text-2xl font-bold text-indigo-600'>2,450 XP</p>
                <p className='text-sm text-gray-500'>2,170 XP to next rank</p>
              </div>
            </div>
            <div className='mt-4'>
              <div className='w-full bg-indigo-200 rounded-full h-2'>
                <div
                  className='bg-indigo-600 rounded-full h-2'
                  style={{ width: '53%' }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default LeaderboardPage
