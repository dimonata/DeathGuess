import { ArrowRight, SkullMark, Spark } from "@/components/ui/Icons";
import type { GameMode } from "@/types/game";

type ModeSelectScreenProps = {
  onSelect: (mode: GameMode) => void;
  onBack: () => void;
};

const modes: Array<{
  id: GameMode;
  number: string;
  title: string;
  eyebrow: string;
  description: string;
}> = [
  {
    id: "exact",
    number: "01",
    title: "Exact Number",
    eyebrow: "THE ORIGINAL",
    description: "Enter your own estimate, reveal the sourced death toll and score points based on how close you were.",
  },
  {
    id: "higher",
    number: "02",
    title: "Higher Toll",
    eyebrow: "TWO-CHOICE MODE",
    description: "Compare two historical events and choose the one that caused more deaths. Ten pairs, one decision each.",
  },
];

export function ModeSelectScreen({ onSelect, onBack }: ModeSelectScreenProps) {
  return (
    <main className="mode-screen page-enter">
      <header className="mode-screen__header">
        <div className="compact-brand" aria-label="DeathGuess">
          <SkullMark className="compact-brand__mark" />
          <span>DEATH</span><span className="accent-text">GUESS</span>
        </div>
        <button className="text-button" type="button" onClick={onBack}>Back to archive</button>
      </header>

      <section className="mode-select">
        <p className="eyebrow"><Spark /> SELECT A GAME MODE</p>
        <h1>How do you want to guess?</h1>
        <p className="mode-select__intro">Both modes use ten randomly selected rounds from the historical archive.</p>

        <div className="mode-grid">
          {modes.map((mode) => (
            <button className="mode-card" type="button" onClick={() => onSelect(mode.id)} key={mode.id}>
              <span className="mode-card__number">{mode.number}</span>
              <span className="mode-card__eyebrow">{mode.eyebrow}</span>
              <strong>{mode.title}</strong>
              <span className="mode-card__description">{mode.description}</span>
              <span className="mode-card__action">Play this mode <ArrowRight /></span>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
