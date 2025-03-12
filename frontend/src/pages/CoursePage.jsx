import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, CheckCircle, Video, User } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ReactPlayer from 'react-player/youtube'

const CoursePage = () => {
  // States to manage the video progress, phase of the course, and interview session.
  const [phase, setPhase] = useState(1)
  const [videoProgress, setVideoProgress] = useState(0)
  const [interviewStarted, setInterviewStarted] = useState(false)
  const [playedSeconds, setPlayedSeconds] = useState(0)
  // Simulate video watching. Each click increases progress by 30%.
  const handleWatchVideo = () => {
    let progress = videoProgress + 30
    if (progress > 100) progress = 100
    setVideoProgress(progress)
  }

  // When video is fully watched, allow unlocking the next phase.
  const handleNextPhase = () => {
    if (videoProgress === 100) {
      setPhase(phase + 1)
      setVideoProgress(0) // reset progress for next phase if applicable
    }
  }

  // Start the virtual interview session.
  const startInterview = () => {
    setInterviewStarted(true)
    // Integrate your RAG chatbot and Gemini API backend here.
  }

  //log video events
  const logEvent = (eventType, videoTime) => {
    const eventData = {
      eventType, // 'play', 'pause', 'seek'
      videoTime, // current time in video
      timestamp: Date.now() // real-world time
    }
    console.log(eventData, 'eventData')
  }
  return (
    <div className='min-h-screen bg-gradient-to-b from-indigo-50 to-white'>
      <section className='py-16 px-4 md:px-8 max-w-7xl mx-auto'>
        <motion.h2
          className='text-3xl md:text-4xl font-bold text-indigo-900 mb-8 text-center'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Course Details: Introduction to Python
        </motion.h2>

        {/* Video Learning Section */}
        <div className='bg-white rounded-lg shadow-lg p-6 mb-8'>
          <div className='flex items-center mb-4'>
            <Video className='w-8 h-8 text-indigo-600 mr-3' />
            <h3 className='text-2xl font-semibold text-indigo-900'>
              Phase {phase} Video Lesson
            </h3>
          </div>
          <div className='mb-4 flex items-center justify-center'>
            <ReactPlayer
              url='https://www.youtube.com/watch?v=jfe7R7jiD0c'
              controls
              onPlay={() => logEvent('play', playedSeconds)}
              onPause={() => logEvent('pause', playedSeconds)}
              onSeek={(e) => logEvent('seek', e)}
              onProgress={({ playedSeconds }) =>
                setPlayedSeconds(playedSeconds)
              }
              onEnded={() => logEvent('end', playedSeconds)}
            />
            {/* <iframe
              width='891'
              height='501'
              src='https://www.youtube.com/embed/jfe7R7jiD0c'
              title='Product Sales Analysis I [1068] Question Solved | Crack SQL Interview with LeetCode'
              frameborder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              referrerpolicy='strict-origin-when-cross-origin'
              allowfullscreen
            ></iframe> */}
          </div>
          <div className='mb-4'>
            <div className='bg-gray-200 rounded-full h-4 w-full'>
              <motion.div
                className='bg-indigo-600 h-4 rounded-full'
                initial={{ width: 0 }}
                animate={{ width: `${videoProgress}%` }}
                transition={{ duration: 0.5 }}
              ></motion.div>
            </div>
            <p className='text-gray-600 mt-2'>{videoProgress}% completed</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='bg-indigo-600 text-white py-2 px-4 rounded-lg mr-4'
            onClick={handleWatchVideo}
            disabled={videoProgress === 100}
          >
            {videoProgress === 100 ? (
              <>
                <CheckCircle className='w-5 h-5 inline mr-1' /> Video Completed
              </>
            ) : (
              <>
                <Play className='w-5 h-5 inline mr-1' /> Watch Video (30 min)
              </>
            )}
          </motion.button>
          {videoProgress === 100 && phase < 2 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='bg-green-600 text-white py-2 px-4 rounded-lg'
              onClick={handleNextPhase}
            >
              Unlock Next Phase
            </motion.button>
          )}
        </div>

        {/* Virtual Interview Section */}
        {phase === 2 && (
          <div className='bg-white rounded-lg shadow-lg p-6 mb-8'>
            <div className='flex items-center mb-4'>
              <User className='w-8 h-8 text-indigo-600 mr-3' />
              <h3 className='text-2xl font-semibold text-indigo-900'>
                Virtual Interview Session
              </h3>
            </div>
            <p className='text-gray-600 mb-4'>
              Experience a simulated interview with an AI-powered avatar. Answer
              questions and receive real-time feedback to improve your skills.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='bg-blue-600 text-white py-2 px-4 rounded-lg'
              onClick={startInterview}
            >
              Start Virtual Interview
            </motion.button>
          </div>
        )}

        {/* Interview In-Progress */}
        {interviewStarted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='bg-white rounded-lg shadow-lg p-6'
          >
            <h3 className='text-2xl font-semibold text-indigo-900 mb-4'>
              Interview in Progress
            </h3>
            <p className='text-gray-600'>
              Your AI tutor is now interviewing you. Please answer the questions
              as they appear.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='mt-4 bg-indigo-600 text-white py-2 px-4 rounded-lg'
              onClick={() => (window.location.href = `/course-1-interview`)}
            >
              Join Interview
            </motion.button>
          </motion.div>
        )}
      </section>
      <Footer />
    </div>
  )
}

export default CoursePage
