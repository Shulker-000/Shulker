import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, updateUserProfile } from "../features/authSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Camera,
  LogOut,
  Mail,
  User,
  Calendar as CalendarIcon,
  Edit,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  Clock,
} from "lucide-react";
import { toast } from "react-toastify";

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
  });

  const [bioCharCount, setBioCharCount] = useState(0);

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
        });
        setBioCharCount(userData.bio ? userData.bio.length : 0);
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

      dispatch(logout());
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("An error occurred during logout.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "bio") {
      if (value.length <= 250) {
        setFormData((prev) => ({ ...prev, [name]: value }));
        setBioCharCount(value.length);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/edit-profile`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstname: formData.firstName,
            lastname: formData.lastName,
            bio: formData.bio,
            dob: formData.dob,
          }),
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
    <div className="lg:min-h-[91.5vh] font-sans antialiased bg-white text-gray-800 p-6">
      <div className="relative z-10 mx-auto max-w-7xl pt-6 sm:pt-10">
        {/* Top Buttons */}
        <div className="flex justify-end gap-3 mb-10">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`flex items-center gap-2 text-white px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 ${
              isEditing
                ? "bg-rose-500 hover:bg-rose-600 focus:ring-rose-400"
                : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
            }`}
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
            className="flex items-center gap-2 text-white bg-red-600 hover:bg-red-700 px-5 py-2 rounded-full text-sm font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-red-500 transition-all duration-300"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>

        {/* Profile Header and Details */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-5xl mx-auto rounded-3xl flex flex-col lg:flex-row items-center lg:items-start gap-10"
        >
          {/* Left: Profile Image */}
          <motion.div
            initial={{ scale: 0.85, rotate: -8 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative group rounded-full p-2 bg-gray-200 shadow-md ring-4 ring-blue-200 hover:ring-blue-300 transition-all duration-300"
          >
            <img
              src={
                user.avatar ||
                `https://ui-avatars.com/api/?name=${user?.username}&background=3b82f6&color=fff&size=200`
              }
              alt="Profile"
              className="w-48 h-48 object-cover rounded-full border-4 border-white transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
              <Camera className="text-white w-10 h-10" />
            </div>
          </motion.div>

          {/* Right: Details */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-6 w-full">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
              {user?.username}
            </h1>

            <div className="w-full">
              {isEditing ? (
                <div>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="w-full text-sm sm:text-base rounded-xl p-4 bg-gray-100 border border-gray-300 shadow-inner focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200 resize-none text-gray-800 placeholder-gray-500"
                    rows="3"
                    placeholder="Write a short bio about yourself..."
                    maxLength={250}
                  ></textarea>
                  <p className="text-xs text-gray-500 text-right mt-1">
                    {250 - bioCharCount} characters remaining
                  </p>
                </div>
              ) : (
                <p className="text-base text-gray-600 font-medium max-w-2xl px-2">
                  {user?.bio || "Add a short bio"}
                </p>
              )}
            </div>

            {/* User Details Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
            >
              {/* First Name */}
              <div className="flex items-start gap-3 bg-white rounded-xl shadow-sm p-4 w-full">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 shrink-0">
                  <User size={20} />
                </div>
                <div className="flex flex-col w-full text-left">
                  <p className="text-xs sm:text-sm text-gray-500 uppercase font-semibold tracking-wide">
                    First Name
                  </p>
                  {isEditing ? (
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="text-lg font-semibold text-gray-800 w-full p-1 bg-transparent border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-colors duration-200"
                    />
                  ) : (
                    <p className="text-lg font-semibold text-gray-800">
                      {user?.firstname || "Not set"}
                    </p>
                  )}
                </div>
              </div>

              {/* Last Name */}
              <div className="flex items-start gap-3 bg-white rounded-xl shadow-sm p-4 w-full">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 shrink-0">
                  <User size={20} />
                </div>
                <div className="flex flex-col w-full text-left">
                  <p className="text-xs sm:text-sm text-gray-500 uppercase font-semibold tracking-wide">
                    Last Name
                  </p>
                  {isEditing ? (
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="text-lg font-semibold text-gray-800 w-full p-1 bg-transparent border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-colors duration-200"
                    />
                  ) : (
                    <p className="text-lg font-semibold text-gray-800">
                      {user?.lastname || "Not set"}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3 bg-white rounded-xl shadow-sm p-4 w-full">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-pink-100 text-pink-600 shrink-0">
                  <Mail size={20} />
                </div>
                <div className="flex flex-col w-full text-left">
                  <p className="text-xs sm:text-sm text-gray-500 uppercase font-semibold tracking-wide">
                    Email
                  </p>
                  <p className="text-lg font-semibold text-gray-800">
                    {user.email}
                  </p>
                </div>
              </div>

              {/* Email Verified */}
              <div className="flex items-start gap-3 bg-white rounded-xl shadow-sm p-4 w-full">
                <div className="w-10 h-10 flex items-center justify-center rounded-full shrink-0">
                  {user.isEmailVerified ? (
                    <CheckCircle size={20} className="text-green-600" />
                  ) : (
                    <AlertCircle size={20} className="text-red-600" />
                  )}
                </div>
                <div className="flex flex-col w-full text-left">
                  <p className="text-xs sm:text-sm text-gray-500 uppercase font-semibold tracking-wide">
                    Status
                  </p>
                  <p className="text-lg font-semibold text-gray-800">
                    {user.isEmailVerified ? "Verified" : "Not Verified"}
                  </p>
                </div>
              </div>

              {/* DOB */}
              <div className="flex items-start gap-3 bg-white rounded-xl shadow-sm p-4 w-full">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-100 text-red-600 shrink-0">
                  <CalendarIcon size={20} />
                </div>
                <div className="flex flex-col w-full text-left">
                  <p className="text-xs sm:text-sm text-gray-500 uppercase font-semibold tracking-wide">
                    Date of Birth
                  </p>
                  {isEditing ? (
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleInputChange}
                      className="text-lg font-semibold text-gray-800 w-full p-1 bg-transparent border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-colors duration-200"
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

              {/* Joined */}
              <div className="flex items-start gap-3 bg-white rounded-xl shadow-sm p-4 w-full">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-600 shrink-0">
                  <Clock size={20} />
                </div>
                <div className="flex flex-col w-full text-left">
                  <p className="text-xs sm:text-sm text-gray-500 uppercase font-semibold tracking-wide">
                    Joined
                  </p>
                  <p className="text-lg font-semibold text-gray-800">
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Save Button */}
            {isEditing && (
              <div className="mt-6 w-full flex justify-center lg:justify-start">
                <button
                  onClick={handleUpdate}
                  className="flex items-center gap-2 text-white bg-green-600 hover:bg-green-700 px-8 py-3 rounded-full text-lg font-semibold transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-green-500 shadow-lg"
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
