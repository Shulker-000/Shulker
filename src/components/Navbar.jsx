import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Brain,
  Menu,
  X,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Bell,
  MessageSquare,
  Calendar,
  Trophy,
  Zap,
} from "lucide-react";

const Navbar = () => {
  // State management
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  const location = useLocation();

  // Refs for click outside detection
  const userMenuRef = useRef(null);
  const notificationRef = useRef(null);

  // Sample notifications data with better structure
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "meeting",
      title: "Meeting Reminder",
      message: "Team standup in 15 minutes",
      time: "2 min ago",
      unread: true,
      icon: Calendar,
      color: "from-blue-500 to-blue-600",
    },
    {
      id: 2,
      type: "achievement",
      title: "Achievement Unlocked!",
      message: "Completed 5 successful meetings",
      time: "1 hour ago",
      unread: true,
      icon: Trophy,
      color: "from-yellow-500 to-orange-500",
    },
    {
      id: 3,
      type: "message",
      title: "New Message",
      message: "Sarah sent you a message",
      time: "3 hours ago",
      unread: false,
      icon: MessageSquare,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: 4,
      type: "system",
      title: "System Update",
      message: "New features available in whiteboard",
      time: "1 day ago",
      unread: false,
      icon: Zap,
      color: "from-purple-500 to-indigo-500",
    },
  ]);

  // Memoized values
  const unreadCount = useMemo(() => 
    notifications.filter(n => n.unread).length, 
    [notifications]
  );

  const navLinks = useMemo(() => [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/whiteboard", label: "Whiteboard" },
    { path: "/features", label: "Features" },
  ], []);

  // Optimized scroll handler
  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY > 10;
    if (scrolled !== isScrolled) {
      setIsScrolled(scrolled);
    }
  }, [isScrolled]);

  // Handle scroll effect with throttling
  useEffect(() => {
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledHandleScroll);
  }, [handleScroll]);

  // Enhanced click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Enhanced keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
        setIsUserMenuOpen(false);
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Event handlers
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
    setIsUserMenuOpen(false);
    setIsNotificationOpen(false);
  }, []);

  const toggleUserMenu = useCallback(() => {
    setIsUserMenuOpen(prev => !prev);
    setIsNotificationOpen(false);
  }, []);

  const toggleNotifications = useCallback(() => {
    setIsNotificationOpen(prev => !prev);
    setIsUserMenuOpen(false);
  }, []);

  const markAsRead = useCallback((id) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, unread: false }
          : notification
      )
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, unread: false }))
    );
  }, []);

  const isActiveRoute = useCallback((path) => {
    // Handle root path specially - use .toLowerCase() for comparison
    if (path === "/" && location.pathname.toLowerCase() === "/") {
      return true;
    }
    return location.pathname === path;
  }, [location.pathname]);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
  }, []);

  // Logo component
  const Logo = () => (
    <Link
      to="/"
      className="flex items-center space-x-3 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-xl"
      aria-label="CogniMeet Home"
    >
      <div className="relative">
        <img src="/LogoIcon.svg" alt="Logo" className="h-16 w-16" />
        <div className="absolute -inset-1 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl opacity-0 transition-opacity duration-300"></div>
      </div>
      <span className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
        CogniMeet
      </span>
    </Link>
  );

  // Notification item component
  const NotificationItem = ({ notification }) => {
    const IconComponent = notification.icon;
    
    return (
      <div
        onClick={() => markAsRead(notification.id)}
        className={`p-4 border-b border-gray-100 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 cursor-pointer transition-all duration-200 focus:outline-none focus:bg-gradient-to-r focus:from-cyan-50 focus:to-blue-50 ${
          notification.unread ? "bg-gradient-to-r from-blue-50/50 to-cyan-50/50" : ""
        }`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            markAsRead(notification.id);
          }
        }}
      >
        <div className="flex items-start space-x-3">
          <div className={`w-10 h-10 bg-gradient-to-br ${notification.color} rounded-xl flex items-center justify-center shadow-md flex-shrink-0`}>
            <IconComponent className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {notification.title}
              </p>
              {notification.unread && (
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex-shrink-0"></div>
              )}
            </div>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
              {notification.message}
            </p>
            <p className="text-xs text-gray-400 mt-2">
              {notification.time}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-xl shadow-2xl border-b border-gray-100"
          : "bg-white shadow-lg"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 px-5 py-2.5 rounded-xl text-sm font-medium ${
                  isActiveRoute(link.path)
                    ? "text-blue-900 bg-gradient-to-r from-cyan-50 to-blue-50 shadow-md"
                    : "text-blue-800 hover:text-blue-900 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50"
                }`}
                aria-current={isActiveRoute(link.path) ? "page" : undefined}
              >
                {link.label}
                {isActiveRoute(link.path) && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full shadow-sm"></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            ))}
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                {/* Notifications */}
                <div className="relative" ref={notificationRef}>
                  <button
                    onClick={toggleNotifications}
                    className="relative p-2 text-blue-800 hover:text-blue-900 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}
                    aria-expanded={isNotificationOpen}
                    aria-haspopup="true"
                  >
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-xs font-bold text-white">
                          {unreadCount > 9 ? '9+' : unreadCount}
                        </span>
                      </div>
                    )}
                  </button>

                  {/* Notifications Dropdown */}
                  {isNotificationOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 transform transition-all duration-300 ease-out">
                      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                        {unreadCount > 0 && (
                          <button
                            onClick={markAllAsRead}
                            className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                          >
                            Mark all read
                          </button>
                        )}
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.length > 0 ? (
                          notifications.map((notification) => (
                            <NotificationItem key={notification.id} notification={notification} />
                          ))
                        ) : (
                          <div className="p-8 text-center">
                            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500 text-sm">No notifications</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* User Menu */}
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={toggleUserMenu}
                    className="flex items-center space-x-2 p-2 text-blue-800 hover:text-blue-900 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    aria-expanded={isUserMenuOpen}
                    aria-haspopup="true"
                    aria-label="User menu"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-md">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* User Dropdown */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 transform transition-all duration-300 ease-out">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900">John Doe</p>
                        <p className="text-sm text-gray-500">john@example.com</p>
                      </div>
                      <Link
                        to="/settings"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 hover:text-blue-900 transition-all duration-200 flex items-center space-x-2 focus:outline-none focus:bg-gradient-to-r focus:from-cyan-50 focus:to-blue-50"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 hover:text-red-600 transition-all duration-200 flex items-center space-x-2 focus:outline-none focus:bg-gradient-to-r focus:from-red-50 focus:to-pink-50"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-blue-800 hover:text-blue-900 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-blue-800 hover:text-blue-900 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute left-0 right-0 top-full bg-white shadow-2xl border-t border-gray-100 z-40">
            <div className="px-4 py-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={toggleMobileMenu}
                  className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium ${
                    isActiveRoute(link.path)
                      ? "text-blue-900 bg-gradient-to-r from-cyan-50 to-blue-50 border-l-4 border-blue-500 shadow-md"
                      : "text-blue-800 hover:text-blue-900 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50"
                  }`}
                  aria-current={isActiveRoute(link.path) ? "page" : undefined}
                >
                  {link.label}
                </Link>
              ))}
              
              {isLoggedIn ? (
                <div className="pt-4 mt-4 border-t border-gray-100 space-y-2">
                  <div className="px-4 py-3 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl">
                    <p className="text-sm font-semibold text-gray-900">John Doe</p>
                    <p className="text-sm text-gray-500">john@example.com</p>
                  </div>
                  
                  <button
                    onClick={toggleNotifications}
                    className="w-full flex items-center justify-between px-4 py-3 text-blue-800 hover:text-blue-900 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <div className="flex items-center space-x-3">
                      <Bell className="w-5 h-5" />
                      <span className="text-base font-medium">Notifications</span>
                    </div>
                    {unreadCount > 0 && (
                      <div className="w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-white">
                          {unreadCount > 9 ? '9+' : unreadCount}
                        </span>
                      </div>
                    )}
                  </button>

                  {/* Mobile Notifications */}
                  {isNotificationOpen && (
                    <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-gray-900">Recent Notifications</h4>
                        {unreadCount > 0 && (
                          <button
                            onClick={markAllAsRead}
                            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                          >
                            Mark all read
                          </button>
                        )}
                      </div>
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {notifications.slice(0, 3).map((notification) => (
                          <div
                            key={notification.id}
                            onClick={() => markAsRead(notification.id)}
                            className={`p-3 bg-white rounded-xl cursor-pointer transition-all duration-200 ${
                              notification.unread ? "ring-2 ring-blue-200" : ""
                            }`}
                          >
                            <div className="flex items-start space-x-2">
                              <div className={`w-8 h-8 bg-gradient-to-br ${notification.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                <notification.icon className="w-4 h-4 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {notification.title}
                                </p>
                                <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                                  {notification.message}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Link
                    to="/settings"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-blue-800 hover:text-blue-900 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <Settings className="w-5 h-5" />
                    <span className="text-base font-medium">Settings</span>
                  </Link>
                  
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:text-red-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="text-base font-medium">Logout</span>
                  </button>
                </div>
              ) : (
                <div className="pt-4 mt-4 border-t border-gray-100 space-y-3">
                  <Link
                    to="/login"
                    onClick={toggleMobileMenu}
                    className="w-full px-4 py-3 text-blue-800 hover:text-blue-900 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 rounded-xl transition-all duration-300 text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={toggleMobileMenu}
                    className="w-full px-4 py-3 text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-xl shadow-lg transition-all duration-300 text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;