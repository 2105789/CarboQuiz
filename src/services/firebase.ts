import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, push, set, increment, off, get } from 'firebase/database';
import { LeaderboardEntry, RankEntry, RealtimeRankData, LatestLeaderboardEntry } from '../types';

const firebaseConfig = {
  apiKey: "AIzaSyA4Kj-JewFOLVJtS0gppLEDnsJOgtIFOoE",
  authDomain: "carbono-a8e21.firebaseapp.com",
  databaseURL: "https://carbono-a8e21-default-rtdb.firebaseio.com",
  projectId: "carbono-a8e21",
  storageBucket: "carbono-a8e21.firebasestorage.app",
  messagingSenderId: "255658049080",
  appId: "1:255658049080:web:c57aaec6044f75c85870cd"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

let leaderboardCache: LeaderboardEntry[] = [];
let totalFootprintCache = 0;

export const subscribeToLeaderboard = (callback: (entries: LeaderboardEntry[]) => void) => {
  const leaderboardRef = ref(database, 'leaderboard');
  
  const handler = onValue(leaderboardRef, (snapshot) => {
    const data = snapshot.val();
    if (!data) {
      callback([]);
      return;
    }
    
    const entries = Object.values(data) as LeaderboardEntry[];
    // Sort by timestamp in descending order (most recent first)
    const sortedEntries = entries.sort((a, b) => {
      const timeA = a.timestamp || new Date(a.date).getTime();
      const timeB = b.timestamp || new Date(b.date).getTime();
      return timeB - timeA;
    });
    
    leaderboardCache = sortedEntries;
    callback(sortedEntries);
  });

  return () => {
    off(leaderboardRef, 'value', handler);
  };
};

export const addLeaderboardEntry = async (entry: Omit<LeaderboardEntry, 'id'>): Promise<string> => {
  const leaderboardRef = ref(database, 'leaderboard');
  const totalRef = ref(database, 'totalFootprint');
  const newEntryRef = push(leaderboardRef);
  
  await Promise.all([
    set(newEntryRef, {
      ...entry,
      id: newEntryRef.key,
      timestamp: Date.now() // Add timestamp for accurate sorting
    }),
    set(totalRef, increment(entry.totalCarbon))
  ]);

  return newEntryRef.key!;
};

export const subscribeTotalFootprint = (callback: (total: number) => void) => {
  const totalRef = ref(database, 'totalFootprint');
  
  if (totalFootprintCache > 0) {
    callback(totalFootprintCache);
  }

  const handler = onValue(totalRef, (snapshot) => {
    totalFootprintCache = snapshot.val() || 0;
    callback(totalFootprintCache);
  });

  return () => {
    off(totalRef, 'value', handler);
  };
};

export const updateRankEntry = async (rankNumber: number, entry: RankEntry) => {
  const rankRef = ref(database, `realtime_ranks/${rankNumber}`);
  await set(rankRef, entry);
};

export const subscribeToRealtimeRanks = (callback: (data: RealtimeRankData) => void) => {
  const ranksRef = ref(database, 'realtime_ranks');
  
  const handler = onValue(ranksRef, (snapshot) => {
    const data = snapshot.val() || {};
    callback(data);
  });

  return () => {
    off(ranksRef, 'value', handler);
  };
};

export const getLatestLeaderboardEntry = async (): Promise<LatestLeaderboardEntry | null> => {
  const leaderboardRef = ref(database, 'leaderboard');
  const snapshot = await get(leaderboardRef);
  const data = snapshot.val();
  
  if (!data) return null;
  
  const entries = Object.values(data) as LeaderboardEntry[];
  const sortedEntries = entries.sort((a, b) => a.totalCarbon - b.totalCarbon);
  const latestEntry = entries.reduce((latest, current) => {
    return new Date(current.date) > new Date(latest.date) ? current : latest;
  });
  
  const rank = sortedEntries.findIndex(entry => entry.id === latestEntry.id) + 1;
  
  return {
    entry: latestEntry,
    rank
  };
};

export const subscribeToLatestLeaderboardEntry = (callback: (entry: LatestLeaderboardEntry | null) => void) => {
  const leaderboardRef = ref(database, 'leaderboard');
  
  const handler = onValue(leaderboardRef, async (snapshot) => {
    const data = snapshot.val();
    if (!data) {
      callback(null);
      return;
    }
    
    const entries = Object.values(data) as LeaderboardEntry[];
    
    // First find the latest entry by date
    const latestEntry = entries.reduce((latest, current) => {
      const latestDate = new Date(latest.date);
      const currentDate = new Date(current.date);
      return currentDate > latestDate ? current : latest;
    });
    
    // Then calculate its rank among all entries
    const sortedEntries = [...entries].sort((a, b) => a.totalCarbon - b.totalCarbon);
    const rank = sortedEntries.findIndex(entry => entry.id === latestEntry.id) + 1;
    
    callback({
      entry: latestEntry,
      rank
    });
  });

  return () => {
    off(leaderboardRef, 'value', handler);
  };
};