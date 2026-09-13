import { GAME_LENGTH } from "@/lib/game";
import { historicalEvents } from "@/data/events";
import { ArrowRight, SkullMark, Spark } from "@/components/ui/Icons";

type LandingScreenProps = {
  onStart: () => void;
};

export function LandingScreen({ onStart }: LandingScreenProps) {
  return (
    <main className="landing page-enter">
      <div className="landing__topbar">
        <div className="compact-brand" aria-label="DeathGuess">
          <SkullMark className="compact-brand__mark" />
          <span>DEATH</span>
          <span className="accent-text">GUESS</span>
        </div>
        <span className="edition-tag">ARCHIVE 01 · MVP</span>
      </div>

      <section className="hero">
        <div className="hero__copy">
          <p className="eyebrow"><Spark /> A GAME OF HISTORICAL ESTIMATES</p>
          <h1>
            DEATH<span>GUESS</span>
          </h1>
          <p className="hero__subtitle">How many died?</p>
          <p className="hero__description">
            Can you estimate the death toll of the events that shaped history?
          </p>

          <button className="primary-button primary-button--hero" type="button" onClick={onStart}>
            Play now
            <span className="button-icon"><ArrowRight /></span>
          </button>

          <div className="hero__meta" aria-label={`${GAME_LENGTH} rounds selected from ${historicalEvents.length} cases`}>
            <span className="pulse-dot" />
            <strong>{historicalEvents.length} cases in the archive</strong>
            <i>•</i>
            <span>{GAME_LENGTH} per game</span>
          </div>
        </div>

        <div className="hero-art" aria-hidden="true">
          <div className="hero-art__orbit hero-art__orbit--one" />
          <div className="hero-art__orbit hero-art__orbit--two" />
          <div className="hero-art__number">?</div>
          <SkullMark className="hero-art__skull" />
          <span className="hero-art__label hero-art__label--top">VICTIMS</span>
          <span className="hero-art__label hero-art__label--bottom">ESTIMATE</span>
          <span className="hero-art__coordinate hero-art__coordinate--one">41°43′N</span>
          <span className="hero-art__coordinate hero-art__coordinate--two">12:00:00</span>
        </div>
      </section>

      <div className="landing__footer">
        <span>Observe.</span><span>Estimate.</span><span>Discover.</span>
        <p>History presented with context, respect and verifiable sources.</p>
      </div>
    </main>
  );
}
