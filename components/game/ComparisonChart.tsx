import { formatNumber } from "@/lib/format";

type ComparisonChartProps = {
  guess: number;
  actual: number;
};

export function ComparisonChart({ guess, actual }: ComparisonChartProps) {
  const maximum = Math.max(guess, actual, 1);
  const guessWidth = Math.max((guess / maximum) * 100, guess === 0 ? 1 : 4);
  const actualWidth = Math.max((actual / maximum) * 100, 4);

  return (
    <div className="comparison" aria-label={`Your guess was ${formatNumber(guess)} and the sourced count was ${formatNumber(actual)}`}>
      <div className="comparison__row">
        <div className="comparison__label"><span>YOUR GUESS</span><strong>{formatNumber(guess)}</strong></div>
        <div className="comparison__track" aria-hidden="true">
          <span className="comparison__bar comparison__bar--guess" style={{ width: `${guessWidth}%` }} />
        </div>
      </div>
      <div className="comparison__row">
        <div className="comparison__label"><span>SOURCED COUNT</span><strong>{formatNumber(actual)}</strong></div>
        <div className="comparison__track" aria-hidden="true">
          <span className="comparison__bar comparison__bar--actual" style={{ width: `${actualWidth}%` }} />
        </div>
      </div>
    </div>
  );
}
