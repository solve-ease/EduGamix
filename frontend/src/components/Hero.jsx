import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const Hero = () => {
  return (
    <div className='relative min-h-screen flex items-center overflow-hidden'>
      {/* Background elements */}
      <div className='absolute inset-0 z-0'>
        <div className='absolute top-20 right-10 w-64 h-64 bg-indigo-300 rounded-full filter blur-3xl opacity-20'></div>
        <div className='absolute bottom-20 left-10 w-72 h-72 bg-blue-300 rounded-full filter blur-3xl opacity-20'></div>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-300 rounded-full filter blur-3xl opacity-10'></div>

        {/* Grid pattern */}
        <div
          className='absolute inset-0 bg-grid-indigo-100 opacity-[0.15]'
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a5b4fc' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
      </div>

      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
          <motion.div
            className='flex flex-col justify-center'
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-indigo-900 mb-6 leading-tight'>
              Learn, Play, <span className='text-indigo-600'>Succeed</span>
            </h1>
            <p className='text-xl text-gray-600 mb-8 max-w-lg'>
              EduGami transforms education through AI-powered gamification and
              real-world career simulations, making learning both effective and
              enjoyable.
            </p>

            <div className='flex flex-col sm:flex-row gap-4 mb-8'>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium shadow-lg hover:bg-indigo-700 transition-colors flex items-center justify-center'
                onClick={() => (window.location.href = `/courses`)}
              >
                Get Started Free
                <ArrowRight className='ml-2 w-5 h-5' />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='bg-white text-indigo-600 border border-indigo-200 px-8 py-3 rounded-lg font-medium shadow-md hover:bg-indigo-50 transition-colors'
              >
                Watch Demo
              </motion.button>
            </div>

            <div className='flex items-center text-gray-500 text-sm gap-4'>
              <div className='flex -space-x-2'>
                <div className='w-8 h-8 rounded-full bg-indigo-200 flex items-center justify-center text-xs text-indigo-800 font-medium border-2 border-white'>
                  A
                </div>
                <div className='w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center text-xs text-blue-800 font-medium border-2 border-white'>
                  B
                </div>
                <div className='w-8 h-8 rounded-full bg-green-200 flex items-center justify-center text-xs text-green-800 font-medium border-2 border-white'>
                  C
                </div>
                <div className='w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center text-xs text-purple-800 font-medium border-2 border-white'>
                  D
                </div>
              </div>
              <span>Join 50,000+ students already learning</span>
            </div>
          </motion.div>

          <motion.div
            className='flex items-center justify-center lg:justify-end'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className='relative'>
              <div className='w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100'>
                <div className='h-10 bg-gray-100 flex items-center px-4'>
                  <div className='w-3 h-3 rounded-full bg-red-400 mr-2'></div>
                  <div className='w-3 h-3 rounded-full bg-yellow-400 mr-2'></div>
                  <div className='w-3 h-3 rounded-full bg-green-400'></div>
                </div>
                <div className='p-5'>
                  <div className='flex items-center justify-between mb-4'>
                    <div>
                      <h3 className='font-bold text-gray-800'>
                        Welcome, Anmol Beta!
                      </h3>
                      <p className='text-sm text-gray-500'>
                        Level 7 Data Scientist
                      </p>
                    </div>
                    <div className='flex items-center bg-indigo-100 px-3 py-1 rounded-full'>
                      <span className='w-4 h-4 bg-indigo-500 rounded-full mr-2'></span>
                      <span className='text-sm font-medium text-indigo-800'>
                        2,450 XP
                      </span>
                    </div>
                  </div>

                  <div className='space-y-4'>
                    <motion.div
                      className='bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-4 border border-indigo-100'
                      whileHover={{ y: -5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <div className='flex justify-between items-center mb-2'>
                        <h4 className='font-semibold text-indigo-900'>
                          Data Visualization Challenge
                        </h4>
                        <span className='text-xs bg-purple-200 text-purple-800 px-2 py-1 rounded-full'>
                          +200 XP
                        </span>
                      </div>
                      <p className='text-sm text-gray-600 mb-3'>
                        Create interactive dashboards with real-world datasets
                      </p>
                      <div className='flex justify-between items-center text-xs text-gray-500'>
                        <span>Difficulty: Medium</span>
                        <span>3/5 completed</span>
                      </div>
                    </motion.div>

                    <motion.div
                      className='bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-100'
                      whileHover={{ y: -5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <div className='flex justify-between items-center mb-2'>
                        <h4 className='font-semibold text-blue-900'>
                          AI Ethics Simulation
                        </h4>
                        <span className='text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full'>
                          Career Skill
                        </span>
                      </div>
                      <p className='text-sm text-gray-600 mb-3'>
                        Navigate ethical dilemmas in a virtual tech company
                      </p>
                      <div className='w-full bg-gray-200 h-2 rounded-full overflow-hidden'>
                        <div
                          className='bg-blue-500 h-full rounded-full'
                          style={{ width: '45%' }}
                        ></div>
                      </div>
                    </motion.div>

                    <motion.div
                      className='bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-100'
                      whileHover={{ y: -5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <div className='flex justify-between items-center mb-2'>
                        <h4 className='font-semibold text-green-900'>
                          Token Marketplace
                        </h4>
                        <span className='text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full'>
                          Economy
                        </span>
                      </div>
                      <div className='flex justify-between items-center'>
                        <div className='flex items-center'>
                          <div className='w-8 h-8 bg-green-200 rounded-full flex items-center justify-center mr-2'>
                            <svg
                              width='16'
                              height='16'
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='currentColor'
                              className='text-green-800'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                              />
                            </svg>
                          </div>
                          <span className='font-medium text-green-800'>
                            1,250 Tokens
                          </span>
                        </div>
                        <button className='text-sm text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded'>
                          Shop Now
                        </button>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className='absolute -top-4 -right-4 w-20 h-20 bg-indigo-400 rounded-full opacity-20'></div>
              <div className='absolute -bottom-4 -left-4 w-24 h-24 bg-blue-400 rounded-full opacity-20'></div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Hero
