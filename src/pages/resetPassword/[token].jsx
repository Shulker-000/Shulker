import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Effect to validate the token on component mount
  useEffect(() => {
    if (!token) {
      toast.error("Invalid or missing reset token link.");
      navigate("/login");
    }
  }, [token, navigate]);

  // Handle form submission to reset the password
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (!newPassword || !confirmPassword) {
      setError("Please fill in both password fields.");
      toast.warn("Please fill in both password fields.");
      return;
    }

    // Check if the new password meets the length requirement
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      toast.warn("Password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      toast.warn("Passwords do not match.");
      return;
    }

    if (!token) {
      toast.error("Token not found. Cannot reset password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v1/users/reset-password/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ newPassword }),
        }
      );

      if (!response.ok) {
        // Safely attempt to parse the JSON error body
        const errorData = await response.json().catch(() => ({}));
        const errorMessage =
          errorData.message || `Server Error: Status ${response.status}`; // Throw the proper error message to the catch block

        throw new Error(errorMessage); // This throw is essential
      } // --- End Proper Error Handling Check --- // Success logic
      toast.success("Password reset successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast.error(error.message);
      setError(error.message); // Display error message near the form field
    } finally {
      setLoading(false);
    }
  };

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="flex h-[92vh] w-full bg-gray-50 font-sans overflow-y-auto">
      <div className="flex w-full flex-1">
        {/* Left promotional panel */}
        <div className="hidden lg:flex w-1/2 flex-col items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 p-12 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 -mt-20 -ml-20 w-72 h-72 bg-white/10 rounded-full"></div>
          <div className="absolute bottom-0 right-0 -mb-24 -mr-16 w-96 h-96 bg-white/10 rounded-full"></div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg z-10"
          >
            <img
              src="https://placehold.co/600x400/7c3aed/ffffff?text=Secure+Your+Account"
              alt="Security illustration"
              className="w-full h-auto rounded-lg object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/600x400/7c3aed/ffffff?text=Security";
              }}
            />
            <h1 className="mt-6 text-4xl font-bold tracking-tight">
              Create a New Password
            </h1>
            <p className="mt-4 text-lg text-indigo-100 max-w-sm mx-auto">
              A strong password helps protect your account from unauthorized
              access.
            </p>
          </motion.div>
        </div>

        {/* Right reset password form panel */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8">
          <motion.div
            className="w-full max-w-md"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={itemVariants}
              className="text-center lg:text-left mb-8"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Reset Your Password
              </h2>
              <p className="text-gray-600 mt-2">
                Enter your new password below to regain access to your account.
              </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <motion.div variants={itemVariants}>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="newPassword"
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className={`block w-full pl-10 pr-10 py-2.5 border rounded-lg shadow-sm focus:outline-none focus:ring-2 border-gray-300 focus:ring-indigo-500`}
                    placeholder="Enter new password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-indigo-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </motion.div>

              {/* Confirm Password Field */}
              <motion.div variants={itemVariants}>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirm New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`block w-full pl-10 pr-10 py-2.5 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
                      error
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-indigo-500"
                    }`}
                    placeholder="Confirm new password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-indigo-600"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
              </motion.div>

              <motion.div variants={itemVariants} className="pt-2">
                <button
                  type="submit"
                  className="w-full flex justify-center items-center bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg text-base font-semibold shadow-lg hover:shadow-indigo-500/40 transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 disabled:bg-indigo-400 disabled:cursor-not-allowed"
                  disabled={loading || !token}
                >
                  {loading ? "Resetting..." : "Reset Password"}
                  {!loading && <ArrowRight className="ml-2 w-5 h-5" />}
                </button>
              </motion.div>
            </form>
            <motion.p
              variants={itemVariants}
              className="pt-6 text-center text-sm text-gray-600"
            >
              Remember your password?{" "}
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:underline"
              >
                Sign in here
              </Link>
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
