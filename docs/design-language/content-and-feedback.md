# Content and feedback

## Content hierarchy

- One visible `h1` identifies every standalone page.
- Page descriptions explain purpose or consequence, not the title in longer words.
- Labels name the value expected; helper text is reserved for format, consequence, or non-obvious constraints.
- Status words describe the current reality. Actions use verbs that describe the outcome.
- Empty states explain why the region is empty only when that changes the recovery action.

## Interaction feedback

Consider default, hover, pressed, focus-visible, loading, disabled, success, and error for every control. Implement only the states relevant to the control, but never rely on cursor changes alone.

Prefer local feedback:

- update the row that changed;
- keep progress beside the task;
- show validation beside the field;
- reveal bulk actions beside selection count;
- preserve layout while content loads;
- explain disabled actions when the reason is not evident.

Toast is supplementary. It must not be the only evidence that a durable state changed.

## Destructive and asynchronous work

- Prevent duplicate submission while a request is unresolved.
- Communicate the affected object and scope before destructive work.
- Prefer undo for reversible, low-risk changes.
- Preserve honest uncertainty for long-running or externally controlled work.
- Do not silently retry operations whose previous outcome may already have succeeded.

## Slider

Use Slider only for continuous or perceptual choices. Use radio, segmented control, or select for a small discrete set. Use number input for precise values.

A precise Slider pairs with a visible number input. Every Slider defines min, max, step, keyboard behavior, touch target, active/inactive contrast, disabled/error behavior, and persistence strategy. Async persistence must not snap a user's local value back to stale server state.
