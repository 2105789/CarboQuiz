import React from 'react';
import { Trees } from 'lucide-react';
import { AnalogCounter } from './AnalogCounter';

interface ImpactAnimationProps {
  carbonFootprint: number;
  treeEquivalent: number;
}

export const ImpactAnimation: React.FC<ImpactAnimationProps> = ({
  carbonFootprint,
  treeEquivalent
}) => {
  return (
    <div className="mx-auto animate-fadeIn">
      {/* Carbon Impact Card */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-4 text-center">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">
          Your Carbon Impact
        </h3>
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4">
          <AnalogCounter
            value={carbonFootprint}
            duration={2000}
            className="text-4xl font-bold text-gray-800"
            suffix=" kg"
          />
          <p className="text-sm text-gray-600 mt-2">
            CO₂ equivalent per year
          </p>
        </div>
      </div>

      {/* Tree Offset Card */}
      <div className="bg-white rounded-xl shadow-md p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">
          Trees Required to Offset
        </h3>
        <div className="flex items-center justify-center gap-4">
          <Trees
            className="text-green-500 animate-pulse"
            size={48}
          />
          <div className="text-center">
            <span className="text-3xl font-bold text-gray-800">
              {treeEquivalent}
            </span>
            <p className="text-sm text-gray-600">trees needed</p>
          </div>
        </div>
        
        {/* Impact Message */}
        <div className="mt-4 p-3 bg-green-50 rounded-lg">
          <p className="text-sm text-gray-600 text-center">
            {treeEquivalent === 1 
              ? "That's equivalent to planting 1 tree to offset your carbon footprint."
              : `That's equivalent to a small forest of ${treeEquivalent} trees working together to offset your carbon footprint.`
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImpactAnimation;