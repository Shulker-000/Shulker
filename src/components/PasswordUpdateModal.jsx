import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { KeyRound, Eye, EyeOff, X, Save } from "lucide-react";
import { toast } from "react-toastify";

/**
 * A modal component for updating the user's password.
 * It includes input fields for the current password, new password, and confirmation,
 * with validation and a secure password visibility toggle.
 *
 * @param {object} props - The component props.
 * @param {boolean} props.isVisible - Controls the visibility of the modal.
 * @param {function} props.onClose - Function to call when the modal is closed.
 */
const PasswordUpdateModal = ({ isVisible, onClose }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleUpdate = async () => {
    setError("");
    // Password validation checks
    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/change-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ currentPassword, newPassword }),
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update password.");
      }

      toast.success("Password updated successfully!");
      onClose();
    } catch (err) {
      console.error("Error updating password:", err);
      toast.error(err.message || "Failed to update password.");
      setError(err.message || "Failed to update password.");
    } finally {
      setLoading(false);
    }
  };

  // Animation variants for the backdrop and modal
  const backdropVariants = {
    visible: { opacity: 1, backdropFilter: "blur(5px)" },
    hidden: { opacity: 0, backdropFilter: "blur(0px)" },
  };

  const modalVariants = {
    hidden: { y: "-50%", x: "-50%", opacity: 0, scale: 0.9 },
    visible: {
      y: "-50%",
      x: "-50%",
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: {
      y: "-50%",
      x: "-50%",
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />
          <motion.div
            className="fixed top-1/2 left-1/2 bg-white rounded-xl shadow-2xl z-50 w-[90vw] max-w-lg"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">
                Update Password
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-700 transition-colors rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <X size={24} />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate();
              }}
              className="p-6 space-y-6"
            >
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Current Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 bg-gray-50 text-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200 placeholder-gray-400 pr-10"
                  placeholder="Enter current password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 top-6 flex items-center pr-3 text-gray-400"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 bg-gray-50 text-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200 placeholder-gray-400 pr-10"
                  placeholder="Create a new password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 top-6 flex items-center pr-3 text-gray-400"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 bg-gray-50 text-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200 placeholder-gray-400 pr-10"
                  placeholder="Re-enter your new password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 top-6 flex items-center pr-3 text-gray-400"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {error && (
                <p className="text-sm text-red-600 font-medium bg-red-50 p-3 rounded-xl border border-red-200">
                  {error}
                </p>
              )}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors duration-200 shadow-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-2 text-sm font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    "Updating..."
                  ) : (
                    <>
                      <Save size={16} /> Update
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PasswordUpdateModal;
