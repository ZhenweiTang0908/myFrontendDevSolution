# Repository guidance

This repository is the source of truth for the personal frontend design solution.

- Read `docs/specs/frontend-design-solution.md` before changing foundations, profiles, Page Patterns, or Skills.
- Reuse semantic tokens, components, and registered Page Patterns before adding local styling.
- Do not add raw colors, shadows, radii, control heights, or spacing values outside token files.
- Every Page Pattern keeps a visible accessible `h1` and declares its supported states.
- Do not import Ant Design directly from Page Pattern code; use the local `admin-ant` adapter.
- Use `$promote-ui-pattern` explicitly when generalizing an external project improvement into this repository.
- Run `npm run verify` before claiming a repository change is complete.
