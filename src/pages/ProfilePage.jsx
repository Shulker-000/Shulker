import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, updateUserProfile } from "../features/authSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
  KeyRound,
} from "lucide-react";
import { toast } from "react-toastify";
import PasswordUpdateModal from "../components/PasswordUpdateModal";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    dob: "",
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [bioCharCount, setBioCharCount] = useState(0);

  const fileInputRef = useRef(null);

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


  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Invalid file type. Please upload a .jpg or .png image.");
        setAvatarFile(null);
        return;
      }
      setAvatarFile(file);
    }
  };

  const handleUpdate = async () => {
    try {
      if (avatarFile) {
        const avatarFormData = new FormData();
        avatarFormData.append("avatar", avatarFile);

        const avatarResponse = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/update-avatar`,
          {
            method: "POST",
            body: avatarFormData,
            credentials: "include",
          }
        );

        const avatarData = await avatarResponse.json();
        // //
        console.log(user);
        // //
        console.log(avatarData);
        // //
        if (!avatarResponse.ok) {
          throw new Error(avatarData.message || "Failed to update avatar");
        }
        dispatch(updateUserProfile(avatarData.data));
        toast.success("Avatar updated successfully!");
        setAvatarFile(null); // Reset file state after successful upload
      }

      const profileUpdates = {
        firstname: formData.firstName,
        lastname: formData.lastName,
        bio: formData.bio,
        dob: formData.dob,
      };

      const profileResponse = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/edit-profile`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(profileUpdates),
          credentials: "include",
        }
      );

      const profileData = await profileResponse.json();
      if (!profileResponse.ok) {
        throw new Error(
          profileData.message || "Failed to update profile details"
        );
      }
      dispatch(updateUserProfile(profileData.data));
      toast.success("Profile details updated successfully!");

      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.message || "Failed to update profile.");
    }
  };

  const handleSendVerificationEmail = async () => {
    setIsVerifying(true);
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v1/users/send-email-verification`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to send verification email");
      }

      toast.success("Verification email sent! Please check your inbox.");
    } catch (error) {
      console.error("Error sending verification email:", error);
      toast.error(error.message || "Failed to send verification email.");
    } finally {
      setIsVerifying(false);
    }
  };

  if (!user && !loading) return <Navigate to="/" />;
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 text-gray-800">
        <p>Loading profile...</p>
      </div>
    );
    console.log(avatarFile);
    console.log(user?.avatar && user.avatar.trim() !== "");
    console.log(user.avatar);

  return (
    <div className="lg:min-h-[91.5vh] font-sans antialiased bg-white text-gray-800 p-6">
      <div className="relative z-10 mx-auto max-w-7xl pt-6 sm:pt-10">
        <div className="flex justify-end gap-3 mb-10">
          {!user.isEmailVerified && (
            <button
              onClick={handleSendVerificationEmail}
              disabled={isVerifying}
              className="flex items-center gap-2 text-white bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded-full text-sm font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-orange-400 transition-all duration-300"
            >
              {isVerifying ? (
                <>
                  <Clock size={16} className="animate-spin" /> Sending...
                </>
              ) : (
                <>
                  <Mail size={16} /> Verify Email
                </>
              )}
            </button>
          )}
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
            onClick={() => setIsPasswordModalOpen(true)}
            disabled={!!user.googleId}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium shadow-md focus:outline-none transition-all duration-300 ${
              !!user.googleId
                ? "hidden"
                : "text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
            }`}
          >
            <KeyRound size={16} /> Change Password
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-white bg-red-600 hover:bg-red-700 px-5 py-2 rounded-full text-sm font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-red-500 transition-all duration-300"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-5xl mx-auto rounded-3xl flex flex-col lg:flex-row items-center lg:items-start gap-10"
        >
          <motion.div
            initial={{ scale: 0.85, rotate: -8 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative group rounded-full p-2 bg-gray-200 shadow-md ring-4 ring-blue-200 hover:ring-blue-300 transition-all duration-300"
          >
            <img
              src={
                avatarFile
                  ? URL.createObjectURL(avatarFile)
                  : user?.avatar && user.avatar.trim() !== ""
                  ? user.avatar
                  : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user?.username || "User"
                    )}&background=3b82f6&color=fff&size=200`
              }
              alt="Profile"
              className="w-48 h-48 object-cover rounded-full border-4 border-white transition-transform duration-300 group-hover:scale-105"
            />

            {isEditing && (
              <button
                onClick={() => fileInputRef.current.click()}
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
              >
                <Camera className="text-white w-10 h-10" />
              </button>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleAvatarChange}
              className="hidden"
              accept=".jpg, .jpeg, .png, .webp" // ✅ Added file type restriction
            />
          </motion.div>

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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
            >
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
                    Email Verification Status
                  </p>
                  <p className="text-lg font-semibold text-gray-800">
                    {user.isEmailVerified ? "Verified" : "Not Verified"}
                  </p>
                </div>
              </div>
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
              <div className="flex items-start gap-3 bg-white rounded-xl shadow-sm p-4 w-full">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-600 shrink-0">
                  <Clock size={20} />
                </div>
                <div className="flex flex-col w-full text-left">
                  <p className="text-xs sm:text-sm text-gray-500 uppercase font-semibold tracking-wide">
                    Date Joined
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
      <AnimatePresence>
        {isPasswordModalOpen && (
          <PasswordUpdateModal
            isVisible={isPasswordModalOpen}
            onClose={() => setIsPasswordModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
