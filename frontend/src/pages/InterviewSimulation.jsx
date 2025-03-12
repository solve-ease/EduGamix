import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import { TextureLoader } from 'three';

// Main avatar model component
function AngelicaAvatar({ speaking, lookAt, blink, onLoad }) {
  const group = useRef();
  // Load the model
  const { nodes, materials, animations } = useGLTF('/home/kalie/work/projects/EduGamix/frontend/models/angelica-new.glb');
  const { actions } = useAnimations(animations, group);
  
  // References for animatable parts
  const mouthRef = useRef();
  const eyesRef = useRef();
  const headRef = useRef();
  
  // State for various animations
  const [mouthOpenness, setMouthOpenness] = useState(0);
  const [blinkState, setBlinkState] = useState(0);
  const [lookAtPos, setLookAtPos] = useState([0, 0, 5]);
  
  // Handle lip sync when speaking changes
  useEffect(() => {
    if (speaking) {
      // Simulate mouth movement when speaking
      const interval = setInterval(() => {
        setMouthOpenness(Math.random() * 0.8);
      }, 100);
      return () => clearInterval(interval);
    } else {
      setMouthOpenness(0);
    }
  }, [speaking]);
  
  // Handle blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      // Quick blink animation
      setBlinkState(1);
      setTimeout(() => setBlinkState(0), 200);
    }, Math.random() * 3000 + 2000); // Random blink interval between 2-5 seconds
    
    return () => clearInterval(blinkInterval);
  }, []);
  
  // Handle where the avatar is looking
  useEffect(() => {
    if (lookAt) {
      setLookAtPos(lookAt);
    }
  }, [lookAt]);
  
  // Animation loop
  useFrame(() => {
    // Apply mouth movement
    if (mouthRef.current) {
      mouthRef.current.morphTargetInfluences[0] = mouthOpenness;
    }
    
    // Apply eye blinking
    if (eyesRef.current) {
      eyesRef.current.morphTargetInfluences[0] = blinkState;
    }
    
    // Apply head/eye looking
    if (headRef.current) {
      // Smooth look-at functionality
      const target = new THREE.Vector3(...lookAtPos);
      const currentPos = new THREE.Vector3();
      headRef.current.getWorldPosition(currentPos);
      
      // Calculate direction to look
      const direction = target.sub(currentPos).normalize();
      
      // Apply subtle rotation to head based on look direction
      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        Math.atan2(direction.x, direction.z),
        0.05
      );
      
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        Math.atan2(direction.y, Math.sqrt(direction.x * direction.x + direction.z * direction.z)),
        0.05
      );
    }
  });
  
  // Notify parent when model is loaded
  useEffect(() => {
    if (onLoad) onLoad();
  }, [onLoad]);

  return (
    <group ref={group} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[-Math.PI / 2, 0, 0]} scale={0.138}>
          <primitive object={nodes.Head} ref={headRef} />
          
          {/* Head model */}
          <skinnedMesh 
            name="Head_mesh"
            geometry={nodes.Head_Head_0.geometry}
            material={materials['Head-3d311978']}
            skeleton={nodes.Head_Head_0.skeleton}
          />
          
          {/* Eyes with blinking capability */}
          <skinnedMesh
            name="Eyes"
            ref={eyesRef}
            geometry={nodes.Eye_Eye_0.geometry}
            material={materials['material-5a1d05b7']}
            morphTargetDictionary={{ blink: 0 }}
            morphTargetInfluences={[0]}
          />
          
          {/* Eye reflection/highlights */}
          <skinnedMesh
            name="EyeScleraReflect"
            geometry={nodes.EyeScleraReflect_EyeScleraReflect_0.geometry}
            material={materials['EyeScleraReflect-faf90faf']}
          />
          
          {/* Eyelashes */}
          <skinnedMesh
            name="Eyelashes"
            geometry={nodes.Eyelashes_Eyelashes_0.geometry}
            material={materials['Eyelashes-ce340084']}
          />
          
          {/* Mouth with lip-sync capability */}
          <skinnedMesh
            name="Mouth"
            ref={mouthRef}
            geometry={nodes.Mouth_Mouth_0.geometry}
            material={materials['Mouth-814c895c']}
            morphTargetDictionary={{ open: 0 }}
            morphTargetInfluences={[0]}
          />
          
          {/* Hair */}
          <skinnedMesh
            name="Hair"
            geometry={nodes.Hair_Hair_0.geometry}
            material={materials['Hair-27f33c73']}
          />
        </group>
      </group>
    </group>
  );
}

