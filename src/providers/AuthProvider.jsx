import React, { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, updateUserProfile } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const [loading, setLoading] = useState(true);
  const [hasFetchedUser, setHasFetchedUser] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("authUser");

    if (token && storedUser) {
      dispatch(
        login({
          user: JSON.parse(storedUser),
          token: token,
        })
      );
    }
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    if (loading || hasFetchedUser) return;

    const publicRoutes = [
      "/",
      "/login",
      "/about",
      "/contact",
      "/notfound",
      "/signup",
      "/forgot-password",
      "/reset-password",
      "/auth-success",
    ];

    const dynamicPublicPrefixes = [
      "/reset-password",
      "/verify-email",
      "/accept-invite",
    ];

    const path = window.location.pathname.toLowerCase();
    // Check if the current path is public or dynamic public
    const isPublicRoute =
      publicRoutes.includes(path) ||
      dynamicPublicPrefixes.some(
        (prefix) => path === prefix || path.startsWith(prefix + "/")
      );

    if (user) {
      const fetchUser = async () => {
        const token = localStorage.getItem("authToken");
        try {
          const res = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/current-user`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              }
            }
          );

          if (res.status === 401) {
            dispatch(logout());
            navigate("/login", { replace: true });
            toast.success("Session expired. Please log in again.");
            return;
          }

          if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            const errorMessage =
              errorData.message || `Server Error: Status ${res.status}`;
            throw new Error(errorMessage);
          }

          // Success logic
          const data = await res.json();
          dispatch(updateUserProfile(data.data));

          setTimeout(() => {
            setHasFetchedUser(true);
          }, 50);
        } catch (error) {
          console.error("AuthProvider user fetch error:", error);
          toast.error(error.message || "Unable to load user data.");
        }
      };
      fetchUser();
    } else {
      if (!isPublicRoute) {
        navigate("/login", { replace: true });
      }
      setHasFetchedUser(true);
    }
  }, [user, loading, dispatch, navigate, hasFetchedUser]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <p>Loading...</p>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
