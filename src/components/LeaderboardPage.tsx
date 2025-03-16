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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Background decorations */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -left-10 w-48 h-48 sm:w-96 sm:h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
        <div className="absolute top-1/3 -right-10 w-48 h-48 sm:w-96 sm:h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-10 left-1/3 w-48 h-48 sm:w-96 sm:h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 p-4 sm:p-6 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 md:p-8">
              {/* Header with navigation and share */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
                <button
                  onClick={handleBack}
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 hover:from-emerald-100 hover:to-teal-100 transition-all duration-200 border border-emerald-200 shadow-sm transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to Results
                </button>
                <button
                  onClick={() => navigator.share({ title: 'Carbon Footprint Challenge Leaderboard', url: window.location.href })}
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 hover:from-indigo-100 hover:to-purple-100 transition-all duration-200 border border-indigo-200 shadow-sm transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  Share Leaderboard
                </button>
              </div>

              {/* Trophy and Title */}
              <div className="relative text-center mb-10">
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-yellow-400/10 via-amber-300/10 to-yellow-400/10 rounded-xl blur-md transform -translate-y-4"></div>
                <div className="mb-4 relative inline-block">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-amber-300 rounded-full blur-md opacity-50 scale-110"></div>
                  <Trophy className="w-20 h-20 text-yellow-500 drop-shadow-md relative" />
                </div>
                <h2 className="text-4xl font-extrabold bg-gradient-to-r from-yellow-600 to-amber-500 bg-clip-text text-transparent mb-2">
                  Global Leaderboard
                </h2>
                <p className="text-gray-600 max-w-md mx-auto">
                  See how you compare with eco-warriors from around the world
                </p>
              </div>

              {/* Main leaderboard entries grid */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-5 md:p-6 shadow-sm mb-6">
                <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent mb-5">
                  Top Performers
                </h3>

                <div className="space-y-3 md:space-y-4">
                  {/* First place entry with special highlight */}
                  {entries.length > 0 && (
                    <div 
                      className={`p-4 md:p-5 rounded-lg bg-gradient-to-r from-amber-100 to-yellow-100 shadow-sm
                                ${entries[0].id === playerEntry?.id ? 'ring-2 ring-yellow-400' : ''}
                                transform transition-all hover:shadow-md hover:-translate-y-0.5 active:translate-y-0`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-yellow-500 to-amber-400 rounded-full shadow text-white font-bold text-xl">
                            1
                          </div>
                          <div>
                            <h3 className="font-bold text-amber-900 text-lg">
                              {entries[0].playerName}
                              {entries[0].id === playerEntry?.id && (
                                <span className="ml-2 text-xs font-medium bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded-full">You</span>
                              )}
                            </h3>
                            <p className="text-sm text-amber-700">
                              Best Choice: {entries[0].bestChoice}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-amber-900">
                            {entries[0].totalCarbon} kg CO₂
                          </p>
                          <p className="text-xs text-amber-700">{entries[0].date}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Other entries */}
                  {entries.slice(1).map((entry, index) => (
                    <div
                      key={entry.id}
                      className={`p-4 md:p-5 rounded-lg ${
                        entry.id === playerEntry?.id
                          ? 'bg-emerald-50 ring-2 ring-emerald-400'
                          : 'bg-white/80 backdrop-blur-sm'
                      } shadow-sm hover:shadow-md transform transition-all hover:-translate-y-0.5 active:translate-y-0`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full shadow-sm text-white font-bold">
                            {index + 2}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800">
                              {entry.playerName}
                              {entry.id === playerEntry?.id && (
                                <span className="ml-2 text-xs font-medium bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">You</span>
                              )}
                            </h3>
                            <p className="text-sm text-gray-600">
                              Best Choice: {entry.bestChoice}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-800">
                            {entry.totalCarbon} kg CO₂
                          </p>
                          <p className="text-xs text-gray-500">{entry.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Carbon footprint comparison - New section */}
              {playerEntry && (
                <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-5 md:p-6 shadow-sm">
                  <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-blue-500 bg-clip-text text-transparent mb-5">
                    Your Carbon Standing
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                      <p className="text-sm text-gray-500 uppercase font-semibold mb-1">Your Rank</p>
                      <p className="text-3xl font-bold text-emerald-600">
                        {entries.findIndex(e => e.id === playerEntry.id) + 1}
                        <span className="text-base text-gray-500">/{entries.length}</span>
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                      <p className="text-sm text-gray-500 uppercase font-semibold mb-1">Your Carbon</p>
                      <p className="text-3xl font-bold text-emerald-600">{playerEntry.totalCarbon}<span className="text-base text-gray-500"> kg</span></p>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                      <p className="text-sm text-gray-500 uppercase font-semibold mb-1">Avg Carbon</p>
                      <p className="text-3xl font-bold text-emerald-600">
                        {(entries.reduce((sum, e) => sum + Number(e.totalCarbon), 0) / entries.length).toFixed(1)}
                        <span className="text-base text-gray-500"> kg</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* CTA Footer */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 text-white">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">Ready to Lower Your Carbon Footprint?</h3>
                <p className="mb-4 max-w-md mx-auto">Take the quiz again with new choices to see how small changes can make a big impact.</p>
                <button
                  onClick={handleBack}
                  className="px-6 py-3 bg-white text-emerald-600 rounded-lg font-semibold hover:bg-emerald-50 transition-all duration-200 shadow-sm transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  Return to Your Results
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};