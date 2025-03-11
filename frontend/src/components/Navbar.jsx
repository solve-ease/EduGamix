import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, BookOpen } from 'lucide-react'
import { useAuth0 } from '@auth0/auth0-react'

const Navbar = () => {
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

  return (
    <nav
      className={`fixed z-50 transition-all duration-300 ${
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
            <NavLink href='#features' label='Features' delay={0.1} />
            <NavLink href='#how-it-works' label='How It Works' delay={0.2} />
            <NavLink href='#testimonials' label='Testimonials' delay={0.3} />
            <NavLink href='#pricing' label='Pricing' delay={0.4} />

            {isAuthenticated ? (
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
              <MobileNavLink
                href='#features'
                label='Features'
                onClick={() => setIsOpen(false)}
              />
              <MobileNavLink
                href='#how-it-works'
                label='How It Works'
                onClick={() => setIsOpen(false)}
              />
              <MobileNavLink
                href='#testimonials'
                label='Testimonials'
                onClick={() => setIsOpen(false)}
              />
              <MobileNavLink
                href='#pricing'
                label='Pricing'
                onClick={() => setIsOpen(false)}
              />
              <div className='pt-2'>
                <button className='w-full bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:bg-indigo-700 transition-colors'>
                  Get Started
                </button>
              </div>
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
