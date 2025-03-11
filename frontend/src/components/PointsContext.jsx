import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

// Create the points context
const PointsContext = createContext(null);

// Custom hook to use the points context
export const usePoints = () => {
  const context = useContext(PointsContext);
  if (!context) {
    throw new Error('usePoints must be used within a PointsProvider');
  }
  return context;
};

// Points provider component
export const PointsProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [points, setPoints] = useState(0);
  const [pointsHistory, setPointsHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load initial points when user authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      fetchUserPoints();
    }
  }, [isAuthenticated, user]);

  // Fetch user points from API
  const fetchUserPoints = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const response = await axios.get('/api/user/points');
      setPoints(response.data.totalPoints);
      setPointsHistory(response.data.history || []);
    } catch (err) {
      console.error('Failed to fetch user points:', err);
      setError('Could not load your points. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Add points to user account
  const addPoints = async (amount, source = 'activity', details = {}) => {
    if (!user || amount <= 0) return;
    
    setLoading(true);
    try {
      const response = await axios.post('/api/user/points/add', {
        amount,
        source,
        details
      });
      
      // Update local state with new points total
      setPoints(response.data.totalPoints);
      
      // Add new transaction to history
      const newTransaction = {
        id: response.data.transactionId || Date.now(),
        amount,
        source,
        details,
        timestamp: new Date().toISOString(),
        type: 'credit'
      };
      
      setPointsHistory(prev => [newTransaction, ...prev]);
      
      // Show visual celebration effect
      celebratePoints(amount);
      
      return response.data;
    } catch (err) {
      console.error('Failed to add points:', err);
      setError('Failed to add points to your account. Please try again.');
      throw new Error('Failed to add points');
    } finally {
      setLoading(false);
    }
  };

  // Spend points from user account
  const spendPoints = async (amount, reason = 'purchase', details = {}) => {
    if (!user || amount <= 0) return;
    
    // Check if user has enough points
    if (points < amount) {
      setError('Insufficient points for this transaction');
      throw new Error('Insufficient points');
    }
    
    setLoading(true);
    try {
      const response = await axios.post('/api/user/points/spend', {
        amount,
        reason,
        details
      });
      
      // Update local state with new points total
      setPoints(response.data.totalPoints);
      
      // Add new transaction to history
      const newTransaction = {
        id: response.data.transactionId || Date.now(),
        amount: -amount,
        reason,
        details,
        timestamp: new Date().toISOString(),
        type: 'debit'
      };
      
      setPointsHistory(prev => [newTransaction, ...prev]);
      
      return response.data;
    } catch (err) {
      console.error('Failed to spend points:', err);
      setError('Failed to complete the transaction. Please try again.');
      throw new Error('Failed to spend points');
    } finally {
      setLoading(false);
    }
  };

  // Visual celebration effect when earning points
  const celebratePoints = (amount) => {
    // This function would trigger visual effects like confetti
    // For now, we'll just log to console
    console.log(`🎉 Congratulations! You earned ${amount} points!`);
    
    // In a real implementation, you could use a library like react-confetti
    // or trigger animations defined elsewhere in your app
  };

  // Context value
  const value = {
    points,
    pointsHistory,
    loading,
    error,
    addPoints,
    spendPoints,
    refreshPoints: fetchUserPoints
  };

  return <PointsContext.Provider value={value}>{children}</PointsContext.Provider>;
};

export default PointsContext;