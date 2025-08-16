import React from "react";
import { Mail, ArrowUp } from "lucide-react";
import {
  FaFacebook,
  FaXTwitter,
  FaLinkedin,
  FaGithub,
  FaInstagram,
} from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-900 text-gray-300 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-2">
            <div className="flex items-center mb-6">
              <img src="/logo.png" className="h-18 w-18" alt="" />

              <span className="text-xl font-bold text-white">Shulker</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              Transform your meetings with intelligent video conferencing
              powered by advanced AI technology. Experience seamless
              collaboration like never before.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-gray-400 hover:text-blue-400 transition-colors group">
                <Mail className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform" />
                <a href="mailto:neurix.work@gmail.com" className="text-sm">
                  neurix.work@gmail.com
                </a>
              </div>
              <div className="flex items-center text-gray-400 hover:text-blue-400 transition-colors group">
                <FaGithub className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform" />
                <a
                  href="https://github.com/neurix-000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm"
                >
                  neurix-000
                </a>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
              {[
                {
                  Icon: FaFacebook,
                  href: "https://facebook.com",
                  color: "hover:bg-blue-600",
                },
                {
                  Icon: FaXTwitter,
                  href: "https://twitter.com",
                  color: "hover:bg-sky-500",
                },
                {
                  Icon: FaLinkedin,
                  href: "https://linkedin.com",
                  color: "hover:bg-blue-700",
                },
                {
                  Icon: FaInstagram,
                  href: "https://instagram.com",
                  color: "hover:bg-pink-600",
                },
              ].map(({ Icon, href, color }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 ${color} group border border-gray-700 hover:border-transparent`}
                >
                  <Icon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Product
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Features", href: "/features" },
                { name: "Pricing", href: "/pricing" },
                { name: "Security", href: "/security" },
                { name: "Integrations", href: "/integrations" },
                { name: "API", href: "/api" },
                { name: "Mobile App", href: "/mobile" },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-all duration-200 text-sm hover:translate-x-1 inline-block"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Documentation", href: "/docs" },
                { name: "Help Center", href: "/help" },
                { name: "Contact Us", href: "/contact" },
                { name: "System Status", href: "/status" },
                { name: "Community", href: "/community" },
                { name: "Tutorials", href: "/tutorials" },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-all duration-200 text-sm hover:translate-x-1 inline-block"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {[
                { name: "About Us", href: "/about" },
                { name: "Careers", href: "/careers" },
                { name: "Press", href: "/press" },
                { name: "Blog", href: "/blog" },
                { name: "Investors", href: "/investors" },
                { name: "Partners", href: "/partners" },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-all duration-200 text-sm hover:translate-x-1 inline-block"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Legal Links */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2">
              {[
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Terms of Service", href: "/terms" },
                { name: "Cookie Policy", href: "/cookies" },
                { name: "Accessibility", href: "/accessibility" },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-500 hover:text-gray-300 text-sm transition-colors duration-200"
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Copyright and Back to Top */}
            <div className="flex items-center space-x-4">
              <div className="text-gray-500 text-sm text-center lg:text-right">
                © {currentYear} Shulker. All rights reserved.
              </div>
              <button
                onClick={scrollToTop}
                className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 group border border-gray-700 hover:border-blue-600"
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
