import { useId, useState, type FormEvent } from "react";
import { ArrowRight } from "@/components/ui/Icons";

type GuessFormProps = {
  difficulty: 1 | 2 | 3 | 4 | 5;
  onSubmit: (guess: number) => void;
};

export function GuessForm({ difficulty, onSubmit }: GuessFormProps) {
  const inputId = useId();
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const guess = Number(value);

    if (value === "" || !Number.isSafeInteger(guess) || guess < 0) {
      setError("Digite um número inteiro válido.");
      return;
    }

    setError("");
    onSubmit(guess);
  }

  return (
    <form className="guess-form" onSubmit={handleSubmit} noValidate>
      <div className="guess-form__heading">
        <span className="step-label">SEU PALPITE</span>
        <span className="difficulty" aria-label={`Dificuldade ${difficulty} de 5`}>
          {[0, 1, 2, 3, 4].map((level) => (
            <i className={level < difficulty ? "is-active" : ""} key={level} />
          ))}
        </span>
      </div>
      <h2>Quantas pessoas morreram?</h2>
      <p>Digite sua melhor estimativa. A resposta será revelada depois da confirmação.</p>

      <label htmlFor={inputId} className="guess-input">
        <span className="sr-only">Número estimado de vítimas</span>
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
        <span>VÍTIMAS</span>
      </label>
      <span id={`${inputId}-hint`} className="input-hint">Use apenas números inteiros</span>
      {error && <span id={`${inputId}-error`} className="form-error" role="alert">{error}</span>}

      <button className="primary-button" type="submit">
        Confirmar palpite
        <span className="button-icon"><ArrowRight /></span>
      </button>
    </form>
  );
}
