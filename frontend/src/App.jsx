import { useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import CoursesPage from './pages/CoursesPage'
import CoursePage from './pages/CoursePage'
import CourseInterview from './pages/CourseInterview'

function App() {


  return (
    
      <BrowserRouter>
        <div className="min-h-screen">
          <main className='flex-grow'>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/courses' element={<CoursesPage />} />
              <Route path='/course-1' element={<CoursePage />} />
              <Route path='/course-1-interview' element={<CourseInterview />} />
              {/* <Route path='/geotags' element={<TaggingPage />} />
              <Route path='/solutions' element={<SolutionsPage />} />
              <Route path='/about' element={<AboutUsPage />} />
              <Route path='/contact' element={<ContactUsPage />} />
              <Route path='/dashboard' element={<DashboardPage />} />
              <Route path='/marketplace' element={<MarketHome />} /> */}
              
            </Routes>
          </main>
        </div>
      </BrowserRouter>

  )
}

export default App