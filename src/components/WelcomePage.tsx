import React, { useState } from 'react';
import { Leaf, ArrowRight, Clock, Globe, Award, Trees, Cloud } from 'lucide-react';

interface WelcomePageProps {
  onStart: (name: string, email: string) => void;
}

export const WelcomePage: React.FC<WelcomePageProps> = ({ onStart }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({ name: '', email: '' });
  const [isHovering, setIsHovering] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = { name: '', email: '' };
    let hasErrors = false;

    if (!name.trim()) {
      newErrors.name = '✨ Please share your name with us!';
      hasErrors = true;
    }

    if (!email.trim()) {
      newErrors.email = '✉️ Please provide your email address!';
      hasErrors = true;
    } else if (!validateEmail(email)) {
      newErrors.email = '✉️ Please enter a valid email address!';
      hasErrors = true;
    }

    setErrors(newErrors);

    if (!hasErrors) {
      onStart(name.trim(), email.trim());
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-green-50 via-blue-50/30 to-green-100/50">
      {/* Animated Background Elements - Adjusted for mobile */}
      <div className="absolute inset-0 overflow-hidden">
        <Cloud className="absolute top-10 left-5 w-12 h-12 md:w-16 md:h-16 text-green-100 animate-pulse" />
        <Cloud className="absolute top-20 right-10 w-14 h-14 md:w-20 md:h-20 text-green-100 animate-pulse" style={{ animationDelay: '1s' }} />
        <Trees className="absolute bottom-10 left-5 w-16 h-16 md:w-24 md:h-24 text-green-100 animate-pulse" style={{ animationDelay: '0.5s' }} />
        <Trees className="absolute bottom-20 right-5 w-14 h-14 md:w-20 md:h-20 text-green-100 animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="relative min-h-screen flex flex-col items-center px-4 md:px-6 pt-8 md:pt-12 pb-6 md:pb-8">
        {/* Animated Logo */}
        <div className="mb-6 md:mb-12 relative">
          <div className="absolute inset-0 bg-green-400 rounded-full blur-xl opacity-50 animate-pulse"></div>
          <div className="relative bg-gradient-to-br from-green-500 to-green-600 rounded-full p-4 md:p-6 shadow-lg shadow-green-200/50 transform hover:scale-110 transition-transform duration-300">
            <Leaf className="w-8 h-8 md:w-12 md:h-12 text-white animate-bounce" />
          </div>
        </div>

        {/* Title & Description */}
        <div className="text-center space-y-3 md:space-y-4 mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent px-4">
            Carbon Footprint Challenge
          </h1>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-md px-4">
            Embark on an eco-journey to discover your environmental impact! 🌍
          </p>
        </div>

        {/* Feature Cards - Responsive Grid */}
        <div className="w-full max-w-xl grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12 px-4">
          {[
            { icon: Clock, title: '5 Min Quiz', subtitle: 'Quick & Easy' },
            { icon: Globe, title: '10 Questions', subtitle: 'Comprehensive' },
            { icon: Award, title: 'Get Results', subtitle: 'Instant Analysis' }
          ].map((feature, index) => (
            <div key={index} className="group bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 flex flex-row md:flex-col items-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 gap-4 md:gap-0">
              <div className="bg-green-100 rounded-full p-3 md:p-4 md:mb-3 group-hover:bg-green-200 transition-colors duration-300">
                <feature.icon className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
              </div>
              <div className="flex flex-col md:items-center">
                <span className="text-base md:text-lg font-medium text-gray-700">{feature.title}</span>
                <span className="text-sm text-gray-500">{feature.subtitle}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Input & Button Section */}
        <div className="w-full max-w-md space-y-4 md:space-y-6 px-4 mt-auto">
          <div className="space-y-4">
            <div className="relative group">
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (e.target.value.trim()) {
                    setErrors(prev => ({ ...prev, name: '' }));
                  }
                }}
                placeholder="Enter your name"
                className={`w-full px-4 md:px-6 py-3 md:py-4 bg-white rounded-xl md:rounded-2xl text-base md:text-lg
                         shadow-lg outline-none transition-all duration-300
                         ${errors.name ? 'ring-2 ring-red-300 focus:ring-red-500' : 'focus:ring-2 focus:ring-green-500'}`}
              />
              <div className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center">
                <span className="text-xl md:text-2xl group-hover:animate-bounce inline-flex">
                  👋
                </span>
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-500 animate-fadeIn pl-2">{errors.name}</p>
              )}
            </div>

            <div className="relative group">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (validateEmail(e.target.value)) {
                    setErrors(prev => ({ ...prev, email: '' }));
                  }
                }}
                placeholder="Enter your email"
                className={`w-full px-4 md:px-6 py-3 md:py-4 bg-white rounded-xl md:rounded-2xl text-base md:text-lg
                         shadow-lg outline-none transition-all duration-300
                         ${errors.email ? 'ring-2 ring-red-300 focus:ring-red-500' : 'focus:ring-2 focus:ring-green-500'}`}
              />
              <div className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center">
                <span className="text-xl md:text-2xl group-hover:animate-bounce inline-flex">
                  ✉️
                </span>
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-500 animate-fadeIn pl-2">{errors.email}</p>
              )}
            </div>
          </div>
          
          <button
            onClick={handleSubmit}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white 
                     rounded-xl md:rounded-2xl py-3 md:py-5 text-base md:text-lg font-medium 
                     flex items-center justify-center gap-2 md:gap-3 
                     shadow-lg shadow-green-200 hover:shadow-xl active:scale-98
                     transition-all duration-300"
          >
            Start The Quiz
            <ArrowRight className={`w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 ${isHovering ? 'translate-x-1' : ''}`} />
          </button>

          <div className="flex items-center justify-center gap-2 text-gray-500 pb-4">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-xs md:text-sm">Your data is kept private and secure</p>
          </div>
        </div>
      </div>
    </div>
  );
};