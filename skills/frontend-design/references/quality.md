# Frontend quality contract

## Information

- One primary presentation per fact in a page region.
- Repetition needs a separate orientation, confirmation, accessibility, or recovery purpose.
- One primary action per region.
- Helper text explains format, consequence, or a non-obvious constraint.
- Progressive disclosure beats permanently visible instruction text.

## Feedback

Check relevant default, hover, pressed, focus-visible, loading, disabled, success, error, empty, partial, and restricted states. Keep feedback beside the affected object. Toast is supplementary.

Prevent duplicate async submissions. Explain non-obvious disabled actions. Preserve layout during loading. Prefer undo for safe reversible actions.

## Visual energy

Use tonal surfaces, typography contrast, data graphics, icon containers, focus/hover color, depth, and purposeful transitions. Avoid card-everything layouts, full-page gradients, decorative status badges, permanent floating, and unrelated colors.

## Slider

Use only for continuous or perceptual values. Pair precise values with numeric input. Define min, max, step, keyboard controls, touch target, track contrast, disabled/error state, range-thumb behavior, and async persistence without rollback.

## Verification

- visible accessible `h1`;
- keyboard path and focus visibility;
- reduced motion;
- desktop and 320 px behavior;
- loading, empty, error, populated, partial, disabled, and restricted where relevant;
- target typecheck, tests, lint, production build, and visual inspection;
- no direct Ant import outside the local admin adapter;
- no raw design values when semantic tokens exist.
