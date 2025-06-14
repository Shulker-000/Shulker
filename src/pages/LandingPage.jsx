import React from 'react';
import { Brain, Users, Target, ArrowRight, Lightbulb, Zap, Shield } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[#caf0f8] via-[#ade8f4] to-[#90e0ef]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-[#03045e] mb-6">
              Welcome to{' '}
              <span className="text-[#0077b6]">CogniMeet</span>
            </h1>
            <p className="text-xl text-[#023e8a] mb-8 max-w-3xl mx-auto leading-relaxed">
              Revolutionizing collaborative thinking and meeting experiences with intelligent tools and seamless interaction. 
              Transform the way your team connects, creates, and collaborates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="/whiteboard" 
                className="px-8 py-4 bg-[#0077b6] hover:bg-[#023e8a] rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 flex items-center justify-center shadow-lg"
              >
                Get Started <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <a 
                href="/about" 
                className="border-2 border-[#0077b6] px-8 py-4 rounded-lg font-semibold text-[#0077b6] bg-white hover:bg-[#caf0f8] hover:border-[#023e8a] transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#03045e] mb-4">Why Choose CogniMeet?</h2>
            <p className="text-lg text-[#023e8a] max-w-2xl mx-auto">
              Experience the future of collaborative meetings with our innovative features designed for modern teams.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-8 bg-gradient-to-b from-[#caf0f8] to-[#ade8f4] rounded-xl border border-[#90e0ef] hover:border-[#48cae4] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:from-[#ade8f4] hover:to-[#90e0ef]">
              <div className="w-16 h-16 bg-gradient-to-r from-[#0077b6] to-[#0096c7] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#03045e] mb-4">Smart Collaboration</h3>
              <p className="text-[#023e8a] leading-relaxed">
                AI-powered tools that enhance team collaboration and boost productivity in every meeting. 
                Experience intelligent suggestions and automated workflows.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-8 bg-gradient-to-b from-[#caf0f8] to-[#ade8f4] rounded-xl border border-[#90e0ef] hover:border-[#48cae4] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:from-[#ade8f4] hover:to-[#90e0ef]">
              <div className="w-16 h-16 bg-gradient-to-r from-[#00b4d8] to-[#48cae4] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#03045e] mb-4">Team Synergy</h3>
              <p className="text-[#023e8a] leading-relaxed">
                Bring your team together with seamless communication and real-time collaboration features. 
                Foster creativity and innovation in every session.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-8 bg-gradient-to-b from-[#caf0f8] to-[#ade8f4] rounded-xl border border-[#90e0ef] hover:border-[#48cae4] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:from-[#ade8f4] hover:to-[#90e0ef]">
              <div className="w-16 h-16 bg-gradient-to-r from-[#023e8a] to-[#0077b6] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#03045e] mb-4">Goal-Oriented</h3>
              <p className="text-[#023e8a] leading-relaxed">
                Stay focused on your objectives with structured meeting flows and clear action items. 
                Track progress and achieve results efficiently.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gradient-to-r from-[#03045e] via-[#023e8a] to-[#0077b6]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="text-4xl font-bold text-white mb-2">10k+</div>
              <p className="text-[#90e0ef] font-medium">Active Users</p>
            </div>
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <p className="text-[#90e0ef] font-medium">Companies Trust Us</p>
            </div>
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="text-4xl font-bold text-white mb-2">99.9%</div>
              <p className="text-[#90e0ef] font-medium">Uptime Reliability</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-br from-[#90e0ef] via-[#ade8f4] to-[#caf0f8]">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-[#03045e] mb-6">Ready to Transform Your Meetings?</h2>
          <p className="text-xl text-[#023e8a] mb-8">
            Join thousands of teams already using CogniMeet to revolutionize their collaborative experience.
          </p>
          <a 
            href="/login" 
            className="bg-gradient-to-r from-[#0077b6] to-[#0096c7] hover:from-[#023e8a] hover:to-[#0077b6] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center shadow-lg"
          >
            Start Your Journey <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;