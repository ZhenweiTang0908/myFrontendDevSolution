# Icon and imagery routing

When the source repository is available, read `docs/design-language/icons-and-imagery.md` and use `src/icons/iconRegistry.ts` as the canonical icon vocabulary.

## Icon workflow

1. Name the user intent: navigation, action, discovery, status, object, data/workflow, or AI.
2. Search the semantic registry by key, label, use text, or aliases.
3. Reuse the registered Lucide icon. Do not choose a new shape merely because it looks appealing.
4. Keep a visible text label for primary actions. Icon-only actions need a specific accessible name and tooltip.
5. Use `currentColor` and semantic status tokens. Do not mix icon families or introduce per-feature raw colors.

Important distinctions:

- `delete` is permanent; `close` dismisses or removes transient UI.
- `save` is an action; `success` is an outcome.
- `search` is a text query; `filter` narrows structured criteria.
- `refresh` fetches current state; `retry` repeats a confirmed failed idempotent operation.
- `upload` attaches files; `import` ingests structured data.
- `loading` is active indeterminate work; `pending` is queued or time-dependent.
- `info` explains neutral context; `help` opens user guidance.

## Imagery workflow

Use images only to show the real product, explain structure, identify an object, or establish deliberate marketing mood. Prefer first-party screenshots, diagrams, charts, and user content. Avoid decorative stock imagery in operational UI and repetitive empty-state illustrations.

For every third-party asset, record source URL, creator, license, download date, intended use, and attribution requirements. Verify the exact asset license; a library name alone is not evidence.
