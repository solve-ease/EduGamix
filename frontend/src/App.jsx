import { useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'



function App() {


  return (
    
      <BrowserRouter>
        <div className="min-h-screen">
          <main className='flex-grow'>
            <Routes>
              <Route path='/' element={<HomePage />} />
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