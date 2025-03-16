import React from 'react';
import { LeaderboardEntry } from '../types';
import { AnalogCounter } from './AnalogCounter';

interface LeaderboardItemProps {
  entry: LeaderboardEntry;
  index: number;
  isCurrentPlayer: boolean;
}

export const LeaderboardItem: React.FC<LeaderboardItemProps> = ({
  entry,
  index,
  isCurrentPlayer
}) => {
  // Enhanced rank styling with gradients based on position
  const getRankStyle = (index: number): string => {
    switch (index) {
      case 0: 
        return 'bg-gradient-to-r from-yellow-400 to-amber-500 text-white';
      case 1: 
        return 'bg-gradient-to-r from-gray-300 to-gray-400 text-white';
      case 2: 
        return 'bg-gradient-to-r from-amber-500 to-amber-600 text-white';
      default: 
        return 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white';
    }
  };

  return (
    <div
      className={`p-4 rounded-lg ${
        isCurrentPlayer
          ? 'bg-green-50 border-2 border-green-500'
          : 'bg-gray-50'
      } transition-all duration-300 hover:shadow-md`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full shadow-sm font-bold text-lg ${getRankStyle(index)}`}>
            {index + 1}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-800">{entry.playerName}</h3>
              {isCurrentPlayer && (
                <span className="text-xs font-medium bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">You</span>
              )}
            </div>
            <p className="text-sm text-gray-600 mt-1">
              <span className="text-xs text-gray-500 uppercase">Best Choice: </span>
              <span className="text-gray-700">{entry.bestChoice}</span>
            </p>
          </div>
        </div>
        <div className="text-right">
          <AnalogCounter 
            value={entry.totalCarbon} 
            className="text-lg md:text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
            suffix=" kg"
          />
          <p className="text-xs text-gray-500 mt-1">{entry.date}</p>
        </div>
      </div>
    </div>
  );
};