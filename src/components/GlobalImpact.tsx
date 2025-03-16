import React from 'react';
import { AnalogCounter } from './AnalogCounter';
import { Leaf } from 'lucide-react';

interface GlobalImpactProps {
  totalFootprint: number;
}

export const GlobalImpact: React.FC<GlobalImpactProps> = ({ totalFootprint }) => {
  // Calculate tree equivalent (approximate calculation)
  const treesNeeded = (totalFootprint / 21).toFixed(1); // Each tree absorbs ~21kg CO2 annually

  return (
    <div className="bg-gradient-to-r from-cyan-50 to-teal-50 rounded-xl p-6 md:p-8 shadow-sm">
      <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-teal-500 bg-clip-text text-transparent mb-5">
        Global Carbon Impact
      </h3>
      
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        {/* Left side - Counter and visualization */}
        <div className="flex-1 flex flex-col items-center">
          <div className="mb-4 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-20 blur-xl rounded-full scale-150"></div>
            <div className="w-24 h-24 flex items-center justify-center bg-gradient-to-br from-emerald-400/10 to-teal-400/10 rounded-full relative z-10 border border-emerald-200">
              <Leaf className="w-12 h-12 text-emerald-600" />
            </div>
          </div>
          
          <div className="text-center bg-white/80 backdrop-blur-sm px-6 py-5 rounded-xl shadow-sm border border-emerald-100 w-full max-w-xs hover:shadow-md transition-all">
            <p className="text-sm text-gray-500 uppercase font-semibold mb-1">Total Carbon Footprint</p>
            <AnalogCounter 
              value={totalFootprint} 
              duration={3000}
              className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
              suffix=" kg"
            />
            <p className="text-sm text-gray-600 mt-3">CO₂ from all participants</p>
          </div>
        </div>
        </div>
    </div>
  );
};