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
    `🎯 Erro médio: ${formatPercent(summary.averageError)}%`,
    `🏆 ${summary.goodEstimates}/${results.length} boas estimativas`,
    "Você chega mais perto?",
  ].join("\n");

  async function shareResult() {
    try {
      if (navigator.share) {
        await navigator.share({ title: "DeathGuess", text: shareText, url: window.location.href });
        setShareStatus("Resultado compartilhado!");
        return;
      }

      await navigator.clipboard.writeText(`${shareText}\n${window.location.href}`);
      setShareStatus("Resultado copiado!");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setShareStatus("Não foi possível compartilhar.");
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
        <span className="edition-tag">ARQUIVO CONCLUÍDO</span>
      </header>

      <section className="final-card">
        <p className="eyebrow"><Spark /> RESULTADO FINAL</p>
        <div className="rank-badge">
          <span>CLASSIFICAÇÃO</span>
          <strong>{summary.rank.name}</strong>
          <p>{summary.rank.message}</p>
        </div>

        <div className="total-score">
          <strong>{formatNumber(summary.totalScore)}</strong>
          <span>/ {formatNumber(summary.maxScore)} PONTOS</span>
        </div>

        <div className="score-meter" aria-label={`${formatPercent(summary.scorePercentage)}% da pontuação máxima`}>
          <span style={{ width: `${Math.min(summary.scorePercentage, 100)}%` }} />
        </div>
        <p className="score-percentage">Você conquistou <strong>{formatPercent(summary.scorePercentage)}%</strong> dos pontos possíveis.</p>

        <div className="summary-grid">
          <div>
            <span>ERRO MÉDIO</span>
            <strong>{formatPercent(summary.averageError)}%</strong>
          </div>
          <div>
            <span>BOAS ESTIMATIVAS</span>
            <strong>{summary.goodEstimates}<i>/{results.length}</i></strong>
          </div>
          <div>
            <span>MELHOR RODADA</span>
            <strong className="summary-grid__event">{summary.bestRound.event.title}</strong>
            <small>{formatNumber(summary.bestRound.score)} pts</small>
          </div>
          <div>
            <span>RODADA MAIS DIFÍCIL</span>
            <strong className="summary-grid__event">{summary.worstRound.event.title}</strong>
            <small>{formatNumber(summary.worstRound.score)} pts</small>
          </div>
        </div>

        <div className="final-actions">
          <button className="primary-button" type="button" onClick={shareResult}>
            Compartilhar resultado <span className="button-icon"><ShareIcon /></span>
          </button>
          <button className="secondary-button" type="button" onClick={onRestart}>
            <RotateCcw /> Jogar novamente
          </button>
        </div>
        <span className="share-status" role="status">{shareStatus}</span>
      </section>
    </main>
  );
}
