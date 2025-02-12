'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { Trophy, Clock, Users, Globe2, Leaf } from 'lucide-react';
import { ImpactAnimation } from '../components/ImpactAnimation';
import { RankEntry, RealtimeRankData, LeaderboardEntry } from '../types';
import { subscribeToRealtimeRanks, subscribeToLeaderboard, subscribeTotalFootprint } from '../services/firebase';
import { motion, AnimatePresence } from 'framer-motion';

const rankColors = {
  1: 'bg-gradient-to-r from-green-100 to-green-50 border-green-500 text-green-700',
  2: 'bg-gradient-to-r from-blue-100 to-blue-50 border-blue-500 text-blue-700',
  3: 'bg-gradient-to-r from-yellow-100 to-yellow-50 border-yellow-500 text-yellow-700',
  4: 'bg-gradient-to-r from-orange-100 to-orange-50 border-orange-500 text-orange-700',
  5: 'bg-gradient-to-r from-red-100 to-red-50 border-red-500 text-red-700',
  6: 'bg-gradient-to-r from-purple-100 to-purple-50 border-purple-500 text-purple-700',
};

interface QueuedRankEntry extends RankEntry {
  id: string;
  expiryTime: number;
}

const fadeTransition = {
  type: "tween",
  duration: 0.3
};

const RankCard: React.FC<{ rank: number; entry: RankEntry }> = ({ rank, entry }) => (
  <div className={`p-4 rounded-lg border-2 ${rankColors[rank as keyof typeof rankColors]} relative overflow-hidden`}>
    <div className="flex justify-between items-center mb-2">
      <div className="flex items-center gap-2">
        <span className="font-bold text-xl">#{rank}</span>
      </div>
      <AnimatePresence mode="wait">
        <motion.span
          key={entry.timestamp}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={fadeTransition}
          className="text-xs font-medium bg-white/50 px-2 py-1 rounded-full"
        >
          {new Date(entry.timestamp).toLocaleTimeString()}
        </motion.span>
      </AnimatePresence>
    </div>
    <AnimatePresence mode="wait">
      <motion.p
        key={entry.questionText}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={fadeTransition}
        className="text-base font-bold truncate mb-1"
      >
        {entry.questionText}
      </motion.p>
    </AnimatePresence>
    <div className="flex justify-between items-center">
      <AnimatePresence mode="wait">
        <motion.p
          key={entry.selectedOption.text}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={fadeTransition}
          className="text-sm opacity-90 font-semibold"
        >
          {entry.selectedOption.text}
        </motion.p>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.span
          key={entry.playerName}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={fadeTransition}
          className="text-xs bg-white/70 px-2 py-1 font-semibold rounded-full"
        >
          {entry.playerName}
        </motion.span>
      </AnimatePresence>
    </div>
  </div>
);

const LatestLeaderboardCard: React.FC<{ latest: LeaderboardEntry }> = ({ latest }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-50 p-6 rounded-xl border-2 border-yellow-200 shadow-lg"
  >
    <div className="flex items-center gap-3 mb-3">
      <div className="p-2 bg-yellow-200 rounded-full">
        <Trophy className="w-6 h-6 text-yellow-600" />
      </div>
      <h3 className="font-bold text-xl text-yellow-800">Latest Achievement</h3>
    </div>
    <div className="space-y-2">
      <p className="font-bold text-lg text-yellow-900">{latest.playerName}</p>
      <div className="flex items-center gap-2 text-yellow-700">
        <Leaf className="w-5 h-5" />
        <span className="font-medium">
          Produces ~ {latest.totalCarbon.toLocaleString()} kg CO₂ annually 
        </span>
      </div>
    </div>
  </motion.div>
);

