# Design-system reference research

## Purpose

This document records the external design systems selected as primary references for the Personal Frontend Design Solution. They are inputs, not templates to copy wholesale. Local tokens, Page Patterns, Golden Examples, and verification remain authoritative.

## Primary references

### 1. Ant Design

Official sources:

- [Design values](https://ant.design/docs/spec/values/)
- [Design-system introduction](https://ant.design/docs/spec/introduce/)
- [React implementation](https://ant.design/components/overview/)

Use it for:

- mature enterprise forms, tables, filters, overlays, pagination, and feedback;
- seed/global/component token architecture;
- predictable high-density administration;
- reducing AI freedom when reliability is more important than visual distinctiveness.

Adopt:

- token layering concepts;
- complete interaction-state coverage;
- the `admin-ant` profile and wrappers around common page structures;
- certainty, restraint, and modularity as evaluation criteria.

Do not adopt:

- indiscriminate default-Ant page composition;
- direct vendor imports throughout business pages;
- mixing Ant and open-code primitives inside one visual region without an adapter.

### 2. Material Design 3 Expressive

Official source:

- [Material Design 3](https://m3.material.io/)

Use it for:

- richer but systematic color roles;
- tonal palettes and adaptive color;
- meaningful shape contrast;
- expressive transitions and responsive feedback;
- preventing a restrained interface from becoming visually inert.

Adopt:

- semantic color roles rather than a single accent hex value;
- limited expressive moments for onboarding, completion, progress, and major transitions;
- stronger visual response for important actions while preserving ordinary productive controls.

Do not adopt:

- Android-specific behavior as a web requirement;
- excessive floating actions, oversized rounded surfaces, or decorative shape changes in dense work areas;
- motion whose main purpose is spectacle.

### 3. IBM Carbon Design System

Official sources:

- [Color and themes](https://carbondesignsystem.com/elements/color/overview/)
- [Typography strategies](https://carbondesignsystem.com/elements/typography/style-strategies/)
- [Motion](https://carbondesignsystem.com/elements/motion/overview/)

Use it for:

- data-heavy professional interfaces;
- neutral layered surfaces with purposeful accent color;
- the distinction between productive and expressive typography/motion;
- precise data-table and visualization treatment;
- coherent light and dark surface layering.

Adopt:

- productive motion for frequent actions and expressive motion for occasional important moments;
- role-based layered surfaces;
- explicit type sets for dense work versus editorial/help content;
- strong data visualization guidance.

Do not adopt:

- IBM brand identity or IBM Plex as mandatory branding;
- large enterprise complexity when a small tool only needs a focused flow;
- grid rigidity that harms narrow or embedded tool layouts.

### 4. Atlassian Design System

Official sources:

- [Foundations](https://atlassian.design/foundations)
- [Design tokens](https://atlassian.design/foundations/design-tokens)
- [Motion](https://atlassian.design/foundations/motion)

Use it for:

- semantic token naming by intent;
- productivity workflows, navigation, and progressive disclosure;
- concise content and controlled status communication;
- motion that clarifies where UI came from and what changed;
- separating a core language from a more expressive product dialect.

Adopt:

- choose tokens by meaning rather than matching color values;
- maintain spatial origin and continuity in overlays and panels;
- use richer expression as a controlled dialect layered on stable foundations;
- treat content rules as part of the design system.

Do not adopt:

- Atlassian brand styling;
- an uncontrolled number of product dialects;
- duplicated labels and badges merely because individual components support them.

### 5. Microsoft Fluent 2

Official sources:

- [Fluent 2 home and resources](https://fluent2.microsoft.design/)
- [Web components](https://react.fluentui.dev/)

Use it for:

- modern productivity application surfaces;
- depth, soft color, iconography, and subtle responsive feedback;
- coherent experiences that scale from focused tools to large application shells;
- accessibility and cross-platform interaction discipline.

Adopt:

- depth and surface hierarchy without card overload;
- restrained animation and hover feedback that makes static screens feel alive;
- application-shell thinking for medium and large systems.

Do not adopt:

- Windows-specific visual identity;
- acrylic or translucency where it reduces contrast or performance;
- platform conventions that conflict with normal web expectations.

## Secondary references

These systems are narrower references used for specific decisions rather than primary visual directions:

- [GitHub Primer](https://primer.style/product/): cohesive, compact product UI; responsive and accessibility discipline; pattern promotion governance.
- [Elastic UI](https://eui.elastic.co/): strong data-table layout guidance, data visualization, and concise content rules.
- [Shopify Polaris](https://polaris.shopify.com/): business workflows, merchant-facing content, settings, and administrative patterns.
- [PatternFly](https://www.patternfly.org/): enterprise consoles, topology, monitoring, and operational workflows.
- [shadcn/ui Registry](https://ui.shadcn.com/docs/registry): source-owned distribution of components, hooks, pages, configuration, and rules.

## Product-level references

- **AI Find:** search/filter/result architecture, data workbench, reporting, and dense operational context.
- **Fonio:** calm B2B SaaS surfaces, restrained hierarchy, focused object workflows.
- **Codex:** strong neutral foundation, controlled multicolor accents, responsive hover/focus treatment, and visual richness without information overload.
- **TollMarketingContentCreator:** real multi-tool constraints and the source of promotion candidates after patterns prove useful.

Product references must be described from authorized local observations. Private captured data must never be committed.

## Combined direction

The resulting system should not look like a collage of the references. It combines:

- Ant Design’s completeness and certainty;
- Material 3 Expressive’s controlled color and emotional feedback;
- Carbon’s productive/expressive distinction and data rigor;
- Atlassian’s semantic tokens, content restraint, and spatially meaningful motion;
- Fluent 2’s modern productivity surfaces and depth;
- Primer and Elastic’s compact, resilient data patterns;
- shadcn’s source-owned distribution model.

The local design signature is: **concise information, rich feedback, controlled visual energy, and dependable task completion**.

