import React from 'react';
import { AnalogCounter } from './AnalogCounter';
import { Leaf } from 'lucide-react';

interface GlobalImpactProps {
  totalFootprint: number;
}

export const GlobalImpact: React.FC<GlobalImpactProps> = ({ totalFootprint }) => {
  return (
    <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl shadow-lg mb-8">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="absolute inset-0 bg-green-500 opacity-10 blur-xl rounded-full" />
          <Leaf className="w-16 h-16 text-green-600 relative z-10" />
        </div>
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Global Impact</h3>
          <div className="bg-white px-6 py-4 rounded-lg shadow-inner">
            <AnalogCounter 
              value={totalFootprint} 
              duration={3000}
              className="text-4xl font-bold text-gray-800"
              suffix=" kg"
            />
            <p className="text-sm text-gray-600 mt-1">CO₂ Total</p>
          </div>
        </div>
      </div>
    </div>
  );
};