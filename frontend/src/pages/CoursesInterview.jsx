import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useAnimations, useGLTF } from '@react-three/drei';
import axios from 'axios';
import { motion } from 'framer-motion';
import { BrainCircuit, Star, Clock, Award, Loader2 } from 'lucide-react';

// Custom hooks and components
import { useAuth } from '../contexts/AuthContext';
import { usePoints } from '../contexts/PointsContext';
import AvatarModel from '../components/AvatarModel';
import ProgressBar from '../components/ProgressBar';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import Textarea from '../components/ui/Textarea';
import { toast } from '../components/ui/Toast';

const INTERVIEW_STATES = {
  INTRO: 'intro',
  QUESTION: 'question',
  EVALUATING: 'evaluating',
  FEEDBACK: 'feedback',
  SUMMARY: 'summary',
};

const GRADIO_ENDPOINT = 'https://api.edukami.com/interview-api';

const CourseInterview = () => {
  const { courseId } = useParams();
  const { user } = useAuth();
  const { addPoints } = usePoints();
  const navigate = useNavigate();
  
  // Refs
  const answerInputRef = useRef(null);
  const avatarRef = useRef(null);
  
  // State management
  const [interviewState, setInterviewState] = useState(INTERVIEW_STATES.INTRO);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(5);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [timer, setTimer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [avatarMood, setAvatarMood] = useState('neutral');
  const [courseInfo, setCourseInfo] = useState(null);
  const [interviewResults, setInterviewResults] = useState({
    score: 0,
    correctAnswers: 0,
    feedbackSummary: '',
    earnedPoints: 0,
    badges: [],
  });
  
  // Speech synthesis for avatar
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speechSynthesisRef = useRef(null);
  
  // Initialize the interview
  useEffect(() => {
    fetchCourseInfo();
    
    // Speech synthesis setup
    speechSynthesisRef.current = window.speechSynthesis;
    
    return () => {
      if (timer) clearInterval(timer);
      if (speechSynthesisRef.current && speechSynthesisRef.current.speaking) {
        speechSynthesisRef.current.cancel();
      }
    };
  }, []);

  // Fetch course information
  const fetchCourseInfo = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/api/courses/${courseId}`);
      setCourseInfo(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching course information:', error);
      toast({
        title: 'Error',
        description: 'Failed to load course information. Please try again.',
        variant: 'destructive',
      });
      setIsLoading(false);
    }
  };

  // Start the interview process
  const startInterview = () => {
    setInterviewState(INTERVIEW_STATES.QUESTION);
    fetchNextQuestion();
    speakText('Let\'s begin the interview. I\'ll ask you a series of questions about this course material. Take your time and answer thoughtfully.');
  };

  // Fetch the next question from the RAG chatbot
  const fetchNextQuestion = async () => {
    try {
      setIsLoading(true);
      
      const response = await axios.post(`${GRADIO_ENDPOINT}/next-question`, {
        courseId,
        userId: user.id,
        questionIndex,
      });
      
      setCurrentQuestion(response.data.question);
      setTimeRemaining(response.data.timeLimit || 120); // Default 2 minutes
      
      // Start timer
      if (timer) clearInterval(timer);
      const newTimer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(newTimer);
            submitAnswer(true); // Auto-submit on time expiration
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      setTimer(newTimer);
      setIsLoading(false);
      
      // Speak the question
      speakText(response.data.question);
      
    } catch (error) {
      console.error('Error fetching question:', error);
      toast({
        title: 'Error',
        description: 'Failed to load the next question. Please try again.',
        variant: 'destructive',
      });
      setIsLoading(false);
    }
  };

  // Submit the user's answer
  const submitAnswer = async (isTimeUp = false) => {
    if (timer) clearInterval(timer);
    
    if (isTimeUp && userAnswer.trim() === '') {
      setUserAnswer('(No answer provided within the time limit)');
    }
    
    try {
      setInterviewState(INTERVIEW_STATES.EVALUATING);
      setIsLoading(true);
      
      const response = await axios.post(`${GRADIO_ENDPOINT}/evaluate-answer`, {
        courseId,
        userId: user.id,
        questionIndex,
        question: currentQuestion,
        answer: userAnswer,
        timeSpent: timeRemaining ? (120 - timeRemaining) : 120, // Calculate time spent
      });
      
      setFeedback(response.data);
      
      // Update avatar mood based on score
      if (response.data.score > 0.7) {
        setAvatarMood('happy');
      } else if (response.data.score > 0.4) {
        setAvatarMood('neutral');
      } else {
        setAvatarMood('disappointed');
      }
      
      setInterviewState(INTERVIEW_STATES.FEEDBACK);
      setIsLoading(false);
      
      // Speak the feedback
      speakText(response.data.feedback);
      
    } catch (error) {
      console.error('Error evaluating answer:', error);
      toast({
        title: 'Error',
        description: 'Failed to evaluate your answer. Please try again.',
        variant: 'destructive',
      });
      setIsLoading(false);
      setInterviewState(INTERVIEW_STATES.QUESTION);
    }
  };

  // Move to the next question or finish interview
  const handleNextAction = () => {
    if (questionIndex >= totalQuestions - 1) {
      finishInterview();
    } else {
      setQuestionIndex(prev => prev + 1);
      setUserAnswer('');
      setFeedback(null);
      setInterviewState(INTERVIEW_STATES.QUESTION);
      fetchNextQuestion();
    }
  };

  // Complete the interview and calculate results
  const finishInterview = async () => {
    try {
      setIsLoading(true);
      
      const response = await axios.post(`${GRADIO_ENDPOINT}/interview-summary`, {
        courseId,
        userId: user.id,
      });
      
      setInterviewResults(response.data);
      setInterviewState(INTERVIEW_STATES.SUMMARY);
      
      // Add points to user account
      if (response.data.earnedPoints > 0) {
        addPoints(response.data.earnedPoints);
      }
      
      setIsLoading(false);
      
      // Speak the summary
      speakText(`You've completed the interview! You answered ${response.data.correctAnswers} questions correctly and earned ${response.data.earnedPoints} points. ${response.data.feedbackSummary}`);
      
    } catch (error) {
      console.error('Error generating interview summary:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate your interview summary. Please try again.',
        variant: 'destructive',
      });
      setIsLoading(false);
    }
  };

  // Text-to-speech function for avatar
  const speakText = (text) => {
    if (!speechSynthesisRef.current) return;
    
    // Cancel any ongoing speech
    if (speechSynthesisRef.current.speaking) {
      speechSynthesisRef.current.cancel();
    }
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set voice properties
    const voices = speechSynthesisRef.current.getVoices();
    const preferredVoice = voices.find(voice => voice.name.includes('Google') && voice.name.includes('Female'));
    utterance.voice = preferredVoice || voices[0];
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    
    // Events for animation sync
    utterance.onstart = () => {
      setIsSpeaking(true);
      if (avatarRef.current) {
        avatarRef.current.startTalking();
      }
    };
    
    utterance.onend = () => {
      setIsSpeaking(false);
      if (avatarRef.current) {
        avatarRef.current.stopTalking();
      }
    };
    
    speechSynthesisRef.current.speak(utterance);
  };

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Render different states of the interview
  const renderInterviewContent = () => {
    switch (interviewState) {
      case INTERVIEW_STATES.INTRO:
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6 p-6"
          >
            <h2 className="text-2xl font-bold">Virtual Interview Session</h2>
            {courseInfo && (
              <>
                <h3 className="text-xl">{courseInfo.title}</h3>
                <p className="text-lg">{courseInfo.description}</p>
              </>
            )}
            <div className="my-6">
              <p className="mb-4">Your virtual tutor will now test your knowledge with {totalQuestions} questions.</p>
              <p>Answer thoughtfully to earn points and badges!</p>
            </div>
            <Button 
              onClick={startInterview}
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              Start Interview
            </Button>
          </motion.div>
        );
        
      case INTERVIEW_STATES.QUESTION:
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6 p-4"
          >
            <div className="flex justify-between items-center mb-4">
              <Badge variant="outline" className="text-base px-3 py-1">
                Question {questionIndex + 1} of {totalQuestions}
              </Badge>
              <div className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-yellow-500" />
                <span className={`font-mono text-lg ${timeRemaining < 30 ? 'text-red-500 animate-pulse' : ''}`}>
                  {formatTime(timeRemaining)}
                </span>
              </div>
            </div>
            
            <Card className="p-4 bg-slate-50 shadow-md">
              <p className="text-lg font-medium">{currentQuestion}</p>
            </Card>
            
            <div className="space-y-4">
              <Textarea
                ref={answerInputRef}
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type your answer here..."
                className="min-h-32 text-base p-3"
                disabled={isLoading}
              />
              
              <div className="flex justify-end">
                <Button
                  onClick={() => submitAnswer()}
                  disabled={isLoading || userAnswer.trim() === ''}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Answer'
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        );
        
      case INTERVIEW_STATES.EVALUATING:
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center p-6 space-y-4"
          >
            <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
            <p className="text-lg font-medium">Evaluating your answer...</p>
            <p className="text-sm text-gray-500">The tutor is carefully reviewing your response</p>
          </motion.div>
        );
        
      case INTERVIEW_STATES.FEEDBACK:
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6 p-4"
          >
            <h3 className="text-xl font-semibold">Feedback</h3>
            
            {feedback && (
              <Card className="p-4 bg-slate-50 shadow-md space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">Your score:</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.round(feedback.score * 5)
                            ? 'text-yellow-500 fill-yellow-500'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="font-medium">Tutor's feedback:</p>
                  <p className="mt-1 text-gray-700">{feedback.feedback}</p>
                </div>
                
                {feedback.correctAnswer && (
                  <div>
                    <p className="font-medium text-green-700">Correct answer:</p>
                    <p className="mt-1 text-gray-700">{feedback.correctAnswer}</p>
                  </div>
                )}
                
                {feedback.pointsEarned > 0 && (
                  <div className="flex items-center text-blue-600">
                    <Award className="h-5 w-5 mr-2" />
                    <span>+{feedback.pointsEarned} points earned!</span>
                  </div>
                )}
              </Card>
            )}
            
            <div className="flex justify-end">
              <Button onClick={handleNextAction} className="bg-blue-600 hover:bg-blue-700">
                {questionIndex >= totalQuestions - 1 ? 'See Final Results' : 'Next Question'}
              </Button>
            </div>
          </motion.div>
        );
        
      case INTERVIEW_STATES.SUMMARY:
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 p-4"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Interview Complete!</h2>
              <p className="text-gray-600">Great job completing your virtual interview session</p>
            </div>
            
            <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg border-blue-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-blue-600">{interviewResults.score.toFixed(1)}/10</div>
                  <div className="text-sm text-gray-500">Overall Score</div>
                </div>
                
                <div className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-green-600">
                    {interviewResults.correctAnswers}/{totalQuestions}
                  </div>
                  <div className="text-sm text-gray-500">Correct Answers</div>
                </div>
                
                <div className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-purple-600">+{interviewResults.earnedPoints}</div>
                  <div className="text-sm text-gray-500">Points Earned</div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Tutor's Summary</h3>
                <p className="text-gray-700">{interviewResults.feedbackSummary}</p>
              </div>
              
              {interviewResults.badges && interviewResults.badges.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Badges Earned</h3>
                  <div className="flex flex-wrap gap-2">
                    {interviewResults.badges.map((badge, index) => (
                      <Badge key={index} className="px-3 py-1 bg-yellow-100 text-yellow-800 border border-yellow-300">
                        🏆 {badge}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
                <Button 
                  onClick={() => navigate(`/courses/${courseId}`)}
                  variant="outline"
                  className="border-blue-500 text-blue-600 hover:bg-blue-50"
                >
                  Back to Course
                </Button>
                <Button 
                  onClick={() => navigate('/dashboard')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Back to Dashboard
                </Button>
              </div>
            </Card>
          </motion.div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Avatar Container */}
          <div className="relative h-96 lg:h-full min-h-96 bg-gradient-to-b from-blue-100 to-purple-100 rounded-xl shadow-lg overflow-hidden">
            <Canvas camera={{ position: [0, 1.5, 4], fov: 50 }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <directionalLight position={[-10, 10, 5]} intensity={0.5} />
              
              <AvatarModel 
                ref={avatarRef}
                mood={avatarMood}
                isSpeaking={isSpeaking}
                position={[0, -1, 0]}
              />
              
              <OrbitControls 
                enableZoom={false} 
                enablePan={false}
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={Math.PI / 2}
              />
            </Canvas>
            
            {/* Avatar Mood Indicator */}
            <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium">
              {avatarMood === 'happy' && '😊 Impressed'}
              {avatarMood === 'neutral' && '😐 Thinking'}
              {avatarMood === 'disappointed' && '🤔 Needs Improvement'}
            </div>
            
            {/* Progress Indicator */}
            <div className="absolute bottom-4 left-4 right-4">
              <ProgressBar 
                progress={(questionIndex / totalQuestions) * 100} 
                className="bg-blue-600"
              />
              <div className="mt-2 text-xs text-center text-gray-700 bg-white/80 backdrop-blur-sm rounded-full px-2 py-1">
                Progress: {questionIndex}/{totalQuestions} Questions
              </div>
            </div>
          </div>
          
          {/* Content Container */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {renderInterviewContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseInterview;