# Icons and imagery

Icons and images are functional interface language. They should improve recognition, orientation, feedback, or understanding; they are not filler for an otherwise empty layout.

## Canonical icon system

Use [Lucide](https://lucide.dev/) as the default icon family. It is a consistent, customizable SVG system released under the ISC license. The runnable semantic catalog lives at `/resources/icons`, and the code source of truth is `src/icons/iconRegistry.ts`.

Do not browse the complete Lucide catalog every time a feature needs an icon. Start with the user's meaning and select a key from the semantic registry. Add a new key only when the meaning is reusable and no existing key communicates it.

```tsx
import { iconRegistry } from "@/icons/iconRegistry";

const DeleteIcon = iconRegistry.delete.icon;

<button aria-label="Delete customer" title="Delete customer">
  <DeleteIcon aria-hidden="true" />
</button>
```

The registry is intentionally smaller than Lucide. Constraint makes the interface more consistent and helps AI choose correctly.

## Size and treatment

| Context | Token | Typical role |
| --- | --- | --- |
| Dense metadata | `--icon-size-xs` | inline status, compact table metadata |
| Text control | `--icon-size-sm` | button or menu item beside a label |
| Navigation/default | `--icon-size-md` | side navigation, icon actions, inputs |
| Section/object emphasis | `--icon-size-lg` | section marker or object summary |
| Empty state | `--icon-size-xl` | quiet orientation, never a hero illustration |

- Let icons inherit `currentColor`; do not place raw colors on individual SVGs.
- Use the default Lucide stroke. Do not mix filled, two-tone, hand-drawn, and outline families in one product region.
- An icon tile is an emphasis treatment, not the default wrapper for every icon.
- Status icons use semantic success, warning, danger, or neutral colors. Do not use color merely to make a row livelier.
- Animate only icons that communicate active work or a state transition. A loading spinner may rotate; navigation and decorative icons remain still at rest.

## Common distinctions

| If the intent is… | Use | Do not substitute |
| --- | --- | --- |
| Permanently remove an object | `delete` / Trash | `close` / X |
| Dismiss a dialog or remove a chip | `close` / X | Trash |
| Persist current edits | `save` / Save | `success` / Circle check |
| Confirm completion or health | `success` / Circle check | Save or checkbox |
| Find by text | `search` / Search | Filter |
| Narrow by structured criteria | `filter` or `active-filters` | Search |
| Fetch the latest state | `refresh` | Retry |
| Repeat a confirmed failed operation | `retry` | Refresh |
| Attach a file | `upload` | Import |
| Ingest structured data with mapping | `import` | Upload |
| Open another product/site | `external-link` | Forward arrow |
| Reveal adjacent content | `expand` | Forward arrow |
| Neutral explanatory context | `info` | Help |
| User-requested guidance | `help` | Info |
| Short indeterminate work | `loading` | Pending clock |
| Queued or time-dependent work | `pending` | Loading spinner |

## Labels and accessibility

- A decorative icon beside equivalent text uses `aria-hidden="true"`.
- An icon-only button needs a specific accessible name and a visible tooltip on hover and keyboard focus. “Delete customer” is better than “Delete.”
- Do not rely on the icon or color alone for error, warning, or success. Pair it with concise status text.
- Avoid icon-only primary actions. The primary verb and affected object should normally be visible.
- Use the same icon for the same meaning throughout a product region. A changed shape implies a changed meaning.

## When to use images

Use an image only when it does one of these jobs:

1. **Show the real product:** a current, first-party screenshot or product mockup for onboarding, help, release notes, or marketing.
2. **Explain structure:** a diagram, chart, annotated screenshot, or workflow that is faster to understand than prose.
3. **Identify an object:** a user-uploaded thumbnail, avatar, cover, document preview, map, or product image.
4. **Create a deliberate campaign mood:** one art-directed photo or illustration in a marketing region where emotional tone is part of the job.

Do not add stock photography to operational pages, decorative illustrations to every empty state, or AI-generated images that imply product capabilities or real customers.

## Image source policy

| Source | Default | Use and constraint |
| --- | --- | --- |
| First-party product screenshots and generated diagrams | Preferred | Keep them current, remove private data, and version them with the feature documentation. |
| [unDraw](https://undraw.co/license) | Conditional | Useful for a small number of onboarding/help illustrations. Recolor to the selected semantic theme. Do not redistribute as an asset pack or use for AI training. |
| [Unsplash](https://unsplash.com/license) | Marketing only | Downloaded images may be used under the Unsplash license, but check people, property, logos, trademarks, and release requirements for the actual use. Record creator and source even when attribution is optional. API use has separate attribution terms. |
| [Openverse](https://openverse.org/about) | Research route | It discovers Creative Commons and public-domain works; verify the individual work's license and attribution before use because Openverse does not guarantee license accuracy. |
| Storyset/other mixed libraries | Not a default | Free use may require attribution or a paid license. Do not add an asset until its exact license and attribution are recorded. |

Every third-party image added to a project should have a nearby source record containing its origin URL, creator, license, download date, intended use, and any required attribution.

## File and responsive rules

- Store reusable product-owned imagery under `src/assets/`; store public-addressable social or metadata images under `public/images/`.
- Prefer SVG for diagrams and abstract illustrations, AVIF/WebP for photos, and PNG only when lossless transparency or pixel accuracy is required.
- Set intrinsic width and height or an aspect ratio to prevent layout shift.
- Use `object-fit: cover` only when cropping is safe. Faces, screenshots, text, and diagrams generally need `contain` or art-directed variants.
- Write alt text for the image's purpose in context. Use empty alt text for truly decorative imagery.
- Never put essential instructions only inside an image. Provide equivalent text and make zoom or full-size viewing available for detailed screenshots.

## AI decision sequence

1. Decide whether the interface needs an icon, an image, a data graphic, or no visual asset.
2. For icons, search the semantic registry by intent and reuse its key.
3. For images, identify the functional job and prefer first-party material.
4. Record source and license before adding third-party material.
5. Verify accessible naming, contrast, responsive crop, reduced motion, and loading behavior.
