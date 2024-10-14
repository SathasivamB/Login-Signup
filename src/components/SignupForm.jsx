import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { motion } from 'framer-motion';

const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length > 6) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
};

const SignupForm = ({ setUserCredentials }) => {
    const springProps = useSpring({ opacity: 1, from: { opacity: 0 }, delay: 200 });
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');
    const strength = checkPasswordStrength(password);

    const handleSignup = (e) => {
        e.preventDefault();

        if (!username || !email || !password) {
            setError('Please fill in all fields');
            return;
        }

        setError('');
        setUserCredentials({ username, email, password });
        alert('Signup successful! You can now log in.');
    };

    return (
        <animated.div style={springProps}>
            <div className="form-container">
                <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                    Signup
                </motion.h2>
                <motion.form
                    onSubmit={handleSignup}
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <input 
                        type="text" 
                        placeholder='Username' 
                        required 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                    <input 
                        type="email" 
                        placeholder='Email' 
                        required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                        type="password" 
                        placeholder='Password' 
                        required 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    {error && <p className='error'>{error}</p>}
                    <div className="password-strength">
                        <span className={strength >= 1 ? "strength-indicator strong" : "strength-indicator"}></span>
                        <span className={strength >= 2 ? "strength-indicator strong" : "strength-indicator"}></span>
                        <span className={strength >= 3 ? "strength-indicator strong" : "strength-indicator"}></span>
                        <span className={strength >= 4 ? "strength-indicator strong" : "strength-indicator"}></span>
                    </div>
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        Signup
                    </motion.button>
                </motion.form>
            </div>
        </animated.div>
    );
};

export default SignupForm;
