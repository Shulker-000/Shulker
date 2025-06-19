import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <footer className="bg-gray-50 border-t border-gray-200 relative overflow-hidden">
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-2">
            <div className="flex items-center mb-6">
              <img src="/LogoIcon.svg" className='h-18 w-18' alt="" />
              <span className="text-xl font-bold text-gray-900">CogniMeet</span>
            </div>
            <p className="text-gray-600 mb-6 max-w-md leading-relaxed">
              Transform your meetings with intelligent video conferencing powered by advanced AI technology. 
              Experience seamless collaboration like never before.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-gray-600 hover:text-blue-600 transition-colors group">
                <Mail className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform" />
                <a href="mailto:neurix.work@gmail.com" className="text-sm">neurix.work@gmail.com</a>
              </div>
              <div className="flex items-center text-gray-600 hover:text-blue-600 transition-colors group">
                <svg className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <a href="https://github.com/neurix-000" target="_blank" rel="noopener noreferrer" className="text-sm">neurix-000</a>
              </div>
            </div>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              {[
                { Icon: Facebook, color: 'hover:bg-blue-600', bg: 'bg-gray-300' },
                { Icon: Twitter, color: 'hover:bg-sky-500', bg: 'bg-gray-300' },
                { Icon: Linkedin, color: 'hover:bg-blue-700', bg: 'bg-gray-300' },
                { Icon: Instagram, color: 'hover:bg-pink-600', bg: 'bg-gray-300' }
              ].map(({ Icon, color, bg }, index) => (
                <div 
                  key={index}
                  className={`w-8 h-8 ${bg} rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 ${color} group`}
                >
                  <Icon className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                </div>
              ))}
            </div>
          </div>
          
          {/* Product Links */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Product</h3>
            <ul className="space-y-2">
              {['Features', 'Pricing', 'Security', 'Integrations', 'API', 'Mobile App'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-gray-600 hover:text-blue-600 transition-all duration-200 text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Support Links */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Support</h3>
            <ul className="space-y-2">
              {['Documentation', 'Help Center', 'Contact Us', 'System Status', 'Community', 'Tutorials'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-gray-600 hover:text-blue-600 transition-all duration-200 text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Company Links */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2">
              {['About Us', 'Careers', 'Press', 'Blog', 'Investors', 'Partners'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-gray-600 hover:text-blue-600 transition-all duration-200 text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-8 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Legal Links */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Accessibility'].map((item) => (
                <a 
                  key={item}
                  href="#" 
                  className="text-gray-500 hover:text-blue-600 text-sm transition-colors duration-200"
                >
                  {item}
                </a>
              ))}
            </div>
            
            {/* Copyright and Back to Top */}
            <div className="flex items-center space-x-4">
              <div className="text-gray-500 text-sm text-center lg:text-right">
                © {currentYear} CogniMeet. All rights reserved.
              </div>
              <button 
                onClick={scrollToTop}
                className="w-8 h-8 bg-gray-300 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 group"
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;