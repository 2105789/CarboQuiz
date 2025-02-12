import React from 'react';
import { LeaderboardEntry } from '../../types';
import { LeaderboardItem } from './LeaderboardItem';

interface LeaderboardListProps {
  entries: LeaderboardEntry[];
  currentPage: number;
  itemsPerPage: number;
  playerEntry?: LeaderboardEntry;
}

export const LeaderboardList: React.FC<LeaderboardListProps> = ({
  entries,
  currentPage,
  itemsPerPage,
  playerEntry
}) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEntries = entries.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-4">
      {paginatedEntries.map((entry, index) => (
        <LeaderboardItem
          key={entry.id}
          entry={entry}
          index={startIndex + index}
          isCurrentPlayer={entry.id === playerEntry?.id}
        />
      ))}
    </div>
  );
};