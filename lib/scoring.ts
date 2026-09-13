import type { GameSummary, Rank, RoundResult } from "@/types/game";

export const MAX_ROUND_SCORE = 10_000;

/**
 * A smooth inverse-square curve. A 10% error still earns 9,615 points,
 * 50% earns 5,000, and increasingly distant guesses fall away quickly.
 */
export function calculateScore(guess: number, actual: number): number {
  if (guess === actual) return MAX_ROUND_SCORE;

  const relativeError = Math.abs(guess - actual) / actual;
  return Math.round(MAX_ROUND_SCORE / (1 + 4 * relativeError ** 2));
}

export function calculateErrorPercentage(guess: number, actual: number): number {
  return (Math.abs(guess - actual) / actual) * 100;
}

export function getRank(scorePercentage: number): Rank {
  if (scorePercentage >= 95) {
    return { name: "Archivist", message: "Precision worthy of a historical archive." };
  }
  if (scorePercentage >= 80) {
    return { name: "Expert", message: "You understand the scale behind the headlines." };
  }
  if (scorePercentage >= 60) {
    return { name: "Historian", message: "Your historical instinct is remarkably well calibrated." };
  }
  if (scorePercentage >= 30) {
    return { name: "Investigator", message: "Good instincts — there are still records to explore." };
  }
  return { name: "Witness", message: "Every investigation begins with a first clue." };
}

export function buildGameSummary(results: RoundResult[]): GameSummary {
  if (results.length === 0) {
    throw new Error("A summary requires at least one round result.");
  }

  const totalScore = results.reduce((total, round) => total + round.score, 0);
  const maxScore = results.length * MAX_ROUND_SCORE;
  const scorePercentage = (totalScore / maxScore) * 100;
  const averageError =
    results.reduce((total, round) => total + round.errorPercentage, 0) / results.length;

  return {
    totalScore,
    maxScore,
    scorePercentage,
    averageError,
    bestRound: results.reduce((best, round) => (round.score > best.score ? round : best)),
    worstRound: results.reduce((worst, round) => (round.score < worst.score ? round : worst)),
    goodEstimates: results.filter((round) => round.score >= 7_000).length,
    rank: getRank(scorePercentage),
  };
}
