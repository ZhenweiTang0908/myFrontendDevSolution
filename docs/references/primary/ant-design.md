# Ant Design reference pack

## Source and licensing

- Official design values: https://ant.design/docs/spec/values/
- Official design-system introduction: https://ant.design/docs/spec/introduce/
- Official React implementation: https://ant.design/components/overview/
- Source repository and package license: https://github.com/ant-design/ant-design

This repository links to official material and records local analysis. It does not mirror Ant documentation or assets. Verify the upstream package license when upgrading.

## Transferable strengths

- Completeness for enterprise forms, tables, filters, overlays, dates, pagination, and feedback.
- A token cascade from global/seed decisions into component-specific values.
- Strong defaults that narrow AI decision space.
- “Natural, Certain, Meaningful, Growing” and restraint as evaluation principles.

## Local adoption

- `admin-ant` is a deliberate profile, not a bag of widgets.
- Business pages consume local profile adapters instead of importing Ant directly.
- Page hierarchy, content restraint, state requirements, and responsive contracts remain local.
- Dense internal operations are the primary use case.

## Rejected defaults

- Ant styling does not define product-custom or data-workbench pages.
- Direct vendor imports across business features are prohibited.
- Default component composition is not automatically a good page.
- Ant and source-owned controls are not mixed within one visual region without an adapter.

## Influenced artifacts

- `src/profiles/admin/AdminExamples.tsx`
- `src/config/designConfig.ts` (`enterprise-operations` preset)
- `docs/design-language/configuration.md`
