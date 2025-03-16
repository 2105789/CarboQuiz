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
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-emerald-50 via-cyan-50 to-emerald-50">
      {/* Animated Background Elements - Optimized for mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -left-10 w-32 h-32 sm:w-72 sm:h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" />
        <div className="absolute -top-10 -right-10 w-32 h-32 sm:w-72 sm:h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-700" />
        <div className="absolute -bottom-10 left-1/2 w-32 h-32 sm:w-72 sm:h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000" />
        <Cloud className="absolute top-10 left-5 w-12 h-12 md:w-16 md:h-16 text-green-200 animate-pulse" />
        <Cloud className="absolute top-20 right-10 w-14 h-14 md:w-20 md:h-20 text-green-200 animate-pulse" style={{ animationDelay: '1s' }} />
        <Trees className="absolute bottom-10 left-5 w-16 h-16 md:w-24 md:h-24 text-green-200 animate-pulse" style={{ animationDelay: '0.5s' }} />
        <Trees className="absolute bottom-20 right-5 w-14 h-14 md:w-20 md:h-20 text-green-200 animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="relative min-h-screen flex flex-col items-center justify-between px-4 md:px-6 pt-8 md:pt-12 pb-8" style={{ paddingBottom: 'env(safe-area-inset-bottom, 2rem)' }}>
        {/* Animated Logo */}
        <div className="mb-6 md:mb-8 relative">
          <div className="absolute inset-0 bg-emerald-400 rounded-full blur-xl opacity-50 animate-pulse"></div>
          <div className="relative bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full p-4 md:p-6 shadow-lg shadow-emerald-200/50 transform hover:scale-110 transition-transform duration-300">
            <Leaf className="w-8 h-8 md:w-12 md:h-12 text-white animate-bounce" />
          </div>
        </div>

        {/* Title & Description - more concise and mobile-friendly */}
        <div className="text-center space-y-3 md:space-y-4 mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
            Carbon Footprint Challenge
          </h1>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-lg mx-auto">
            Embark on an eco-journey to discover your environmental impact! 🌍
          </p>
        </div>

        {/* Feature Cards - Redesigned for better mobile experience */}
        <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 md:mb-10">
          {[
            { icon: Clock, title: '5 Min Quiz', subtitle: 'Quick & Easy' },
            { icon: Globe, title: '10 Questions', subtitle: 'Comprehensive' },
            { icon: Award, title: 'Get Results', subtitle: 'Instant Analysis' }
          ].map((feature, index) => (
            <div key={index} 
              className="group bg-white/90 backdrop-blur-sm rounded-xl p-4 md:p-5 flex flex-row sm:flex-col items-center 
                      shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 gap-4 sm:gap-0"
            >
              <div className="bg-emerald-100 rounded-full p-3 sm:p-4 sm:mb-3 group-hover:bg-emerald-200 transition-colors duration-300">
                <feature.icon className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="flex flex-col sm:items-center">
                <span className="text-base md:text-lg font-medium text-gray-800">{feature.title}</span>
                <span className="text-sm text-gray-500">{feature.subtitle}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Input & Button Section - Enhanced for accessibility and mobile usability */}
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-5 mt-auto">
          <div className="space-y-4">
            <div className="relative group">
              <label htmlFor="name" className="sr-only">Your Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (e.target.value.trim()) {
                    setErrors(prev => ({ ...prev, name: '' }));
                  }
                }}
                placeholder="Enter your name"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={`w-full px-4 md:px-5 py-3 md:py-4 bg-white/90 backdrop-blur-sm rounded-xl text-base md:text-lg
                         shadow-md outline-none transition-all duration-300
                         ${errors.name ? 'ring-2 ring-red-300 focus:ring-red-500' : 'focus:ring-2 focus:ring-emerald-500'}`}
              />
              <div className="absolute right-4 md:right-5 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center">
                <span className="text-xl md:text-2xl group-hover:animate-bounce inline-flex">
                  👋
                </span>
              </div>
              {errors.name && (
                <p id="name-error" className="mt-1 text-sm text-red-500 animate-fadeIn pl-2">{errors.name}</p>
              )}
            </div>

            <div className="relative group">
              <label htmlFor="email" className="sr-only">Your Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (validateEmail(e.target.value)) {
                    setErrors(prev => ({ ...prev, email: '' }));
                  }
                }}
                placeholder="Enter your email"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={`w-full px-4 md:px-5 py-3 md:py-4 bg-white/90 backdrop-blur-sm rounded-xl text-base md:text-lg
                         shadow-md outline-none transition-all duration-300
                         ${errors.email ? 'ring-2 ring-red-300 focus:ring-red-500' : 'focus:ring-2 focus:ring-emerald-500'}`}
              />
              <div className="absolute right-4 md:right-5 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center">
                <span className="text-xl md:text-2xl group-hover:animate-bounce inline-flex">
                  ✉️
                </span>
              </div>
              {errors.email && (
                <p id="email-error" className="mt-1 text-sm text-red-500 animate-fadeIn pl-2">{errors.email}</p>
              )}
            </div>
          </div>
          
          <button
            type="submit"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white 
                     rounded-xl py-3 md:py-4 text-base md:text-lg font-medium 
                     flex items-center justify-center gap-2 md:gap-3 
                     shadow-md hover:shadow-xl active:scale-98
                     transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
          >
            Start The Quiz
            <ArrowRight className={`w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 ${isHovering ? 'translate-x-1' : ''}`} />
          </button>

          <div className="flex items-center justify-center gap-2 text-gray-500 pt-2">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <p className="text-xs md:text-sm">Your data is kept private and secure</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WelcomePage;