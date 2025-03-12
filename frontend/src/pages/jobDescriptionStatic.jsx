import React from 'react'
import { Star, Bookmark, MapPin, Clock, DollarSign } from 'lucide-react'
import { Link } from 'react-router-dom'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const JobDescription = ({ job }) => {
  if (!job) {
    // Dummy data in case no job prop is passed
    job = {
      id: 1,
      title: 'AI Engineer',
      difficulty: 'Intermediate',
      paymentRange: [50, 100],
      xpPoints: 250,
      duration: '2 weeks',
      location: 'Remote',
      description:
        'Develop AI models for smart farming analytics. I am looking for an experienced AI Prompt Developer and Python Code Writer to review and refine SEO and HTML-related prompts I have written. The ideal candidate must be fluent in English, have a strong grasp of AI principles, and be able to write clean, efficient code.'
    }
  }

  return (
    <>
      <div className='max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg'>
        <div className='flex justify-between items-center border-b pb-4 mb-4'>
          <h1 className='text-2xl font-bold text-gray-900'>{job.title}</h1>
          <Bookmark className='w-6 h-6 text-gray-500 hover:text-gray-700 cursor-pointer' />
        </div>
        <p className='text-gray-700 mb-4'>{job.description}</p>
        <div className='flex flex-wrap gap-4 text-sm text-gray-600'>
          <div className='flex items-center'>
            <DollarSign className='w-5 h-5 mr-2 text-gray-400' />
            <p>
              ${job.paymentRange[0]} - ${job.paymentRange[1]}
            </p>
          </div>
          <div className='flex items-center'>
            <Star className='w-5 h-5 mr-2 text-yellow-400' />
            <p>{job.xpPoints} XP</p>
          </div>
          <div className='flex items-center'>
            <Clock className='w-5 h-5 mr-2 text-gray-400' />
            <p>{job.duration}</p>
          </div>
          <div className='flex items-center'>
            <MapPin className='w-5 h-5 mr-2 text-gray-400' />
            <p>{job.location}</p>
          </div>
        </div>
        <Link
          to='/apply'
          className='mt-6 inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700'
        >
          Apply Now
        </Link>
      </div>

      <Footer />
    </>
  )
}

export default JobDescription
