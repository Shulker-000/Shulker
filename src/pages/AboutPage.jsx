import React from 'react';
import { CheckCircle, Heart, Lightbulb, Users, Target, Zap, Award, Globe, Star, Rocket, Shield, Clock, Clock1 } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section - Matching Landing Page Style */}
      <section className="pt-16 pb-24 lg:pt-20 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div className="mb-16 lg:mb-0">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                About 
                <span className="text-blue-600"> CogniMeet</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Empowering teams to think, collaborate, and achieve more together through intelligent meeting solutions 
                that bridge the gap between ideas and execution.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 text-blue-600" />
                  <span className="font-medium text-gray-700">Innovation-driven development</span>
                </div>
                <div className="flex items-center space-x-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 text-blue-600" />
                  <span className="font-medium text-gray-700">User-centric design approach</span>
                </div>
                <div className="flex items-center space-x-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 text-blue-600" />
                  <span className="font-medium text-gray-700">Seamless collaboration experience</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-indigo-200 rounded-3xl p-8 shadow-2xl border border-blue-200">
                <div className="text-center">
                  <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Lightbulb className="w-12 h-12 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Innovation First</h3>
                  <p className="text-lg text-gray-600">Turning ideas into reality through cutting-edge technology</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Story Section - White Background like Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Story & Mission</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how CogniMeet transforms collaborative thinking and why we're passionate about revolutionizing meetings.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl border border-blue-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mr-4">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                At CogniMeet, we believe that great ideas emerge when brilliant minds come together. Our mission is to create 
                the ultimate platform for collaborative thinking, where teams can brainstorm, plan, and execute with unprecedented clarity.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We're not just building another meeting tool – we're crafting an ecosystem that amplifies human creativity and 
                transforms the way teams work together in the digital age.
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-xl border border-indigo-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mr-4">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Story</h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                CogniMeet was born from a simple observation: despite having access to countless communication tools, 
                teams still struggled to collaborate effectively. Meetings felt disconnected, ideas got lost in translation.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our founders set out to create something different – a platform that wouldn't just connect people, 
                but would actively enhance their ability to think together and reach breakthrough solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section - Grid Layout like Key Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do and shape our commitment to excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: <Heart className="w-8 h-8 text-blue-600" />, 
                title: "Passion", 
                desc: "We love what we do and it shows in every feature we build and every interaction we create." 
              },
              { 
                icon: <Users className="w-8 h-8 text-blue-600" />, 
                title: "Collaboration", 
                desc: "Together we achieve more than we ever could alone, fostering teamwork at every level." 
              },
              { 
                icon: <Target className="w-8 h-8 text-blue-600" />, 
                title: "Focus", 
                desc: "Clear goals and purposeful action drive our success and guide our development decisions." 
              },
              { 
                icon: <Zap className="w-8 h-8 text-blue-600" />, 
                title: "Excellence", 
                desc: "We strive for perfection in every detail, interaction, and user experience we deliver." 
              }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100 h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-100 transition-colors duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section - White Background */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Achievements</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Recognition and milestones that reflect our commitment to innovation and user satisfaction.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl border border-blue-200 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Award Winning</h3>
              <p className="text-gray-600 leading-relaxed">
                Recognized for innovation in collaborative technology and outstanding user experience design.
              </p>
            </div>
            
            <div className="text-center p-8 bg-gradient-to-br from-indigo-50 to-purple-100 rounded-xl border border-indigo-200 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Global Reach</h3>
              <p className="text-gray-600 leading-relaxed">
                Serving teams across 50+ countries worldwide, connecting minds across continents and cultures.
              </p>
            </div>
            
            <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl border border-purple-200 hover:shadow-lg transition-all duration-300 sm:col-span-2 lg:col-span-1">
              <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Trusted Platform</h3>
              <p className="text-gray-600 leading-relaxed">
                Built with enterprise-grade security and trusted by Fortune 500 companies for their most important meetings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section - Gray Background */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-12 text-white shadow-2xl">
            <div className="w-24 h-24 rounded-2xl flex items-center justify-center mx-auto">
              <img src="/LogoIcon.svg" alt="Logo" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Transform Your Meetings?</h2>
            <p className="text-xl mb-8 opacity-90 leading-relaxed">
              Join thousands of teams who have already discovered the power of intelligent collaboration. 
              Experience the future of meetings with CogniMeet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-xl text-lg font-semibold shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5">
                Start
              </button>
              <Link to='/whiteboard'>
              <button className="border-2 border-white border-opacity-50 hover:border-opacity-100 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 hover:bg-white hover:bg-opacity-10">
                Whiteboard
              </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;