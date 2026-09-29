# Configuration model

## Dimensions

| Dimension | Options | Owns |
|---|---|---|
| Application scale | small-toolbox, medium-product, large-platform | Shell and navigation complexity |
| UI profile | product-custom, data-workbench, admin-ant | Component anatomy and page conventions |
| Theme | violet, blue, graphite, green | Semantic color and selected expressive treatment |
| Density | comfortable, compact, dense | Spacing, control height, row height |
| Motion | calm, expressive | Timing, easing, and expressive allowance |
| Navigation | launcher, sidebar, topbar | Global orientation pattern |
| Demo state | populated, loading, empty, error, partial, disabled, restricted | Golden Example state |

## Defaults

- A new lightweight tool starts with `small-toolbox / product-custom / violet / comfortable / expressive / launcher`.
- A related product starts with `medium-product / product-custom / blue / comfortable / calm / sidebar`.
- Search, enrichment, and reporting products start with `medium-product / data-workbench / graphite / compact / calm / sidebar`.
- Dense internal operations start with `large-platform / admin-ant / blue / dense / calm / topbar`.
- Help and guidance may use the green theme without changing shared structure.

These are registered presets, not universal laws. Change a dimension only because product context requires it.

## Multi-tool consistency

A small toolbox may assign different approved themes to individual tools. It keeps global shell geometry, type roles, spacing scale, focus treatment, control anatomy, navigation behavior, and state semantics. A tool never introduces an unregistered local palette.

## Large-system consistency

A large platform chooses one global product configuration. Modules may use documented density and accent variants but cannot replace foundations. Global navigation and entity identity remain stable across modules.
