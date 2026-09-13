import { useMemo, useState } from "react";
import type { RoundResult } from "@/types/game";
import { buildGameSummary } from "@/lib/scoring";
import { formatNumber, formatPercent } from "@/lib/format";
import { RotateCcw, ShareIcon, SkullMark, Spark } from "@/components/ui/Icons";

type FinalScreenProps = {
  results: RoundResult[];
  onRestart: () => void;
};

export function FinalScreen({ results, onRestart }: FinalScreenProps) {
  const summary = useMemo(() => buildGameSummary(results), [results]);
  const [shareStatus, setShareStatus] = useState("");

  const shareText = [
    "DeathGuess",
    `☠️ ${formatNumber(summary.totalScore)} / ${formatNumber(summary.maxScore)}`,
    `🎯 Average error: ${formatPercent(summary.averageError)}%`,
    `🏆 ${summary.goodEstimates}/${results.length} good estimates`,
    "Can you get closer?",
  ].join("\n");

  async function shareResult() {
    try {
      if (navigator.share) {
        await navigator.share({ title: "DeathGuess", text: shareText, url: window.location.href });
        setShareStatus("Result shared!");
        return;
      }

      await navigator.clipboard.writeText(`${shareText}\n${window.location.href}`);
      setShareStatus("Result copied!");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setShareStatus("Unable to share the result.");
    }
  }

  return (
    <main className="final-screen page-enter">
      <div className="final-screen__glow" aria-hidden="true" />
      <header className="final-header">
        <div className="compact-brand" aria-label="DeathGuess">
          <SkullMark className="compact-brand__mark" />
          <span>DEATH</span><span className="accent-text">GUESS</span>
        </div>
        <span className="edition-tag">ARCHIVE COMPLETE</span>
      </header>

      <section className="final-card">
        <p className="eyebrow"><Spark /> FINAL RESULT</p>
        <div className="rank-badge">
          <span>CLASSIFICATION</span>
          <strong>{summary.rank.name}</strong>
          <p>{summary.rank.message}</p>
        </div>

        <div className="total-score">
          <strong>{formatNumber(summary.totalScore)}</strong>
          <span>/ {formatNumber(summary.maxScore)} POINTS</span>
        </div>

        <div className="score-meter" aria-label={`${formatPercent(summary.scorePercentage)}% of the maximum score`}>
          <span style={{ width: `${Math.min(summary.scorePercentage, 100)}%` }} />
        </div>
        <p className="score-percentage">You earned <strong>{formatPercent(summary.scorePercentage)}%</strong> of the available points.</p>

        <div className="summary-grid">
          <div>
            <span>AVERAGE ERROR</span>
            <strong>{formatPercent(summary.averageError)}%</strong>
          </div>
          <div>
            <span>GOOD ESTIMATES</span>
            <strong>{summary.goodEstimates}<i>/{results.length}</i></strong>
          </div>
          <div>
            <span>BEST ROUND</span>
            <strong className="summary-grid__event">{summary.bestRound.event.title}</strong>
            <small>{formatNumber(summary.bestRound.score)} pts</small>
          </div>
          <div>
            <span>TOUGHEST ROUND</span>
            <strong className="summary-grid__event">{summary.worstRound.event.title}</strong>
            <small>{formatNumber(summary.worstRound.score)} pts</small>
          </div>
        </div>

        <div className="final-actions">
          <button className="primary-button" type="button" onClick={shareResult}>
            Share result <span className="button-icon"><ShareIcon /></span>
          </button>
          <button className="secondary-button" type="button" onClick={onRestart}>
            <RotateCcw /> Choose mode
          </button>
        </div>
        <span className="share-status" role="status">{shareStatus}</span>
      </section>
    </main>
  );
}
