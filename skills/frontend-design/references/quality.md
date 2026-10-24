# Frontend quality contract

Bundled summary of the source repository's `foundations.md`, `content-and-feedback.md`, and `motion.md`.

## Information

- Give each fact one primary presentation per page region. A repeat needs its own job: orientation after the original scrolls away, scope confirmation before a consequential action, context across panes, recovery beside the affected control, or an accessible equivalent.
- One primary action per region. Action labels are verbs that name the outcome.
- Page descriptions explain purpose or consequence, not the title in longer words.
- Helper text covers format, consequence, or a non-obvious constraint only. Prefer progressive disclosure to permanent instructions.
- Empty states explain the cause only when it changes the recovery action.

## Tokens

- Primitive tokens hold raw values and stay inside token files.
- Feature code uses semantic roles (canvas, surface, text, border, action, focus, selection, status) or component tokens that a reusable component needs.
- Status colors keep their meaning in every theme.

## Feedback

- Consider default, hover, pressed, focus-visible, loading, disabled, success, and error for every control; empty, partial, and restricted for every data region. Never rely on cursor change alone.
- Keep feedback local: update the changed row, keep progress beside the task, validate beside the field, show bulk actions beside the selection count.
- Preserve layout while loading. Explain disabled actions whose reason is not evident.
- Toast is supplementary and never the only evidence of a durable change.

## Destructive and asynchronous work

- Block duplicate submission while a request is unresolved.
- Name the affected object and scope before destructive work; prefer undo for reversible, low-risk changes.
- Keep honest uncertainty for long-running or externally controlled work. Do not present an unknown outcome as a simple failure.
- Do not silently retry an operation that may already have succeeded.

## Motion

- Productive motion (hover, press, selection, expansion, popovers, drawers) is short and subtle. Expressive motion is reserved for onboarding, completion, major progress, first entry, and significant context changes.
- Overlays appear from their trigger or spatial owner; exits are shorter than entrances; equivalent interactions move the same way.
- No bounce, perpetual floating, or large parallax in task-heavy areas.
- Reduced motion removes distance and duration but keeps state feedback.

## Visual energy

Energy comes from tonal surfaces, typography contrast, one dominant theme accent with supporting data/status colors, interactive color and depth, purposeful transitions, and data graphics whose shape carries information. Avoid card-everything layouts, full-page gradients, decorative status badges, permanent animation, and different accents for equivalent actions.

## Slider

Use only for continuous or perceptual values; use radio, segmented control, or select for a small discrete set and a number input for precise values. A precise Slider pairs with a visible number input. Define min, max, step, keyboard behavior, touch target, active/inactive contrast, disabled and error states, range-thumb behavior, and persistence. Async persistence must not snap the local value back to stale server state.

## Self-review checklist

- [ ] Exactly one visible, accessible `h1`.
- [ ] Logical keyboard path with visible focus on every interactive element.
- [ ] Icon-only actions have a specific accessible name and tooltip.
- [ ] Reduced-motion preference respected.
- [ ] Usable at desktop width and at 320 px; tables scroll rather than drop essential columns; essential actions stay reachable.
- [ ] Relevant states shown: populated, loading, empty, error, partial, disabled, restricted.
- [ ] No fact repeated without its own job; one primary action per region.
- [ ] No raw design values or `--primitive-*` tokens in feature code; no direct `antd` import outside the admin adapter.
- [ ] Target lint, typecheck, tests, and build pass with fresh output.
