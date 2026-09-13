import { formatNumber } from "@/lib/format";
import { GAME_LENGTH } from "@/lib/game";
import { SkullMark } from "@/components/ui/Icons";

type GameHeaderProps = {
  round: number;
  totalRounds?: number;
  score: number;
};

export function GameHeader({ round, totalRounds = GAME_LENGTH, score }: GameHeaderProps) {
  const progress = ((round - 1) / totalRounds) * 100;

  return (
    <header className="game-header">
      <div className="compact-brand" aria-label="DeathGuess">
        <SkullMark className="compact-brand__mark" />
        <span>DEATH</span>
        <span className="accent-text">GUESS</span>
      </div>

      <div className="round-progress" aria-label={`Round ${round} of ${totalRounds}`}>
        <div className="round-progress__label">
          <span>ROUND</span>
          <strong>
            {String(round).padStart(2, "0")} <i>/</i> {String(totalRounds).padStart(2, "0")}
          </strong>
        </div>
        <div className="round-progress__track" aria-hidden="true">
          <span style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="score-counter">
        <span>POINTS</span>
        <strong>{formatNumber(score)}</strong>
      </div>
    </header>
  );
}
