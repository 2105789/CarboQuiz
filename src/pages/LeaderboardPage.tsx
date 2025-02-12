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
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-8">
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="flex items-center text-gray-600 hover:text-gray-800 hover:bg-gray-200 transition-colors bg-gray-100 px-4 py-2 rounded-lg"
            >
              <Share2 className="w-5 h-5 mr-2" />
              Share
            </button>
          </div>

          <div className="text-center mb-8">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4 animate-pulse-slow" />
            <h2 className="text-3xl font-bold text-gray-800">Global Rankings</h2>
            <p className="text-gray-600 mt-2">Competing for a Greener Future</p>
          </div>
          

          {playerEntry && playerRank && (
            <div className="mb-8 bg-green-100 rounded-xl p-6 animate-fadeIn">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Your Ranking</h3>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-green-600">#{playerRank}</span>
                <span className="text-gray-700">out of {entries.length} participants</span>
              </div>
            </div>
          )}

          <GlobalImpact totalFootprint={totalFootprint} />

          <div className="bg-gray-100 p-4 rounded-lg shadow-md my-4">
            <p className="text-gray-700 text-sm">
              This information is for illustrative purposes only and may not reflect actual values. 
              Data sources and methodologies may vary. 
              Please consult official sources for accurate and up-to-date information.
            </p>
          </div>

          <div className="space-y-4 mt-8">
            {currentEntries.map((entry, index) => (
              <LeaderboardItem
                key={entry.id}
                entry={entry}
                index={(currentPage - 1) * entriesPerPage + index}
                isCurrentPlayer={entry.id === playerEntry?.id}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-gray-100 disabled:opacity-50 hover:bg-gray-200 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-gray-100 disabled:opacity-50 hover:bg-gray-200 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
          <ShareModal
            isOpen={isShareModalOpen}
            onClose={() => setIsShareModalOpen(false)}
            playerRank={playerRank || undefined}
            totalParticipants={entries.length}
            carbonScore={playerEntry?.totalCarbon || 0}
          />
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
