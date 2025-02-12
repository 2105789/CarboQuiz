// ImpactPage.tsx
import React, { useMemo } from 'react';
import { Option } from '../types';
import { ImpactAnimation } from './ImpactAnimation';
import { getRandomGifForRank } from '../data/gifs';
import { getPreloadedGif } from '../utils/preloader';

interface ImpactPageProps {
  options?: Option[];
  onNext: () => void;
}

// Define colors for ranks
const rankColors = [
  'bg-green-500',    // Rank 1: Best
  'bg-green-300',    // Rank 2: Good
  'bg-yellow-200',   // Rank 3: Fair
  'bg-orange-200',   // Rank 4: Average
  'bg-red-300',      // Rank 5: Poor
  'bg-red-500',      // Rank 6: Worst
];

export const ImpactPage: React.FC<ImpactPageProps> = ({ options = [], onNext }) => {
  // Calculate average rank with null checks
  const averageRank = useMemo(() => {
    if (!options.length) return 3; // Default to middle rank if no options
    return Math.round(
      options.reduce((sum, opt) => sum + (opt.rank ?? 1), 0) / options.length
    );
  }, [options]);

  const backgroundColor = rankColors[averageRank - 1] || 'bg-gray-100';

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
    window.scrollTo(0, 0);
    onNext();
  };

  if (!options.length) {
    return null; // Let the parent component handle loading states
  }

  return (
    <div className={`relative min-h-screen ${backgroundColor}`}>
      <div className="pb-24 p-4 sm:p-6 md:p-8">
        <div className="max-w-4xl w-full mx-auto md:mb-24">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* GIF Display Section */}
            <div className="p-4 md:p-6">
              <div className="w-full flex justify-center">
                <img
                  src={selectedGif}
                  alt={`Rank ${averageRank} reaction`}
                  className="rounded-lg max-h-96 w-fit object-cover animate-fadeIn"
                  onLoad={() => setIsGifLoaded(true)}
                  style={{ opacity: isGifLoaded ? 1 : 0 }}
                />
              </div>
            </div>

            {/* Impact Animation Section */}
            <div className="p-4 md:p-6">
              <ImpactAnimation
                carbonFootprint={totalCarbonFootprint}
                treeEquivalent={totalTreeEquivalent}
              />
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-100 mx-6" />

            {/* Selected Choices Impact Section */}
            <div className="p-4 md:p-6">
              <div className="bg-green-50 rounded-xl p-4">
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">
                  Your Choices & Their Impact
                </h3>
                
                {options.map((option, index) => (
                  <div key={option.id} className="mb-6 last:mb-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </span>
                      <h4 className="text-lg font-semibold text-gray-800">{option.text}</h4>
                    </div>
                    <div className="ml-8">
                      <p className="text-gray-700 leading-relaxed mb-2">{option.explanation}</p>
                      <p className="text-gray-700 mb-2">
                        <strong>Performance:</strong> {option.performance}
                      </p>
                      <p className="text-gray-700">
                        <strong>Improvement Suggestions:</strong> {option.improvement}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="mt-6 pt-6 border-t border-green-100">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Overall Impact</h4>
                  <p className="text-gray-700">
                    Your combined choices result in a total carbon footprint of {totalCarbonFootprint.toFixed(2)} kg CO2e,
                    which would require {totalTreeEquivalent.toFixed(1)} trees to offset annually.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-green-100/30 border-t border-gray-200 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={handleNext}
            className="w-full bg-green-500 text-white px-8 py-3 rounded-xl
                     font-semibold hover:bg-green-600 transition-all duration-200
                     transform hover:scale-[1.02] active:scale-[0.98]
                     flex items-center justify-center space-x-2
                     shadow-md"
          >
            <span>Continue to Next Step</span>
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
  );
};
