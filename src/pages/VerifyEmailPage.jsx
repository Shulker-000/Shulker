import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "react-toastify";

export default function VerifyEmailPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/verify-email/${token}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      
      const data = await response.json();
      console.log(data);
      console.log(data.message);
      if (!response.ok || !data.success) {
        throw new Error(
          data.message || data.data?.message || "Verification failed"
          
        );
      }
      
      toast.success("Email verified successfully! Redirecting...");
      setTimeout(() => navigate("/profile"), 2000);
    } catch (err) {
      toast.error(err.message || "Verification failed. Redirecting...");
      setTimeout(() => navigate("/profile"), 2500);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md p-8 bg-white rounded-3xl shadow-xl border border-gray-200 text-center"
      >
        <div className="flex flex-col items-center">
          <CheckCircle size={48} className="text-green-500" />
          <p className="mt-4 text-xl font-semibold text-gray-700">
            Confirm Email Verification
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Click below to verify your email and continue.
          </p>

          <button
            onClick={handleVerify}
            disabled={loading}
            className={`mt-6 w-full py-2 px-4 rounded-lg text-white font-medium shadow-md transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Verifying..." : "Verify My Email"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
