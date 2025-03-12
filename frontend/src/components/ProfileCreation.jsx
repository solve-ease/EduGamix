import React, { useEffect, useState } from 'react'
import { createUser } from '../api'
import { useAuth0 } from '@auth0/auth0-react'
import { s } from 'framer-motion/client'

const ProfileCreationModal = ({ isOpen, onClose, setProfileModalOpen }) => {
  const { user } = useAuth0()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    highestEducation: '',
    address: '',
    phoneNumber: '',
    userType: '',
    email: user ? user.email : ''
  })
  const [errors, setErrors] = useState({})

  const totalSteps = 4

  useEffect(() => {
    console.log(user, 'user')
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    }
  }

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      try {
        const req = await createUser(formData)
        console.log(req)
        console.log('Form submitted:', formData)
        setProfileModalOpen(false)
      } catch (e) {
        console.log(e)
      }
    }
  }
  const validateForm = () => {
    const newErrors = {}
    if (!formData.name) newErrors.name = 'Name is required'
    if (!formData.age) newErrors.age = 'Age is required'
    if (!formData.gender) newErrors.gender = 'Gender is required'
    if (!formData.highestEducation)
      newErrors.highestEducation = 'Highest education is required'
    if (!formData.address) newErrors.address = 'Address is required'
    if (!formData.email) newErrors.address = 'Email is required'
    if (!formData.phoneNumber)
      newErrors.phoneNumber = 'Phone number is required'
    if (!formData.userType) newErrors.userType = 'User type is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  // If modal is not open, don't render anything
  if (!isOpen) return null

  return (
    <div className='fixed inset-0  bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-xl shadow-lg w-full max-w-md relative'>
        {/* Close button */}
        <button
          onClick={() => setProfileModalOpen(false)}
          className='absolute top-4 right-4 text-gray-500 hover:text-gray-700'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>

        {/* Header */}
        <div className='bg-indigo-600 rounded-t-xl p-6'>
          <h2 className='text-2xl font-bold text-white'>Create Your Profile</h2>
          <p className='text-indigo-100 mt-1'>
            Step {step} of {totalSteps}
          </p>

          {/* Progress bar */}
          <div className='w-full bg-indigo-300 rounded-full h-2 mt-4'>
            <div
              className='bg-white rounded-full h-2 transition-all duration-300'
              style={{ width: `${(step / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form content */}
        <div className='p-6'>
          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Information */}
            {step === 1 && (
              <div className='space-y-4'>
                <div>
                  <label
                    htmlFor='name'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Full Name
                  </label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none'
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor='age'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Age
                  </label>
                  <input
                    type='number'
                    id='age'
                    name='age'
                    value={formData.age}
                    onChange={handleChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none'
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor='gender'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Gender
                  </label>
                  <select
                    id='gender'
                    name='gender'
                    value={formData.gender}
                    onChange={handleChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none'
                    required
                  >
                    <option value=''>Select gender</option>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                    <option value='other'>Other</option>
                    <option value='prefer-not-to-say'>Prefer not to say</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 2: Education */}
            {step === 2 && (
              <div className='space-y-4'>
                <div>
                  <label
                    htmlFor='highestEducation'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Highest Education
                  </label>
                  <select
                    id='highestEducation'
                    name='highestEducation'
                    value={formData.highestEducation}
                    onChange={handleChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none'
                    required
                  >
                    <option value=''>Select education level</option>
                    <option value='10th'>10th Grade</option>
                    <option value='12th'>12th Grade</option>
                    <option value='undergrad'>Undergraduate</option>
                    <option value='postgrad'>Postgraduate</option>
                    <option value='phd'>PhD</option>
                    <option value='other'>Other</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor='address'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Address
                  </label>
                  <textarea
                    id='address'
                    name='address'
                    value={formData.address}
                    onChange={handleChange}
                    rows='3'
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none'
                    required
                  ></textarea>
                </div>
              </div>
            )}

            {/* Step 3: Contact */}
            {step === 3 && (
              <div className='space-y-4'>
                <div>
                  <label
                    htmlFor='phoneNumber'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Phone Number
                  </label>
                  <input
                    type='tel'
                    id='phoneNumber'
                    name='phoneNumber'
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none'
                    required
                  />
                </div>
              </div>
            )}

            {/* Step 4: User Type */}
            {step === 4 && (
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Select User Type
                  </label>
                  <div className='grid grid-cols-2 gap-4'>
                    <div
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        formData.userType === 'student'
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-300 hover:border-indigo-300'
                      }`}
                      onClick={() =>
                        setFormData({ ...formData, userType: 'student' })
                      }
                    >
                      <div className='flex flex-col items-center'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-10 w-10 text-indigo-600 mb-2'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
                          />
                        </svg>
                        <span className='font-medium'>Student</span>
                      </div>
                    </div>
                    <div
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        formData.userType === 'teacher'
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-300 hover:border-indigo-300'
                      }`}
                      onClick={() =>
                        setFormData({ ...formData, userType: 'teacher' })
                      }
                    >
                      <div className='flex flex-col items-center'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-10 w-10 text-indigo-600 mb-2'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z'
                          />
                        </svg>
                        <span className='font-medium'>Teacher</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className='flex justify-between mt-8'>
              {step > 1 ? (
                <button
                  type='button'
                  onClick={handlePrevious}
                  className='px-4 py-2 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors'
                >
                  Previous
                </button>
              ) : (
                <div></div> // Empty div for spacing
              )}

              {step < totalSteps ? (
                <button
                  type='button'
                  onClick={handleNext}
                  className='px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors'
                >
                  Next
                </button>
              ) : (
                <button
                  type='submit'
                  className='px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors'
                >
                  Complete
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default ProfileCreationModal
