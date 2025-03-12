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


function App() {
  const {
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    getAccessTokenSilently,
    user
  } = useAuth0()

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

  return (
    <div className='min-h-screen'>
      <main className='flex-grow'>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route
            path='/dashboard'
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ProfileCreationModal isOpen={true} />
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

        </Routes>
      </main>
    </div>
  )
}

export default App
