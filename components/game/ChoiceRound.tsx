import Image from "next/image";
import { ArrowRight, ExternalLink, MapPin, Spark } from "@/components/ui/Icons";
import { formatNumber } from "@/lib/format";
import type { ChoiceRound as ChoiceRoundType, ChoiceRoundResult, HistoricalEvent } from "@/types/game";

type ChoiceRoundProps = {
  round: ChoiceRoundType;
  result: ChoiceRoundResult | null;
  isLastRound: boolean;
  onChoose: (event: HistoricalEvent) => void;
  onNext: () => void;
};

function countLabel(event: HistoricalEvent) {
  if (event.countType === "minimum") return "AT LEAST";
  if (event.countType === "estimated") return "ESTIMATED";
  return "CONFIRMED";
}

export function ChoiceRound({ round, result, isLastRound, onChoose, onNext }: ChoiceRoundProps) {
  const events = [round.left, round.right];

  return (
    <section className="choice-round">
      <div className="choice-round__heading">
        <p className="eyebrow"><Spark /> HIGHER TOLL</p>
        <h1>Which event had more victims?</h1>
        <p>Choose one case. Both sourced counts are revealed after your decision.</p>
      </div>

      <div className="choice-grid">
        {events.map((event, index) => {
          const isCorrect = result?.correctId === event.id;
          const isWrongSelection = result?.selectedId === event.id && !result.isCorrect;
          const stateClass = result
            ? isCorrect ? " is-correct" : isWrongSelection ? " is-wrong" : " is-dimmed"
            : "";

          return (
            <button
              className={`choice-card${stateClass}`}
              type="button"
              onClick={() => onChoose(event)}
              disabled={Boolean(result)}
              key={event.id}
            >
              <span className="choice-card__image">
                <Image src={event.image} alt="" fill sizes="(max-width: 760px) 100vw, 50vw" />
                <span className="choice-card__letter">{index === 0 ? "A" : "B"}</span>
              </span>
              <span className="choice-card__body">
                <span className="choice-card__category">{event.category}</span>
                <strong>{event.title}</strong>
                <span className="choice-card__meta"><MapPin /> {event.location} · {event.year}</span>
                <span className="choice-card__teaser">{event.teaser}</span>
                {result && (
                  <span className="choice-card__answer">
                    <small>{countLabel(event)}</small>
                    {formatNumber(event.deaths)} <i>deaths</i>
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      {result && (
        <div className="choice-feedback reveal-enter" aria-live="polite">
          <div>
            <span className={result.isCorrect ? "choice-feedback__correct" : "choice-feedback__wrong"}>
              {result.isCorrect ? "CORRECT CHOICE" : "WRONG CHOICE"}
            </span>
            <strong>{result.isCorrect ? "+1,000 PTS" : "+0 PTS"}</strong>
          </div>
          <p className="choice-feedback__links">
            <span>Data: {events.map((event, index) => (
              <span key={event.id}>{index > 0 && " · "}<a href={event.sourceUrl} target="_blank" rel="noreferrer">{event.title} <ExternalLink /></a></span>
            ))}</span>
            <span>Images: {events.map((event, index) => (
              <span key={event.id}>{index > 0 && " · "}<a href={event.imageSourceUrl} target="_blank" rel="noreferrer">{event.imageAttribution} <ExternalLink /></a></span>
            ))}</span>
          </p>
          <button className="primary-button" type="button" onClick={onNext}>
            {isLastRound ? "View final result" : "Next pair"}
            <span className="button-icon"><ArrowRight /></span>
          </button>
        </div>
      )}
    </section>
  );
}
