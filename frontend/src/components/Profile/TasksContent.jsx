import React, { useState } from 'react';
import { FaUser, FaTasks, FaUsers, FaBook, FaMedal, FaClock, FaChevronDown, FaChevronUp, FaPlus } from 'react-icons/fa';

const TasksContent = ({ userData }) => {
    const [taskFilter, setTaskFilter] = useState('all');
    
    const filteredTasks = taskFilter === 'all' 
      ? userData.tasks 
      : userData.tasks.filter(task => task.type === taskFilter);
    
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Tasks Assigned</h2>
          <div className="flex space-x-2">
            <button 
              onClick={() => setTaskFilter('all')}
              className={`px-3 py-1 rounded ${taskFilter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              All
            </button>
            <button 
              onClick={() => setTaskFilter('course')}
              className={`px-3 py-1 rounded ${taskFilter === 'course' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Courses
            </button>
            <button 
              onClick={() => setTaskFilter('freelance')}
              className={`px-3 py-1 rounded ${taskFilter === 'freelance' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Freelance
            </button>
            <button 
              onClick={() => setTaskFilter('job')}
              className={`px-3 py-1 rounded ${taskFilter === 'job' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Job
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          {filteredTasks.map(task => (
            <div key={task.id} className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500 flex justify-between items-center">
              <div>
                <h3 className="font-bold">{task.title}</h3>
                <p className="text-sm text-gray-600">Deadline: {task.deadline}</p>
              </div>
              <div className="flex space-x-2">
                <span className={`text-xs px-2 py-1 rounded ${
                  task.type === 'course' ? 'bg-green-100 text-green-800' :
                  task.type === 'freelance' ? 'bg-purple-100 text-purple-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {task.type.charAt(0).toUpperCase() + task.type.slice(1)}
                </span>
                <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm">
                  Start
                </button>
              </div>
            </div>
          ))}
          
          <button className="flex items-center justify-center w-full py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            <FaPlus className="mr-2" /> Add New Task
          </button>
        </div>
      </div>
    );
  };


export default TasksContent