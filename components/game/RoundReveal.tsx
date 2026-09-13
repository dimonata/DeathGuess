import { useEffect, useRef } from "react";
import type { RoundResult } from "@/types/game";
import { formatNumber, formatPercent } from "@/lib/format";
import { ArrowRight, ExternalLink, Spark } from "@/components/ui/Icons";
import { AnimatedNumber } from "./AnimatedNumber";
import { ComparisonChart } from "./ComparisonChart";

type RoundRevealProps = {
  result: RoundResult;
  isLastRound: boolean;
  onNext: () => void;
};

export function RoundReveal({ result, isLastRound, onNext }: RoundRevealProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const { event, guess, difference, errorPercentage, score } = result;

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div className="reveal-panel reveal-enter" aria-live="polite">
      <div className="reveal-panel__top">
        <span className="step-label step-label--success"><Spark /> RESPOSTA REVELADA</span>
        <span className="earned-score">+{formatNumber(score)} PTS</span>
      </div>

      <p className="answer-kicker">{event.countType === "estimated" ? "CERCA DE" : "NÚMERO CONFIRMADO"}</p>
      <h2 className="answer-number" tabIndex={-1} ref={headingRef}>
        <AnimatedNumber value={event.deaths} />
      </h2>
      <p className="answer-unit">pessoas morreram</p>

      <div className="result-stats">
        <div><span>SEU PALPITE</span><strong>{formatNumber(guess)}</strong></div>
        <div><span>DIFERENÇA</span><strong>{formatNumber(difference)}</strong></div>
        <div><span>ERRO</span><strong>{formatPercent(errorPercentage)}%</strong></div>
      </div>

      <ComparisonChart guess={guess} actual={event.deaths} />

      <div className="history-note">
        <span className="history-note__number">{String(event.id).padStart(2, "0")}</span>
        <div>
          <span className="history-note__label">CONTEXTO HISTÓRICO</span>
          <p>{event.description}</p>
          <a href={event.sourceUrl} target="_blank" rel="noreferrer">
            Fonte: {event.sourceName} <ExternalLink />
          </a>
        </div>
      </div>

      <button className="primary-button" type="button" onClick={onNext}>
        {isLastRound ? "Ver resultado final" : "Próxima rodada"}
        <span className="button-icon"><ArrowRight /></span>
      </button>
    </div>
  );
}
