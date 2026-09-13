import { useId, useState, type FormEvent } from "react";
import { ArrowRight } from "@/components/ui/Icons";

type GuessFormProps = {
  difficulty: 1 | 2 | 3 | 4 | 5;
  teaser: string;
  onSubmit: (guess: number) => void;
};

export function GuessForm({ difficulty, teaser, onSubmit }: GuessFormProps) {
  const inputId = useId();
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const guess = Number(value);

    if (value === "" || !Number.isSafeInteger(guess) || guess < 0) {
      setError("Enter a valid whole number.");
      return;
    }

    setError("");
    onSubmit(guess);
  }

  return (
    <form className="guess-form" onSubmit={handleSubmit} noValidate>
      <div className="guess-form__heading">
        <span className="step-label">YOUR GUESS</span>
        <span className="difficulty" aria-label={`Difficulty ${difficulty} out of 5`}>
          {[0, 1, 2, 3, 4].map((level) => (
            <i className={level < difficulty ? "is-active" : ""} key={level} />
          ))}
        </span>
      </div>
      <div className="case-brief">
        <span>CASE FILE</span>
        <p>{teaser}</p>
      </div>
      <h2>How many people died?</h2>
      <p>Enter your best estimate. The answer is revealed after you lock it in.</p>

      <label htmlFor={inputId} className="guess-input">
        <span className="sr-only">Estimated number of victims</span>
        <input
          id={inputId}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          placeholder="0"
          value={value}
          onChange={(event) => {
            const digits = event.target.value.replace(/\D/g, "").slice(0, 12);
            setValue(digits);
            if (error) setError("");
          }}
          aria-describedby={error ? `${inputId}-error` : `${inputId}-hint`}
          aria-invalid={Boolean(error)}
          autoFocus
        />
        <span>VICTIMS</span>
      </label>
      <span id={`${inputId}-hint`} className="input-hint">Whole numbers only</span>
      {error && <span id={`${inputId}-error`} className="form-error" role="alert">{error}</span>}

      <button className="primary-button" type="submit">
        Lock in guess
        <span className="button-icon"><ArrowRight /></span>
      </button>
    </form>
  );
}
