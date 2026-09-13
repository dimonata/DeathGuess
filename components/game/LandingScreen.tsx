import { GAME_LENGTH } from "@/lib/game";
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
        <span className="edition-tag">ARQUIVO 01 · MVP</span>
      </div>

      <section className="hero">
        <div className="hero__copy">
          <p className="eyebrow"><Spark /> JOGO DE ESTIMATIVAS HISTÓRICAS</p>
          <h1>
            DEATH<span>GUESS</span>
          </h1>
          <p className="hero__subtitle">How many died?</p>
          <p className="hero__description">
            Você consegue estimar o número de vítimas dos acontecimentos que marcaram a história?
          </p>

          <button className="primary-button primary-button--hero" type="button" onClick={onStart}>
            Jogar agora
            <span className="button-icon"><ArrowRight /></span>
          </button>

          <div className="hero__meta" aria-label={`${GAME_LENGTH} acontecimentos, tente chegar o mais próximo possível`}>
            <span className="pulse-dot" />
            <strong>{GAME_LENGTH} acontecimentos</strong>
            <i>•</i>
            <span>chegue o mais perto possível</span>
          </div>
        </div>

        <div className="hero-art" aria-hidden="true">
          <div className="hero-art__orbit hero-art__orbit--one" />
          <div className="hero-art__orbit hero-art__orbit--two" />
          <div className="hero-art__number">?</div>
          <SkullMark className="hero-art__skull" />
          <span className="hero-art__label hero-art__label--top">VÍTIMAS</span>
          <span className="hero-art__label hero-art__label--bottom">ESTIMATIVA</span>
          <span className="hero-art__coordinate hero-art__coordinate--one">41°43′N</span>
          <span className="hero-art__coordinate hero-art__coordinate--two">12:00:00</span>
        </div>
      </section>

      <div className="landing__footer">
        <span>Observe.</span><span>Estime.</span><span>Descubra.</span>
        <p>História tratada com contexto, respeito e fontes verificáveis.</p>
      </div>
    </main>
  );
}