// Preload GLB model
// useGLTF.preload('/home/kalie/work/projects/EduGamix/frontend/models/angelica-new.glb');

// Interview simulation environment
function InterviewEnvironment() {
  const { camera } = useThree();
  
  // Set up camera position
  useEffect(() => {
    camera.position.set(0, 1.5, 2.5);
    camera.lookAt(0, 1.2, 0);
  }, [camera]);
  
  return (
    <group>
      {/* Ambient lighting */}
      <ambientLight intensity={0.5} />
      
      {/* Main directional light (simulates sunlight) */}
      <directionalLight 
        position={[1, 2, 3]} 
        intensity={1} 
        castShadow 
        shadow-mapSize-width={1024} 
        shadow-mapSize-height={1024}
      />
      
      {/* Fill light from opposite side */}
      <directionalLight position={[-1, 1, -1]} intensity={0.3} />
      
      {/* Simple environment */}
      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
    </group>
  );
}

// Interview question and response system with gamification
const InterviewSimulation = () => {
  // Interview state
  const [isLoaded, setIsLoaded] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [speaking, setSpeaking] = useState(false);
  const [lookAt, setLookAt] = useState([0, 1.5, 2]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [userResponse, setUserResponse] = useState('');
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [confidenceLevel, setConfidenceLevel] = useState(50);
  const [earnedTokens, setEarnedTokens] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [interviewComplete, setInterviewComplete] = useState(false);
  
  // Sample interview questions
  const questions = [
    {
      id: 1,
      text: "Tell me about yourself and your experience with educational technology.",
      keyPoints: ["background", "education tech", "experience", "skills"],
      difficulty: "easy",
      pointsAvailable: 10
    },
    {
      id: 2,
      text: "How would you implement gamification in an online learning environment?",
      keyPoints: ["rewards", "progression", "engagement", "measurement"],
      difficulty: "medium",
      pointsAvailable: 20
    },
    {
      id: 3,
      text: "Describe a challenge you faced in a project and how you overcame it.",
      keyPoints: ["problem identification", "strategy", "execution", "results"],
      difficulty: "medium",
      pointsAvailable: 20
    },
    {
      id: 4,
      text: "Where do you see the future of AI in education heading in the next 5 years?",
      keyPoints: ["personalization", "accessibility", "ethics", "integration"],
      difficulty: "hard",
      pointsAvailable: 30
    }
  ];
  
  // Automated feedback based on response analysis
  const analyzeFeedback = () => {
    // In a real implementation, this would use NLP to analyze responses
    // For this demo, we'll use a simple scoring system
    const pointsEarned = Math.floor(Math.random() * questions[currentQuestion].pointsAvailable);
    const bonusPoints = Math.floor(confidenceLevel / 10);
    
    const newScore = score + pointsEarned + bonusPoints;
    const newTokens = earnedTokens + Math.floor(pointsEarned / 2);
    
    setScore(newScore);
    setEarnedTokens(newTokens);
    return {
      points: pointsEarned,
      bonus: bonusPoints,
      feedback: generateFeedback(pointsEarned, questions[currentQuestion].pointsAvailable)
    };
  };
  
  const generateFeedback = (points, maxPoints) => {
    const percentage = (points / maxPoints) * 100;
    
    if (percentage > 80) {
      return "Excellent response! You addressed most of the key points clearly and professionally.";
    } else if (percentage > 60) {
      return "Good response. You covered some important aspects, but there's room for improvement.";
    } else {
      return "Your response needs work. Consider addressing more of the key points next time.";
    }
  };
  
  // Start avatar speaking the current question
  const speakQuestion = () => {
    setSpeaking(true);
    setLookAt([0, 1.5, 2]); // Look at the user
    setIsTimerRunning(true);
    
    // In a real implementation, this would use Text-to-Speech
    // Simulate speaking time based on question length
    setTimeout(() => {
      setSpeaking(false);
    }, questions[currentQuestion].text.length * 50);
  };
  
  // Timer effect
  useEffect(() => {
    let interval;
    if (isTimerRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      submitResponse();
    }
    
    return () => clearInterval(interval);
  }, [isTimerRunning, timeRemaining]);
  
  // Submit user's response
  const submitResponse = () => {
    setIsTimerRunning(false);
    setShowFeedback(true);
    // Make avatar look thoughtful during feedback
    setLookAt([1, 1.2, 0]);
    setSpeaking(true);
    
    // Generate feedback
    const feedbackResult = analyzeFeedback();
    setFeedback(feedbackResult);
    
    // Simulate avatar giving feedback
    setTimeout(() => {
      setSpeaking(false);
      setLookAt([0, 1.5, 2]); // Look back at user
    }, 3000);
  };
  
  // Move to next question
  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowFeedback(false);
      setUserResponse('');
      setTimeRemaining(60);
      setConfidenceLevel(50);
      setFeedback(null);
      // Look slightly away, then back to user
      setLookAt([1, 1.8, 0]);
      setTimeout(() => {
        setLookAt([0, 1.5, 2]);
        speakQuestion();
      }, 1000);
    } else {
      // End of interview
      setInterviewComplete(true);
    }
  };
  
  // Complete the interview and show final results
  const completeInterview = () => {
    // In a real app, this would save results to a database
    // and possibly unlock achievements or new content
    
    // For demo, we'll just reset everything
    setCurrentQuestion(0);
    setShowFeedback(false);
    setUserResponse('');
    setTimeRemaining(60);
    setConfidenceLevel(50);
    setScore(0);
    setEarnedTokens(0);
    setFeedback(null);
    setInterviewComplete(false);
    
    // Look at user and speak welcome message
    setLookAt([0, 1.5, 2]);
    setSpeaking(true);
    setTimeout(() => {
      setSpeaking(false);
      speakQuestion();
    }, 2000);
  };

  // Get badge color based on difficulty
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "easy": return "#4CAF50"; // Green
      case "medium": return "#FF9800"; // Orange
      case "hard": return "#F44336"; // Red
      default: return "#2196F3"; // Blue
    }
  };

  // Render gamified interview UI
  return (
    <div className="interview-simulation">
      <div className="canvas-container" style={{ height: "70vh", width: "100%" }}>
        {/* 3D Avatar Canvas */}
        <Canvas shadows>
          <InterviewEnvironment />
          {/* <AngelicaAvatar
            speaking={speaking}
            lookAt={lookAt}
            onLoad={() => {
              setIsLoaded(true);
              setTimeout(speakQuestion, 1000);
            }}
          /> */}
          <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI/3} maxPolarAngle={Math.PI/2} />
        </Canvas>
        
        {/* Loading overlay */}
        {!isLoaded && (
          <div className="loading-overlay" style={{ 
            position: "absolute", 
            top: 0, 
            left: 0, 
            width: "100%", 
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.7)",
            color: "white",
            zIndex: 10
          }}>
            <div className="spinner" style={{
              border: "4px solid rgba(255,255,255,0.3)",
              borderRadius: "50%",
              borderTop: "4px solid white",
              width: "40px",
              height: "40px",
              animation: "spin 1s linear infinite"
            }}></div>
            <p>Loading virtual interviewer...</p>
            <style jsx>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        )}
      </div>
      
      {/* Interview UI */}
      <div className="interview-interface" style={{
        padding: "20px",
        backgroundColor: "#f5f7fa",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        margin: "20px 0"
      }}>
        {/* Game stats */}
        <div className="game-stats" style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
          padding: "10px",
          backgroundColor: "#e9eef6",
          borderRadius: "6px"
        }}>
          <div className="score" style={{
            fontWeight: "bold",
            fontSize: "18px",
            color: "#2a4365"
          }}>Score: {score}</div>
          <div className="tokens" style={{
            display: "flex",
            alignItems: "center",
            color: "#805ad5",
            fontWeight: "bold"
          }}>
            <span style={{ marginRight: "5px" }}>💰</span>
            EduTokens: {earnedTokens}
          </div>
          <div className="timer" style={{
            color: timeRemaining < 10 ? "#e53e3e" : "#2a4365",
            fontWeight: timeRemaining < 10 ? "bold" : "normal",
            animation: timeRemaining < 10 ? "pulse 1s infinite" : "none"
          }}>
            Time remaining: {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
          </div>
        </div>
        
        {/* Interview completion screen */}
        {interviewComplete ? (
          <div className="interview-complete" style={{
            textAlign: "center",
            padding: "30px",
            backgroundColor: "#ebf8ff",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(66,153,225,0.2)"
          }}>
            <h2 style={{ color: "#2b6cb0", marginBottom: "20px" }}>Interview Complete!</h2>
            <div className="results" style={{ marginBottom: "30px" }}>
              <p style={{ fontSize: "18px", marginBottom: "10px" }}>Final Score: <span style={{ fontWeight: "bold", color: "#2c5282" }}>{score}</span></p>
              <p style={{ fontSize: "18px", marginBottom: "20px" }}>Tokens Earned: <span style={{ fontWeight: "bold", color: "#805ad5" }}>{earnedTokens}</span></p>
              
              <div style={{ margin: "20px 0", padding: "15px", backgroundColor: "#fff", borderRadius: "6px", boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
                <h3 style={{ color: "#4a5568", marginBottom: "10px" }}>Performance Assessment</h3>
                {score > 70 ? (
                  <p style={{ color: "#2f855a" }}>Excellent job! You demonstrated strong interview skills and professional communication.</p>
                ) : score > 40 ? (
                  <p style={{ color: "#d69e2e" }}>Good effort. With a bit more practice, you'll master these interview scenarios.</p>
                ) : (
                  <p style={{ color: "#c53030" }}>This was challenging, but don't worry! Review the feedback and try again to improve your score.</p>
                )}
              </div>
              
              <div style={{ marginTop: "20px" }}>
                <h3 style={{ color: "#4a5568", marginBottom: "10px" }}>Achievements Unlocked</h3>
                <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
                  {score > 20 && (
                    <div style={{ padding: "10px", backgroundColor: "#e6fffa", borderRadius: "50%", width: "60px", height: "60px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      🎯
                    </div>
                  )}
                  {earnedTokens > 30 && (
                    <div style={{ padding: "10px", backgroundColor: "#ebf4ff", borderRadius: "50%", width: "60px", height: "60px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      💰
                    </div>
                  )}
                  {score > 50 && (
                    <div style={{ padding: "10px", backgroundColor: "#faf5ff", borderRadius: "50%", width: "60px", height: "60px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      🏆
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <button 
              onClick={completeInterview}
              style={{
                padding: "12px 24px",
                backgroundColor: "#4299e1",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "background-color 0.3s"
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = "#3182ce"}
              onMouseOut={(e) => e.target.style.backgroundColor = "#4299e1"}
            >
              Start New Interview
            </button>
          </div>
        ) : (
          <>
            {/* Current question */}
            <div className="question-container" style={{
              marginBottom: "20px",
              padding: "15px",
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                <h3 style={{ margin: 0, color: "#2d3748" }}>Question {currentQuestion + 1} of {questions.length}</h3>
                <div className="difficulty-badge" style={{
                  padding: "4px 8px",
                  backgroundColor: getDifficultyColor(questions[currentQuestion].difficulty),
                  color: "white",
                  borderRadius: "4px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  textTransform: "uppercase"
                }}>
                  {questions[currentQuestion].difficulty}
                </div>
              </div>
              
              <p className="question" style={{
                fontSize: "18px",
                color: "#1a202c",
                marginBottom: "15px",
                fontWeight: "500"
              }}>
                {questions[currentQuestion].text}
              </p>
              
              <div className="key-points" style={{
                backgroundColor: "#f7fafc",
                padding: "12px",
                borderRadius: "6px",
                border: "1px solid #e2e8f0"
              }}>
                <h4 style={{ margin: "0 0 8px 0", color: "#4a5568", fontSize: "14px" }}>Key points to address:</h4>
                <ul style={{ margin: 0, paddingLeft: "20px" }}>
                  {questions[currentQuestion].keyPoints.map((point, index) => (
                    <li key={index} style={{ color: "#4a5568", fontSize: "14px" }}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* User response area or feedback */}
            {!showFeedback ? (
              <div className="response-area" style={{
                marginBottom: "20px"
              }}>
                <textarea
                  value={userResponse}
                  onChange={(e) => setUserResponse(e.target.value)}
                  placeholder="Type your response here..."
                  disabled={!isLoaded || timeRemaining === 0}
                  style={{
                    width: "100%",
                    minHeight: "150px",
                    padding: "12px",
                    borderRadius: "6px",
                    border: "1px solid #cbd5e0",
                    fontSize: "16px",
                    fontFamily: "inherit",
                    resize: "vertical"
                  }}
                />
                
                <div className="confidence-meter" style={{
                  marginTop: "15px"
                }}>
                  <label style={{ display: "block", marginBottom: "8px", color: "#4a5568" }}>
                    Confidence Level: {confidenceLevel}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={confidenceLevel}
                    onChange={(e) => setConfidenceLevel(parseInt(e.target.value))}
                    style={{
                      width: "100%",
                      height: "8px",
                      borderRadius: "4px"
                    }}
                  />
                  <div style={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    fontSize: "12px",
                    color: "#718096",
                    marginTop: "5px"
                  }}>
                    <span>Not Confident</span>
                    <span>Very Confident</span>
                  </div>
                </div>
                
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                  <button
                    onClick={submitResponse}
                    disabled={!isLoaded || userResponse.trim().length < 10}
                    style={{
                      padding: "10px 24px",
                      backgroundColor: userResponse.trim().length < 10 ? "#a0aec0" : "#4299e1",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      fontSize: "16px",
                      fontWeight: "500",
                      cursor: userResponse.trim().length < 10 ? "not-allowed" : "pointer",
                      transition: "background-color 0.3s"
                    }}
                  >
                    Submit Response
                  </button>
                </div>
              </div>
            ) : (
              <div className="feedback-container" style={{
                padding: "20px",
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
              }}>
                <h3 style={{ color: "#2d3748", marginTop: 0 }}>Interviewer Feedback</h3>
                
                {feedback && (
                  <>
                    <div className="points-earned" style={{
                      display: "flex",
                      justifyContent: "space-around",
                      marginBottom: "20px"
                    }}>
                      <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: "24px", fontWeight: "bold", color: "#3182ce" }}>
                          {feedback.points}
                        </div>
                        <div style={{ color: "#4a5568", fontSize: "14px" }}>
                          Points Earned
                        </div>
                      </div>
                      
                      <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: "24px", fontWeight: "bold", color: "#805ad5" }}>
                          {feedback.bonus}
                        </div>
                        <div style={{ color: "#4a5568", fontSize: "14px" }}>
                          Confidence Bonus
                        </div>
                      </div>
                      
                      <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: "24px", fontWeight: "bold", color: "#38a169" }}>
                          {Math.floor(feedback.points / 2)}
                        </div>
                        <div style={{ color: "#4a5568", fontSize: "14px" }}>
                          EduTokens
                        </div>
                      </div>
                    </div>
                    
                    <div className="feedback-text" style={{
                      padding: "15px",
                      backgroundColor: "#ebf8ff",
                      borderRadius: "6px",
                      marginBottom: "20px",
                      borderLeft: "4px solid #4299e1"
                    }}>
                      <p style={{ margin: 0, color: "#2c5282" }}>
                        {feedback.feedback}
                      </p>
                    </div>
                  </>
                )}
                
                <div className="user-response-display" style={{
                  padding: "15px",
                  backgroundColor: "#f7fafc",
                  borderRadius: "6px",
                  marginBottom: "20px"
                }}>
                  <h4 style={{ margin: "0 0 10px 0", color: "#4a5568" }}>Your Response:</h4>
                  <p style={{ margin: 0, color: "#1a202c", whiteSpace: "pre-wrap" }}>{userResponse}</p>
                </div>
                
                <div style={{ textAlign: "center" }}>
                  <button
                    onClick={nextQuestion}
                    style={{
                      padding: "10px 24px",
                      backgroundColor: "#4299e1",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      fontSize: "16px",
                      fontWeight: "500",
                      cursor: "pointer",
                      transition: "background-color 0.3s"
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = "#3182ce"}
                    onMouseOut={(e) => e.target.style.backgroundColor = "#4299e1"}
                  >
                    {currentQuestion < questions.length - 1 ? "Next Question" : "Complete Interview"}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      
      {/* Game instructions and tips */}
      <div className="game-tips" style={{
        padding: "15px",
        backgroundColor: "#fffaf0",
        borderRadius: "8px",
        border: "1px solid #feebc8",
        marginTop: "20px"
      }}>
        <h4 style={{ margin: "0 0 10px 0", color: "#744210" }}>Interview Tips:</h4>
        <ul style={{ margin: 0, paddingLeft: "20px" }}>
          <li style={{ color: "#744210", marginBottom: "5px" }}>Address all key points to maximize your score</li>
          <li style={{ color: "#744210", marginBottom: "5px" }}>Your confidence level affects your bonus points</li>
          <li style={{ color: "#744210", marginBottom: "5px" }}>Practice active listening and eye contact</li>
            <li style={{ color: "#744210", marginBottom: "5px" }}>Use clear and professional language</li>

        </ul>

        <p style={{ color: "#9b2c2c", marginTop: "10px" }}>

        </p>
        </div>
    </div>
    );
}

export default InterviewSimulation;

