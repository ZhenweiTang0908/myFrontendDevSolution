---
name: frontend-design
description: Design and implement frontend web pages using the owner's validated profiles, semantic themes, Page Patterns, Golden Examples, and quality rules. Use for new web tools, product pages, data workbenches, administration pages, or frontend redesigns; do not use for backend-only work or one-off visual art.
---

# Frontend Design

Build frontend work from the personal design solution instead of inventing a page from the prompt.

## Locate the source system

Prefer the first available source:

1. `FRONTEND_DESIGN_ROOT` when set;
2. `/Users/niuniutang/Code/myFrontendDevSolution` on the owner's machine;
3. if not it exists in the fixed path, refer to github repo `https://github.com/ZhenweiTang0908/myFrontendDevSolution.git`
4. this Skill's bundled references when the source repository is unavailable.

Treat the source repository's configuration, tokens, Page Pattern registry, Golden Examples, and verification rules as authoritative. Do not copy private product data or ignored captures.

## Route the request

Read [references/selection.md](references/selection.md), then classify:

- application scale;
- Page Pattern;
- UI profile;
- theme, density, motion, and navigation.

When the user does not choose a configuration, run `node scripts/recommend-config.mjs "<business brief>"` from this Skill directory as a deterministic first recommendation. Confirm it against the full selection rules and state the resulting named preset and Page Pattern.

Honor a user-specified registered choice. Otherwise state the selected named preset and short reason before implementation. Never invent a profile or silently combine `admin-ant` and source-owned controls in one product region.

For the selected pattern, inspect its registry entry and canonical example in the source repository. Read only the relevant example family and design guidance.

## Implement

1. Read the target repository instructions, framework, shared UI, styles, tests, and verification commands.
2. Reuse target components that already satisfy the local contract. Add source-owned components or profile adapters only where needed.
3. Preserve the selected pattern's information hierarchy, actions, responsive behavior, and state model; adapt names and data to the business.
4. Use semantic tokens. Do not scatter raw colors, spacing, radii, control heights, or shadows through feature code.
5. Give each fact one primary presentation. Repeat only for a distinct orientation, confirmation, accessibility, or recovery purpose.
6. When selecting icons or imagery, read [references/icons-and-imagery.md](references/icons-and-imagery.md). Use the semantic icon registry instead of guessing by shape or mixing icon families.
7. Implement relevant default, hover, pressed, focus-visible, loading, disabled, success, error, empty, partial, and restricted behavior.
8. Keep one visible accessible `h1`; support keyboard use, reduced motion, and 320 px layouts.
9. For Slider or other high-risk controls, read [references/quality.md](references/quality.md) before implementation.

## Verify

Read [references/quality.md](references/quality.md). Run the target repository's real quality gate. Use `scripts/audit-target.mjs <target-src>` as an additional warning scan, not as a substitute for tests, build, accessibility checks, or visual inspection.

Inspect the implemented page at desktop and narrow widths. Confirm that visual energy comes from meaningful color, depth, type, data, and interaction feedback—not repeated labels, decorative badges, or permanent animation.

Report the chosen configuration, Page Pattern, files changed, fresh verification evidence, and remaining risks.
