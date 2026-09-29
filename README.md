# Frontend Design

A personal frontend production system for building coherent web products with AI.

It combines semantic design tokens, validated configuration presets, source-owned components, broad Page Patterns, runnable Golden Examples, an Ant-based administration profile, and Skills that apply and evolve the system.

## Run the showcase

```bash
npm install
npm run dev
```

The home-page Control changes these dimensions independently:

- application scale: small toolbox, medium product, or large platform;
- UI profile: product custom, data workbench, or admin Ant;
- theme: violet, blue, graphite, or green;
- density, motion, navigation, demonstration state, and Page Pattern.

All examples use frontend mock data. Configuration is preserved in the URL.

The semantic icon catalog is available at `/resources/icons`. It maps common product meanings to a constrained Lucide vocabulary and documents both correct and misleading uses.

## Verify

```bash
npm run verify
```

This runs lint, TypeScript, behavior tests, structural design-system checks, a production build, and all desktop/narrow visual baselines.

## Use from another project

The reusable Skill source is in `skills/frontend-design/`. Install a safe link into the Codex Skills directory once:

```bash
npm run skill:install
```

Then invoke it from any project:

```text
Use $frontend-design to implement a customer search page for a medium-sized data product.
```

The Skill selects a registered configuration and Golden Example, implements the page in the target repository, and runs the target repository's real verification command.

Use the repository-only `$promote-ui-pattern` Skill when a proven project change should be evaluated for inclusion in this library.

## Source of truth

- Approved behavior: `docs/specs/frontend-design-solution.md`
- Local design language: `docs/design-language/`
- Icon and imagery language: `docs/design-language/icons-and-imagery.md`
- Semantic icon registry: `src/icons/iconRegistry.ts`
- Page Pattern registry: `src/patterns/patternRegistry.ts`
- Golden Examples: `src/patterns/examples/`
- External research: `docs/references/`
