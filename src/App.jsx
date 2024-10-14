import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Profile from './components/ProfilePage'; // Import Profile component
import { motion } from 'framer-motion';
import './App.css';

const App = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [userCredentials, setUserCredentials] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state to check if logged in

  // Handle login success
  const handleLoginSuccess = (credentials) => {
    setUserCredentials(credentials);
    setIsLoggedIn(true); // Set user as logged in
  };

  // Handle signup success
  const handleSignupSuccess = (credentials) => {
    setUserCredentials(credentials);
    setIsLogin(true); // Switch to login after signup
  };

  return (
    <div className="main-container">
      <motion.div 
        className="background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <img src="" alt="background" className="background-img" />
      </motion.div>

      <div className="form-box">
        {/* Display profile if logged in, otherwise show login/signup forms */}
        {isLoggedIn ? (
          <Profile userCredentials={userCredentials} />
        ) : (
          isLogin ? (
            <LoginForm onLoginSuccess={handleLoginSuccess} userCredentials={userCredentials} />
          ) : (
            <SignupForm setUserCredentials={handleSignupSuccess} />
          )
        )}

        {/* Toggle between login and signup */}
        {!isLoggedIn && (
          <motion.button 
            onClick={() => setIsLogin(!isLogin)}
            whileHover={{ scale: 1.05 }}
            className="toggle-btn"
          >
            {isLogin ? "Go to Signup" : "Go to Login"}
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default App;
