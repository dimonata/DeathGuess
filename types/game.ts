export type CountType = "exact" | "estimated" | "minimum";

export type HistoricalEvent = {
  id: number;
  title: string;
  year: number | string;
  location: string;
  category: string;
  deaths: number;
  countType: CountType;
  image: string;
  imageAlt: string;
  imageAttribution: string;
  imageSourceUrl: string;
  teaser: string;
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

export type GameMode = "exact" | "higher";

export type ChoiceRound = {
  id: string;
  left: HistoricalEvent;
  right: HistoricalEvent;
};

export type ChoiceRoundResult = {
  round: ChoiceRound;
  selectedId: number;
  correctId: number;
  isCorrect: boolean;
  score: number;
};

export type GameStatus = "landing" | "mode-select" | "playing" | "finished";

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
