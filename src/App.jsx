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
import AboutPage from "./pages/AboutPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import WhiteBoard from "./components/WhiteBoard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import NotFoundPage from "./pages/NotFoundPage";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/resetPassword/[token].jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AuthSuccess from "./pages/AuthSuccess.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import VerifyEmailPage from "./pages/VerifyEmailPage.jsx";

import { useSelector } from "react-redux";
import StreamVideoProvider from "./providers/StreamVideoProvider.jsx";
import MeetingPage from "./pages/MeetingPage.jsx";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import AuthProvider from "./providers/AuthProvider.jsx";
import PastMeetings from "./components/PastMeetings.jsx";
import AcceptInvite from "./pages/AcceptInvite.jsx";
import PastMeetingCard from "./components/PastMeetingCard.jsx";

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

    if (user) {
      if (["/", "/login", "/register", "/signup"].includes(location.pathname)) {
        navigate("/dashboard", { replace: true });
      }
    } else {
      if (["/dashboard", "/profile"].includes(location.pathname)) {
        navigate("/login", { replace: true });
      }
    }
  }, [user, location.pathname, navigate]);

  const hideNavbarFooterRoutes = [
    "whiteboard",
    "login",
    "signup",
    "register",
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
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth-success" element={<AuthSuccess />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/whiteboard" element={<WhiteBoard />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/past-meetings" element={<PastMeetings />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/verify-email/:token" element={<VerifyEmailPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/accept-invite/:meetingId" element={<AcceptInvite />} />
        <Route path="/past-meetings/:meetingId" element={<PastMeetingCard />} />
        <Route
          path="/dashboard/*"
          element={
            <StreamVideoProvider>
              <Routes>
                <Route path="/" element={<Dashboard />} />
              </Routes>
            </StreamVideoProvider>
          }
        />
        <Route
          path="/meetings/*"
          element={
            <StreamVideoProvider>
              <Routes>
                <Route
                  path="/:id"
                  element={
                    <StreamTheme theme={lightTheme}>
                      <StreamCall>
                        <MeetingPage />
                      </StreamCall>
                    </StreamTheme>
                  }
                />
              </Routes>
            </StreamVideoProvider>
          }
        />
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
