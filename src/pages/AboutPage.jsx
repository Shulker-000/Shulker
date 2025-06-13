import React from 'react';
import { CheckCircle, Heart, Lightbulb, Users, Target, Zap, Award, Globe } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #D1F8EF 0%, #A1E3F9 100%)' }}>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">About CogniMeet</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Empowering teams to think, collaborate, and achieve more together through intelligent meeting solutions 
            that bridge the gap between ideas and execution.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At CogniMeet, we believe that great ideas emerge when brilliant minds come together. Our mission is to create 
                the ultimate platform for collaborative thinking, where teams can brainstorm, plan, and execute with unprecedented clarity.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We're not just building another meeting tool – we're crafting an ecosystem that amplifies human creativity and 
                transforms the way teams work together in the digital age.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <CheckCircle className="w-6 h-6" style={{ color: '#578FCA' }} />
                  <span className="text-gray-700 font-medium">Innovation-driven development</span>
                </div>
                <div className="flex items-center space-x-4">
                  <CheckCircle className="w-6 h-6" style={{ color: '#578FCA' }} />
                  <span className="text-gray-700 font-medium">User-centric design approach</span>
                </div>
                <div className="flex items-center space-x-4">
                  <CheckCircle className="w-6 h-6" style={{ color: '#578FCA' }} />
                  <span className="text-gray-700 font-medium">Seamless collaboration experience</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="w-full h-80 rounded-2xl shadow-2xl p-8 flex items-center justify-center"
                   style={{ background: 'linear-gradient(135deg, #A1E3F9 0%, #578FCA 100%)' }}>
                <div className="text-center text-white">
                  <Lightbulb className="w-16 h-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Innovation First</h3>
                  <p className="text-lg opacity-90">Turning ideas into reality</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20" style={{ backgroundColor: '#D1F8EF' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do and shape our commitment to excellence.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                   style={{ backgroundColor: '#578FCA' }}>
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Passion</h3>
              <p className="text-gray-600 text-sm">
                We love what we do and it shows in every feature we build.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                   style={{ backgroundColor: '#3674B5' }}>
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Collaboration</h3>
              <p className="text-gray-600 text-sm">
                Together we achieve more than we ever could alone.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                   style={{ backgroundColor: '#578FCA' }}>
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Focus</h3>
              <p className="text-gray-600 text-sm">
                Clear goals and purposeful action drive our success.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                   style={{ backgroundColor: '#3674B5' }}>
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Excellence</h3>
              <p className="text-gray-600 text-sm">
                We strive for perfection in every detail and interaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Story</h2>
          </div>
          
          <div className="prose prose-lg mx-auto text-gray-600">
            <p className="text-lg leading-relaxed mb-6">
              CogniMeet was born from a simple observation: despite having access to countless communication tools, 
              teams still struggled to collaborate effectively. Meetings felt disconnected, ideas got lost in translation, 
              and innovative thinking was often stifled by clunky interfaces and fragmented workflows.
            </p>
            
            <p className="text-lg leading-relaxed mb-6">
              Our founders, passionate about the intersection of technology and human collaboration, set out to create 
              something different. They envisioned a platform that wouldn't just connect people, but would actively 
              enhance their ability to think together, build upon each other's ideas, and reach breakthrough solutions.
            </p>
            
            <p className="text-lg leading-relaxed mb-8">
              Today, CogniMeet serves thousands of teams worldwide, from innovative startups to Fortune 500 companies, 
              all united by a common goal: to unlock the full potential of collaborative thinking and turn great ideas into reality.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                   style={{ backgroundColor: '#A1E3F9' }}>
                <Award className="w-8 h-8" style={{ color: '#3674B5' }} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Award Winning</h3>
              <p className="text-gray-600">
                Recognized for innovation in collaborative technology
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                   style={{ backgroundColor: '#A1E3F9' }}>
                <Globe className="w-8 h-8" style={{ color: '#3674B5' }} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Global Reach</h3>
              <p className="text-gray-600">
                Serving teams across 50+ countries worldwide
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                   style={{ backgroundColor: '#A1E3F9' }}>
                <Users className="w-8 h-8" style={{ color: '#3674B5' }} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Community Driven</h3>
              <p className="text-gray-600">
                Built with feedback from our amazing user community
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;