import React from 'react'
import { motion } from 'framer-motion'

const LoadingSpinner = () => {
  return (
    <motion.div
        className='spinner'
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1 }}
    />
  );
};

export default LoadingSpinner;