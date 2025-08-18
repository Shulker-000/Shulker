import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, updateUserProfile } from "../features/authSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Cropper from "react-easy-crop";
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
  Download,
  Crop,
} from "lucide-react";
import { toast } from "react-toastify";
import PasswordUpdateModal from "../components/PasswordUpdateModal";

// Helper function to create a cropped image from a data URL and a cropped area
const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues
    image.src = url;
  });

async function getCroppedImage(imageSrc, pixelCrop) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob);
    }, "image/jpeg");
  });
}

export default function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isAvatarViewOpen, setIsAvatarViewOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    dob: "",
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [bioCharCount, setBioCharCount] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  // State for Cropper
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

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

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 16) return "Good Afternoon";
    return "Good Evening";
  };

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

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/webp",
      ];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Invalid file type. Please upload a .jpg or .png image.");
        return;
      }
      const reader = new FileReader();
      reader.addEventListener("load", () => setImageSrc(reader.result));
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const onCropSave = useCallback(async () => {
    try {
      const croppedImageBlob = await getCroppedImage(
        imageSrc,
        croppedAreaPixels
      );
      // Immediately call the dedicated update function
      handleAvatarUpdate(croppedImageBlob);
      setImageSrc(null); // Close the cropping modal
    } catch (e) {
      console.error(e);
      toast.error("Failed to crop image.");
    }
  }, [imageSrc, croppedAreaPixels]);

  // New, separate function for avatar update
  const handleAvatarUpdate = async (file) => {
    try {
      if (!file) {
        return;
      }

      const avatarFormData = new FormData();
      avatarFormData.append("avatar", file, "avatar.jpeg");

      const avatarResponse = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/update-avatar`,
        {
          method: "POST",
          body: avatarFormData,
          credentials: "include",
        }
      );

      const avatarData = await avatarResponse.json();
      if (!avatarResponse.ok) {
        throw new Error(avatarData.message || "Failed to update avatar.");
      }

      // Update Redux state with the new permanent avatar URL
      dispatch(updateUserProfile(avatarData.data));
      setAvatarFile(null); // Clear temporary local state
      toast.success("Avatar updated successfully!");
    } catch (error) {
      console.error("Error updating avatar:", error);
      toast.error(error.message || "Failed to update avatar.");
    }
  };

  // Main function for saving profile details (now only handles profile data)
  const handleUpdate = async () => {
    try {
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
          profileData.message || "Failed to update profile details."
        );
      }

      // Update Redux state with the new profile data
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

  return (
    <div className="min-h-screen w-[90vw] md:w-[80vw] mx-auto p-4 sm:p-6 font-sans antialiased text-gray-800">
      {/* Top Bar with Greeting, Time, and Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            {getGreeting()}, {user?.firstname || user?.username}!
          </h1>
          <p className="text-sm text-gray-500">
            {currentTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>

      {/* Profile Header with Avatar and Name */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-8 pt-8">
        {/* Avatar Section */}
        <div
          onClick={() => setIsAvatarViewOpen(true)}
          className="relative w-24 h-24 rounded-full overflow-hidden shrink-0 cursor-pointer group"
        >
          <img
            src={
              user?.avatar && user.avatar.trim() !== ""
                ? user.avatar
                : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user?.username || "User"
                  )}&background=3b82f6&color=fff&size=200`
            }
            alt="Profile Avatar"
            className="w-full h-full object-cover transition-opacity duration-300"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-gray-400 bg-opacity-40 opacity-0 group-hover:opacity-80 transition-opacity duration-300">
            <Camera className="text-white w-6 h-6" />
          </div>
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-bold text-gray-900">{user?.username}</h2>
          <p className="text-gray-500">{user?.email}</p>
        </div>
      </div>

      {/* Edit Profile Section */}
      <div className="p-6 sm:p-8 rounded-xl shadow-inner border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Edit Profile</h2>
          <div className="flex gap-2">
            {isEditing && (
              <button
                onClick={handleUpdate}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Save size={16} /> Save
              </button>
            )}
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                isEditing ? "hidden" : ""
              }`}
            >
              <Edit size={16} /> Edit
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                isEditing ? "" : "hidden"
              }`}
            >
              <X size={16} /> Cancel
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              First Name
            </label>
            {isEditing ? (
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Your First Name"
                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900">
                {user?.firstname || "Not set"}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Last Name
            </label>
            {isEditing ? (
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Your Last Name"
                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900">
                {user?.lastname || "Not set"}
              </p>
            )}
          </div>

          {/* Date of Birth */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            {isEditing ? (
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900">
                {user?.dob
                  ? new Date(user.dob).toLocaleDateString()
                  : "Not set"}
              </p>
            )}
          </div>

          {/* Bio Section */}
          <div className="space-y-1 col-span-1">
            <label className="text-sm font-medium text-gray-700">Bio</label>
            {isEditing ? (
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Your Bio"
                rows="3"
                maxLength={250}
                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              ></textarea>
            ) : (
              <p className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900">
                {user?.bio || "Not set"}
              </p>
            )}
            {isEditing && (
              <p className="text-xs text-gray-500 text-right mt-1">
                {250 - bioCharCount} characters remaining
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Email Section */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email Address */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="flex items-center gap-3 w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900">
              <Mail className="text-blue-500 w-5 h-5 shrink-0" />
              <p className="text-sm font-medium text-gray-800">{user.email}</p>
            </div>
          </div>

          {/* Email Verification Status */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Email Verification Status
            </label>
            <div className="flex items-center gap-3 w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900">
              {user.isEmailVerified ? (
                <>
                  <CheckCircle className="text-green-600 w-5 h-5 shrink-0" />
                  <p className="text-sm font-medium text-gray-800">Verified</p>
                </>
              ) : (
                <>
                  <AlertCircle className="text-red-600 w-5 h-5 shrink-0" />
                  <button
                    onClick={handleSendVerificationEmail}
                    disabled={isVerifying}
                    className="flex items-center gap-2 text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isVerifying ? (
                      <>
                        <Clock size={16} className="animate-spin" /> Sending...
                      </>
                    ) : (
                      "Send Verification Email"
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Buttons */}

      <div className="mt-8 flex flex-col sm:flex-row gap-3 w-1/2 ml-auto justify-end">
        <button
          onClick={() => setIsPasswordModalOpen(true)}
          disabled={!!user.googleId}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium shadow-md focus:outline-none transition-all duration-300 w-full sm:w-auto justify-center ${
            !!user.googleId
              ? "hidden"
              : "text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-blue-500"
          }`}
        >
          <KeyRound size={16} /> Change Password
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full sm:w-auto justify-center"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>

      {/* Avatar Modal */}
      <AnimatePresence>
        {isAvatarViewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-transparent backdrop-blur-md"
            onClick={() => setIsAvatarViewOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="p-4 rounded-xl shadow-xl flex flex-col items-center gap-4 bg-white"
              onClick={(e) => e.stopPropagation()}
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
                alt="Full-size Profile Avatar"
                className="w-64 h-64 sm:w-80 sm:h-80 object-cover rounded-full"
              />
              <div className="flex gap-4">
                <button
                  onClick={() => setIsAvatarViewOpen(false)}
                  className="px-6 py-2 rounded-full text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    fileInputRef.current.click();
                    setIsAvatarViewOpen(false); // Close the modal before opening file picker
                  }}
                  className="px-6 py-2 rounded-full text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
                >
                  Change Avatar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <input
        type="file"
        ref={fileInputRef}
        onChange={onSelectFile}
        className="hidden"
        accept=".jpg, .jpeg, .png, .webp"
      />

      {imageSrc && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-white bg-opacity-20 backdrop-blur-sm"
          >
            <div className="relative w-full h-full max-w-lg max-h-lg bg-white rounded-xl shadow-xl p-4 flex flex-col">
              <div className="relative w-full h-3/4">
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                  cropShape="round"
                  objectFit="contain"
                />
              </div>
              <div className="controls mt-auto pt-4 flex flex-col items-center">
                <input
                  type="range"
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby="Zoom"
                  onChange={(e) => {
                    setZoom(e.target.value);
                  }}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg dark:bg-gray-700"
                />
                <div className="flex gap-4 mt-4 w-full justify-center">
                  <button
                    onClick={() => setImageSrc(null)}
                    className="flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
                  >
                    <X size={16} /> Cancel
                  </button>
                  <button
                    onClick={() => onCropSave()} // Call the new save logic
                    className="flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
                  >
                    <Crop size={16} /> Crop & Save
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}

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
