export type CountType = "exact" | "estimated";

export type HistoricalEvent = {
  id: number;
  title: string;
  year: number;
  location: string;
  category: string;
  deaths: number;
  countType: CountType;
  image: string;
  imageAlt: string;
  imageAttribution: string;
  imageSourceUrl: string;
  description: string;
  sourceName: string;
  sourceUrl: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
};

export type RoundResult = {
  event: HistoricalEvent;
  guess: number;
  difference: number;
  errorPercentage: number;
  score: number;
};

export type GameStatus = "landing" | "playing" | "finished";

export type GameSummary = {
  totalScore: number;
  maxScore: number;
  scorePercentage: number;
  averageError: number;
  bestRound: RoundResult;
  worstRound: RoundResult;
  goodEstimates: number;
  rank: Rank;
};

export type Rank = {
  name: string;
  message: string;
};
