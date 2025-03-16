// ImpactPage.tsx
import React, { useMemo, useEffect } from 'react';
import { Option } from '../types';
import { ImpactAnimation } from './ImpactAnimation';
import { getRandomGifForRank } from '../data/gifs';
import { getPreloadedGif } from '../utils/preloader';

interface ImpactPageProps {
  options?: Option[];
  onNext: () => void;
}

export const ImpactPage: React.FC<ImpactPageProps> = ({ options = [], onNext }) => {
  // Calculate average rank with null checks
  const averageRank = useMemo(() => {
    if (!options.length) return 3; // Default to middle rank if no options
    return Math.round(
      options.reduce((sum, opt) => sum + (opt.rank ?? 1), 0) / options.length
    );
  }, [options]);

  // Instead of simple background colors, use gradient backgrounds
  const rankGradients = [
    'from-emerald-400 to-emerald-600', // Rank 1: Best
    'from-emerald-300 to-emerald-500', // Rank 2: Good
    'from-yellow-300 to-amber-400',    // Rank 3: Fair
    'from-orange-300 to-orange-500',   // Rank 4: Average
    'from-red-300 to-red-500',         // Rank 5: Poor
    'from-red-500 to-red-700',         // Rank 6: Worst
  ];

  const backgroundGradient = rankGradients[averageRank - 1] || 'from-cyan-100 to-emerald-50';

  // Calculate total carbon footprint and tree equivalent with null checks
  const { totalCarbonFootprint, totalTreeEquivalent } = useMemo(() => {
    if (!options.length) return { totalCarbonFootprint: 0, totalTreeEquivalent: 0 };
    return {
      totalCarbonFootprint: options.reduce((sum, opt) => sum + (opt.carbonFootprint ?? 0), 0),
      totalTreeEquivalent: options.reduce((sum, opt) => sum + (opt.treeEquivalent ?? 0), 0)
    };
  }, [options]);

  // Get GIF based on average rank
  const selectedGif = useMemo(() => getRandomGifForRank(averageRank), [averageRank]);
  const [isGifLoaded, setIsGifLoaded] = React.useState(false);

  const handleNext = () => {
    window.scrollTo(0, 0); // Reset scroll position
    onNext();
  };

  // Reset scroll position when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!options.length) {
    return null; // Let the parent component handle loading states
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-teal-50">
      {/* Background decorations */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -left-10 w-48 h-48 sm:w-96 sm:h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
        <div className="absolute top-1/3 -right-10 w-48 h-48 sm:w-96 sm:h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-10 left-1/3 w-48 h-48 sm:w-96 sm:h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 pb-24 p-4 sm:p-6 md:p-8">
        <div className="max-w-4xl w-full mx-auto md:mb-16">
          {/* Header with impact summary */}
          <div className="text-center mb-8 relative">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent mb-3">
              Your Environmental Impact
            </h1>
            <p className="text-gray-700 text-lg max-w-md mx-auto">
              Here's how your choices affect our planet and what you can do to improve.
            </p>
            <div className="absolute -z-10 -inset-6 bg-gradient-to-r from-emerald-400/5 to-cyan-400/5 rounded-lg blur-md"></div>
          </div>

          {/* Main content card */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden transform transition-all">
            {/* GIF Display Section */}
            <div className="p-4 md:p-6 bg-gradient-to-r from-emerald-50 to-cyan-50 border-b border-emerald-100">
              <div className="w-full flex justify-center">
                <div className="relative">
                  {!isGifLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse rounded-lg">
                      <svg className="w-12 h-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                  )}
                  <img
                    src={selectedGif}
                    alt={`Rank ${averageRank} reaction`}
                    className="rounded-lg max-h-96 w-fit object-cover shadow-md transition-opacity duration-300"
                    onLoad={() => setIsGifLoaded(true)}
                    style={{ opacity: isGifLoaded ? 1 : 0 }}
                  />
                </div>
              </div>
            </div>

            {/* Impact Animation Section */}
            <div className="p-4 md:p-6">
              <ImpactAnimation
                carbonFootprint={totalCarbonFootprint}
                treeEquivalent={totalTreeEquivalent}
              />
            </div>

            {/* Selected Choices Impact Section */}
            <div className="p-4 md:p-6">
              <div className="bg-gradient-to-br from-emerald-50 to-cyan-50 rounded-xl p-5 md:p-6 shadow-sm">
                <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent mb-5">
                  Your Choices & Their Impact
                </h3>
                
                <div className="grid gap-6 sm:gap-8">
                  {options.map((option, index) => (
                    <div key={option.id} className="bg-white/80 backdrop-blur-sm rounded-lg p-4 md:p-5 shadow-sm hover:shadow-md transition-all">
                      <div className="flex items-start gap-3 mb-3">
                        <div className={`w-8 h-8 shrink-0 rounded-full bg-gradient-to-r ${rankGradients[option.rank - 1] || 'from-gray-400 to-gray-500'} text-white flex items-center justify-center text-sm font-semibold shadow-sm`}>
                          {index + 1}
                        </div>
                        <h4 className="text-lg font-semibold text-gray-800">{option.text}</h4>
                      </div>
                      <div className="ml-11 space-y-3">
                        <p className="text-gray-700 leading-relaxed">{option.explanation}</p>
                        
                        <div className="bg-emerald-50 border-l-3 border-emerald-400 pl-3 py-2 rounded-r-md">
                          <p className="text-gray-700 font-medium">
                            <span className="text-emerald-600 font-semibold">Performance: </span>
                            {option.performance}
                          </p>
                        </div>
                        
                        <div className="bg-cyan-50 border-l-3 border-cyan-400 pl-3 py-2 rounded-r-md">
                          <p className="text-gray-700 font-medium">
                            <span className="text-cyan-600 font-semibold">How to Improve: </span>
                            {option.improvement}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                            {option.carbonFootprint.toFixed(1)} kg CO₂
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                            {option.treeEquivalent.toFixed(1)} trees needed
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-emerald-100">
                  <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-lg p-4 md:p-5">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Overall Impact</h4>
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                      <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center shadow-sm">
                        <p className="text-sm text-gray-500 uppercase font-semibold mb-1">Total Carbon Footprint</p>
                        <p className="text-2xl font-bold text-emerald-600">{totalCarbonFootprint.toFixed(1)} <span className="text-sm">kg CO₂e</span></p>
                      </div>
                      <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center shadow-sm">
                        <p className="text-sm text-gray-500 uppercase font-semibold mb-1">Trees Required</p>
                        <p className="text-2xl font-bold text-emerald-600">{totalTreeEquivalent.toFixed(1)} <span className="text-sm">trees/year</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Button - modernized and matched with QuestionPage */}
      <div className="fixed bottom-0 left-0 right-0 z-20">
        <div className="bg-white/90 backdrop-blur-md border-t border-gray-100 shadow-lg p-4">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={handleNext}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-3 h-12 rounded-xl 
                     font-medium hover:from-emerald-600 hover:to-teal-700 transition-all duration-200
                     focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2
                     flex items-center justify-center gap-3"
            >
              <span>Continue</span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
