import React, { useState } from "react";
// Import useNavigate for programmatic navigation
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
// Import toast for notifications
import { toast } from "react-toastify";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { FaGoogle, FaXTwitter } from "react-icons/fa6";
import logInImage from "../assets/images/pages/signIn.png";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const newErrors = { ...errors };
    if (!value) {
      newErrors[name] = "This field is required.";
    } else {
      delete newErrors[name];
    }
    if (name === "email" && value && !/\S+@\S+\.\S+/.test(value)) {
      newErrors.email = "Please enter a valid email address.";
    }
    setErrors(newErrors);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.password) {
      newErrors.password = "Password is required.";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      // Show the first specific validation error in a toast
      toast.warn(Object.values(formErrors)[0]);
      return;
    }
    setErrors({});
    setIsLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      // Robustly parse JSON from the response, handling non-JSON errors gracefully
      const responseData = await res.json().catch(() => null);

      if (res.ok) {
        // On success, store the token and show a success toast
        // Note: Assuming the token is at `responseData.token` as per original code.
        // Adjust if your API response structure is different (e.g., `responseData.data.token`).
        if (responseData?.token) {
          localStorage.setItem("authToken", responseData.token);
        }

        toast.success(
          responseData?.message || "Login successful! Redirecting..."
        );

        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        // On failure, show a specific error toast based on the response
        const errorMessage = responseData?.message;
        if (res.status === 401 || res.status === 404) {
          toast.error(
            errorMessage ||
              "Invalid credentials. Please check your email and password."
          );
        } else {
          toast.error(errorMessage || "Login failed. Please try again.");
        }
      }
    } catch (err) {
      // For network or other critical errors, show a clear network error toast
      console.error("Login network error:", err);
      toast.error(
        "A network error occurred. Please check your connection and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-50 font-sans">
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
              src={logInImage}
              alt="SHULKER"
              className="w-full h-auto rounded-lg object-cover"
            />
            <h1 className="mt-6 text-4xl font-bold tracking-tight">
              Welcome Back!
            </h1>
            <p className="mt-4 text-lg text-indigo-100 max-w-sm mx-auto">
              Sign in to unlock your team's potential and continue where you
              left off.
            </p>
          </motion.div>
        </div>

        {/* Right login form panel */}
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
                Sign In to Your Account
              </h2>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <motion.div variants={itemVariants}>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`block w-full pl-10 pr-3 py-2.5 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
                      errors.email
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-indigo-500"
                    }`}
                    placeholder="john.doe@company.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                )}
              </motion.div>

              <motion.div variants={itemVariants}>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`block w-full pl-10 pr-10 py-2.5 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
                      errors.password
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-indigo-500"
                    }`}
                    placeholder="Enter your password"
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
                {errors.password && (
                  <p className="mt-1 text-xs text-red-600">{errors.password}</p>
                )}
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex items-center justify-end"
              >
                <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    className="font-medium text-indigo-600 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center items-center bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg text-base font-semibold shadow-lg hover:shadow-indigo-500/40 transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 disabled:bg-indigo-400 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                  {!isLoading && <ArrowRight className="ml-2 w-5 h-5" />}
                </button>
              </motion.div>

              <motion.div variants={itemVariants} className="relative pt-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-50 text-gray-500">
                    Or continue with
                  </span>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                <button
                  type="button"
                  className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <FaGoogle /> <span className="ml-2">Google</span>
                </button>
                <button
                  type="button"
                  className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <FaXTwitter /> <span className="ml-2">X</span>
                </button>
              </motion.div>
            </form>

            <motion.p
              variants={itemVariants}
              className="pt-6 text-center text-sm text-gray-600"
            >
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-indigo-600 hover:underline"
              >
                Sign up here
              </Link>
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
