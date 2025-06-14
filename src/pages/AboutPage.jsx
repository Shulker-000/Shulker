import React from 'react';
import { CheckCircle, Heart, Lightbulb, Users, Target, Zap, Award, Globe } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-16 sm:py-20 lg:py-24" style={{ background: 'linear-gradient(135deg, #caf0f8 0%, #90e0ef 100%)' }}>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" style={{ color: '#03045e' }}>
            About CogniMeet
          </h1>
          <p className="text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto" style={{ color: '#023e8a' }}>
            Empowering teams to think, collaborate, and achieve more together through intelligent meeting solutions 
            that bridge the gap between ideas and execution.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: '#03045e' }}>
                Our Mission
              </h2>
              <p className="text-lg mb-6 leading-relaxed" style={{ color: '#023e8a' }}>
                At CogniMeet, we believe that great ideas emerge when brilliant minds come together. Our mission is to create 
                the ultimate platform for collaborative thinking, where teams can brainstorm, plan, and execute with unprecedented clarity.
              </p>
              <p className="text-lg mb-8 leading-relaxed" style={{ color: '#023e8a' }}>
                We're not just building another meeting tool – we're crafting an ecosystem that amplifies human creativity and 
                transforms the way teams work together in the digital age.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0" style={{ color: '#0077b6' }} />
                  <span className="font-medium" style={{ color: '#023e8a' }}>Innovation-driven development</span>
                </div>
                <div className="flex items-center space-x-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0" style={{ color: '#0077b6' }} />
                  <span className="font-medium" style={{ color: '#023e8a' }}>User-centric design approach</span>
                </div>
                <div className="flex items-center space-x-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0" style={{ color: '#0077b6' }} />
                  <span className="font-medium" style={{ color: '#023e8a' }}>Seamless collaboration experience</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="w-full h-80 rounded-2xl shadow-2xl p-8 flex items-center justify-center transform transition-transform duration-300 hover:scale-105"
                   style={{ background: 'linear-gradient(135deg, #0096c7 0%, #0077b6 100%)' }}>
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
      <section className="py-16 sm:py-20" style={{ background: 'linear-gradient(135deg, #caf0f8 0%, #ade8f4 100%)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#03045e' }}>
              Our Core Values
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#023e8a' }}>
              The principles that guide everything we do and shape our commitment to excellence.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                   style={{ background: 'linear-gradient(135deg, #0077b6 0%, #0096c7 100%)' }}>
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#03045e' }}>Passion</h3>
              <p className="text-sm" style={{ color: '#023e8a' }}>
                We love what we do and it shows in every feature we build.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                   style={{ background: 'linear-gradient(135deg, #48cae4 0%, #00b4d8 100%)' }}>
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#03045e' }}>Collaboration</h3>
              <p className="text-sm" style={{ color: '#023e8a' }}>
                Together we achieve more than we ever could alone.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                   style={{ background: 'linear-gradient(135deg, #0077b6 0%, #023e8a 100%)' }}>
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#03045e' }}>Focus</h3>
              <p className="text-sm" style={{ color: '#023e8a' }}>
                Clear goals and purposeful action drive our success.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                   style={{ background: 'linear-gradient(135deg, #00b4d8 0%, #0096c7 100%)' }}>
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#03045e' }}>Excellence</h3>
              <p className="text-sm" style={{ color: '#023e8a' }}>
                We strive for perfection in every detail and interaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: '#03045e' }}>
              Our Story
            </h2>
          </div>
          
          <div className="prose prose-lg mx-auto">
            <p className="text-lg leading-relaxed mb-6" style={{ color: '#023e8a' }}>
              CogniMeet was born from a simple observation: despite having access to countless communication tools, 
              teams still struggled to collaborate effectively. Meetings felt disconnected, ideas got lost in translation, 
              and innovative thinking was often stifled by clunky interfaces and fragmented workflows.
            </p>
            
            <p className="text-lg leading-relaxed mb-6" style={{ color: '#023e8a' }}>
              Our founders, passionate about the intersection of technology and human collaboration, set out to create 
              something different. They envisioned a platform that wouldn't just connect people, but would actively 
              enhance their ability to think together, build upon each other's ideas, and reach breakthrough solutions.
            </p>
            
            <p className="text-lg leading-relaxed mb-8" style={{ color: '#023e8a' }}>
              Today, CogniMeet serves thousands of teams worldwide, from innovative startups to Fortune 500 companies, 
              all united by a common goal: to unlock the full potential of collaborative thinking and turn great ideas into reality.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transform transition-transform duration-300 hover:scale-110"
                   style={{ background: 'linear-gradient(135deg, #90e0ef 0%, #48cae4 100%)' }}>
                <Award className="w-8 h-8" style={{ color: '#023e8a' }} />
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#03045e' }}>Award Winning</h3>
              <p style={{ color: '#023e8a' }}>
                Recognized for innovation in collaborative technology
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transform transition-transform duration-300 hover:scale-110"
                   style={{ background: 'linear-gradient(135deg, #90e0ef 0%, #48cae4 100%)' }}>
                <Globe className="w-8 h-8" style={{ color: '#023e8a' }} />
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#03045e' }}>Global Reach</h3>
              <p style={{ color: '#023e8a' }}>
                Serving teams across 50+ countries worldwide
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transform transition-transform duration-300 hover:scale-110"
                   style={{ background: 'linear-gradient(135deg, #90e0ef 0%, #48cae4 100%)' }}>
                <Users className="w-8 h-8" style={{ color: '#023e8a' }} />
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#03045e' }}>Community Driven</h3>
              <p style={{ color: '#023e8a' }}>
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