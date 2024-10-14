import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import { motion } from "framer-motion";
import LoadingSpinner from "../components/LoadingSpinner";
import SuccessAnimation from "../components/SuccessAnimation";

const LoginForm = ({ userCredentials, onLoginSuccess }) => {
  const springProps = useSpring({ opacity: 1, from: { opacity: 0 }, delay: 200 });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      if (username === userCredentials?.username && password === userCredentials?.password) {
        setIsSuccess(true);
        onLoginSuccess({ username, email: "user@example.com", password });
        setError('');
      } else {
        setError('Invalid username or password.');
      }
    }, 2000);
  };

  return (
    <animated.div style={springProps}>
      <div className="form-container">
        {isSuccess ? (
          <SuccessAnimation />
        ) : (
          <>
            <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              Login
            </motion.h2>
            <motion.form
              onSubmit={handleSubmit}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <input 
                type="text" 
                placeholder="Username" 
                required 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
              />
              <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
              {error && <p className="error">{error}</p>}
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                {loading ? <LoadingSpinner /> : "Login"}
              </motion.button>
            </motion.form>
          </>
        )}
      </div>
    </animated.div>
  );
};

export default LoginForm;