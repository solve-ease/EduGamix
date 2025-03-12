import React, { useState } from 'react';
import { FaUser, FaTasks, FaUsers, FaBook, FaMedal, FaClock, FaChevronDown, FaChevronUp, FaPlus } from 'react-icons/fa';

const CoursesContent = ({ userData }) => {
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">My Courses</h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded flex items-center">
            <FaPlus className="mr-2" /> Browse Courses
          </button>
        </div>
        
        <div className="space-y-6">
          {userData.courses.map(course => (
            <div key={course.id} className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-bold text-lg mb-2">{course.title}</h3>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progress: {course.progress}%</span>
                <span>{course.completedLessons}/{course.totalLessons} Lessons</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
              <div className="flex space-x-2">
                <button className="bg-blue-500 text-white px-4 py-2 rounded flex-1">
                  Continue
                </button>
                <button className="bg-gray-200 px-4 py-2 rounded">
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 bg-blue-50 p-4 rounded-lg">
          <h3 className="font-bold text-lg mb-2">Recommended for You</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="font-bold">Cloud Computing Fundamentals</h4>
              <p className="text-sm text-gray-600 mb-4">Learn the basics of cloud infrastructure and services</p>
              <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm">
                Explore
              </button>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="font-bold">Mobile App Development</h4>
              <p className="text-sm text-gray-600 mb-4">Build cross-platform mobile applications</p>
              <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm">
                Explore
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  

  export default CoursesContent