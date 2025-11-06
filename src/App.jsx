import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "./custom-stream.css";

import { useSelector } from "react-redux";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhiteBoard from "./components/WhiteBoard";
import PastMeetings from "./components/PastMeetings.jsx";
import PastMeetingCard from "./components/PastMeetingCard.jsx";

import StreamVideoProvider from "./providers/StreamVideoProvider.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";

import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import Contact from "./pages/Contact";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/resetPassword/[token].jsx";
import AuthSuccess from "./pages/AuthSuccess.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import VerifyEmailPage from "./pages/VerifyEmailPage.jsx";
import AcceptInvite from "./pages/AcceptInvite.jsx";
import MeetingPage from "./pages/MeetingPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

const lightTheme = {
  colors: {
    primary: "#1D4ED8",
    background: "#ffffff",
    surface: "#f9f9f9",
    textHighEmphasis: "#111111",
    textLowEmphasis: "#555555",
    border: "#e5e5e5",
    danger: "#dc2626",
    success: "#16a34a",
    interactive: "#2563eb",
  },
};

const AppWrapper = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const pathname = location.pathname;

    // ✅ Explicit public base routes (no auth required)
    const publicBaseRoutes = [
      "/",
      "/login",
      "/signup",
      "/forgot-password",
      "/auth-success",
      "/contact",
      "/about",
    ];

    // ✅ Dynamic public route prefixes
    const dynamicPublicPrefixes = [
      "/reset-password",
      "/verify-email",
      "/accept-invite",
    ];

    // Check if current route is public
    const isPublicRoute =
      publicBaseRoutes.includes(pathname) ||
      dynamicPublicPrefixes.some(
        (prefix) => pathname === prefix || pathname.startsWith(prefix + "/")
      );

    // Wait for auth to load
    if (user === undefined) return;

    // Redirect logic based on user state
    if (user) {
      if (["/", "/login", "/signup"].includes(pathname)) {
        navigate("/dashboard", { replace: true });
      }
    } else if (!isPublicRoute) {
      navigate("/login", { replace: true });
    }
  }, [user, location.pathname, navigate]);

  // Hide Navbar/Footer on these routes
  const hideNavbarFooterRoutes = [
    "whiteboard",
    "login",
    "signup",
    "notfound",
    "verify-email",
    "meetings",
  ];

  const shouldHideNavbarFooter = hideNavbarFooterRoutes.includes(
    location.pathname.split("/")[1]
  );

  return (
    <>
      {!shouldHideNavbarFooter && <Navbar />}
      <Routes>
        {/* ✅ Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/verify-email/:token" element={<VerifyEmailPage />} />
        <Route path="/auth-success" element={<AuthSuccess />} />
        <Route path="/accept-invite/:meetingId" element={<AcceptInvite />} />

        {/* ✅ Authenticated Routes */}
        <Route
          path="/dashboard"
          element={
            <StreamVideoProvider>
              <Dashboard />
            </StreamVideoProvider>
          }
        />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/past-meetings" element={<PastMeetings />} />
        <Route path="/past-meetings/:meetingId" element={<PastMeetingCard />} />

        {/* ✅ Stream Video Route */}
        <Route
          path="/meetings/:id"
          element={
            <StreamVideoProvider>
              <StreamTheme theme={lightTheme}>
                <StreamCall>
                  <MeetingPage />
                </StreamCall>
              </StreamTheme>
            </StreamVideoProvider>
          }
        />

        {/* ✅ Utility / Tool Routes */}
        <Route path="/whiteboard" element={<WhiteBoard />} />

        {/* ✅ Fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {!shouldHideNavbarFooter && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppWrapper />
      </AuthProvider>
    </Router>
  );
};

export default App;
