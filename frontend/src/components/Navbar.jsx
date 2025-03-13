import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu,
  X,
  BookOpen,
  Award,
  BookOpen as BookIcon,
  Medal
} from 'lucide-react'
import { useAuth0 } from '@auth0/auth0-react'

const Navbar = ({ points = 2450 }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Different navigation links based on authentication status
  const publicNavLinks = [
    { href: '#features', label: 'Features', delay: 0.1 },
    { href: '#how-it-works', label: 'How It Works', delay: 0.2 },
    { href: '#testimonials', label: 'Testimonials', delay: 0.3 },
    { href: '#pricing', label: 'Pricing', delay: 0.4 }
  ]

  const authenticatedNavLinks = [
    { href: '/courses', label: 'My Courses', delay: 0.1 },
    { href: '/profile', label: 'Dashboard', delay: 0.2 },
    { href: '/leader', label: 'Leaderboard', delay: 0.3 },
    { href: '/challenges', label: 'Challenges', delay: 0.4 }
  ]

  const navLinks = isAuthenticated ? authenticatedNavLinks : publicNavLinks

  return (
    <nav
      className={`fixed w-[80vw] mt-5 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className='mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center'>
          <motion.div
            className='flex items-center'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className='flex items-center'>
              <div className='w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center mr-2'>
                <BookOpen className='w-6 h-6 text-white' />
              </div>
              <span className='text-2xl font-bold text-indigo-900'>
                EduGami
              </span>
            </div>
          </motion.div>

          {/* Desktop menu */}
          <div className='hidden md:flex items-center space-x-8'>
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                delay={link.delay}
              />
            ))}

            {isAuthenticated && (
              <>
                {/* Points display */}
                <motion.div
                  className='flex items-center bg-indigo-50 px-3 py-1 rounded-full'
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Medal className='w-4 h-4 text-indigo-600 mr-1' />
                  <span className='text-indigo-700 font-medium'>
                    {points} XP
                  </span>
                </motion.div>
              </>
            )}

            {isAuthenticated ? (
              <div className='flex items-center space-x-4'>
                <div className='flex items-center space-x-2'>
                  {/* Profile Icon */}
                  <motion.div
                    className='relative group'
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <div className='rounded-full bg-indigo-700 h-10 w-10 flex items-center justify-center cursor-pointer'>
                      <span className='text-white font-bold'>
                        {user?.name?.slice(0, 1).toUpperCase() || 'U'}
                      </span>
                    </div>
                  </motion.div>

                  {/* Logout Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className='bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium shadow-md hover:bg-indigo-700 transition-colors'
                    onClick={() => {
                      logout({
                        logoutParams: {
                          returnTo: import.meta.env.VITE_REDIRECT_URL,
                          clientId: import.meta.env.VITE_AUTH0_CLIENT_ID
                        }
                      })
                    }}
                  >
                    Logout
                  </motion.button>
                </div>
              </div>
            ) : (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className='bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium shadow-md hover:bg-indigo-700 transition-colors'
                  onClick={() => {
                    loginWithRedirect({
                      appState: { returnTo: '/dashboard' }
                    })
                  }}
                >
                  SignIn
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className='bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium shadow-md hover:bg-indigo-700 transition-colors'
                  onClick={() => {
                    loginWithRedirect({
                      appState: { returnTo: '/dashboard' }
                    })
                  }}
                >
                  Register
                </motion.button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className='md:hidden'>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className='text-gray-600 hover:text-indigo-900 focus:outline-none'
            >
              {isOpen ? (
                <X className='w-6 h-6' />
              ) : (
                <Menu className='w-6 h-6' />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className='md:hidden bg-white'
          >
            <div className='px-4 py-2 space-y-1'>
              {navLinks.map((link) => (
                <MobileNavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  onClick={() => setIsOpen(false)}
                />
              ))}

              {isAuthenticated && (
                <>
                  <div className='flex items-center py-2'>
                    <Medal className='w-4 h-4 text-indigo-600 mr-2' />
                    <span className='text-indigo-700 font-medium'>
                      {points} XP
                    </span>
                  </div>

                  <div className='pt-2'>
                    <button
                      className='w-full bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:bg-indigo-700 transition-colors'
                      onClick={() => {
                        logout({
                          logoutParams: {
                            returnTo: import.meta.env.VITE_REDIRECT_URL,
                            clientId: import.meta.env.VITE_AUTH0_CLIENT_ID
                          }
                        })
                        setIsOpen(false)
                      }}
                    >
                      Logout
                    </button>
                  </div>
                </>
              )}

              {!isAuthenticated && (
                <>
                  <div className='pt-2'>
                    <button
                      className='w-full bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:bg-indigo-700 transition-colors mb-2'
                      onClick={() => {
                        loginWithRedirect({
                          appState: { returnTo: '/dashboard' }
                        })
                        setIsOpen(false)
                      }}
                    >
                      SignIn
                    </button>
                    <button
                      className='w-full bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:bg-indigo-700 transition-colors'
                      onClick={() => {
                        loginWithRedirect({
                          appState: { returnTo: '/dashboard' }
                        })
                        setIsOpen(false)
                      }}
                    >
                      Register
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

const NavLink = ({ href, label, delay }) => (
  <motion.a
    href={href}
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className='text-gray-700 hover:text-indigo-900 font-medium'
  >
    {label}
  </motion.a>
)

const MobileNavLink = ({ href, label, onClick }) => (
  <a
    href={href}
    onClick={onClick}
    className='block py-2 text-gray-700 hover:text-indigo-900 font-medium'
  >
    {label}
  </a>
)

export default Navbar
