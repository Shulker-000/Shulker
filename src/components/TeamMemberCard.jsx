import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

// Animation variants can be passed as props or defined here
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 + index * 0.2, // Stagger animation for each card
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const TeamMemberCard = ({ member, index }) => {
  const { name, role, bio, imageUrl, githubUrl, linkedinUrl } = member;
  const placeholderImage =
    "https://placehold.co/400x400/e2e8f0/4a5568?text=N/A";

  return (
    <motion.div
      className="flex flex-col items-center text-center bg-white p-8 rounded-2xl shadow-lg transition-shadow duration-300 hover:shadow-indigo-500/20"
      custom={index}
      initial="hidden"
      animate="visible"
      variants={cardVariants}
    >
      <img
        src={imageUrl}
        alt={`Profile of ${name}`}
        className="w-40 h-40 rounded-full object-cover mb-6 border-4 border-indigo-100"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = placeholderImage;
        }}
      />
      <h3 className="text-2xl font-bold text-gray-900">{name}</h3>
      <p className="text-indigo-600 font-semibold text-md mb-3">{role}</p>
      <p className="text-gray-600 text-sm max-w-md flex-grow">{bio}</p>
      <div className="flex items-center space-x-4 mt-6">
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name}'s Github Profile`}
          className="text-gray-400 hover:text-gray-900 transition-colors"
        >
          <FaGithub className="w-6 h-6" />
        </a>
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name}'s LinkedIn Profile`}
          className="text-gray-400 hover:text-indigo-600 transition-colors"
        >
          <FaLinkedin className="w-6 h-6" />
        </a>
      </div>
    </motion.div>
  );
};

export default TeamMemberCard;
