import { useState } from "react";
import { formatNumber } from "@/lib/format";
import { RotateCcw, ShareIcon, SkullMark, Spark } from "@/components/ui/Icons";
import type { ChoiceRoundResult } from "@/types/game";

type ChoiceFinalScreenProps = {
  results: ChoiceRoundResult[];
  onRestart: () => void;
};

export function ChoiceFinalScreen({ results, onRestart }: ChoiceFinalScreenProps) {
  const [shareStatus, setShareStatus] = useState("");
  const correct = results.filter((result) => result.isCorrect).length;
  const totalScore = results.reduce((total, result) => total + result.score, 0);
  const percentage = results.length ? (correct / results.length) * 100 : 0;
  const rank = percentage >= 90 ? "Master Historian" : percentage >= 70 ? "Sharp Analyst" : percentage >= 50 ? "Archive Explorer" : "History Student";
  const shareText = `DeathGuess · Higher Toll\n☠️ ${formatNumber(totalScore)} points\n🎯 ${correct}/${results.length} correct choices`;

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
          <SkullMark className="compact-brand__mark" /><span>DEATH</span><span className="accent-text">GUESS</span>
        </div>
        <span className="edition-tag">HIGHER TOLL COMPLETE</span>
      </header>

      <section className="final-card">
        <p className="eyebrow"><Spark /> FINAL RESULT</p>
        <div className="rank-badge">
          <span>CLASSIFICATION</span>
          <strong>{rank}</strong>
          <p>You correctly compared {correct} of {results.length} historical pairs.</p>
        </div>
        <div className="total-score"><strong>{formatNumber(totalScore)}</strong><span>/ {formatNumber(results.length * 1000)} POINTS</span></div>
        <div className="score-meter" aria-label={`${percentage}% correct`}><span style={{ width: `${percentage}%` }} /></div>
        <p className="score-percentage">Accuracy: <strong>{percentage.toFixed(0)}%</strong></p>
        <div className="choice-summary">
          <span>CORRECT CHOICES</span>
          <strong>{correct}<i>/{results.length}</i></strong>
        </div>
        <div className="final-actions">
          <button className="primary-button" type="button" onClick={shareResult}>Share result <span className="button-icon"><ShareIcon /></span></button>
          <button className="secondary-button" type="button" onClick={onRestart}><RotateCcw /> Choose mode</button>
        </div>
        <span className="share-status" role="status">{shareStatus}</span>
      </section>
    </main>
  );
}
