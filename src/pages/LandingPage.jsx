import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ClipboardList, Users, ChevronDown } from "lucide-react";

// --- SVG Icons (Self-contained for simplicity) ---
const BrainCircuit = (props) => (
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
    <path d="M12 5a3 3 0 1 0-5.993.142M12 5a3 3 0 1 1 5.993.142M15 13a3 3 0 1 0-5.993.142M15 13a3 3 0 1 1 5.993.142M9 13a3 3 0 1 0-5.993.142M9 13a3 3 0 1 1 5.993.142M6.007 12.858A3 3 0 1 0 5.865 7M6.007 12.858A3 3 0 1 1 12 13m-6.135-6A3 3 0 1 0 12 5m-0.142 8.007A3 3 0 1 0 12 19m0-6a3 3 0 1 1 6.135-0.007M12 19a3 3 0 1 0 5.993-.142M12 19a3 3 0 1 1-5.993-.142m11.993-6.142A3 3 0 1 0 18.135 7m-0.277 6.007A3 3 0 1 0 15 13" />
    <path d="M12 5a3 3 0 1 0-6 0" />
    <path d="M12 5a3 3 0 1 1 6 0" />
    <path d="M15 13a3 3 0 1 0-6 0" />
    <path d="M15 13a3 3 0 1 1 6 0" />
    <path d="M9 13a3 3 0 1 0-6 0" />
    <path d="M9 13a3 3 0 1 1 6 0" />
    <path d="M6 13a3 3 0 1 0 0-6" />
    <path d="M6 7a3 3 0 1 1 6 0" />
    <path d="M12 13a3 3 0 1 0 0 6" />
    <path d="M12 19a3 3 0 1 1 6 0" />
    <path d="M18 13a3 3 0 1 1-6 0" />
    <path d="M18 7a3 3 0 1 0 0 6" />
  </svg>
);
const MessageSquareText = (props) => (
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
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <path d="M13 8H7" />
    <path d="M17 12H7" />
  </svg>
);
const Zap = (props) => (
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
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
const ArrowRight = (props) => (
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
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);
const TwitterIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M22.46 6c-.77.35-1.6.58-2.46.67.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.22-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.94.08c.55 1.7 2.14 2.93 4.03 2.96-1.46 1.14-3.3 1.82-5.3 1.82-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21c7.34 0 11.35-6.08 11.35-11.35 0-.17 0-.34-.01-.51.78-.57 1.45-1.29 1.99-2.09z" />
  </svg>
);
const LinkedInIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

// --- Reusable Animation Variants ---
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut", staggerChildren: 0.3 },
  },
};

// --- Data ---
const features = [
  {
    icon: BrainCircuit,
    title: "AI-Powered Intelligence",
    description:
      "Go beyond simple transcription. Our AI identifies key topics, action items, and sentiment, turning raw conversation into structured data.",
    image:
      "https://images.unsplash.com/photo-1677756119517-756a188d2d94?q=80&w=2670&auto=format&fit=crop",
    color: "text-violet-500",
    bgColor: "bg-violet-100",
  },
  {
    icon: MessageSquareText,
    title: "Flawless Transcription",
    description:
      "Experience industry-leading accuracy in real-time. Our advanced speech recognition engine captures every word with precision.",
    image:
      "https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=2670&auto=format&fit=crop",
    color: "text-sky-500",
    bgColor: "bg-sky-100",
  },
  {
    icon: Zap,
    title: "Seamless Automation",
    description:
      "Connect Shulker to your workflow. Automatically push summaries to Slack, create tasks in Asana, or update your CRM.",
    image:
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2831&auto=format&fit=crop",
    color: "text-emerald-500",
    bgColor: "bg-emerald-100",
  },
];

// --- Main Page Component ---
const App = () => {
  return (
    <div className="bg-white font-sans text-gray-800 antialiased flex flex-col min-h-screen">
      <main>
        <HeroSection />
        <CreativeFeaturesSection />
        <CTASection />
      </main>
    </div>
  );
};

const HeroSection = () => (
  <section
    className="relative flex items-center justify-center text-white"
    style={{ minHeight: "calc(100vh - 4rem)" }}
  >
    <div className="absolute inset-0 z-0">
      <img
        src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2684&auto=format&fit=crop"
        alt="Team collaborating in a modern office"
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://placehold.co/1920x1080/111827/FFFFFF?text=Hero+Image";
        }}
      />
      <div className="absolute inset-0 bg-gray-900/70 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
    </div>
    <div className="relative z-10 text-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
          Meetings Without the Meeting Notes
        </h1>
        <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-gray-200">
          The AI assistant that transcribes, summarizes, and automates your
          calls. Focus on the conversation—we'll handle the rest.
        </p>
        <div className="mt-10 flex flex-col transition-transform sm:flex-row justify-center items-center gap-4">
          <Button href="/signup" variant="primary" size="large" className=" hover:scale-110">
            Get Started Free <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
);

// const CreativeFeaturesSection = () => {
//   const [activeTab, setActiveTab] = useState(0);
//   const activeFeature = features[activeTab];
//   const tabContentVariants = {
//     initial: { opacity: 0, x: 20 },
//     enter: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
//     exit: { opacity: 0, x: -20, transition: { duration: 0.3, ease: "easeIn" } },
//   };

//   return (
//     <section id="features" className="bg-slate-50 py-20 lg:pt-12 lg:pb-6 px-6">
//       <motion.div
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.2 }}
//         variants={sectionVariants}
//         className="text-center max-w-3xl mx-auto"
//       >
//         <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
//           A Smarter Way to Meet
//         </h2>
//         <p className="mt-4 text-lg text-gray-600">
//           Shulker is more than an assistant; it's your new competitive
//           advantage. Explore how we transform every conversation.
//         </p>
//       </motion.div>

//       <div className="mt-16 w-full max-w-7xl mx-auto">
//         <div className="flex flex-col md:flex-row gap-10 lg:gap-16 items-start">
//           <div className="w-full md:w-1/3 flex md:flex-col justify-center md:justify-start space-y-2">
//             {features.map((feature, index) => (
//               <button
//                 key={feature.title}
//                 onClick={() => setActiveTab(index)}
//                 className={`w-4/5 text-left p-4 m-5 -ml- rounded-lg transition-all duration-300 flex items-center gap-4 ${
//                   activeTab === index
//                     ? "bg-white text-indigo-700 shadow-md scale-105"
//                     : "text-gray-500 hover:bg-white/70 hover:text-gray-900"
//                 }`}
//               >
//                 <div className={`p-2 rounded-md ${feature.bgColor}`}>
//                   <feature.icon className={`w-6 h-6 ${feature.color}`} />
//                 </div>
//                 <span className="font-semibold text-base">{feature.title}</span>
//               </button>
//             ))}
//           </div>
//           <div className="relative w-full md:w-2/3 min-h-[450px]">
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={activeTab}
//                 variants={tabContentVariants}
//                 initial="initial"
//                 animate="enter"
//                 exit="exit"
//                 className="absolute inset-0 w-full h-full"
//               >
//                 <div className="w-full h-full grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
//                   <div className="lg:col-span-3 w-full h-80 rounded-2xl overflow-hidden shadow-2xl group">
//                     <img
//                       src={activeFeature.image}
//                       alt={activeFeature.title}
//                       className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//                       onError={(e) => {
//                         e.target.onerror = null;
//                         e.target.src =
//                           "https://placehold.co/800x600/cccccc/FFFFFF?text=Image+Not+Found";
//                       }}
//                     />
//                   </div>
//                   <div className="lg:col-span-2">
//                     <p className="text-lg md:text-xl font-medium text-gray-600 leading-relaxed">
//                       {activeFeature.description}
//                     </p>
//                   </div>
//                 </div>
//               </motion.div>
//             </AnimatePresence>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };




const CreativeFeaturesSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  // Variants for the desktop tab content (unchanged)
  const tabContentVariants = {
    initial: { opacity: 0, x: 20 },
    enter: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3, ease: "easeIn" } },
  };

  // The 'accordionContentVariants' are no longer needed, replaced by the layout prop.

  return (
    <section id="features" className="bg-slate-50 py-22 lg:pt-12 lg:pb-6 px-6">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="text-center max-w-3xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          A Smarter Way to Meet
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Shulker is more than an assistant; it's your new competitive
          advantage. Explore how we transform every conversation.
        </p>
      </motion.div>

      <div className="mt-16 w-full max-w-7xl mx-auto">

        {/* Desktop View */}

        <div className="hidden md:flex flex-col md:flex-row gap-10 lg:gap-16 items-start">
          <div className="w-full md:w-1/3 flex md:flex-col justify-center md:justify-start space-y-2">
            {features.map((feature, index) => (
              <button
                key={feature.title}
                onClick={() => setActiveTab(index)} // Desktop keeps the original logic
                className={`w-4/5 text-left p-4 rounded-lg transition-all duration-300 flex items-center gap-4 ${
                  activeTab === index
                    ? "bg-white text-indigo-700 shadow-md scale-105"
                    : "text-gray-500 hover:bg-white/70 hover:text-gray-900"
                }`}
              >
                <div className={`p-2 rounded-md ${feature.bgColor}`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <span className="font-semibold text-base">{feature.title}</span>
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-2/3 min-h-[450px]">
            <AnimatePresence mode="wait">

              <motion.div
                key={activeTab}
                variants={tabContentVariants}
                initial="initial"
                animate="enter"
                exit="exit"
                className="absolute inset-0 w-full h-full"
              >
                <div className="w-full h-full grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
                  <div className="lg:col-span-3 w-full h-80 rounded-2xl overflow-hidden shadow-2xl group">
                    <img
                      src={features[activeTab]?.image}
                      alt={features[activeTab]?.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="lg:col-span-2">
                    <p className="text-lg md:text-xl font-medium text-gray-600 leading-relaxed">
                      {features[activeTab]?.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile View */}

        <div className="md:hidden w-full flex flex-col gap-3">
          {features.map((feature, index) => {
            const isOpen = activeTab === index;
            return (
              <motion.div
                key={feature.title}
                layout // ✨ This prop enables smooth, automatic layout animations!
                transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                className="bg-white/80 rounded-lg shadow-sm overflow-hidden"
              >
                <motion.button
                  layout // Ensures the button itself animates smoothly
                  onClick={() => setActiveTab(isOpen ? null : index)} // ✨ Click again to close
                  className="w-full p-4 text-left flex justify-between items-center"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-md ${feature.bgColor}`}>
                      <feature.icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <span className="font-semibold text-base text-gray-800">{feature.title}</span>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }} // Animate chevron rotation
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-gray-500" aria-hidden="true" />
                  </motion.div>
                </motion.button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, transition: { delay: 0.1, duration: 0.3 } }}
                      exit={{ opacity: 0, transition: { duration: 0.2 } }}
                      className="px-4 pb-4" // Padding moved here from an inner div
                    >
                      <div className="mt-2 mb-4 w-full h-56 rounded-lg overflow-hidden shadow-lg group">
                        <img src={feature.image} alt={feature.title} className="w-full h-full object-cover"/>
                      </div>
                      <p className="text-gray-600">{feature.description}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};


const CTASection = () => (
  <section
    id="contact"
    className="relative bg-cover bg-center py-24 sm:py-32"
    style={{
      backgroundImage:
        "url('https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop')",
    }}
  >
    {/* Overlay for text readability */}
    <div className="absolute inset-0 bg-gray-900/60"></div>

    <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={sectionVariants}
      >
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
          Unlock Your Team's Full Potential
        </h2>
        <p className="mt-6 text-lg text-gray-200 max-w-2xl mx-auto">
          Stop losing momentum in meetings. Start building it. Give your team
          the power of perfect recall and automated actions.
        </p>
        <div className="mt-10">
          <Button
            href="/signup"
            variant="primary"
            size="large"
            className="text-indigo-600 hover:bg-gray-100"
          >
            Claim Your Free Account Now
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
);

const Button = ({
  href,
  variant = "primary",
  size = "normal",
  children,
  className = "",
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-4 transform hover:-translate-y-0.5";
  const variantClasses = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-500 focus:ring-indigo-500/50 shadow-lg hover:shadow-indigo-500/40",
    secondary:
      "bg-white text-indigo-600 hover:bg-gray-100 focus:ring-white/50 shadow-lg hover:shadow-white/20",
  };
  const sizeClasses = {
    normal: "px-5 py-2.5 text-sm",
    large: "px-8 py-4 text-base",
  };
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  return (
    <a href={href} className={classes}>
      {children}
    </a>
  );
};

export default App;
