import React from 'react';
import { Link } from 'react-router-dom';
import { Leaderboard } from '../components/Leaderboard';
import { Play, Leaf } from 'lucide-react';

const StandaloneLeaderboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-green-50">
      {/* Hero Section */}
      <div className="bg-white/50 backdrop-blur-sm border-b border-green-100">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-green-300 rounded-full w-20 h-20 mx-auto opacity-50 blur-sm"></div>
              <Leaf className="w-16 h-16 text-green-600 relative" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mt-4 mb-2">
              Carbon Footprint Challenge
            </h1>
            <p className="text-gray-600 text-lg mb-6">
              Join the global community in reducing carbon emissions
            </p>
            <Link 
              to="/"
              className="inline-flex items-center px-8 py-4 bg-green-500 text-white rounded-xl
                        font-semibold shadow-lg hover:bg-green-600 transform hover:scale-105
                        transition-all duration-200 focus:outline-none focus:ring-2 
                        focus:ring-green-500 focus:ring-offset-2"
            >
              <Play className="w-5 h-5 mr-2" />
              Take the Challenge
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-4xl mx-auto px-4 py-8">


        {/* Leaderboard Section */}
        <div className="animate-fadeIn">
          <Leaderboard standalone />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/50 backdrop-blur-sm border-t border-green-100 mt-12">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">Join us in making a difference</p>
            <div className="flex justify-center space-x-4">
              <Link 
                to="/about"
                className="hover:text-green-600 transition-colors"
              >
                About
              </Link>
              <Link 
                to="/faq"
                className="hover:text-green-600 transition-colors"
              >
                FAQ
              </Link>
              <Link 
                to="/contact"
                className="hover:text-green-600 transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StandaloneLeaderboard;
