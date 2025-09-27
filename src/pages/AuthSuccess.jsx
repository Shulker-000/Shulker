import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../features/authSlice";
import { motion } from "framer-motion";

export default function AuthSuccess() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");
    if (accessToken) {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/current-user`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        credentials: "include",
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success && res.data) {
            localStorage.setItem("authToken", accessToken);
            localStorage.setItem("authUser", JSON.stringify(res.data));
            document.cookie = `accessToken=${accessToken}; path=/; sameSite=Lax`;

            dispatch(login({ user: res.data, token: accessToken }));
            navigate("/dashboard");
          } else {
            navigate("/login?error=auth_failed");
          }
        });
    } else {
      navigate("/login?error=auth_failed");
    }
  }, [dispatch, navigate]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-50 bg-opacity-90">
      <div className="flex space-x-2">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-4 h-4 bg-blue-500 rounded-full"
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.p
        className="mt-6 text-lg font-medium text-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
      >
        Signing you in...
      </motion.p>
    </div>
  );
}
