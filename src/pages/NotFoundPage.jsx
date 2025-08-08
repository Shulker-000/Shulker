import React, { useEffect } from "react";
import { motion } from "framer-motion";

// --- SVG Icons (Self-contained for simplicity) ---
const ArrowLeft = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);
const Home = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);
const LogoIcon = (props) => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4Z"
      fill="url(#paint0_linear_1_2)"
    />
    <path
      d="M24 10C16.268 10 10 16.268 10 24C10 31.732 16.268 38 24 38C31.732 38 38 31.732 38 24C38 16.268 31.732 10 24 10Z"
      stroke="white"
      strokeWidth="2"
    />
    <path
      d="M24 16C19.5817 16 16 19.5817 16 24C16 28.4183 19.5817 32 24 32C28.4183 32 32 28.4183 32 24C32 19.5817 28.4183 16 24 16Z"
      stroke="white"
      strokeWidth="2"
    />
    <defs>
      <linearGradient
        id="paint0_linear_1_2"
        x1="4"
        y1="4"
        x2="44"
        y2="44"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4F46E5" />
        <stop offset="1" stopColor="#A259FF" />
      </linearGradient>
    </defs>
  </svg>
);

// A decorative component for the background
const FloatingShape = ({ className, initial, animate }) => (
  <motion.div
    className={`absolute rounded-full ${className}`}
    initial={initial}
    animate={animate}
    transition={{
      duration: 20,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    }}
  />
);

// --- Main Not Found Page Component ---
const App = () => {

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const numberVariant = {
    hidden: { opacity: 0, scale: 0.5, y: 50 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        type: "spring",
        stiffness: 120,
        damping: 10,
      },
    }),
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-50 font-sans">
      {/* Left Column: Visual Branding */}
      <div className="hidden lg:flex w-full lg:w-5/12 flex-col items-center justify-center bg-gray-900 p-12 text-white text-center overflow-hidden relative">
        {/* Decorative floating shapes for a more dynamic background */}
        <FloatingShape
          className="w-64 h-64 bg-indigo-500/10"
          initial={{ x: -100, y: -150 }}
          animate={{ x: 100, y: 150 }}
        />
        <FloatingShape
          className="w-48 h-48 bg-purple-500/10"
          initial={{ x: 150, y: 100 }}
          animate={{ x: -50, y: -100 }}
        />
        <FloatingShape
          className="w-32 h-32 bg-indigo-500/5"
          initial={{ x: 50, y: -200 }}
          animate={{ x: -150, y: 200 }}
        />

        <motion.div
          className="flex flex-col items-center z-10"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="flex items-center justify-center">
            <motion.span
              custom={0}
              variants={numberVariant}
              className="text-[12rem] font-black tracking-tighter text-white/80 select-none"
            >
              4
            </motion.span>
            <motion.div
              className="px-4"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1, rotate: 360 }}
              transition={{
                scale: { delay: 0.4, type: "spring", stiffness: 100 },
                opacity: { delay: 0.4, duration: 0.4 },
                rotate: {
                  delay: 0.8,
                  repeat: Infinity,
                  duration: 15,
                  ease: "linear",
                },
              }}
            >
              <LogoIcon className="w-40 h-40" />
            </motion.div>
            <motion.span
              custom={1}
              variants={numberVariant}
              className="text-[12rem] font-black tracking-tighter text-white/80 select-none"
            >
              4
            </motion.span>
          </div>
          <motion.h1
            variants={itemVariants}
            className="-mt-8 text-4xl font-bold tracking-tight"
          >
            Page Not Found
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="mt-2 text-lg text-gray-300 max-w-sm mx-auto"
          >
            It seems you've ventured into uncharted territory.
          </motion.p>
        </motion.div>
      </div>

      {/* Right Column: Content and Actions */}
      <div className="flex w-full lg:w-7/12 items-center justify-center p-6 sm:p-12">
        <motion.div
          className="w-full max-w-md"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={itemVariants}
            className="lg:hidden mb-8 text-center"
          >
            <LogoIcon className="w-12 h-12 mx-auto" />
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl lg:text-4xl font-bold text-gray-900 text-center lg:text-left"
          >
            Oops! This page has gone missing.
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mt-4 text-lg text-gray-600 text-center lg:text-left"
          >
            You might have mistyped the address, or the page has been moved.
            Let's get you back on track.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <a
              href="/"
              className="w-full sm:w-auto flex justify-center items-center bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg text-base font-semibold shadow-lg hover:shadow-indigo-500/40 transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-indigo-500/50"
            >
              <Home className="mr-2 w-5 h-5" />
              Go to Homepage
            </a>
            <button
              // This uses the browser's history API to go back.
              // In a single-page app with a router, this won't cause a full page reload.
              onClick={() => window.history.back()}
              className="w-full sm:w-auto flex justify-center items-center bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 px-6 py-3 rounded-lg text-base font-semibold shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <ArrowLeft className="mr-2 w-5 h-5" />
              Go Back
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default App;
