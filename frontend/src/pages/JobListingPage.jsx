import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Star, Bookmark, MapPin, Clock, DollarSign } from 'lucide-react'

// Mock data service - replace with your actual API calls
import { fetchJobs } from '../services/jobService'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const JobListingPage = () => {
  const [jobs, setJobs] = useState([])
  const [filters, setFilters] = useState({
    skillLevel: 'all',
    category: 'all',
    pointsRange: [0, 1000]
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadJobs = async () => {
      try {
        setLoading(true)
        // This would be replaced with your actual API call with filters
        const jobData = await fetchJobs(filters)
        setJobs(jobData)
      } catch (error) {
        console.error('Failed to fetch jobs:', error)
      } finally {
        setLoading(false)
      }
    }

    loadJobs()
  }, [filters])

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value
    }))
  }

  const calculateBidSuccessRate = (job) => {
    // This would eventually use your ML model prediction
    // For now, using basic logic based on competition and experience requirements
    const competitionLevel = job.proposals ? job.proposals.length : 0
    const experienceMatch =
      job.requiredExperience === 'Beginner'
        ? 0.8
        : job.requiredExperience === 'Intermediate'
        ? 0.6
        : 0.4

    // Higher is better, scale from 0-100%
    return Math.min(
      100,
      Math.max(0, (90 - competitionLevel * 5) * experienceMatch)
    )
  }

  return (
    <>
      <div className='max-w-7xl mx-auto p-4 sm:p-6 lg:p-8'>
        <div className='bg-white shadow overflow-hidden sm:rounded-md'>
          <div className='px-4 py-5 border-b border-gray-200 sm:px-6'>
            <h1 className='text-2xl font-bold text-gray-900'>
              Available Quests
            </h1>
            <p className='mt-1 text-sm text-gray-500'>
              Find your next adventure and earn XP
            </p>

            {/* Filter Controls */}
            <div className='mt-4 flex flex-wrap gap-4'>
              <select
                className='rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
                value={filters.skillLevel}
                onChange={(e) =>
                  handleFilterChange('skillLevel', e.target.value)
                }
              >
                <option value='all'>All Levels</option>
                <option value='beginner'>Beginner</option>
                <option value='intermediate'>Intermediate</option>
                <option value='expert'>Expert</option>
              </select>

              <select
                className='rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value='all'>All Categories</option>
                <option value='python'>Python</option>
                <option value='ai'>Artificial Intelligence</option>
                <option value='ml'>Machine Learning</option>
                <option value='nlp'>Natural Language Processing</option>
                <option value='neural'>Neural Networks</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className='flex justify-center py-12'>
              <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500'></div>
            </div>
          ) : (
            <ul className='divide-y divide-gray-200'>
              {jobs.map((job) => {
                const successRate = calculateBidSuccessRate(job)

                return (
                  <li key={job.id}>
                    <Link
                      // to={`/jobs/${job.id}`}  // with backend functioning
                      to={`/job-description`}
                      className='block hover:bg-gray-50 transition duration-150'
                    >
                      <div className='px-4 py-4 sm:px-6'>
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center'>
                            <p className='text-lg font-medium text-indigo-600 truncate'>
                              {job.title}
                            </p>
                            <div className='ml-2 flex-shrink-0 flex'>
                              <p
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${
                                job.difficulty === 'Beginner'
                                  ? 'bg-green-100 text-green-800'
                                  : job.difficulty === 'Intermediate'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                              >
                                {job.difficulty}
                              </p>
                            </div>
                          </div>
                          <div className='flex items-center'>
                            <div className='flex items-center text-sm text-gray-500'>
                              <DollarSign className='flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400' />
                              <p>
                                ${job.paymentRange[0]}-{job.paymentRange[1]}
                              </p>
                            </div>
                            <div className='ml-4 flex items-center text-sm text-gray-500'>
                              <Star className='flex-shrink-0 mr-1.5 h-5 w-5 text-yellow-400' />
                              <p>{job.xpPoints} XP</p>
                            </div>
                          </div>
                        </div>

                        <div className='mt-2 flex justify-between'>
                          <div className='sm:flex'>
                            <div className='flex items-center text-sm text-gray-500'>
                              <Clock className='flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400' />
                              <p>{job.duration}</p>
                            </div>
                            <div className='mt-2 sm:mt-0 sm:ml-6 flex items-center text-sm text-gray-500'>
                              <MapPin className='flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400' />
                              <p>{job.location}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default JobListingPage
