import React from 'react';
import { Brain, Mail, Phone, MapPin, Twitter, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
      </div>
      
      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative group">
            <div className="relative">
              <img src="/LogoIcon.svg" alt="Logo" className="h-16 w-16" />{" "}
              <div className="absolute -inset-1 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl opacity-0 transition-opacity duration-300"></div>
            </div>

              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                CogniMeet
              </span>
            </div>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Revolutionizing collaborative thinking and meeting experiences with intelligent tools and seamless interaction.
            </p>
            <div className="flex space-x-4">
              <a href="htttps://x.com" className="text-slate-400 hover:text-blue-400 transition-all duration-300 hover:scale-110 transform">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" className="text-slate-400 hover:text-blue-500 transition-all duration-300 hover:scale-110 transform">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://github.com/neurix-000" className="text-slate-400 hover:text-purple-400 transition-all duration-300 hover:scale-110 transform">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-300">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-slate-300 hover:text-cyan-300 transition-colors duration-200 hover:translate-x-1 transform inline-block">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-slate-300 hover:text-cyan-300 transition-colors duration-200 hover:translate-x-1 transform inline-block">
                  About Us
                </a>
              </li>
              <li>
                <a href="/whiteboard" className="text-slate-300 hover:text-cyan-300 transition-colors duration-200 hover:translate-x-1 transform inline-block">
                  Whiteboard
                </a>
              </li>
              <li>
                <a href="/features" className="text-slate-300 hover:text-cyan-300 transition-colors duration-200 hover:translate-x-1 transform inline-block">
                  Features
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-purple-300">Support</h3>
            <ul className="space-y-3">
              <li>
                <a href="about" className="text-slate-300 hover:text-purple-300 transition-colors duration-200 hover:translate-x-1 transform inline-block">
                  Help Center
                </a>
              </li>
              <li>
                <a href="https://react.dev/" className="text-slate-300 hover:text-purple-300 transition-colors duration-200 hover:translate-x-1 transform inline-block">
                  Documentation
                </a>
              </li>
              <li>
                <a href="https://github.com/neurix-000" className="text-slate-300 hover:text-purple-300 transition-colors duration-200 hover:translate-x-1 transform inline-block">
                  Contact Support
                </a>
              </li>
              <li>
                <a href="https://mit-license.org/" className="text-slate-300 hover:text-purple-300 transition-colors duration-200 hover:translate-x-1 transform inline-block">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-cyan-300">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 group">
                <Mail className="w-5 h-5 text-blue-400 group-hover:text-cyan-300 transition-colors duration-200" />
                <span className="text-slate-300 group-hover:text-white transition-colors duration-200">neurix.work@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3 group">
                <Github className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors duration-200" />
                <span className="text-slate-300 group-hover:text-white transition-colors duration-200">github.com/neurix-000</span>
              </div>
              <div className="flex items-center space-x-3 group">
                <Linkedin className="w-5 h-5 text-blue-500 group-hover:text-blue-400 transition-colors duration-200" />
                <span className="text-slate-300 group-hover:text-white transition-colors duration-200">To Be Added</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border border-slate-700/50 bg-slate-900/50 backdrop-blur-sm pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-slate-300 text-sm">
              © 2025 CogniMeet. All rights reserved. Developed by{' '}
              <span className="text-cyan-300 font-medium hover:text-cyan-200 transition-colors duration-200">
                Team Neurix
              </span>
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-slate-400 hover:text-blue-300 transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-slate-400 hover:text-purple-300 transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-slate-400 hover:text-cyan-300 transition-colors duration-200">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;