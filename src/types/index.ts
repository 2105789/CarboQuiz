export interface Question {
  id: number;
  text: string;
  options: Option[];
}

export interface Option {
  id: number;
  text: string;
  icon: string;
  image: string;
  carbonFootprint: number;
  treeEquivalent: number;
  explanation: string;
  rank: number;          
  performance: string;  
  improvement: string;   
  distance?: number;
}

export interface Answer {
  questionId: number;
  selectedOptions: Option[];
  distance?: number;
  question?: Question;
}

export interface LeaderboardEntry {
  id: string;
  playerName: string;
  totalCarbon: number;
  bestChoice: string;
  date: string;
  timestamp?: number;
}

export interface RankEntry {
  questionId: number;
  questionText: string;
  selectedOption: Option;
  playerName: string;
  timestamp: number;
}

export interface RealtimeRankData {
  [rank: number]: RankEntry;
}

export interface LatestLeaderboardEntry {
  entry: LeaderboardEntry;
  rank: number;
}
