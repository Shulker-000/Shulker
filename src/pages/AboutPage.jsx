import React from "react";
import { motion } from "framer-motion";
import { teamMembers } from "../constants/teamData.js";
import TeamMemberCard from "../components/TeamMemberCard.jsx";

const headerVariants = {
  hidden: { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const AboutPage = () => {
  return (
    <div className="min-h-screen w-full bg-gray-50 font-sans p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <motion.header
          className="text-center mb-16"
          initial="hidden"
          animate="visible"
          variants={headerVariants}
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
            <span className="block">Tired of meetings that go nowhere?</span>
            <span className="block text-indigo-600">We were too.</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600">
            Traditional communication platforms are functional, but often
            uninspiring. We're building a tool that transforms passive meetings
            into active, fun, and effective collaboration sessions.
          </p>
        </motion.header>

        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800">
            The Minds Behind the Mission
          </h2>
        </div>

        <div className="grid gap-8 md:gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={member.name} member={member} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
