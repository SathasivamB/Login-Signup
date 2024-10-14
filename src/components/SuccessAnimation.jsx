// SuccessAnimation.js
import React from "react";
import { motion } from "framer-motion";

const SuccessAnimation = () => {
  return (
    <motion.div
      className="success-animation"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      🎉 Success! You are logged in!
    </motion.div>
  );
};

export default SuccessAnimation;
