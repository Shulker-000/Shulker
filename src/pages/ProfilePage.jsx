import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Camera, LogOut, Mail, User, Phone, Calendar } from "lucide-react";

// This component uses Tailwind CSS for styling.
// Ensure you have Tailwind CSS configured in your project.

export default function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 font-sans antialiased">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-12 rounded-3xl shadow-2xl text-center max-w-sm w-full"
        >
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
            You're not logged in
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Please log in to access your profile and personalized features.
          </p>
          <Link
            to="/login"
            className="inline-block w-full px-8 py-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-full shadow-lg transition-transform duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Log In
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 font-sans antialiased">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden ring-1 ring-gray-200"
      >
        {/* Header Section with Dynamic Banner */}
        <div className="h-48 bg-gradient-to-br from-indigo-500 to-purple-700 relative">
          <div className="absolute inset-0 bg-dots opacity-20"></div>
          <div className="absolute top-4 right-4 z-20">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-white bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg px-4 py-2 rounded-full text-sm font-medium transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>

        {/* Profile Image and "Change" Button */}
        <div className="flex justify-center -mt-24 z-10 relative">
          <motion.div
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative group rounded-full p-1 bg-white shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl"
          >
            <img
              src={
                user.avatar ||
                `https://ui-avatars.com/api/?name=${user?.username}&background=4f46e5&color=fff&size=200`
              }
              alt="Profile"
              className="w-40 h-40 object-cover rounded-full border-4 border-white transition-all duration-300 ease-in-out group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
              <Camera className="text-white w-10 h-10" />
            </div>
          </motion.div>
        </div>

        {/* User Info Section */}
        <div className="p-8 text-center mt-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-4xl font-extrabold text-gray-900 tracking-tight leading-tight"
          >
            {user?.username}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-lg text-gray-500 mt-2 font-medium"
          >
            Software Engineer at Google
          </motion.p>
        </div>

        {/* Details Grid Section */}
        <div className="p-8 pt-0">
          <div className="bg-gray-50 p-6 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-6 border border-gray-200">
            {/* Username */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white shadow-sm">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 text-indigo-600">
                <User size={24} />
              </div>
              <div>
                <p className="text-xs text-gray-500">Username</p>
                <p className="text-lg font-semibold text-gray-800">{user?.username}</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white shadow-sm">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 text-purple-600">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="text-lg font-semibold text-gray-800">{user.email}</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white shadow-sm">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600">
                <Phone size={24} />
              </div>
              <div>
                <p className="text-xs text-gray-500">Phone</p>
                <p className="text-lg font-semibold text-gray-800">+1 234 567 8900</p>
              </div>
            </div>

            {/* Joined */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white shadow-sm">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 text-yellow-600">
                <Calendar size={24} />
              </div>
              <div>
                <p className="text-xs text-gray-500">Joined</p>
                <p className="text-lg font-semibold text-gray-800">
                  {new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}