export const RealtimeDashboard: React.FC = () => {
  const [rankData, setRankData] = useState<RealtimeRankData>({});
  const [queuedRanks, setQueuedRanks] = useState<QueuedRankEntry[]>([]);
  const [latestEntry, setLatestEntry] = useState<LeaderboardEntry | null>(null);
  const [totalImpact, setTotalImpact] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [activePlayers, setActivePlayers] = useState<number>(0);

  const processQueue = useCallback(() => {
    const now = Date.now();
    const { toDisplay, toKeep } = queuedRanks.reduce(
      (acc: { toDisplay: Record<string, QueuedRankEntry>; toKeep: QueuedRankEntry[] }, entry) => {
        if (entry.expiryTime <= now) {
          acc.toDisplay[entry.id] = entry;
        } else {
          acc.toKeep.push(entry);
        }
        return acc;
      },
      { toDisplay: {}, toKeep: [] }
    );

    if (Object.keys(toDisplay).length > 0) {
      setRankData((prev: RealtimeRankData) => ({ ...prev, ...toDisplay }));
      setQueuedRanks(toKeep);
    }
  }, [queuedRanks]);

  useEffect(() => {
    const interval = setInterval(processQueue, 1000);
    return () => clearInterval(interval);
  }, [processQueue]);

  useEffect(() => {
    const unsubscribeRanks = subscribeToRealtimeRanks((data) => {
      const newEntries = Object.entries(data).map(([id, entry]) => ({
        ...entry,
        id,
        expiryTime: Date.now() + 5000,
      }));
      setQueuedRanks(prev => [...prev, ...newEntries]);
      setLoading(false);
    });

    const unsubscribeLeaderboard = subscribeToLeaderboard((entries) => {
      if (entries.length > 0) setLatestEntry(entries[0]);
    });

    const unsubscribeTotalImpact = subscribeTotalFootprint((total) => {
      setTotalImpact(total);
    });

    return () => {
      unsubscribeRanks();
      unsubscribeLeaderboard();
      unsubscribeTotalImpact();
    };
  }, []);

  // Random number generator for active players
  useEffect(() => {
    const generateRandomNumber = () => Math.floor(Math.random() * 21); // Random number between 0 and 20
    const interval = setInterval(() => {
      setActivePlayers(generateRandomNumber());
    }, 60000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="rounded-full h-16 w-16 border-4 border-green-200 border-t-green-500"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="h-full max-w-7xl mx-auto flex flex-col"
      >
        <div className="flex items-center justify-between mb-8">
          <motion.div
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            className="flex items-center gap-4"
          >
            <div className="p-3 bg-white rounded-full shadow-md">
              <Clock className="w-8 h-8 text-green-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Realtime Impact Dashboard</h1>
              <p className="text-sm text-gray-600">Tracking environmental choices in real-time</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ x: 20 }}
            animate={{ x: 0 }}
            className="flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-sm"
          >
            <Users className="w-5 h-5 text-green-500" />
            <span className="font-medium text-gray-700">{activePlayers} Active Players</span>
          </motion.div>
        </div>

        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-10rem)]">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="col-span-4 space-y-6"
          >
            {latestEntry && <LatestLeaderboardCard latest={latestEntry} />}
            <div className="bg-white rounded-xl shadow-lg p-6 h-[calc(100%-11rem)]">
              <ImpactAnimation 
                carbonFootprint={totalImpact}
                treeEquivalent={Math.floor(totalImpact / 21.7)}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="col-span-8 bg-white rounded-xl shadow-lg p-6 overflow-hidden"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-100 rounded-full">
                <Globe2 className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Live Responses</h2>
            </div>
            
            <div className="h-[calc(100%-5rem)] overflow-y-auto space-y-4 pr-3">
              <AnimatePresence mode="popLayout" initial={false}>
                {Object.entries(rankData)
                  .sort(([rankA], [rankB]) => Number(rankA) - Number(rankB))
                  .map(([rank, entry]) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={fadeTransition}
                    >
                      <RankCard rank={Number(rank)} entry={entry} />
                    </motion.div>
                  ))
                }
              </AnimatePresence>
              
              {Object.keys(rankData).length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex items-center justify-center text-gray-500"
                >
                  <div className="text-center">
                    <Globe2 className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p className="font-medium">No choices recorded yet.</p>
                    <p className="text-sm">Start playing to see realtime updates!</p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};