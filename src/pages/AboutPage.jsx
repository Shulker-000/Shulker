import React from 'react';
import { motion } from 'framer-motion';
import aditya from '../assets/images/team/aditya.png'
import vansh from '../assets/images/team/vansh.png'
import vasu from '../assets/images/team/vasu.png'

// --- SVG Icons (Self-contained for simplicity) ---
const GithubIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const LinkedinIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

// --- Team Member Data ---
const teamMembers = [
  {
    name: 'Aditya Kumar Goyal',
    role: 'Frontend Developer',
    bio: 'Aditya is passionate about creating beautiful and intuitive user interfaces. With a keen eye for detail, he brings designs to life with clean and efficient code.',
    imageUrl: aditya,
    githubUrl: 'https://github.com/aditya100905/',
    linkedinUrl: 'https://www.linkedin.com/in/aditya100905/',
  },
  {
    name: 'Vansh Verma',
    role: 'Backend Specialist',
    bio: 'Vansh architects and maintains the robust server-side logic that powers our applications. He excels at database design and API development.',
    imageUrl: vansh, // Using initials for placeholder
    githubUrl: 'https://github.com/vansh-000/',
    linkedinUrl: 'https://www.linkedin.com/in/vansh000/',
  },
  {
    name: 'Vasu Goel',
    role: 'ML Engineer',
    bio: 'Vasu is the creative force behind our user experience, focusing on user research and crafting visually appealing, user-friendly designs.',
    imageUrl: vasu,
    githubUrl: 'https://github.com/vasug27',
    linkedinUrl: 'https://www.linkedin.com/in/vasugoel503/',
  },
];

// --- Main About Page Component ---
const AboutPage = () => {
  // Animation Variants
  const headerVariants = {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  const teamItemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (index) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.5 + index * 0.2, // Stagger animation after header
        duration: 0.6,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 font-sans p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* --- Header Section --- */}
        <motion.header
          className="text-center mb-16"
          initial="hidden"
          animate="visible"
          variants={headerVariants}
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            <span className="block">Tired of boring meetings?</span>
            <span className="block text-indigo-600">So were we.</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600">
            Tools like Zoom and Google Meet are functional, but often inefficient and uninspiring. We're on a mission to build a communication platform that's not just about talking, but about collaborating effectively and having fun while you do it.
          </p>
        </motion.header>

        {/* --- Team Section --- */}
        <div className="space-y-12">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">The Minds Behind the Mission</h2>
            {teamMembers.map((member, index) => (
                <motion.div
                    key={member.name}
                    className="flex flex-col sm:flex-row items-center bg-white p-6 rounded-xl shadow-md transition-shadow duration-300 hover:shadow-lg"
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={teamItemVariants}
                >
                    <img
                        src={member.imageUrl}
                        alt={`Profile of ${member.name}`}
                        className="w-40 h-40 rounded-full object-fit mb-6 sm:mb-0 sm:mr-8 border-4 border-indigo-100"
                        onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/400x400/cccccc/ffffff?text=Error'; }}
                    />
                    <div className="text-center sm:text-left">
                        <h3 className="text-2xl font-bold text-gray-900">{member.name}</h3>
                        <p className="text-indigo-600 font-semibold text-md">{member.role}</p>
                        <p className="text-gray-600 mt-2 text-sm max-w-md">{member.bio}</p>
                        <div className="flex items-center justify-center sm:justify-start space-x-4 mt-4">
                            <a href={member.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`${member.name}'s Github Profile`} className="text-gray-400 hover:text-gray-800 transition-colors">
                                <GithubIcon className="w-6 h-6" />
                            </a>
                            <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label={`${member.name}'s LinkedIn Profile`} className="text-gray-400 hover:text-indigo-600 transition-colors">
                                <LinkedinIcon className="w-6 h-6" />
                            </a>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>

      </div>
    </div>
  );
};

export default AboutPage;