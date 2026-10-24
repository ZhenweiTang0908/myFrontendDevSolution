---
name: frontend-design
description: Design and implement frontend pages, screens, and UI redesigns from the owner's registered design configuration, semantic tokens, Page Patterns, Golden Examples, and quality rules. Use for new web tools, product pages, data workbenches, administration pages, or redesigns of existing frontend pages; do not use for backend-only work, one-off visual art, or evolving the design library itself (use $promote-ui-pattern inside the source repository).
---

# Frontend Design

Build pages by selecting a registered configuration and Page Pattern, adapting the canonical Golden Example to the business, and proving the result in the target repository. Do not invent a layout, palette, or component vocabulary from the prompt.

## 1. Load the design source

Use the first available source and say which one you used:

1. `$FRONTEND_DESIGN_ROOT`;
2. `/Users/niuniutang/Code/myFrontendDevSolution`;
3. a shallow, read-only clone of `https://github.com/ZhenweiTang0908/myFrontendDevSolution.git` in a temporary directory;
4. this Skill's `references/` only (**fallback mode**).

In fallback mode the rules are available but tokens, components, and Golden Examples are not. Implement with the target repository's own primitives, follow the bundled rules, and list "no source repository" as a risk in the report.

The source repository is authoritative and read-only from this Skill. Read only what the request needs:

| Need | Source path |
|---|---|
| Dimensions, presets, multi-tool and large-platform rules | `docs/design-language/configuration.md`, `src/config/designConfig.ts` |
| Task → Page Pattern, family behavioral contracts | `docs/design-language/page-pattern-selection.md` |
| Use/avoid, narrow-screen behavior, canonical file per family | `docs/design-language/pattern-catalog.md` |
| Pattern profiles and states | `src/patterns/patternRegistry.ts` |
| Canonical behavior to adapt | `src/patterns/examples/<Family>Examples.tsx`, `src/profiles/admin/AdminExamples.tsx` |
| Tokens and shared interaction styles | `src/styles/tokens.css`, `src/styles/index.css` |
| Reusable components | `src/components/` (for example `AsyncActionButton`, `SliderField`) |
| Content, feedback, motion, icons | `docs/design-language/{foundations,content-and-feedback,motion,icons-and-imagery}.md`, `src/icons/iconRegistry.ts` |

Never copy mock data, the showcase Control, private product data, or ignored captures into the target.

## 2. Decide the configuration and Page Pattern

Read [references/selection.md](references/selection.md). Decide in this order:

1. **Configuration** (scale, profile, theme, density, motion, navigation). Precedence: a registered value the user named → the target repository's established configuration → a named preset. Override a preset dimension only for a stated product reason.
2. **Page Pattern per page**, chosen by the user's task and state transitions, not by visual resemblance. A multi-page request uses one global configuration and one pattern per page.
3. **Compatibility**: the pattern's registered profiles must include the chosen profile. If not, change the pattern or the profile; do not force the combination.

When the user did not choose, run from this Skill directory:

```bash
node scripts/recommend-config.mjs "<business brief>"
```

It infers the preset from product context and the pattern from task words independently, reports the matched evidence, alternatives, and compatibility, and returns `pagePattern: null` when the brief names no task. Treat it as a first draft and confirm it against the selection rules.

Before implementing, state the preset, any overridden dimensions, and the pattern for each page with one short reason. Ask the user only when two registered choices would produce materially different products and neither the brief nor the target settles it.

Hard rules: no unregistered profile, theme, or palette; no `admin-ant` and source-owned controls in one product region; theme and profile never reorder a pattern's workflow.

## 3. Fit the target repository

Read the target's instructions, framework, routing, shared UI, styles, tests, and verification commands first, then pick one case:

- **No design system**: bring in the semantic layer of `tokens.css`, the `.design-root` data attributes the configuration needs (`data-theme`, `data-density`, `data-motion`, and so on), the shared interaction states in `index.css`, and only the components the page uses. Keep source names so later sync stays possible.
- **Own design system or component library**: keep it. Map this system's semantic roles to the target's existing tokens and apply the pattern's behavior and quality rules. Do not add a second token system; report roles the target cannot express.
- **Ant Design**: use the `admin-ant` profile through one local adapter module. Feature code never imports `antd` directly.

## 4. Implement the pattern

Read the pattern's catalog row (use, avoid, narrow-screen behavior), its family's behavioral contract, and its canonical example. Then:

- Preserve the pattern's information hierarchy, action placement, state/data boundary, and failure behavior; rename and reshape data for the business.
- Use semantic tokens only. No raw colors, spacing, radii, control heights, shadows, or `--primitive-*` tokens in feature code.
- Give each fact one primary presentation and each region one primary action. See [references/quality.md](references/quality.md) for the allowed exceptions.
- Implement the relevant states: default, hover, pressed, focus-visible, loading, disabled, success, error, empty, partial, restricted.
- Keep exactly one visible accessible `h1`, a logical keyboard path, reduced-motion support, and usable layout from 320 px.
- For icons or images, read [references/icons-and-imagery.md](references/icons-and-imagery.md) and use the semantic icon registry.
- For Slider, destructive actions, or asynchronous commits, read the matching section of [references/quality.md](references/quality.md) before writing them.

## 5. Verify

1. Run the target repository's real quality gate (lint, typecheck, tests, build, or its documented equivalent). Fix failures or report them verbatim.
2. Run `node scripts/audit-target.mjs <target-src>` from this Skill directory. It reports warnings with file and line; review each one. It does not replace step 1.
3. Open the page in a browser at desktop width (about 1280 px) and at 320 px. Check the populated state and each relevant non-default state.
4. Walk the self-review checklist in [references/quality.md](references/quality.md).

Never claim completion without fresh results from this run.

## 6. Report

- Design source used (path, clone, or fallback mode).
- Configuration in the shape of [assets/design-config.example.json](assets/design-config.example.json), with the preset ID and any overrides.
- Page Pattern per page and the canonical example it adapts.
- Files changed, grouped as tokens/adapters, components, and pages.
- Verification commands with results, audit findings and their disposition, and the widths and states inspected.
- Remaining risks, deviations from the pattern, and anything worth evaluating with `$promote-ui-pattern`.
