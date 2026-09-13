"use client";

import { useState } from "react";
import { historicalEvents } from "@/data/events";
import { createRoundOrder } from "@/lib/game";
import { calculateErrorPercentage, calculateScore } from "@/lib/scoring";
import type { GameStatus, HistoricalEvent, RoundResult } from "@/types/game";
import { EventVisual } from "./EventVisual";
import { FinalScreen } from "./FinalScreen";
import { GameHeader } from "./GameHeader";
import { GuessForm } from "./GuessForm";
import { LandingScreen } from "./LandingScreen";
import { RoundReveal } from "./RoundReveal";

export function Game() {
  const [status, setStatus] = useState<GameStatus>("landing");
  const [rounds, setRounds] = useState<HistoricalEvent[]>([]);
  const [roundIndex, setRoundIndex] = useState(0);
  const [results, setResults] = useState<RoundResult[]>([]);
  const [currentResult, setCurrentResult] = useState<RoundResult | null>(null);

  function startGame() {
    setRounds(createRoundOrder(historicalEvents));
    setRoundIndex(0);
    setResults([]);
    setCurrentResult(null);
    setStatus("playing");
  }

  function submitGuess(guess: number) {
    const event = rounds[roundIndex];
    const result: RoundResult = {
      event,
      guess,
      difference: Math.abs(guess - event.deaths),
      errorPercentage: calculateErrorPercentage(guess, event.deaths),
      score: calculateScore(guess, event.deaths),
    };

    setCurrentResult(result);
    setResults((previous) => [...previous, result]);
  }

  function advanceRound() {
    if (roundIndex === rounds.length - 1) {
      setStatus("finished");
      return;
    }

    setRoundIndex((index) => index + 1);
    setCurrentResult(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (status === "landing") {
    return <LandingScreen onStart={startGame} />;
  }

  if (status === "finished") {
    return <FinalScreen results={results} onRestart={startGame} />;
  }

  const currentEvent = rounds[roundIndex];
  const totalScore = results.reduce((total, result) => total + result.score, 0);

  return (
    <main className="game-screen page-enter">
      <GameHeader round={roundIndex + 1} totalRounds={rounds.length} score={totalScore} />
      <div className="game-board">
        <EventVisual event={currentEvent} />
        <section className="game-panel" aria-label={`Guess for ${currentEvent.title}`}>
          {currentResult ? (
            <RoundReveal
              result={currentResult}
              isLastRound={roundIndex === rounds.length - 1}
              onNext={advanceRound}
            />
          ) : (
            <GuessForm
              key={currentEvent.id}
              difficulty={currentEvent.difficulty}
              teaser={currentEvent.teaser}
              onSubmit={submitGuess}
            />
          )}
        </section>
      </div>
    </main>
  );
}
