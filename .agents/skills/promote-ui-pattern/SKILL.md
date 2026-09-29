---
name: promote-ui-pattern
description: Evaluate a proven frontend change and deliberately generalize it into this repository's tokens, components, Page Patterns, Golden Examples, or rules. Use only when explicitly invoked inside myFrontendDevSolution; do not use for ordinary feature implementation or automatic syncing.
---

# Promote UI Pattern

Promote evidence, not project-specific code.

## Preconditions

- The user explicitly invoked `$promote-ui-pattern`.
- Work is running in `myFrontendDevSolution`.
- A concrete external project change or behavior can be inspected.

If any precondition is missing, explain the boundary and stop promotion. A useful local improvement does not automatically belong in the system.

## Evaluate

Read the approved specification, local design language, pattern registry, relevant Golden Example, and [references/promotion-criteria.md](references/promotion-criteria.md).

Identify:

- the recurring user problem solved;
- evidence that it is useful beyond one business;
- the correct layer: foundation, component, Page Pattern, Golden Example, content rule, or verification;
- existing artifacts that already solve the same problem;
- profile/theme/state boundaries;
- accessibility and responsive consequences.

Conclude one of:

- promote now;
- keep local;
- gather more evidence.

Record the reason. Do not force every good-looking change into the library.

## Promote

Remove business names, private data, routes, API assumptions, and domain-only states. Preserve the behavior that made the change useful. Update the smallest authoritative layer, then update the relevant canonical Golden Example, tests, documentation, and structural checks.

Run `npm run verify` and visually inspect the affected example in at least its default theme, one alternate theme, desktop, and narrow width. Report the generalized rule, source evidence, affected profiles/patterns, verification, and any consumers that still need migration.
