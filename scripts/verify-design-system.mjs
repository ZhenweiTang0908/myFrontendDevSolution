import { readFile, readdir } from "node:fs/promises";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const expectedPatterns = 28;
const errors = [];

function findUnnamedIconActions(content) {
  const tags = [...content.matchAll(/<(?:button|a)\b[^>]*className="[^"]*(?:icon-action|tool-button)[^"]*"[^>]*>/g)].map((match) => match[0]);
  return tags.filter((tag) => !/\b(?:aria-label|title)=/.test(tag));
}

function findRawInlineLayout(content) {
  return [...content.matchAll(/style=\{\{[^}]*\b(?:padding|margin|gap|borderRadius|fontSize)\s*:/g)].map((match) => match[0]);
}

if (findUnnamedIconActions('<button className="icon-action"><svg /></button>').length !== 1) {
  throw new Error("Internal verifier self-test failed for unnamed icon actions.");
}
if (findRawInlineLayout('<div style={{ padding: "12px" }} />').length !== 1) {
  throw new Error("Internal verifier self-test failed for raw inline layout values.");
}

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await collectFiles(path));
    else files.push(path);
  }
  return files;
}

const registry = await readFile(join(root, "src/patterns/patternRegistry.ts"), "utf8");
const patternIdBlock = registry.match(/export const patternIds = \[([\s\S]*?)\] as const;/)?.[1] ?? "";
const patternCount = [...patternIdBlock.matchAll(/"[a-z-]+"/g)].length;
if (patternCount !== expectedPatterns) {
  errors.push(`Expected ${expectedPatterns} registered Page Patterns, found ${patternCount}.`);
}
if (!registry.includes("states: demoStates")) {
  errors.push("Every Page Pattern must declare the supported demonstration states.");
}

const sourceFiles = (await collectFiles(join(root, "src"))).filter((path) => [".ts", ".tsx", ".css"].includes(extname(path)));
const componentNames = new Map();
for (const file of sourceFiles) {
  const content = await readFile(file, "utf8");
  const isTokenFile = file.endsWith("tokens.css");
  if (!isTokenFile) {
    const rawColors = content.match(/#[0-9a-fA-F]{3,8}\b/g) ?? [];
    if (rawColors.length > 0) errors.push(`${file}: raw colors must live in tokens.css (${rawColors.join(", ")}).`);
    if (content.includes("var(--primitive-")) errors.push(`${file}: feature code must use semantic or component tokens, not primitive palette tokens.`);
    if (file.endsWith(".css")) {
      const rawSpacing = content.match(/(?:padding|margin|gap)(?:-[a-z]+)?:\s*[^;]*(?:\d(?:px|rem|em|vh|vw))/g) ?? [];
      if (rawSpacing.length > 0) errors.push(`${file}: spacing values must use tokens (${rawSpacing.join(", ")}).`);
    }
  }

  if (file.endsWith(".tsx")) {
    if (!file.includes("/profiles/admin/") && /from ["'](?:antd|antd\/)/.test(content)) {
      errors.push(`${file}: direct Ant imports must remain behind src/profiles/admin adapters.`);
    }
    for (const tag of findUnnamedIconActions(content)) {
      errors.push(`${file}: icon-only action needs aria-label or title (${tag}).`);
    }
    if (findRawInlineLayout(content).length > 0) {
      errors.push(`${file}: raw inline spacing/typography must be represented by a class and token.`);
    }
    for (const match of content.matchAll(/export function ([A-Z][A-Za-z0-9]*)/g)) {
      const previous = componentNames.get(match[1]);
      if (previous) errors.push(`${file}: exported component ${match[1]} duplicates ${previous}.`);
      else componentNames.set(match[1], file);
    }
  }
}

const interactionCss = await readFile(join(root, "src/styles/index.css"), "utf8");
for (const selector of [":hover", ":active", ":focus-visible", ":disabled"]) {
  if (!interactionCss.includes(selector)) errors.push(`Shared interaction stylesheet is missing ${selector} behavior.`);
}

if (errors.length > 0) {
  console.error("Design-system verification failed:\n" + errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log(`Design-system verification passed: ${patternCount} patterns, semantic-token boundaries, vendor boundaries, icon labels, shared interaction states, and component-name uniqueness.`);
