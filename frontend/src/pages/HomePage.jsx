import React from 'react'
import { motion } from 'framer-motion'
import {
  ChevronDown,
  BookOpen,
  Trophy,
  Calendar,
  Users,
  Brain,
  Award,
  Code,
  DollarSign,
  BarChart
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import FeatureSection from '../components/FeatureSection'
import StatCard from '../components/StatCard'
import TestimonialSection from '../components/TestimonialSection'
import CallToAction from '../components/CallToAction'
import Footer from '../components/Footer'

const HomePage = () => {
  return (
    <div className='min-h-screen bg-gradient-to-b from-indigo-50 to-white flex flex-col'>
      <Hero />

      {/* Main Features */}
      <section className='py-16 px-4 md:px-8 max-w-7xl mx-auto'>
        <div className='text-center mb-16'>
          <motion.h2
            className='text-3xl md:text-4xl font-bold text-indigo-900 mb-4'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Reinventing Education Through Play
          </motion.h2>
          <motion.p
            className='text-lg text-gray-600 max-w-3xl mx-auto'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            EduGami combines gamification, AI personalization, and real-world
            simulations to create an engaging learning environment that prepares
            students for their future careers.
          </motion.p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <FeatureSection
            icon={<Brain className='w-12 h-12 text-indigo-600' />}
            title='AI Personalization'
            description='Our platform uses reinforcement learning to dynamically adjust challenge levels based on individual student performance and learning patterns.'
            delay={0}
          />
          <FeatureSection
            icon={<Trophy className='w-12 h-12 text-indigo-600' />}
            title='Gamified Learning'
            description='Transform education into an exciting adventure with achievements, levels, and rewards that make learning addictive and fun.'
            delay={0.2}
          />
          <FeatureSection
            icon={<Users className='w-12 h-12 text-indigo-600' />}
            title='Career Simulations'
            description='Practice real-world scenarios with our AI avatar-based interview simulations that prepare you for your future career.'
            delay={0.4}
          />
        </div>

        <motion.div
          className='flex justify-center mt-12'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <a
            href='#learn-more'
            className='flex flex-col items-center text-indigo-600 hover:text-indigo-800 transition-colors'
          >
            <span className='mb-1'>Discover more</span>
            <ChevronDown className='animate-bounce' />
          </a>
        </motion.div>
      </section>

      {/* How It Works */}
      <section id='learn-more' className='py-16 px-4 md:px-8 bg-indigo-100'>
        <div className='max-w-7xl mx-auto'>
          <motion.h2
            className='text-3xl md:text-4xl font-bold text-center text-indigo-900 mb-16'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            How EduGami Works
          </motion.h2>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-16 items-center'>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className='relative'
            >
              <div className='bg-white rounded-2xl shadow-xl overflow-hidden'>
                <div className='h-8 bg-gray-200 flex items-center px-4'>
                  <div className='w-3 h-3 rounded-full bg-red-500 mr-2'></div>
                  <div className='w-3 h-3 rounded-full bg-yellow-500 mr-2'></div>
                  <div className='w-3 h-3 rounded-full bg-green-500'></div>
                </div>
                <div className='p-6'>
                  <div className='bg-indigo-50 rounded-lg p-4 mb-4'>
                    <div className='flex items-center mb-3'>
                      <div className='w-10 h-10 rounded-full bg-indigo-200 flex items-center justify-center'>
                        <BookOpen className='w-5 h-5 text-indigo-700' />
                      </div>
                      <div className='ml-3'>
                        <h4 className='font-semibold text-indigo-800'>
                          Python Challenge
                        </h4>
                        <p className='text-xs text-indigo-600'>
                          Level 3 • 120 XP
                        </p>
                      </div>
                    </div>
                    <div className='h-2 bg-gray-200 rounded-full'>
                      <div className='h-2 bg-indigo-600 rounded-full w-2/3'></div>
                    </div>
                  </div>

                  <div className='bg-green-50 rounded-lg p-4 mb-4'>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center'>
                        <div className='w-10 h-10 rounded-full bg-green-200 flex items-center justify-center'>
                          <Award className='w-5 h-5 text-green-700' />
                        </div>
                        <div className='ml-3'>
                          <h4 className='font-semibold text-green-800'>
                            Achievement Unlocked!
                          </h4>
                          <p className='text-xs text-green-600'>
                            Code Master • +200 Tokens
                          </p>
                        </div>
                      </div>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.2, 1] }}
                        transition={{
                          duration: 0.5,
                          repeat: Infinity,
                          repeatDelay: 5
                        }}
                        className='w-12 h-12 bg-green-700 rounded-full flex items-center justify-center'
                      >
                        <Trophy className='w-6 h-6 text-white' />
                      </motion.div>
                    </div>
                  </div>

                  <div className='bg-blue-50 rounded-lg p-4'>
                    <div className='flex items-center mb-3'>
                      <div className='w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center'>
                        <Users className='w-5 h-5 text-blue-700' />
                      </div>
                      <div className='ml-3'>
                        <h4 className='font-semibold text-blue-800'>
                          Interview Simulation
                        </h4>
                        <p className='text-xs text-blue-600'>
                          Junior Developer • 30 minutes
                        </p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className='bg-blue-600 text-white py-2 px-4 rounded-lg w-full text-sm font-medium'
                    >
                      Start Simulation
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className='absolute -bottom-6 -right-6 w-24 h-24 bg-indigo-300 rounded-full opacity-20 z-0'></div>
              <div className='absolute -top-4 -left-4 w-16 h-16 bg-indigo-500 rounded-full opacity-10 z-0'></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className='text-2xl font-bold text-indigo-900 mb-6'>
                A Complete Learning Ecosystem
              </h3>

              <div className='space-y-6'>
                <div className='flex items-start'>
                  <div className='mt-1 bg-indigo-100 p-2 rounded-full mr-4'>
                    <Brain className='w-5 h-5 text-indigo-700' />
                  </div>
                  <div>
                    <h4 className='font-semibold text-indigo-800 mb-1'>
                      Reinforcement Learning
                    </h4>
                    <p className='text-gray-600'>
                      Our AI adapts challenge levels in real-time based on your
                      performance, keeping you in the optimal learning zone.
                    </p>
                  </div>
                </div>

                <div className='flex items-start'>
                  <div className='mt-1 bg-indigo-100 p-2 rounded-full mr-4'>
                    <DollarSign className='w-5 h-5 text-indigo-700' />
                  </div>
                  <div>
                    <h4 className='font-semibold text-indigo-800 mb-1'>
                      Token Economy
                    </h4>
                    <p className='text-gray-600'>
                      Earn tokens by completing challenges and spend them in our
                      virtual marketplace on courses, resources, and more.
                    </p>
                  </div>
                </div>

                <div className='flex items-start'>
                  <div className='mt-1 bg-indigo-100 p-2 rounded-full mr-4'>
                    <Code className='w-5 h-5 text-indigo-700' />
                  </div>
                  <div>
                    <h4 className='font-semibold text-indigo-800 mb-1'>
                      Virtual Career Simulations
                    </h4>
                    <p className='text-gray-600'>
                      Practice interviews and workplace scenarios with AI
                      avatars that provide constructive feedback to improve your
                      skills.
                    </p>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='mt-8 bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium shadow-md hover:bg-indigo-700 transition-colors'
              >
                Start your learning journey
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className='py-16 px-4 md:px-8 bg-white'>
        <div className='max-w-7xl mx-auto'>
          <motion.h2
            className='text-3xl md:text-4xl font-bold text-center text-indigo-900 mb-4'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Proven Results
          </motion.h2>
          <motion.p
            className='text-center text-gray-600 max-w-3xl mx-auto mb-16'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Our platform has helped thousands of students improve their skills
            and find their dream jobs.
          </motion.p>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
            <StatCard
              icon={<Users className='w-8 h-8 text-indigo-600' />}
              value='50,000+'
              label='Active Students'
              delay={0}
            />
            <StatCard
              icon={<BookOpen className='w-8 h-8 text-indigo-600' />}
              value='1,200+'
              label='Learning Modules'
              delay={0.1}
            />
            <StatCard
              icon={<Award className='w-8 h-8 text-indigo-600' />}
              value='89%'
              label='Job Placement Rate'
              delay={0.2}
            />
            <StatCard
              icon={<BarChart className='w-8 h-8 text-indigo-600' />}
              value='43%'
              label='Skill Improvement'
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSection />

      {/* Call to Action */}
      <CallToAction />

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default HomePage
