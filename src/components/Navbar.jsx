import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, User, Settings, LogOut, Home, Info, Mail, Building, Users } from 'lucide-react';

// NOTE: For a real-world application, it's highly recommended to use a dedicated routing
// library like 'react-router-dom' or the router from a framework like Next.js.
// This custom Link component is kept to match the original request's functionality.
const Link = ({ href, children, ...props }) => {
  const handleClick = (e) => {
    e.preventDefault();
    window.history.pushState({}, '', href);
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);
    if (props.onClick) props.onClick(e);
  };
  return <a href={href} onClick={handleClick} {...props}>{children}</a>;
};

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
  profile: '/user/profile',
  settings: '/user/settings',
  dashboard: '/dashboard',
};

// --- Reusable Child Components ---

// Renders a single navigation item (link or dropdown)
const NavItem = ({ item, currentPath, onLinkClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const hasDropdown = Array.isArray(item.dropdownItems) && item.dropdownItems.length > 0;
  const isActive = currentPath.startsWith(item.route) && (currentPath === '/' ? item.route === '/' : true);

  useClickOutside(dropdownRef, () => setIsDropdownOpen(false));

  const handleLinkClick = (e) => {
    setIsDropdownOpen(false);
    if (onLinkClick) onLinkClick(e);
  };

  const navLinkClasses = `flex items-center px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg hover:bg-gray-50 hover:scale-105 active:scale-95 ${isActive ? 'text-blue-600 bg-blue-50 shadow-sm' : 'text-gray-700 hover:text-blue-600'}`;
  const dropdownItemClasses = "flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200";

  return (
    <div className="relative" ref={dropdownRef}>
      {hasDropdown ? (
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={navLinkClasses}
          aria-expanded={isDropdownOpen}
          aria-controls={`dropdown-${item.id}`}
        >
          <item.icon className="h-4 w-4 mr-2" />
          {item.label}
          <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </button>
      ) : (
        <Link href={item.route} onClick={handleLinkClick} className={navLinkClasses}>
          <item.icon className="h-4 w-4 mr-2" />
          {item.label}
        </Link>
      )}

      {hasDropdown && isDropdownOpen && (
        <div id={`dropdown-${item.id}`} className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
          {item.dropdownItems.map((dropdownItem) => (
            <Link key={dropdownItem.id} href={dropdownItem.route} onClick={handleLinkClick} className={dropdownItemClasses}>
              {dropdownItem.icon && <dropdownItem.icon className="h-4 w-4 mr-2" />}
              {dropdownItem.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

// Renders the authentication buttons (Login/Sign Up)
const AuthButtons = ({ isMobile = false }) => {
  if (isMobile) {
    return (
      <div className="border-t border-gray-200 pt-4 pb-3 space-y-3">
        <Link href={authRoutes.login} className="block w-full text-left px-4 py-3 font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg">Log In</Link>
        <Link href={authRoutes.signup} className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium shadow-sm transition-all">Sign Up</Link>
      </div>
    );
  }
  return (
    <>
      <Link href={authRoutes.login} className="text-gray-700 hover:text-blue-600 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-50 rounded-lg">
        Log In
      </Link>
      <Link href={authRoutes.signup} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium shadow-sm transition-all hover:shadow-md hover:scale-105 active:scale-95">
        Sign Up
      </Link>
    </>
  );
};

// Renders the user profile dropdown menu
const ProfileDropdown = ({ user, onLogout, isMobile = false, onLinkClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  useClickOutside(dropdownRef, () => setIsOpen(false));
  
  const handleLogout = () => {
    setIsOpen(false);
    onLogout();
  };

  const handleLinkClick = (e) => {
    setIsOpen(false);
    if(onLinkClick) onLinkClick(e);
  };

  if (isMobile) {
    return (
      <div className="border-t border-gray-200 pt-4 pb-3 space-y-1">
        <div className="px-4 py-2">
          <p className="text-sm font-medium text-gray-900">{user?.name}</p>
          <p className="text-xs text-gray-500">{user?.email}</p>
        </div>
        <Link href={authRoutes.dashboard} onClick={handleLinkClick} className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg"><Settings className="h-4 w-4 mr-3" />Dashboard</Link>
        <Link href={authRoutes.profile} onClick={handleLinkClick} className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg"><User className="h-4 w-4 mr-3" />Profile</Link>
        <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg"><LogOut className="h-4 w-4 mr-3" />Logout</button>
      </div>
    );
  }

  return (
    <div className="relative ml-4 pl-4 border-l border-gray-200" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 transition-colors" aria-expanded={isOpen} aria-controls="profile-dropdown">
        <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
          {user?.name?.charAt(0) || 'U'}
        </div>
        <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div id="profile-dropdown" className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl border py-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-4 py-3 border-b">
            <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
          <Link href={authRoutes.profile} onClick={handleLinkClick} className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"><User className="h-4 w-4 mr-2" />Profile</Link>
          <Link href={authRoutes.settings} onClick={handleLinkClick} className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"><Settings className="h-4 w-4 mr-2" />Settings</Link>
          <hr className="my-1" />
          <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"><LogOut className="h-4 w-4 mr-2" />Logout</button>
        </div>
      )}
    </div>
  );
};


// --- Main Navbar Component ---

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  
  // Demo state - replace with your actual auth context/logic
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [user, setUser] = useState({ name: 'User', email: 'user.one.very.long.email@example.com' });

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle route changes
  useEffect(() => {
    const handlePathChange = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handlePathChange);
    return () => window.removeEventListener('popstate', handlePathChange);
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    closeMobileMenu();
    // Navigate home after logout
    const homeLink = new Link({ href: '/' });
    homeLink.props.onClick({ preventDefault: () => {} });
  };
  
  const toggleAuthState = () => setIsAuthenticated(!isAuthenticated);

  return (
    <nav className={`sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b transition-shadow duration-300 ${isScrolled ? 'shadow-md border-gray-200' : 'shadow-sm border-gray-100'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link href="/" onClick={closeMobileMenu} className="flex-shrink-0 flex items-center gap-2 group">
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
              <ProfileDropdown user={user} onLogout={handleLogout} />
            ) : (
              <AuthButtons />
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
             {/* Demo Auth Toggle */}
            <button onClick={toggleAuthState} className="mr-2 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-md">
                Toggle Auth
            </button>
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

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="px-2 pt-2 pb-4 space-y-1">
            {navItems.map((item) => (
              <NavItem key={item.id} item={item} currentPath={currentPath} onLinkClick={closeMobileMenu} />
            ))}
            {isAuthenticated ? (
              <ProfileDropdown user={user} onLogout={handleLogout} isMobile onLinkClick={closeMobileMenu} />
            ) : (
              <AuthButtons isMobile />
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;