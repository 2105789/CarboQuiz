export interface Option {
  id: number;
  text: string;
  carbonFootprint: number;
  treeEquivalent: number;
  rank: number;
  performance: string;
  improvement: string;
  explanation: string;
  distance?: number; // Optional distance field for commute options
}

export interface Question {
  id: number;
  text: string;
  options: Option[];
  requiresDistance: boolean;  // Required property for distance input
}

export interface Answer {
    questionId: number;
    selectedOptions: Option[];
    distance?: number; // Optional distance field for commute answers
    userName?: string;  // Add this
    userEmail?: string; // Add this
}
  
export interface Result {
    totalCarbonFootprint: number;
    totalTreeEquivalent: number;
    answers: Answer[];
    recommendations: string[];
}

export interface LeaderboardEntry {
  id: string;
  playerName: string;
  totalCarbon: number;
  bestChoice: string;
  date: string;
  timestamp?: number;  // Optional since it's added after creation
}

export interface LatestLeaderboardEntry {
  entry: LeaderboardEntry;
  rank: number;
}

export interface RankEntry {
  id?: string;  // Optional since it's added after creation
  questionId: number;
  playerName: string;
  questionText: string;
  selectedOption: Option;
  timestamp: number;
}

export interface RealtimeRankData {
  [key: string]: RankEntry;
}