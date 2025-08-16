import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, updateUserProfile } from "../features/authSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Camera,
  LogOut,
  Mail,
  UserCheck,
  Calendar as CalendarIcon,
  Edit,
  Save,
  X,
  Calendar,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { toast } from "react-toastify";

const backgroundPattern = {
  backgroundImage: "radial-gradient(#e5e7eb 1px, transparent 1px)",
  backgroundSize: "20px 20px",
  backgroundColor: "#f9fafb",
};

export default function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    dob: "",
    isEmailVerified: false,
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/current-user`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch user");

        const userData = data?.message?.user || data?.user || {};
        dispatch(updateUserProfile(userData));

        setFormData({
          firstName: userData.firstname || "",
          lastName: userData.lastname || "",
          bio: userData.bio || "",
          dob: userData.dob
            ? new Date(userData.dob).toISOString().split("T")[0]
            : "",
          isEmailVerified: userData.isEmailVerified || false,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user:", error);
        toast.error("Unable to load profile.");
        setLoading(false);
      }
    };
    fetchUser();
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const logoutUrl = `${backendUrl}/api/v1/users/logout`;

      const response = await fetch(logoutUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Logout failed on the server.");
      }

      // 3. Dispatch the logout action
      dispatch(logout());
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/edit-profile`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to update profile");

      dispatch(updateUserProfile(data.data));
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    }
  };

  if (!user && !loading) return <Navigate to="/" />;
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 text-gray-800">
        <p>Loading profile...</p>
      </div>
    );

  return (
    <div
      className="min-h-screen font-sans antialiased text-gray-800"
      style={backgroundPattern}
    >
      <div className="relative z-10 p-6 sm:p-10">
        {/* Top Buttons */}
        <div className="flex justify-end gap-3 mb-10">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`flex items-center gap-2 text-white px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              isEditing
                ? "bg-gray-500 hover:bg-gray-600 focus:ring-gray-400"
                : "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
            } shadow-lg focus:outline-none focus:ring-2`}
          >
            {isEditing ? (
              <>
                <X size={16} /> Cancel
              </>
            ) : (
              <>
                <Edit size={16} /> Edit
              </>
            )}
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-white bg-red-600 hover:bg-red-700 px-5 py-2 rounded-full text-sm font-medium shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>

        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-10 py-20 px-4 sm:px-6 lg:px-8"
        >
          {/* Left: Profile Image */}
          <motion.div
            initial={{ scale: 0.85, rotate: -8 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative group rounded-full p-2 bg-white shadow-2xl ring-4 ring-indigo-400 ring-opacity-30 hover:ring-opacity-60 transition-all duration-300"
          >
            <img
              src={
                user.avatar ||
                `https://ui-avatars.com/api/?name=${user?.username}&background=4f46e5&color=fff&size=200`
              }
              alt="Profile"
              className="w-48 h-48 object-cover rounded-full border-4 border-white transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
              <Camera className="text-white w-10 h-10" />
            </div>
          </motion.div>

          {/* Right: Details */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-4">
            <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 tracking-tight">
              {user?.username}
            </h1>

            <p className="text-lg sm:text-xl text-gray-500 font-medium max-w-2xl px-0 lg:px-2 bg-white bg-opacity-40 rounded-xl py-2 w-full">
              {isEditing ? (
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="w-full text-left mt-2 rounded-xl p-3 bg-white border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none"
                  rows="3"
                  placeholder="Write your bio here..."
                ></textarea>
              ) : (
                user?.bio || "Add a short bio"
              )}
            </p>

            {/* User Details */}
            <div className="flex flex-col gap-3 mt-4 w-full">
              {/* First & Last Name */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 p-4 bg-white rounded-xl shadow-md border border-gray-200 flex items-center gap-3">
                  <UserCheck size={24} className="text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-500">First Name</p>
                    {isEditing ? (
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="text-lg font-semibold text-gray-800 w-full p-1 bg-white border-b-2 border-gray-300 focus:border-indigo-500 outline-none"
                      />
                    ) : (
                      <p className="text-lg font-semibold text-gray-800">
                        {user?.firstname || "Not set"}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex-1 p-4 bg-white rounded-xl shadow-md border border-gray-200 flex items-center gap-3">
                  <UserCheck size={24} className="text-indigo-600" />
                  <div>
                    <p className="text-xs text-gray-500">Last Name</p>
                    {isEditing ? (
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="text-lg font-semibold text-gray-800 w-full p-1 bg-white border-b-2 border-gray-300 focus:border-indigo-500 outline-none"
                      />
                    ) : (
                      <p className="text-lg font-semibold text-gray-800">
                        {user?.lastname || "Not set"}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Email & Verified */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 p-4 bg-white rounded-xl shadow-md border border-gray-200 flex items-center gap-3">
                  <Mail size={24} className="text-purple-600" />
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {user.email}
                    </p>
                  </div>
                </div>
                <div className="flex-1 p-4 bg-white rounded-xl shadow-md border border-gray-200 flex items-center gap-3">
                  {isEditing ? (
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="isEmailVerified"
                        checked={formData.isEmailVerified}
                        onChange={handleInputChange}
                        className="w-5 h-5 text-green-600 accent-green-500"
                      />
                      <span className="text-gray-700 font-medium">
                        Email Verified
                      </span>
                    </label>
                  ) : (
                    <div className="flex items-center gap-2">
                      {user.isEmailVerified ? (
                        <>
                          <CheckCircle className="text-green-600" />{" "}
                          <span className="text-gray-700 font-medium">
                            Verified
                          </span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="text-red-600" />{" "}
                          <span className="text-gray-700 font-medium">
                            Not Verified
                          </span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Date of Birth & Joined */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 p-4 bg-white rounded-xl shadow-md border border-gray-200 flex items-center gap-3">
                  <CalendarIcon size={24} className="text-red-600" />
                  <div>
                    <p className="text-xs text-gray-500">Date of Birth</p>
                    {isEditing ? (
                      <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleInputChange}
                        className="text-lg font-semibold text-gray-800 w-full p-1 bg-white border-b-2 border-gray-300 focus:border-indigo-500 outline-none"
                      />
                    ) : (
                      <p className="text-lg font-semibold text-gray-800">
                        {user?.dob
                          ? new Date(user.dob).toLocaleDateString()
                          : "Not set"}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex-1 p-4 bg-white rounded-xl shadow-md border border-gray-200 flex items-center gap-3">
                  <Calendar size={24} className="text-yellow-600" />
                  <div>
                    <p className="text-xs text-gray-500">Joined</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {new Date(user.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button */}
            {isEditing && (
              <div className="mt-6">
                <button
                  onClick={handleUpdate}
                  className="flex items-center gap-2 text-white bg-green-600 px-6 py-3 rounded-full text-lg font-semibold transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md"
                >
                  <Save size={20} /> Save Changes
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
