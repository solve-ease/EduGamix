import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StarIcon, UserGroupIcon, CurrencyDollarIcon, ClockIcon, LocationMarkerIcon, BriefcaseIcon, ChartBarIcon } from '@heroicons/react/solid';
import { PlusIcon, UserAddIcon, LightningBoltIcon, AcademicCapIcon } from '@heroicons/react/outline';

// For ML bid prediction model
// import * as tf from 'tensorflow';
// import * as xgb from './utils/xgboostPredictor';

// Mock data service - replace with your actual API
import { fetchJobDetails, submitBid, inviteCollaborator } from '../services/jobService';
import { fetchUserProfile } from '../services/userService';

const JobDescriptionPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bidAmount, setBidAmount] = useState('');
  const [bidProposal, setBidProposal] = useState('');
  const [bidSuccess, setBidSuccess] = useState(null);
  const [bidPrediction, setBidPrediction] = useState(null);
  const [showCollaborators, setShowCollaborators] = useState(false);
  const [collaborators, setCollaborators] = useState([]);
  const [userSkills, setUserSkills] = useState([]);
  const [requiredSkills, setRequiredSkills] = useState([]);
  const [skillMatch, setSkillMatch] = useState(0);
  
  useEffect(() => {
    const loadJobAndUserData = async () => {
      try {
        setLoading(true);
        // Fetch job details
        const jobData = await fetchJobDetails(jobId);
        setJob(jobData);
        setRequiredSkills(jobData.skills || []);
        
        // Fetch user profile to get skills
        const userData = await fetchUserProfile();
        setUserSkills(userData.skills || []);
        
        // Calculate skill match
        if (jobData.skills && userData.skills) {
          const matchingSkills = jobData.skills.filter(skill => 
            userData.skills.includes(skill)
          );
          setSkillMatch((matchingSkills.length / jobData.skills.length) * 100);
        }
      } catch (error) {
        console.error("Failed to fetch job details:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadJobAndUserData();
  }, [jobId]);
  
  const predictBidSuccess = () => {
    if (!bidAmount || !bidProposal) return;
    
    try {
      // Features for the ML model
      const features = {
        bidAmount: parseFloat(bidAmount),
        averageBid: job.averageBid || 0,
        proposalLength: bidProposal.length,
        keywordMatch: countKeywords(bidProposal, job.keywords || []),
        userExperience: 3, // Mock value, would come from user profile
        competition: job.proposals ? job.proposals.length : 0,
        skillMatchPercentage: skillMatch
      };
      
      // In a real implementation, this would be an actual ML model prediction
      // Using a mock prediction function for now
      const prediction = mockPredictBidSuccess(features);
      setBidPrediction(prediction);
      
      return prediction;
    } catch (error) {
      console.error("Prediction error:", error);
      return 50; // Default value on error
    }
  };
  
  // Mock prediction function - in reality would use the ML model
  const mockPredictBidSuccess = (features) => {
    // Simple heuristic-based prediction
    let score = 50; // Base score
    
    // If bid is lower than average, increase chances
    if (features.bidAmount < features.averageBid) {
      score += 10;
    } else {
      score -= (features.bidAmount - features.averageBid) / 10;
    }
    
    // Proposal quality factors
    score += Math.min(20, features.proposalLength / 50); // Longer proposals up to a point
    score += features.keywordMatch * 5; // Keywords matching
    
    // Experience and competition
    score += features.userExperience * 3;
    score -= features.competition * 2;
    
    // Skill match is important
    score += features.skillMatchPercentage / 5;
    
    return Math.min(100, Math.max(0, Math.round(score)));
  };
  
  const countKeywords = (text, keywords) => {
    if (!text || !keywords || keywords.length === 0) return 0;
    
    const lowerText = text.toLowerCase();
    return keywords.filter(keyword => 
      lowerText.includes(keyword.toLowerCase())
    ).length;
  };
  
  const handleSubmitBid = async (e) => {
    e.preventDefault();
    
    if (!bidAmount || !bidProposal) return;
    
    const prediction = predictBidSuccess();
    
    try {
      const result = await submitBid({
        jobId,
        amount: parseFloat(bidAmount),
        proposal: bidProposal,
        predictedSuccess: prediction
      });
      
      setBidSuccess(true);
      
      // Show success message and gamification elements
      setTimeout(() => {
        navigate('/dashboard', { 
          state: { 
            notification: {
              type: 'bid-submitted',
              message: `Bid submitted successfully! You've earned 10 XP for your effort.`,
              xpGained: 10
            }
          }
        });
      }, 2000);
    } catch (error) {
      console.error("Failed to submit bid:", error);
      setBidSuccess(false);
    }
  };
  
  const handleInviteCollaborator = async (collaboratorId) => {
    try {
      await inviteCollaborator(jobId, collaboratorId);
      // Update UI to show invitation sent
      setCollaborators(prev => 
        prev.map(c => 
          c.id === collaboratorId 
            ? {...c, invited: true} 
            : c
        )
      );
    } catch (error) {
      console.error("Failed to invite collaborator:", error);
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }
  
  if (!job) {
    return <div className="text-center py-12">Job not found</div>;
  }
  
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        {/* Header with Quest Title and XP */}
        <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{job.title}</h2>
            <div className="flex items-center">
              <StarIcon className="h-6 w-6 text-yellow-300 mr-1" />
              <span className="text-xl font-bold">{job.xpPoints} XP</span>
            </div>
          </div>
          <div className="mt-2 flex flex-wrap gap-4">
            <div className="flex items-center">
              <CurrencyDollarIcon className="h-5 w-5 mr-1" />
              <span>${job.paymentRange[0]}-${job.paymentRange[1]}</span>
            </div>
            <div className="flex items-center">
              <ClockIcon className="h-5 w-5 mr-1" />
              <span>{job.duration}</span>
            </div>
            <div className="flex items-center">
              <BriefcaseIcon className="h-5 w-5 mr-1" />
              <span>{job.difficulty} Level</span>
            </div>
            <div className="flex items-center">
              <LocationMarkerIcon className="h-5 w-5 mr-1" />
              <span>{job.location}</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-4 py-6 sm:px-6">
          {/* Main Content - Quest Details */}
          <div className="lg:col-span-2">
            {/* Quest Description */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Quest Description</h3>
              <div className="prose max-w-none">
                <p>{job.description}</p>
              </div>
            </div>
            
            {/* Required Skills */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {requiredSkills.map(skill => (
                  <span 
                    key={skill}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      userSkills.includes(skill)
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {skill}
                    {userSkills.includes(skill) && (
                      <span className="ml-1">✓</span>
                    )}
                  </span>
                ))}
              </div>
              
              {/* Skill Match Indicator */}
              <div className="mt-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Skill Match</span>
                  <span className="text-sm font-medium text-gray-700">{Math.round(skillMatch)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${
                      skillMatch > 70 ? 'bg-green-600' :
                      skillMatch > 40 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${skillMatch}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            {/* Required Deliverables */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Quest Deliverables</h3>
              <ul className="list-disc pl-5 space-y-2">
                {job.deliverables && job.deliverables.map((item, index) => (
                  <li key={index} className="text-gray-700">{item}</li>
                ))}
              </ul>
            </div>
            
            {/* Collaborative Feature */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Form a Party</h3>
                <button
                  onClick={() => setShowCollaborators(!showCollaborators)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition flex items-center"
                >
                  <UserGroupIcon className="h-5 w-5 mr-2" />
                  <span>Find Collaborators</span>
                </button>
              </div>
              
              {showCollaborators && (
                <div className="mt-4 space-y-4">
                  <p className="text-sm text-gray-600">Form a party with other freelancers to combine your skills and increase your success rate!</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    {[
                      { id: 1, name: "Elena Rodriguez", level: 24, skills: ["Python", "Data Science"], avatar: "/avatars/elena.jpg" },
                      { id: 2, name: "Marcus Wong", level: 18, skills: ["UX Design", "HTML/CSS"], avatar: "/avatars/marcus.jpg" },
                      { id: 3, name: "Priya Sharma", level: 32, skills: ["Python", "Machine Learning"], avatar: "/avatars/priya.jpg" },
                      { id: 4, name: "Jordan Taylor", level: 15, skills: ["Content Writing", "SEO"], avatar: "/avatars/jordan.jpg" }
                    ].map(collaborator => (
                      <div key={collaborator.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold text-lg">
                          {collaborator.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{collaborator.name}</h4>
                          <div className="flex items-center text-sm text-gray-500">
                            <AcademicCapIcon className="h-4 w-4 mr-1" />
                            <span>Level {collaborator.level}</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {collaborator.skills.map(skill => (
                              <span key={skill} className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        <button
                          onClick={() => handleInviteCollaborator(collaborator.id)}
                          className="p-2 text-indigo-600 hover:bg-indigo-50 rounded"
                        >
                          <UserAddIcon className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Sidebar - Bid Submission */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Submit Your Bid</h3>
              
              {/* ML-powered Bid Success Prediction */}
              {bidPrediction !== null && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Bid Success Prediction</h4>
                  <div className="flex items-center mb-2">
                    <ChartBarIcon className="h-5 w-5 mr-2 text-indigo-600" />
                    <span className="text-sm font-medium">Success Chance: {bidPrediction}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                    <div 
                      className={`h-2.5 rounded-full ${
                        bidPrediction > 70 ? 'bg-green-600' :
                        bidPrediction > 40 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${bidPrediction}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500">
                    {bidPrediction > 70 
                      ? "Great bid! You have a high chance of success."
                      : bidPrediction > 40
                      ? "Decent bid. Consider adjusting your proposal or price."
                      : "This bid needs improvement. Try enhancing your proposal or adjusting your price."}
                  </p>
                </div>
              )}
              
              <form onSubmit={handleSubmitBid}>
                <div className="mb-4">
                  <label htmlFor="bidAmount" className="block text-sm font-medium text-gray-700 mb-1">
                    Bid Amount (USD)
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      name="bidAmount"
                      id="bidAmount"
                      min={job.paymentRange[0]}
                      max={job.paymentRange[1]}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                      placeholder="0.00"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      required
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Suggested range: ${job.paymentRange[0]}-${job.paymentRange[1]}
                  </p>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="bidProposal" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Proposal
                  </label>
                  <textarea
                    id="bidProposal"
                    name="bidProposal"
                    rows={5}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Describe why you're the perfect hero for this quest..."
                    value={bidProposal}
                    onChange={(e) => setBidProposal(e.target.value)}
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <button
                    type="button"
                    onClick={predictBidSuccess}
                    className="w-full flex justify-center py-2 px-4 border border-indigo-300 rounded-md shadow-sm text-sm font-medium text-indigo-700 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <LightningBoltIcon className="h-5 w-5 mr-2" />
                    Analyze Bid Success Chance
                  </button>
                </div>
                
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit Bid & Earn XP
                </button>
              </form>
              
              {/* Quest Status & Competition */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-4">Quest Stats</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Posted</span>
                    <span className="text-sm font-medium">{job.postedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Heroes Applied</span>
                    <span className="text-sm font-medium">{job.proposals ? job.proposals.length : 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Quest Deadline</span>
                    <span className="text-sm font-medium">{job.deadline || "Open"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Client Rating</span>
                    <div className="flex">
                      {Array(5).fill(0).map((_, i) => (
                        <StarIcon 
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(job.clientRating || 0) 
                              ? 'text-yellow-400' 
                              : 'text-gray-300'
                          }`} 
                        />
                      ))}
                      <span className="ml-1 text-sm font-medium">{job.clientRating || "N/A"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescriptionPage;