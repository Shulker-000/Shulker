import React from 'react';
import { motion } from 'framer-motion';

// --- SVG Icons (Self-contained for simplicity) ---
const GithubIcon = (props) => (
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
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const LinkedinIcon = (props) => (
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
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

// --- Team Member Data ---
// You can replace this placeholder data with your actual team members' information.
const teamMembers = [
  {
    name: 'Aditya Kumar Goyal',
    role: 'Frontend Developer',
    bio: 'Aditya is passionate about creating beautiful and intuitive user interfaces. With a keen eye for detail, he brings designs to life with clean and efficient code.',
    imageUrl: 'https://placehold.co/400x400/818cf8/ffffff?text=AD',
    githubUrl: 'https://github.com/aditya100905/', // Replace with actual GitHub URL
    linkedinUrl: 'https://www.linkedin.com/in/aditya100905/', // Replace with actual LinkedIn URL
  },
  {
    name: 'Vansh Verma',
    role: 'Backend Specialist',
    bio: 'Vansh architects and maintains the robust server-side logic that powers our applications. He excels at database design and API development.',
    imageUrl: 'https://placehold.co/400x400/a78bfa/ffffff?text=JS',
    githubUrl: 'https://github.com/vansh-000/', // Replace with actual GitHub URL
    linkedinUrl: 'https://www.linkedin.com/in/vansh000/', // Replace with actual LinkedIn URL
  },
  {
    name: 'Vasu Goel',
    role: 'ML Engineer',
    bio: 'Vasu is the creative force behind our user experience, focusing on user research and crafting visually appealing, user-friendly designs.',
    imageUrl: 'https://placehold.co/400x400/f472b6/ffffff?text=TJ',
    githubUrl: 'https://github.com/vasug27', // Replace with actual GitHub URL
    linkedinUrl: 'https://www.linkedin.com/in/vasugoel503/', // Replace with actual LinkedIn URL
  },
];

// --- Team Member Card Component ---
const TeamMemberCard = ({ member, index }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.2,
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out group"
      variants={cardVariants}
    >
      <div className="relative">
        <img
          src={member.imageUrl}
          alt={`Profile of ${member.name}`}
          className="w-full h-56 object-cover"
           onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/400x400/cccccc/ffffff?text=Image+Error'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="text-2xl font-bold text-white">{member.name}</h3>
          <p className="text-indigo-200 font-medium">{member.role}</p>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-600 text-sm mb-4 min-h-[60px]">{member.bio}</p>
        <div className="flex items-center space-x-4">
          <a
            href={member.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-800 transition-colors"
            aria-label={`${member.name}'s Github Profile`}
          >
            <GithubIcon className="w-6 h-6" />
          </a>
          <a
            href={member.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-indigo-600 transition-colors"
            aria-label={`${member.name}'s LinkedIn Profile`}
          >
            <LinkedinIcon className="w-6 h-6" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main About Us Page Component ---
const App = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 font-sans p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.header
          className="text-center mb-12"
          initial="hidden"
          animate="visible"
          variants={headerVariants}
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
            Meet Our Team
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-600">
            We are a small, passionate team dedicated to building amazing things. Get to know the people behind the magic.
          </p>
        </motion.header>

        {/* Team Members Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={member.name} member={member} index={index} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default App;
