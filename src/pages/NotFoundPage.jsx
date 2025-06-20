import { ArrowLeft, Home } from 'lucide-react';
import { useState } from 'react';

const NotFoundPage = () => {
  const [isNavigating, setIsNavigating] = useState(false);

  const handleGoBack = () => {
    setIsNavigating(true);
    // In your real app, use: navigate(-1);
    setTimeout(() => window.history.back(), 100);
  };

  const handleHome = () => {
    setIsNavigating(true);
    // In your real app, this would be handled by Link component
    setTimeout(() => window.location.href = '/', 100);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-6xl w-full mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
          
          {/* Image Section */}
          <div className="flex-1 max-w-md lg:max-w-lg">
            <div className="relative">
              {/* Laptop Frame */}
              <div className="bg-gray-300 rounded-t-2xl p-2 shadow-2xl">
                <div className="rounded-xl overflow-hidden">
                  {/* Placeholder for your image */}
                  <img 
                    src="/notFound.png" 
                    alt="404 Error Illustration"
                    className="w-full h-auto object-cover rounded-xl"
                  />
                </div>
              </div>
              {/* Laptop Base */}
              <div className="bg-gray-300 h-4 rounded-b-2xl shadow-lg"></div>
              <div className="bg-gray-400 h-2 w-32 mx-auto rounded-b-lg"></div>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 max-w-md text-left">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Uh oh!
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              You seem to have lost your way. Let us help you find what you were looking for:
            </p>

            <div className="space-y-4 mb-8">
              <p className="text-gray-700">
                Check out our{' '}
                <a href="/events" className="text-blue-600 hover:text-blue-700 hover:underline font-medium">
                  upcoming events
                </a>
              </p>
              
              <p className="text-gray-700">
                See what's happening on the{' '}
                <a href="/blog" className="text-blue-600 hover:text-blue-700 hover:underline font-medium">
                  blog
                </a>
              </p>
              
              <p className="text-gray-700">
                Sign up for a customized{' '}
                <a href="/demo" className="text-blue-600 hover:text-blue-700 hover:underline font-medium">
                  demo
                </a>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleHome}
                disabled={isNavigating}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:cursor-not-allowed"
              >
                <Home className="w-5 h-5" />
                Back to Home
              </button>
              
              <button 
                onClick={handleGoBack}
                disabled={isNavigating}
                className="flex-1 border border-gray-300 hover:border-blue-600 hover:bg-blue-50 text-gray-700 hover:text-blue-600 disabled:text-gray-400 disabled:border-gray-200 px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-5 h-5" />
                Previous Page
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;