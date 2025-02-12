import React, { useState } from 'react';

interface DistancePopupProps {
  onSubmit: (distance: number) => void;
  onCancel: () => void;
}

export const DistancePopup: React.FC<DistancePopupProps> = ({ onSubmit, onCancel }) => {
  const [distance, setDistance] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = () => {
    const distanceNum = parseFloat(distance);
    if (!distance || isNaN(distanceNum) || distanceNum <= 0) {
      setError('Please enter a valid distance');
      return;
    }
    onSubmit(distanceNum);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 shadow-xl">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          One Last Step!
        </h3>
        <p className="text-gray-600 mb-4">
          To calculate your commute's environmental impact accurately, please tell us your average one-way travel distance:
        </p>
        <div className="mb-4">
          <div className="flex items-center space-x-2">
            <input
              type="number"
              value={distance}
              onChange={(e) => {
                setDistance(e.target.value);
                setError('');
              }}
              placeholder="Enter distance"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              min="0"
              step="0.1"
            />
            <span className="text-gray-600 font-medium">km</span>
          </div>
          {error && (
            <p className="text-red-500 text-sm mt-1">{error}</p>
          )}
        </div>
        <div className="flex space-x-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default DistancePopup; 