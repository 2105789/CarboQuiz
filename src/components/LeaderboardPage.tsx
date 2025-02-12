import React from 'react';
import { Trophy, ArrowLeft, Share2 } from 'lucide-react';
import { LeaderboardEntry } from '../types';

interface LeaderboardPageProps {
  entries: LeaderboardEntry[];
  playerEntry?: LeaderboardEntry;
  onBack: () => void;
}

export const LeaderboardPage: React.FC<LeaderboardPageProps> = ({
  entries,
  playerEntry,
  onBack,
}) => {
  const handleBack = () => {
    window.scrollTo(0, 0);
    onBack();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={handleBack}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Results
            </button>
            <button
              onClick={() => navigator.share({ title: 'Carbon Footprint Challenge Leaderboard', url: window.location.href })}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <Share2 className="w-5 h-5 mr-2" />
              Share
            </button>
          </div>

          <div className="text-center mb-8">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-800">Leaderboard</h2>
            <p className="text-gray-600 mt-2">Top Eco-Warriors</p>
          </div>

          <div className="space-y-4">
            {entries.map((entry, index) => (
              <div
                key={entry.id}
                className={`p-4 rounded-lg ${
                  entry.id === playerEntry?.id
                    ? 'bg-green-50 border-2 border-green-500'
                    : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-gray-500 w-8">
                      {index + 1}
                    </span>
                    <div className="ml-4">
                      <h3 className="font-semibold text-gray-800">
                        {entry.playerName}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Their Best Choice: {entry.bestChoice}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">
                      {entry.totalCarbon} kg CO₂
                    </p>
                    <p className="text-sm text-gray-500">{entry.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};