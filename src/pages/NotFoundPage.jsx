import React from "react";
import { motion } from "framer-motion";
import NF404 from "./../assets/images/404.png";
import { Home, ArrowLeft } from "lucide-react";


const DisconnectedWire = (props) => (
    <img src={NF404} className="h-52 w-52 p-0 -mb-5" alt="NOT FOUND" />
);


// --- Unchanged Decorative Component for Desktop ---
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
    // Animation variants for Framer Motion (unchanged)
    const containerVariants = {
        hidden: { opacity: 0, scale: 0.98 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 120 },
        },
    };
    
    // Unchanged variant for desktop "404" numbers
    const numberVariant = {
        hidden: { opacity: 0, scale: 0.5, y: 50 },
        visible: (i) => ({
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                delay: i * 0.15,
                type: "spring",
                stiffness: 120,
                damping: 10,
            },
        }),
    };

    return (
        <div className="font-sans">
            {/* --- ✨ IMPROVED Mobile View (White Theme) --- */}
            <div className="flex min-h-screen w-full flex-col items-center justify-center bg-white p-6 text-center lg:hidden">
                 <motion.div
                    className="flex w-full max-w-sm flex-col items-center"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={itemVariants}>
                       <DisconnectedWire className="h-28 w-28 text-gray-400" />
                    </motion.div>

                    <motion.h1 variants={itemVariants} className="mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-8xl font-black text-transparent">
                        404
                    </motion.h1>

                    <motion.h2 variants={itemVariants} className="mt-4 text-3xl font-bold tracking-tight text-gray-800">
                        Connection Lost
                    </motion.h2>

                    <motion.p variants={itemVariants} className="mt-2 text-base text-gray-600">
                       We can't seem to find the page you're looking for. The link may be broken.
                    </motion.p>

                    <motion.div variants={itemVariants} className="mt-10 flex w-full flex-col gap-4">
                        <a href="/" className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:bg-indigo-700 hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-indigo-500/50">
                            <Home className="h-5 w-5" />
                            Go to Homepage
                        </a>
                        <button onClick={() => window.history.back()} className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-200 px-6 py-3.5 text-base font-semibold text-gray-800 shadow-md transition-all duration-300 hover:bg-gray-300 hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-gray-500/50">
                            <ArrowLeft className="h-5 w-5" />
                            Go Back
                        </button>
                    </motion.div>
                </motion.div>
            </div>
            
            {/* --- Unchanged Desktop View --- */}
            <div className="hidden lg:flex min-h-screen w-full">
                <div className="flex w-1/2 flex-col items-center justify-center bg-gray-900 p-12 text-white text-center overflow-hidden relative">
                    <FloatingShape className="w-64 h-64 bg-indigo-500/10" initial={{ x: -100, y: -150 }} animate={{ x: 100, y: 150 }} />
                    <FloatingShape className="w-48 h-48 bg-purple-500/10" initial={{ x: 150, y: 100 }} animate={{ x: -50, y: -100 }} />
                    <motion.div className="flex flex-col items-center z-10" initial="hidden" animate="visible" variants={containerVariants}>
                        <div className="flex items-center justify-center">
                            <motion.span custom={0} variants={numberVariant} className="text-[12rem] font-black tracking-tighter text-white/80 select-none">4</motion.span>
                            <motion.span custom={1} variants={numberVariant} className="text-[12rem] px-4 font-black tracking-tighter text-white/80 select-none">0</motion.span>
                            <motion.span custom={2} variants={numberVariant} className="text-[12rem] font-black tracking-tighter text-white/80 select-none">4</motion.span>
                        </div>
                        <motion.h1 variants={itemVariants} className="-mt-8 text-4xl font-bold tracking-tight">Page Not Found</motion.h1>
                        <motion.p variants={itemVariants} className="mt-2 text-lg text-gray-300 max-w-sm mx-auto">It seems you've ventured into uncharted territory.</motion.p>
                    </motion.div>
                </div>

                <div className="flex w-1/2 items-center justify-center p-6 sm:p-12 bg-gray-50">
                    <motion.div className="w-full max-w-md text-left" variants={containerVariants} initial="hidden" animate="visible">
                        <motion.h2 variants={itemVariants} className="text-3xl lg:text-4xl font-bold text-gray-900">Oops! This page has gone missing.</motion.h2>
                        <motion.p variants={itemVariants} className="mt-4 text-lg text-gray-600">You might have mistyped the address, or the page has been moved. Let's get you back on track.</motion.p>
                        <motion.div variants={itemVariants} className="mt-10 flex flex-col sm:flex-row items-center justify-start gap-4">
                            <a href="/" className="flex w-full sm:w-auto justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg text-base font-semibold shadow-lg hover:shadow-indigo-500/40 transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-indigo-500/50">
                                 <Home className="h-5 w-5" />
                                Go to Homepage
                            </a>
                            <button onClick={() => window.history.back()} className="flex w-full sm:w-auto justify-center items-center gap-2 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 px-6 py-3 rounded-lg text-base font-semibold shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <ArrowLeft className="h-5 w-5" />
                                Go Back
                            </button>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default App;