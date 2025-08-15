import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, User, Settings, LogOut, Home, Info, Mail, Building, Users, Loader2 } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './../features/authSlice'; // Import the logout action from your authSlice

// Custom hook to detect clicks outside a referenced element
const useClickOutside = (ref, callback) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [ref, callback]);
};

// --- Data Configuration ---
const navItems = [
  { id: 'home', label: 'Home', icon: Home, route: '/' },
  { id: 'about', label: 'About', icon: Info, route: '/about' },
  {
    id: 'services',
    label: 'Services',
    icon: Building,
    route: '/services',
    dropdownItems: [
      { id: 'services-consulting', label: 'Consulting', icon: Users, route: '/services/consulting' },
      { id: 'services-development', label: 'Development', icon: Settings, route: '/services/development' },
    ]
  },
  { id: 'contact', label: 'Contact', icon: Mail, route: '/contact' },
];

const authRoutes = {
  login: '/login',
  signup: '/signup',
  profile: '/profile',
  settings: '/user/settings',
  dashboard: '/dashboard',
};

// --- Reusable Child Components ---

const NavItem = ({ item, currentPath, onLinkClick, isMobile = false }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const hasDropdown = Array.isArray(item.dropdownItems) && item.dropdownItems.length > 0;
  const isActive = currentPath.startsWith(item.route) && (currentPath === '/' ? item.route === '/' : true);

  useClickOutside(dropdownRef, () => setIsDropdownOpen(false));

  const handleLinkClick = (e) => {
    setIsDropdownOpen(false);
    if (onLinkClick) onLinkClick(e);
  };

  const navLinkClasses = isMobile
    ? `flex items-center w-full px-4 py-3 text-lg font-medium rounded-xl transition-colors duration-200 ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'}`
    : `flex items-center px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg hover:bg-gray-50 hover:scale-105 active:scale-95 ${isActive ? 'text-blue-600 bg-blue-50 shadow-sm' : 'text-gray-700 hover:text-blue-600'}`;
  
  const dropdownItemClasses = isMobile
    ? "flex items-center w-full text-left px-6 py-3 text-base text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
    : "flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200";

  return (
    <div className="relative" ref={dropdownRef}>
      {hasDropdown ? (
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={navLinkClasses}
          aria-expanded={isDropdownOpen}
          aria-controls={`dropdown-${item.id}`}
        >
          <item.icon className={`h-5 w-5 ${isMobile ? 'mr-4' : 'mr-2'}`} />
          {item.label}
          <ChevronDown className={`ml-auto h-5 w-5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </button>
      ) : (
        <Link to={item.route} onClick={handleLinkClick} className={navLinkClasses}>
          <item.icon className={`h-5 w-5 ${isMobile ? 'mr-4' : 'mr-2'}`} />
          {item.label}
        </Link>
      )}

      {hasDropdown && isDropdownOpen && (
        <div id={`dropdown-${item.id}`} className={isMobile
          ? "w-full bg-gray-50 rounded-lg mt-2 py-2"
          : "absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 animate-in fade-in slide-in-from-top-2 duration-200"}>
          {item.dropdownItems.map((dropdownItem) => (
            <Link key={dropdownItem.id} to={dropdownItem.route} onClick={handleLinkClick} className={dropdownItemClasses}>
              {dropdownItem.icon && <dropdownItem.icon className="h-4 w-4 mr-2" />}
              {dropdownItem.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const AuthButtons = ({ isMobile = false }) => {
  if (isMobile) {
    return (
      <div className="border-t border-gray-200 pt-4 pb-3 space-y-3 px-4">
        <Link to={authRoutes.login} className="block w-full text-center px-4 py-3 font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">Log In</Link>
        <Link to={authRoutes.signup} className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-medium shadow-md transition-all">Sign Up</Link>
      </div>
    );
  }
  return (
    <>
      <Link to={authRoutes.login} className="text-gray-700 hover:text-blue-600 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-50 rounded-lg">
        Log In
      </Link>
      <Link to={authRoutes.signup} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium shadow-sm transition-all hover:shadow-md hover:scale-105 active:scale-95">
        Sign Up
      </Link>
    </>
  );
};

const ProfileDropdown = ({ user, onLogout, isMobile = false, onLinkClick, isLoggingOut }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useClickOutside(dropdownRef, () => setIsOpen(false));

  const handleLogoutClick = () => {
    setIsOpen(false);
    onLogout();
  };

  const handleLinkClick = (e) => {
    setIsOpen(false);
    if(onLinkClick) onLinkClick(e);
  };
  
  // New handler for profile click
  const handleProfileClick = () => {
    setIsOpen(false);
    navigate(authRoutes.profile);
    if(onLinkClick) onLinkClick();
  };

  if (isMobile) {
    return (
      <div className="border-t border-gray-200 pt-6 pb-3 space-y-2">
        <div className="px-4 py-2">
          <p className="text-lg font-bold text-gray-900">{user?.username}</p>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
        <Link to={authRoutes.dashboard} onClick={handleLinkClick} className="flex items-center w-full px-4 py-3 text-lg font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600 rounded-xl"><Settings className="h-5 w-5 mr-4" />Dashboard</Link>
        <Link to={authRoutes.profile} onClick={handleLinkClick} className="flex items-center w-full px-4 py-3 text-lg font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600 rounded-xl"><User className="h-5 w-5 mr-4" />Profile</Link>
        <button onClick={handleLogoutClick} disabled={isLoggingOut} className="flex items-center w-full px-4 py-3 text-lg font-medium text-red-600 hover:bg-red-50 rounded-xl">
          {isLoggingOut ? (
            <span className="flex items-center"><Loader2 className="h-5 w-5 mr-4 animate-spin" />Logging Out...</span>
          ) : (
            <><LogOut className="h-5 w-5 mr-4" />Logout</>
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="relative ml-4 pl-4 border-l border-gray-200" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 transition-colors" aria-expanded={isOpen} aria-controls="profile-dropdown">
        <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
          {user?.username?.charAt(0) || 'U'}
        </div>
        <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div id="profile-dropdown" className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl border py-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-4 py-3 border-b">
            <p className="text-sm font-medium text-gray-900 truncate">{user?.username}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
          <button onClick={handleProfileClick} className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"><User className="h-4 w-4 mr-2" />Profile</button>
          <Link to={authRoutes.settings} onClick={handleLinkClick} className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"><Settings className="h-4 w-4 mr-2" />Settings</Link>
          <hr className="my-1" />
          <button onClick={handleLogoutClick} disabled={isLoggingOut} className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">
            {isLoggingOut ? (
              <span className="flex items-center"><Loader2 className="h-4 w-4 mr-2 animate-spin" />Logging Out...</span>
            ) : (
              <><LogOut className="h-4 w-4 mr-2" />Logout</>
            )}
          </button>
        </div>
      )}
    </div>
  );
};


// --- Main Navbar Component ---
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  // 1. Use Redux hooks to get state and dispatch
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = !!user; // The user object will be null if not authenticated

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  
  // 2. Updated Logout Handler to use Redux and the imported action
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const logoutUrl = `${backendUrl}/api/v1/users/logout`;

      const response = await fetch(logoutUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Logout failed on the server.');
      }

      // 3. Dispatch the logout action
      dispatch(logout());
      
      closeMobileMenu();
      navigate('/');

    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <nav className={`sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b transition-shadow duration-300 ${isScrolled ? 'shadow-md border-gray-200' : 'shadow-sm border-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Logo */}
            <Link to="/" onClick={closeMobileMenu} className="flex-shrink-0 flex items-center gap-2 group">
              <img src="/LogoIcon.svg" className='h-8 w-8' alt="Shulker Logo" />
              <span className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                Shulker
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <NavItem key={item.id} item={item} currentPath={currentPath} onLinkClick={closeMobileMenu} />
              ))}
            </div>

            {/* Desktop Auth & Profile */}
            <div className="hidden lg:flex items-center">
              {isAuthenticated ? (
                // Use the Redux 'user' state directly
                <ProfileDropdown user={user} onLogout={handleLogout} isLoggingOut={isLoggingOut} />
              ) : (
                <AuthButtons />
              )}
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
                aria-label="Open main menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full-page Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[51] lg:hidden">
          {/* Backdrop with translucent blur effect */}
          <div
            className="fixed inset-0 bg-gray-800/60 backdrop-blur-md transition-opacity duration-300"
            onClick={closeMobileMenu}
            role="button"
            tabIndex={0}
            aria-label="Close menu backdrop"
          />
          
          {/* Menu container that slides in from the right */}
          <div className="fixed top-0 right-0 w-full max-w-sm h-full bg-white shadow-xl transform transition-transform duration-300 ease-out animate-in slide-in-from-right-full">
            
            {/* Menu header with logo and close button */}
            <div className="flex items-center justify-between px-4 h-16 border-b border-gray-200">
              <Link to="/" onClick={closeMobileMenu} className="flex-shrink-0 flex items-center gap-2">
                <img src="/LogoIcon.svg" className='h-8 w-8' alt="Shulker Logo" />
                <span className="text-xl font-bold text-gray-900">Shulker</span>
              </Link>
              <button
                onClick={closeMobileMenu}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Mobile navigation items */}
            <div className="p-4 space-y-1">
              {navItems.map((item) => (
                <NavItem key={item.id} item={item} currentPath={currentPath} onLinkClick={closeMobileMenu} isMobile />
              ))}
            </div>

            {/* Mobile auth buttons or profile dropdown */}
            {isAuthenticated ? (
              // Use the Redux 'user' state directly
              <ProfileDropdown user={user} onLogout={handleLogout} isMobile onLinkClick={closeMobileMenu} isLoggingOut={isLoggingOut} />
            ) : (
              <AuthButtons isMobile />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;