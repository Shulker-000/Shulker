import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, User, Settings, LogOut, Home, Info, Mail, Building, Users, Calendar } from 'lucide-react';

// Proper Link component that handles navigation
const Link = ({ href, children, onClick, className, ...props }) => {
  const handleClick = (e) => {
    e.preventDefault();
    
    // Call custom onClick if provided
    if (onClick) {
      onClick(e);
    }
    
    // Update URL and trigger navigation
    window.history.pushState({ route: href }, '', href);
    
    // Dispatch both custom event and popstate for proper navigation
    window.dispatchEvent(new CustomEvent('routeChange', { 
      detail: { route: href } 
    }));
    
    // Trigger popstate event to ensure proper navigation handling
    window.dispatchEvent(new PopStateEvent('popstate', { 
      state: { route: href } 
    }));
  };

  return (
    <a href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
};

const Navbar = ({ currentPage, setCurrentPage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({ name: 'John Doe', email: 'john@example.com' });

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setActiveDropdown(null);
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Listen for route changes to update active page
  useEffect(() => {
    const handleRouteChange = (event) => {
      const route = event.detail?.route || window.location.pathname;
      
      // Update current page based on route
      const pathToPageMap = {
        '/': 'home',
        '/about': 'about',
        '/services': 'services',
        '/services/consulting': 'services-consulting',
        '/services/development': 'services-development',
        '/services/support': 'services-support',
        '/contact': 'contact'
      };
      
      if (pathToPageMap[route]) {
        setCurrentPage(pathToPageMap[route]);
      }
    };

    // Handle both custom route changes and browser back/forward
    const handlePopState = (event) => {
      const route = window.location.pathname;
      handleRouteChange({ detail: { route } });
    };

    window.addEventListener('routeChange', handleRouteChange);
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('routeChange', handleRouteChange);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [setCurrentPage]);

  const navItems = [
    { 
      id: 'home', 
      label: 'Home',
      icon: Home,
      hasDropdown: false,
      route: '/'
    },
    { 
      id: 'about', 
      label: 'About',
      icon: Info,
      hasDropdown: false,
      route: '/about',
    },
    { 
      id: 'contact', 
      label: 'Contact',
      icon: Mail,
      hasDropdown: false,
      route: '/contact'
    }
  ];

  const authRoutes = {
    login: '/login',
    signup: '/signup',
    profile: '/user/profile',
    settings: '/user/settings',
    dashboard: '/dashboard'
  };

  // Close mobile menu and dropdowns
  const closeMenus = () => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    setIsProfileDropdownOpen(false);
  };

  const handleDropdownToggle = (itemId, event) => {
    event?.stopPropagation();
    setActiveDropdown(activeDropdown === itemId ? null : itemId);
  };

  const handleAuthAction = (action) => {
    switch (action) {
      case 'logout':
        setIsAuthenticated(false);
        setUser(null);
        closeMenus();
        // Navigate to home after logout
        window.history.pushState({ route: '/' }, '', '/');
        window.dispatchEvent(new CustomEvent('routeChange', { 
          detail: { route: '/' } 
        }));
        window.dispatchEvent(new PopStateEvent('popstate', { 
          state: { route: '/' } 
        }));
        break;
      default:
        console.warn('Unknown auth action:', action);
    }
  };

  // Check if current route matches nav item
  const isActiveRoute = (route, itemId) => {
    if (currentPage === itemId) return true;
    
    const currentPath = window.location.pathname;
    if (route === currentPath) return true;
    
    // Check for nested routes
    if (route !== '/' && currentPath.startsWith(route)) return true;
    
    return false;
  };

  // Demo function to toggle auth state
  const toggleAuthState = () => {
    setIsAuthenticated(!isAuthenticated);
    if (!isAuthenticated) {
      setUser({ name: 'John Doe', email: 'john@example.com' });
    }
  };

  return (
    <nav className={`bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'shadow-md backdrop-blur-sm bg-white/95' : ''
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex-shrink-0 flex items-center group transition-all duration-200 hover:scale-105"
              onClick={closeMenus}
            >
              <img src="/LogoIcon.svg" className='h-18 w-18' alt="" />

              <span className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                CogniMeet
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.id} className="relative dropdown-container">
                {item.hasDropdown ? (
                  <button
                    onClick={(e) => handleDropdownToggle(item.id, e)}
                    className={`flex items-center px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg hover:bg-gray-50 hover:scale-105 active:scale-95 ${
                      isActiveRoute(item.route, item.id)
                        ? 'text-blue-600 bg-blue-50 shadow-sm'
                        : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.label}
                    <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                      activeDropdown === item.id ? 'rotate-180' : ''
                    }`} />
                  </button>
                ) : (
                  <Link
                    href={item.route}
                    onClick={closeMenus}
                    className={`flex items-center px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg hover:bg-gray-50 hover:scale-105 active:scale-95 ${
                      isActiveRoute(item.route, item.id)
                        ? 'text-blue-600 bg-blue-50 shadow-sm'
                        : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </Link>
                )}
                
                {/* Dropdown Menu */}
                {item.hasDropdown && activeDropdown === item.id && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    {item.dropdownItems?.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.id}
                        href={dropdownItem.route}
                        onClick={closeMenus}
                        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                      >
                        {dropdownItem.icon && <dropdownItem.icon className="h-4 w-4 mr-2" />}
                        {dropdownItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Authentication & User Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            {!isAuthenticated ? (
              <>
                <Link
                  href={authRoutes.login}
                  className="text-gray-700 hover:text-blue-600 px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-gray-50 rounded-lg"
                >
                  Log In
                </Link>
                <Link
                  href={authRoutes.signup}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-lg text-sm font-medium shadow-sm transition-all duration-200 hover:shadow-md hover:scale-105 active:scale-95"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link
                  href={authRoutes.dashboard}
                  className="text-gray-700 hover:text-blue-600 px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-gray-50 rounded-lg"
                >
                  Dashboard
                </Link>
                
                {/* Profile Dropdown */}
                <div className="relative ml-4 pl-4 border-l border-gray-200 dropdown-container">
                  <button
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center space-x-2 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200"
                  >
                    <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">{user?.name?.charAt(0) || 'U'}</span>
                    </div>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                      isProfileDropdownOpen ? 'rotate-180' : ''
                    }`} />
                  </button>
                  
                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>
                      
                      <Link
                        href={authRoutes.profile}
                        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                      >
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Link>
                      <Link
                        href={authRoutes.settings}
                        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Link>
                      <hr className="my-1 border-gray-200" />
                      <button 
                        onClick={() => handleAuthAction('logout')}
                        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors duration-200"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
            
            {/* Demo Auth Toggle */}
            <button 
              onClick={toggleAuthState}
              className="ml-2 px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-md transition-colors duration-200"
              title="Toggle Auth State (Demo)"
            >
              {isAuthenticated ? 'Logout Demo' : 'Login Demo'}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-screen opacity-100' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
            {navItems.map((item) => (
              <div key={item.id}>
                {item.hasDropdown ? (
                  <button
                    onClick={(e) => handleDropdownToggle(item.id, e)}
                    className={`flex items-center justify-between w-full text-left px-3 py-3 text-base font-medium transition-all duration-200 rounded-lg ${
                      isActiveRoute(item.route, item.id)
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <item.icon className="h-5 w-5 mr-3" />
                      <span>{item.label}</span>
                    </div>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                      activeDropdown === item.id ? 'rotate-180' : ''
                    }`} />
                  </button>
                ) : (
                  <Link
                    href={item.route}
                    onClick={closeMenus}
                    className={`flex items-center w-full text-left px-3 py-3 text-base font-medium transition-all duration-200 rounded-lg ${
                      isActiveRoute(item.route, item.id)
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    <span>{item.label}</span>
                  </Link>
                )}
                
                {/* Mobile Dropdown */}
                {item.hasDropdown && activeDropdown === item.id && (
                  <div className="ml-4 mt-2 space-y-1 animate-in slide-in-from-top-2 duration-200">
                    {item.dropdownItems?.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.id}
                        href={dropdownItem.route}
                        onClick={closeMenus}
                        className="flex items-center w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200 rounded-lg"
                      >
                        {dropdownItem.icon && <dropdownItem.icon className="h-4 w-4 mr-2" />}
                        {dropdownItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {/* Mobile Actions */}
            <div className="border-t border-gray-200 pt-4 pb-3 space-y-3">
              {!isAuthenticated ? (
                <>
                  <Link
                    href={authRoutes.login}
                    className="block w-full text-left px-3 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200 rounded-lg"
                  >
                    Log In
                  </Link>
                  <Link
                    href={authRoutes.signup}
                    className="mx-3 block w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 hover:scale-105 active:scale-95 text-center"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  <div className="px-3 py-2 border-b border-gray-200 mb-3">
                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  
                  <Link
                    href={authRoutes.dashboard}
                    className="flex items-center w-full text-left px-3 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200 rounded-lg"
                  >
                    <Settings className="h-4 w-4 mr-3" />
                    Dashboard
                  </Link>
                  <Link
                    href={authRoutes.profile}
                    className="flex items-center w-full text-left px-3 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200 rounded-lg"
                  >
                    <User className="h-4 w-4 mr-3" />
                    Profile
                  </Link>
                  <Link
                    href={authRoutes.settings}
                    className="flex items-center w-full text-left px-3 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200 rounded-lg"
                  >
                    <Settings className="h-4 w-4 mr-3" />
                    Settings
                  </Link>
                  <button 
                    onClick={() => handleAuthAction('logout')}
                    className="flex items-center w-full text-left px-3 py-2 text-sm text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors duration-200 rounded-lg"
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Logout
                  </button>
                </>
              )}
              
              {/* Demo Toggle in Mobile */}
              <button 
                onClick={toggleAuthState}
                className="mx-3 w-full px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-colors duration-200"
              >
                {isAuthenticated ? 'Demo Logout' : 'Demo Login'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;