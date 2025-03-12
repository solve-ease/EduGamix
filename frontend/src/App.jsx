import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import CoursesPage from './pages/CoursesPage'
import CoursePage from './pages/CoursePage'
import CourseInterview from './pages/CoursesInterview'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import { useAuth0 } from '@auth0/auth0-react'
import ProfileCreationModal from './components/ProfileCreation'
const { VITE_AUTH0_DOMAIN, VITE_AUTH0_CLIENT_ID, VITE_AUTH0_AUDIENCE } =
  import.meta.env
import JobListingPage from './pages/JobListingPage'
import JobDescription from './pages/jobDescriptionStatic'
import AvatarModel from './components/AvatarModel'
import DisplayModel from './pages/DisplayModel'
import ProfilePage from './pages/ProfilePage'

import InterviewSimulation from './pages/InterviewSimulation'

import LeaderboardPage from './pages/LeaderBoard'

function App() {
  const [userData, setUserData] = useState(null)
  const [profileModalOpen, setProfileModalOpen] = useState(false)
  const {
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    getAccessTokenSilently,
    user
  } = useAuth0()
  useEffect(() => {
    if (user) {
      console.log('initializing user')
      const email = user.email
      console.log('user', user)
      userInit(email)
    }
  }, [isAuthenticated, isLoading, user])
  useEffect(() => {
    const checkAuth = async () => {
      if (!isAuthenticated && !isLoading) {
        try {
          await getAccessTokenSilently({
            audience: VITE_AUTH0_AUDIENCE,
            scope: 'openid profile email'
          }) // Tries to silently authenticate
          console.log('got access token')
        } catch (error) {
          console.error('Silent authentication failed:', error)
        }
      }
    }
    checkAuth()
  }, [getAccessTokenSilently])

  const userInit = async (email) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/user/get-user?email=${email}`
      )
      if (response) {
        const data = await response.json()
        setUserData(data)
        setProfileModalOpen(false)
      } else {
        setProfileModalOpen(true)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='min-h-screen flex flex-col items-center '>
      <Navbar />
      <main className='flex-grow pt-20'>
        <ProfileCreationModal
          isOpen={profileModalOpen}
          setProfileModalOpen={setProfileModalOpen}
        />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route
            path='/dashboard'
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <div>Dashboard</div>
              </ProtectedRoute>
            }
          />
          <Route path='/courses' element={<CoursesPage />} />
          <Route path='/course-1' element={<CoursePage />} />
          <Route path='/job-listing' element={<JobListingPage />} />
          <Route path='/job-description' element={<JobDescription />} />
          <Route path='/course-1-interview' element={<CourseInterview />} />
          <Route path='/avatar' element = {<DisplayModel />} />
          <Route path='/profile' element = {<ProfilePage />} />
          <Route path='/interview-simulation' element = {<InterviewSimulation />} />

          <Route path='/leader' element={<LeaderboardPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
