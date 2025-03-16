'use client';

import React, { useState, useEffect } from 'react';
import { Trophy, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import { LeaderboardEntry } from '../types';
import { subscribeToLeaderboard } from '../services/firebase';
import { GlobalImpact } from '../components/GlobalImpact';
import { LeaderboardItem } from '../components/LeaderboardItem';
import { ShareModal } from './ShareModal';

interface LeaderboardPageProps {
  playerEntry?: LeaderboardEntry;
  standalone?: boolean;
}

export const LeaderboardPage: React.FC<LeaderboardPageProps> = ({
  playerEntry,
  standalone = false
}) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [totalFootprint, setTotalFootprint] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const entriesPerPage = 10;

  useEffect(() => {
    const unsubscribe = subscribeToLeaderboard((newEntries) => {
      setEntries(newEntries);
      const total = newEntries.reduce((sum, entry) => sum + entry.totalCarbon, 0);
      setTotalFootprint(total);
    });

    return () => unsubscribe();
  }, []);

  const sortedEntries = [...entries].sort((a, b) => a.totalCarbon - b.totalCarbon);
  const totalPages = Math.ceil(sortedEntries.length / entriesPerPage);
  const currentEntries = sortedEntries.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const playerRank = playerEntry
    ? sortedEntries.findIndex((entry) => entry.id === playerEntry.id) + 1
    : null;

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
              {/* Header with Share button */}
              <div className="flex justify-end mb-6">
                <button
                  onClick={() => setIsShareModalOpen(true)}
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 hover:from-indigo-100 hover:to-purple-100 transition-all duration-200 border border-indigo-200 shadow-sm transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  Share Results
                </button>
              </div>

              {/* Trophy and Title */}
              <div className="relative text-center mb-10">
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-yellow-400/10 via-amber-300/10 to-yellow-400/10 rounded-xl blur-md transform -translate-y-4"></div>
                <div className="mb-4 relative inline-block">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-amber-300 rounded-full blur-md opacity-50 scale-110"></div>
                  <Trophy className="w-20 h-20 text-yellow-500 drop-shadow-md relative animate-pulse-slow" />
                </div>
                <h2 className="text-4xl font-extrabold bg-gradient-to-r from-yellow-600 to-amber-500 bg-clip-text text-transparent mb-2">
                  Global Rankings
                </h2>
                <p className="text-gray-600 max-w-md mx-auto">
                  Join eco-warriors around the world competing for a greener future
                </p>
              </div>

              {/* Player Ranking Card */}
              {playerEntry && playerRank && (
                <div className="mb-8 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-xl p-6 shadow-sm transform transition-all animate-fadeIn hover:shadow-md">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent mb-2">
                        Your Global Ranking
                      </h3>
                      <p className="text-gray-700">Congratulations on making a difference!</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full text-white font-bold text-2xl shadow">
                        #{playerRank}
                      </div>
                      <span className="text-gray-700 font-medium">
                        out of <span className="font-bold text-emerald-700">{entries.length}</span> participants
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Global Impact Component */}
              <GlobalImpact totalFootprint={totalFootprint} />

              {/* Disclaimer */}
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg shadow-sm my-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      This information is for illustrative purposes only and may not reflect actual values. 
                      Data sources and methodologies may vary.
                    </p>
                  </div>
                </div>
              </div>

              {/* Leaderboard Title */}
              <div className="mt-8 mb-6">
                <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                  Leaderboard Rankings
                </h3>
                <div className="h-1 w-20 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full mt-1"></div>
              </div>

              {/* Leaderboard Entries */}
              <div className="space-y-3 mt-6">
                {currentEntries.map((entry, index) => (
                  <div
                    key={entry.id}
                    className={`p-4 md:p-5 rounded-lg transform transition-all hover:-translate-y-0.5 active:translate-y-0 hover:shadow-md ${
                      entry.id === playerEntry?.id
                        ? 'bg-emerald-50 ring-2 ring-emerald-400'
                        : index === 0 
                          ? 'bg-gradient-to-r from-amber-100 to-yellow-100' 
                          : 'bg-white/80 backdrop-blur-sm'
                    }`}
                  >
                    <LeaderboardItem
                      entry={entry}
                      index={(currentPage - 1) * entriesPerPage + index}
                      isCurrentPlayer={entry.id === playerEntry?.id}
                    />
                  </div>
                ))}
              </div>

              {/* Empty state when no entries */}
              {currentEntries.length === 0 && (
                <div className="text-center py-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                    <Trophy className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No entries yet</h3>
                  <p className="text-gray-500">Be the first to join the leaderboard!</p>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-4">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50 shadow-sm disabled:opacity-50 hover:from-emerald-100 hover:to-teal-100 transition-colors border border-emerald-200 disabled:border-gray-200"
                  >
                    <ChevronLeft className="w-5 h-5 text-emerald-700 disabled:text-gray-400" />
                  </button>
                  <span className="px-4 py-2 rounded-lg bg-white font-medium text-gray-700 shadow-sm border border-gray-200">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50 shadow-sm disabled:opacity-50 hover:from-emerald-100 hover:to-teal-100 transition-colors border border-emerald-200 disabled:border-gray-200"
                  >
                    <ChevronRight className="w-5 h-5 text-emerald-700 disabled:text-gray-400" />
                  </button>
                </div>
              )}
            </div>
            
            {/* CTA Footer */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 text-white">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">Inspire Others to Make a Difference</h3>
                <p className="mb-4 max-w-md mx-auto">Share your results and encourage friends to reduce their carbon footprint too.</p>
                <button
                  onClick={() => setIsShareModalOpen(true)}
                  className="px-6 py-3 bg-white text-emerald-600 rounded-lg font-semibold hover:bg-emerald-50 transition-all duration-200 shadow-sm transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  Share Your Impact
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        playerRank={playerRank || undefined}
        totalParticipants={entries.length}
        carbonScore={playerEntry?.totalCarbon || 0}
      />
    </div>
  );
};

export default LeaderboardPage;
