# Local design language

## Signature

**Concise information, rich feedback, controlled visual energy, dependable task completion.**

The interface should feel calm at rest and responsive in use. Information restraint does not require visual flatness. Color, depth, typography, icon treatment, data visualization, and motion may be expressive when they improve orientation or feedback.

## Information appears once—usually

Give each fact one primary presentation within a page region. Repeat it only when the second instance has an independent job:

- maintaining orientation after the original scrolls away;
- confirming scope before a consequential action;
- preserving context across panes;
- making an error recoverable near the affected control;
- providing an accessible equivalent.

Do not repeat a completed status in the page header, section header, row, and toast merely because each component supports status UI.

## Visual energy

Visual interest comes from several restrained channels, not from one saturated brand color:

- tonal surfaces and controlled contrast;
- one dominant theme accent plus supporting data/status colors;
- interactive color, depth, and slight movement on hover/press/focus;
- occasional expressive transitions for entry, completion, progress, and onboarding;
- varied typography scale for hierarchy;
- data graphics where shape communicates real information.

Avoid full-page gradients, card-everything layouts, permanent decorative animation, and different accent colors for equivalent actions.

## Token architecture

1. Primitive tokens define raw palette, spacing, typography, radii, elevation, and timing values.
2. Semantic tokens describe roles such as canvas, surface, text, border, action, focus, selection, and status.
3. Component/pattern tokens exist only when a reusable component needs a stable role that semantic tokens cannot express clearly.

Pages consume semantic or component tokens. Primitive values remain inside token definitions.

## Themes and profiles

Theme and profile are separate:

- Theme changes semantic color and a limited set of expressive treatments.
- Profile changes component anatomy, density defaults, and page conventions.

The four initial themes are violet, blue, graphite, and green. They are tonal systems, not monochrome filters. Status colors preserve their meaning in every theme.

The three profiles are product custom, data workbench, and admin Ant. Do not mix admin Ant and source-owned controls inside one product region unless a documented adapter makes them visually and behaviorally coherent.
