import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { Mail, ArrowRight, ArrowLeft } from "lucide-react";
// Replace this with your own illustration or image
import ForgotPasswordIllustration from "../assets/images/pages/forgotPassword.png";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setEmail(e.target.value);
    if (error) setError("");
  };

  const validateEmail = () => {
    if (!email.trim()) {
      setError("Email address is required.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail()) return;

    setIsLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      ); // --- FIX: Proper Error Handling Check ---

      if (!res.ok) {
        // Safely parse the JSON body to get the specific message from ApiError
        const errorData = await res.json().catch(() => ({}));
        const errorMessage =
          errorData.message || `Server Error: Status ${res.status}`;

        console.error("Forgot Password Backend Error:", errorMessage);
        toast.error(errorMessage);
        setError(errorMessage); // Display error below the input field
        return; // Stop execution on failure
      } // --- End FIX --- // Success case
      toast.success("A reset link has been sent.");
      setTimeout(() => navigate("/"), 3000);
    } catch (err) {
      console.error("Forgot Password Network Error:", err);
      toast.error("A network error occurred. Please try again.");
      setError("Network error. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    // This container enforces the full viewport height and creates the split-screen layout.
    <div className="flex w-full h-[92vh] font-sans">
      {/* --- Form Section (Right Side) --- */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 bg-white">
        <motion.div
          className="w-full max-w-md"
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="text-left mb-10">
            <h1 className="text-4xl font-bold text-gray-900">
              Forgot Password?
            </h1>
            <p className="mt-3 text-gray-600">
              No worries, it happens. Enter your email and we'll send you a
              reset link.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <div className="mt-1 relative">
                <Mail className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={handleInputChange}
                  className={`block w-full rounded-md border py-3 pl-10 pr-4 text-gray-900 transition-all duration-300
                    ${
                      error
                        ? "border-red-400 ring-1 ring-red-400 focus:border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    }`}
                  placeholder="you@example.com"
                />
              </div>
              {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-md text-base font-semibold shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
                {!isLoading && <ArrowRight className="w-5 h-5" />}
              </button>
            </div>
          </form>

          <div className="pt-8 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to login
            </Link>
          </div>
        </motion.div>
      </div>

      {/* --- Illustration Section (Left Side) --- */}
      <div className="hidden lg:flex w-1/2 items-center justify-center bg-gray-50 p-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <img
            src={ForgotPasswordIllustration}
            alt="Person trying to remember a password"
            className="w-full max-w-lg h-auto"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPassword;
