import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Users, Target, ArrowRight, Lightbulb, Zap, Shield } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #D1F8EF 0%, #A1E3F9 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
              Welcome to{' '}
              <span style={{ color: '#578FCA' }}>CogniMeet</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Revolutionizing collaborative thinking and meeting experiences with intelligent tools and seamless interaction. 
              Transform the way your team connects, creates, and collaborates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                to="/whiteboard" 
                className="px-8 py-4 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 flex items-center justify-center"
                style={{ backgroundColor: '#578FCA' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#3674B5'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#578FCA'}
              >
                Get Started <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link 
                to="/about" 
                className="border-2 px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
                style={{ 
                  borderColor: '#578FCA', 
                  color: '#578FCA',
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#D1F8EF'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose CogniMeet?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the future of collaborative meetings with our innovative features designed for modern teams.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-8 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2" 
                 style={{ background: 'linear-gradient(135deg, #D1F8EF 0%, rgba(209, 248, 239, 0.3) 100%)' }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                   style={{ backgroundColor: '#578FCA' }}>
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Smart Collaboration</h3>
              <p className="text-gray-600 leading-relaxed">
                AI-powered tools that enhance team collaboration and boost productivity in every meeting. 
                Experience intelligent suggestions and automated workflows.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-8 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2" 
                 style={{ background: 'linear-gradient(135deg, #A1E3F9 0%, rgba(161, 227, 249, 0.3) 100%)' }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                   style={{ backgroundColor: '#3674B5' }}>
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Team Synergy</h3>
              <p className="text-gray-600 leading-relaxed">
                Bring your team together with seamless communication and real-time collaboration features. 
                Foster creativity and innovation in every session.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-8 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2" 
                 style={{ background: 'linear-gradient(135deg, #A1E3F9 0%, #D1F8EF 100%)' }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                   style={{ backgroundColor: '#578FCA' }}>
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Goal-Oriented</h3>
              <p className="text-gray-600 leading-relaxed">
                Stay focused on your objectives with structured meeting flows and clear action items. 
                Track progress and achieve results efficiently.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20" style={{ backgroundColor: '#D1F8EF' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold mb-2" style={{ color: '#3674B5' }}>10k+</div>
              <p className="text-gray-700 font-medium">Active Users</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold mb-2" style={{ color: '#3674B5' }}>500+</div>
              <p className="text-gray-700 font-medium">Companies Trust Us</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold mb-2" style={{ color: '#3674B5' }}>99.9%</div>
              <p className="text-gray-700 font-medium">Uptime Reliability</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #578FCA 0%, #3674B5 100%)' }}>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Meetings?</h2>
          <p className="text-xl mb-8" style={{ color: '#A1E3F9' }}>
            Join thousands of teams already using CogniMeet to revolutionize their collaborative experience.
          </p>
          <Link 
            to="/login" 
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center"
            style={{ color: '#3674B5' }}
          >
            Start Your Journey <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;