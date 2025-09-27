import React from "react";
import { motion } from "framer-motion";

const Loader = () => (
  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white bg-opacity-95">
    <motion.div
      className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
      style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
      aria-label="Loading"
    />
    <motion.p
      className="mt-6 text-lg font-medium text-gray-600"
      initial={{ opacity: 0.6 }}
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 1.2, repeat: Infinity }}
    >
      Loading
    </motion.p>
  </div>
);

export default Loader;
