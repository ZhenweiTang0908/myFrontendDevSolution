import * as Slider from "@radix-ui/react-slider";
import { useEffect, useId, useState } from "react";

interface SliderFieldProps {
  label: string;
  description?: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  disabled?: boolean;
  error?: string;
  precise?: boolean;
  onCommit: (value: number) => void;
}

export function SliderField({
  label,
  description,
  value,
  min,
  max,
  step = 1,
  unit = "",
  disabled = false,
  error,
  precise = false,
  onCommit,
}: SliderFieldProps) {
  const id = useId();
  const [draft, setDraft] = useState(value);
  const [draftInput, setDraftInput] = useState(String(value));

  useEffect(() => {
    setDraft(value);
    setDraftInput(String(value));
  }, [value]);

  const commit = (next: number) => {
    const bounded = Math.min(max, Math.max(min, next));
    setDraft(bounded);
    setDraftInput(String(bounded));
    onCommit(bounded);
  };

  return (
    <div className={`slider-field${error ? " slider-field--error" : ""}`}>
      <div className="slider-field__heading">
        <div>
          <label id={`${id}-label`} htmlFor={precise ? `${id}-input` : undefined}>{label}</label>
          {description && <span id={`${id}-description`}>{description}</span>}
        </div>
        {!precise && <output aria-live="polite">{draft}{unit}</output>}
      </div>
      <div className="slider-field__control">
        <span className="slider-field__limit" aria-hidden="true">{min}</span>
        <Slider.Root
          className="slider"
          value={[draft]}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-labelledby={`${id}-label`}
          aria-describedby={`${id}-description${error ? ` ${id}-error` : ""}`}
          onValueChange={([next]) => {
            setDraft(next);
            setDraftInput(String(next));
          }}
          onValueCommit={([next]) => commit(next)}
        >
          <Slider.Track className="slider__track"><Slider.Range className="slider__range" /></Slider.Track>
          <Slider.Thumb
            className="slider__thumb"
            aria-label={label}
            aria-valuetext={`${draft}${unit}`}
            aria-disabled={disabled}
            aria-invalid={Boolean(error)}
            aria-describedby={`${id}-description${error ? ` ${id}-error` : ""}`}
          />
        </Slider.Root>
        <span className="slider-field__limit" aria-hidden="true">{max}</span>
        {precise && (
          <div className="slider-field__input-wrap">
            <input
              id={`${id}-input`}
              type="number"
              value={draftInput}
              min={min}
              max={max}
              step={step}
              disabled={disabled}
              aria-invalid={Boolean(error)}
              aria-describedby={`${id}-description${error ? ` ${id}-error` : ""}`}
              onChange={(event) => setDraftInput(event.target.value)}
              onBlur={() => commit(Number.isFinite(Number(draftInput)) ? Number(draftInput) : value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") commit(Number.isFinite(Number(draftInput)) ? Number(draftInput) : value);
              }}
            />
            {unit && <span>{unit}</span>}
          </div>
        )}
      </div>
      {error && <p className="field-error" id={`${id}-error`}>{error}</p>}
    </div>
  );
}

interface RangeSliderFieldProps {
  label: string;
  value: [number, number];
  min: number;
  max: number;
  step?: number;
  disabled?: boolean;
  onCommit: (value: [number, number]) => void;
}

export function RangeSliderField({ label, value, min, max, step = 1, disabled = false, onCommit }: RangeSliderFieldProps) {
  const id = useId();
  const [draft, setDraft] = useState<[number, number]>(value);
  useEffect(() => setDraft(value), [value]);

  return (
    <div className="slider-field">
      <div className="slider-field__heading">
        <label id={`${id}-label`}>{label}</label>
        <output>{draft[0]}–{draft[1]}</output>
      </div>
      <div className="slider-field__control">
        <span className="slider-field__limit" aria-hidden="true">{min}</span>
        <Slider.Root
          className="slider"
          value={draft}
          min={min}
          max={max}
          minStepsBetweenThumbs={step}
          step={step}
          disabled={disabled}
          aria-labelledby={`${id}-label`}
          onValueChange={(next) => setDraft(next as [number, number])}
          onValueCommit={(next) => onCommit(next as [number, number])}
        >
          <Slider.Track className="slider__track"><Slider.Range className="slider__range" /></Slider.Track>
          <Slider.Thumb className="slider__thumb" aria-label={`${label} minimum`} aria-disabled={disabled} />
          <Slider.Thumb className="slider__thumb slider__thumb--end" aria-label={`${label} maximum`} aria-disabled={disabled} />
        </Slider.Root>
        <span className="slider-field__limit" aria-hidden="true">{max}</span>
      </div>
    </div>
  );
}
