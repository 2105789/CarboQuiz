import React, { useState, useEffect, useMemo } from 'react';
import { Trophy, ArrowLeft, Share2 } from 'lucide-react';
import { LeaderboardEntry } from '../../types';
import { subscribeToLeaderboard } from '../../services/firebase';
import { GlobalImpact } from '../GlobalImpact';
import { LeaderboardList } from './LeaderboardList';
import { Pagination } from './Pagination';

const ITEMS_PER_PAGE = 10;

interface LeaderboardProps {
  playerEntry?: LeaderboardEntry;
  onBack?: () => void;
  standalone?: boolean;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({
  playerEntry,
  onBack,
  standalone = false
}) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalFootprint, setTotalFootprint] = useState(0);

  useEffect(() => {
    const unsubscribe = subscribeToLeaderboard((newEntries) => {
      setEntries(newEntries);
      const total = newEntries.reduce((sum, entry) => sum + entry.totalCarbon, 0);
      setTotalFootprint(total);
    });

    return () => unsubscribe();
  }, []);

  const sortedEntries = useMemo(() => 
    [...entries].sort((a, b) => a.totalCarbon - b.totalCarbon),
    [entries]
  );

  const totalPages = Math.ceil(sortedEntries.length / ITEMS_PER_PAGE);

  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'Carbon Footprint Challenge Leaderboard',
        url: window.location.href
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {!standalone && onBack && (
            <div className="flex justify-between items-center mb-8">
              <button
                onClick={onBack}
                className="flex items-center text-gray-600 hover:text-gray-800"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Results
              </button>
              <button
                onClick={handleShare}
                className="flex items-center text-gray-600 hover:text-gray-800"
              >
                <Share2 className="w-5 h-5 mr-2" />
                Share
              </button>
            </div>
          )}

          <div className="text-center mb-8">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4 animate-pulse-slow" />
            <h2 className="text-3xl font-bold text-gray-800">Leaderboard</h2>
            <p className="text-gray-600 mt-2">Top Eco-Warriors</p>
          </div>

          <GlobalImpact totalFootprint={totalFootprint} />

          <LeaderboardList
            entries={sortedEntries}
            currentPage={currentPage}
            itemsPerPage={ITEMS_PER_PAGE}
            playerEntry={playerEntry}
          />

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};