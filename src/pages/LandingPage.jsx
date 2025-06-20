import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Mic, Video, Presentation } from 'lucide-react';
import features  from './Features';
import { Link } from 'react-router-dom';
// import { features } from './features';

// Enhanced Features Slider Component
const FeaturesSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [slidesToShow, setSlidesToShow] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSlidesToShow(3);
      } else if (window.innerWidth >= 768) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const maxIndex = Math.max(0, features.length - slidesToShow);
        return prevIndex >= maxIndex ? 0 : prevIndex + 1;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slidesToShow]);

  const nextSlide = () => {
    const maxIndex = Math.max(0, features.length - slidesToShow);
    setCurrentIndex((prevIndex) => prevIndex >= maxIndex ? 0 : prevIndex + 1);
  };

  const prevSlide = () => {
    const maxIndex = Math.max(0, features.length - slidesToShow);
    setCurrentIndex((prevIndex) => prevIndex <= 0 ? maxIndex : prevIndex - 1);
  };

  const goToSlide = (index) => {
    const maxIndex = Math.max(0, features.length - slidesToShow);
    setCurrentIndex(Math.min(index, maxIndex));
  };

  const getVisibleFeatures = () => {
    return features.slice(currentIndex, currentIndex + slidesToShow);
  };

  return (
    <div className="relative max-w-7xl mx-auto">
      <div 
        className="overflow-hidden rounded-xl"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <div className="flex space-x-4 transition-transform duration-700 ease-in-out">
          {getVisibleFeatures().map((feature) => (
            <div key={feature.id} className="flex-shrink-0" style={{ width: `${100 / slidesToShow}%` }}>
              <div className="bg-white p-6 lg:p-8 rounded-xl shadow-lg border border-blue-100 mx-2 h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 p-2 bg-blue-50 rounded-lg">
                    {feature.icon}
                  </div>
                  <div className="ml-4">
                    <span className="inline-block px-2 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-full mb-2">
                      {feature.category}
                    </span>
                    <h3 className="text-lg lg:text-xl font-semibold text-gray-900 leading-tight">{feature.title}</h3>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm lg:text-base">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white hover:bg-gray-50 rounded-full p-3 shadow-lg border border-gray-200 transition-all duration-200 hover:shadow-xl z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 text-gray-600" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white hover:bg-gray-50 rounded-full p-3 shadow-lg border border-gray-200 transition-all duration-200 hover:shadow-xl z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 text-gray-600" />
      </button>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-8 space-x-2">
        {Array.from({ length: Math.max(1, features.length - slidesToShow + 1) }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentIndex 
                ? 'bg-blue-600 scale-110' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="pt-16 pb-24 lg:pt-20 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div className="mb-16 lg:mb-0">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Elevate Your Meetings with 
                <span className="text-blue-600"> Intelligent</span> Video Conferencing
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                CogniMeet combines the power of video conferencing with advanced AI features to make your meetings more productive, insightful, and engaging than ever before.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5">
                  Start
                </button>
                <Link to='/whiteboard'>
                <button className="border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200">
                  WhiteBoard
                </button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-indigo-200 rounded-3xl p-1 shadow-2xl border border-blue-200">
              <img src="/home.png" className='rounded-3xl' alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Slider Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Powerful AI-Driven Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how CogniMeet's advanced features transform your meeting experience with intelligent automation and insights.
            </p>
          </div>
          <FeaturesSlider />
        </div>
      </section>

      {/* Key Benefits Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Star className="w-8 h-8 text-blue-600" />, title: "AI-Powered Summaries", desc: "Get concise summaries with key decisions and action items." },
              { icon: <Mic className="w-8 h-8 text-blue-600" />, title: "Intelligent Audio", desc: "Crystal-clear audio with advanced noise cancellation." },
              { icon: <Presentation className="w-8 h-8 text-blue-600" />, title: "Interactive Presentations", desc: "Engage your audience with interactive presentations and polls." },
              { icon: <Video className="w-8 h-8 text-blue-600" />, title: "HD Video Quality", desc: "Experience high-definition video for immersive meetings." }
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
    </div>
  );
};

export default LandingPage;