"use client";

import { useState } from "react";
import { historicalEvents } from "@/data/events";
import { createChoiceRoundOrder, createRoundOrder } from "@/lib/game";
import { calculateErrorPercentage, calculateScore } from "@/lib/scoring";
import type { ChoiceRound as ChoiceRoundType, ChoiceRoundResult, GameMode, GameStatus, HistoricalEvent, RoundResult } from "@/types/game";
import { ChoiceFinalScreen } from "./ChoiceFinalScreen";
import { ChoiceRound } from "./ChoiceRound";
import { EventVisual } from "./EventVisual";
import { FinalScreen } from "./FinalScreen";
import { GameHeader } from "./GameHeader";
import { GuessForm } from "./GuessForm";
import { LandingScreen } from "./LandingScreen";
import { ModeSelectScreen } from "./ModeSelectScreen";
import { RoundReveal } from "./RoundReveal";

export function Game() {
  const [status, setStatus] = useState<GameStatus>("landing");
  const [mode, setMode] = useState<GameMode | null>(null);
  const [rounds, setRounds] = useState<HistoricalEvent[]>([]);
  const [choiceRounds, setChoiceRounds] = useState<ChoiceRoundType[]>([]);
  const [roundIndex, setRoundIndex] = useState(0);
  const [results, setResults] = useState<RoundResult[]>([]);
  const [choiceResults, setChoiceResults] = useState<ChoiceRoundResult[]>([]);
  const [currentResult, setCurrentResult] = useState<RoundResult | null>(null);
  const [currentChoiceResult, setCurrentChoiceResult] = useState<ChoiceRoundResult | null>(null);

  function startGame(selectedMode: GameMode) {
    setMode(selectedMode);
    setRounds(selectedMode === "exact" ? createRoundOrder(historicalEvents) : []);
    setChoiceRounds(selectedMode === "higher" ? createChoiceRoundOrder(historicalEvents) : []);
    setRoundIndex(0);
    setResults([]);
    setChoiceResults([]);
    setCurrentResult(null);
    setCurrentChoiceResult(null);
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

  function submitChoice(event: HistoricalEvent) {
    const round = choiceRounds[roundIndex];
    const correctEvent = round.left.deaths > round.right.deaths ? round.left : round.right;
    const result: ChoiceRoundResult = {
      round,
      selectedId: event.id,
      correctId: correctEvent.id,
      isCorrect: event.id === correctEvent.id,
      score: event.id === correctEvent.id ? 1000 : 0,
    };

    setCurrentChoiceResult(result);
    setChoiceResults((previous) => [...previous, result]);
  }

  function advanceRound(totalRounds: number) {
    if (roundIndex === totalRounds - 1) {
      setStatus("finished");
      return;
    }

    setRoundIndex((index) => index + 1);
    setCurrentResult(null);
    setCurrentChoiceResult(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (status === "landing") {
    return <LandingScreen onStart={() => setStatus("mode-select")} />;
  }

  if (status === "mode-select") {
    return <ModeSelectScreen onSelect={startGame} onBack={() => setStatus("landing")} />;
  }

  if (status === "finished") {
    const chooseMode = () => setStatus("mode-select");
    return mode === "higher"
      ? <ChoiceFinalScreen results={choiceResults} onRestart={chooseMode} />
      : <FinalScreen results={results} onRestart={chooseMode} />;
  }

  if (mode === "higher") {
    const currentRound = choiceRounds[roundIndex];
    const totalScore = choiceResults.reduce((total, result) => total + result.score, 0);

    return (
      <main className="choice-game-screen page-enter">
        <GameHeader round={roundIndex + 1} totalRounds={choiceRounds.length} score={totalScore} />
        <ChoiceRound
          round={currentRound}
          result={currentChoiceResult}
          isLastRound={roundIndex === choiceRounds.length - 1}
          onChoose={submitChoice}
          onNext={() => advanceRound(choiceRounds.length)}
        />
      </main>
    );
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
              onNext={() => advanceRound(rounds.length)}
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
