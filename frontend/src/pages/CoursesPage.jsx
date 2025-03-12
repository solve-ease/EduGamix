import React from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Tag } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

// Sample courses data; you can replace this with dynamic data as needed.
const coursesData = [
  {
    id: 1,
    title: 'Introduction to Python',
    description:
      'Learn Python basics with interactive coding challenges and real-world examples.',
    tags: ['Programming', 'Python', 'Beginner']
  },
  {
    id: 2,
    title: 'Web Development Bootcamp',
    description:
      'Master HTML, CSS, and JavaScript to build responsive, modern websites.',
    tags: ['Web', 'HTML', 'CSS', 'JavaScript']
  },
  {
    id: 3,
    title: 'Data Science Fundamentals',
    description:
      'Explore data analysis, visualization, and machine learning with hands-on projects.',
    tags: ['Data Science', 'Machine Learning', 'Python']
  }
]

const CoursesPage = () => {
  return (
    <div className='min-h-screen bg-gradient-to-b from-indigo-50 to-white'>
      <section className='py-16 px-4 md:px-8 max-w-7xl mx-auto'>
        <motion.h2
          className='text-3xl md:text-4xl font-bold text-indigo-900 mb-8 text-center'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Explore Our Courses
        </motion.h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {coursesData.map((course, index) => (
            <motion.div
              key={course.id}
              className='bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className='flex items-center mb-4'>
                <BookOpen className='w-8 h-8 text-indigo-600 mr-3' />
                <h3 className='text-2xl font-semibold text-indigo-900'>
                  {course.title}
                </h3>
              </div>
              <p className='text-gray-600 mb-4'>{course.description}</p>
              <div className='flex flex-wrap gap-2'>
                {course.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className='inline-flex items-center bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded'
                  >
                    <Tag className='w-4 h-4 mr-1' /> {tag}
                  </span>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='mt-4 bg-indigo-600 text-white py-2 px-4 rounded-lg'
                onClick={() => (window.location.href = `/course-${course.id}`)}
              >
                View Course
              </motion.button>
            </motion.div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default CoursesPage
