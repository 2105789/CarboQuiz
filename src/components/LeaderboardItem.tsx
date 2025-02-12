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
  const getRankColor = (index: number) => {
    switch (index) {
      case 0: return 'text-yellow-500';
      case 1: return 'text-gray-400';
      case 2: return 'text-amber-600';
      default: return 'text-gray-500';
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
        <div className="flex items-center">
          <span className={`text-2xl font-bold w-6 ${getRankColor(index)}`}>
            {index + 1}
          </span>
          <div className="">
            <h3 className="font-semibold text-gray-800">
              {entry.playerName}
            </h3>
            <p className="text-sm text-gray-600">
              <span className='hidden md:inline-block font-semibold'>Their Best Choice :{'\u00A0'}</span>
              <span className='md:hidden font-semibold'>Their Best Choice:</span>{entry.bestChoice}
            </p>
          </div>
        </div>
        <div className="text-right">
          <AnalogCounter 
            value={entry.totalCarbon} 
            className="text-lg md:text-xl font-bold text-gray-800"
            suffix=" kg"
          />
          <p className="text-sm text-gray-500">{entry.date}</p>
        </div>
      </div>
    </div>
  );
};