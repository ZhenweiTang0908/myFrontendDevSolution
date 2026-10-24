#!/usr/bin/env node
import { readFile, readdir } from "node:fs/promises";
import { basename, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scannedExtensions = [".ts", ".tsx", ".js", ".jsx", ".vue", ".svelte", ".css", ".scss", ".less"];
const skippedDirectories = ["node_modules", "dist", "build", "coverage", ".git", ".next", ".nuxt", ".svelte-kit"];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (skippedDirectories.includes(entry.name)) continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    else if (scannedExtensions.includes(extname(entry.name))) files.push(path);
  }
  return files;
}

function lineOf(source, index) {
  return source.slice(0, index).split("\n").length;
}

// Token files are identified by file name only, so a directory such as `theme/` does not exempt its contents.
function isTokenFile(file) {
  return /(?:^|[._-])(?:tokens?|theme|palette)(?:[._-]|$)/i.test(basename(file, extname(file)));
}

function isAdminAdapter(file) {
  return /(?:^|\/)(?:profiles|ui)\/admin\//i.test(file.replaceAll("\\", "/"));
}

export function auditSource(file, source) {
  const findings = [];
  const add = (index, rule, detail) => findings.push({ file, line: lineOf(source, index), rule, detail });

  if (!isTokenFile(file)) {
    for (const match of source.matchAll(/#[0-9a-fA-F]{3,8}\b|\b(?:rgba?|hsla?)\(\s*\d/g)) {
      add(match.index, "raw-color", `${match[0]} belongs in a token file.`);
    }
    for (const match of source.matchAll(/var\(--primitive-[\w-]+\)/g)) {
      add(match.index, "primitive-token", `${match[0]} must be wrapped by a semantic token.`);
    }
  }

  if (!isAdminAdapter(file)) {
    for (const match of source.matchAll(/from\s+["']antd(?:\/[^"']*)?["']/g)) {
      add(match.index, "direct-antd-import", "Import Ant through the local admin profile adapter.");
    }
  }

  if (/\.(?:[jt]sx|vue|svelte)$/.test(file)) {
    // Flags a control whose only content is an icon; any text or `{expression}` child counts as a possible label.
    for (const match of source.matchAll(/<(button|a)\b([^>]*)>([\s\S]*?)<\/\1>/g)) {
      const [, , attributes, content] = match;
      const hasIcon = /<(?:svg|[A-Z]\w*Icon|Icon)\b/.test(content);
      const hasText = content.replace(/<[^>]*>/g, "").trim().length > 0;
      if (hasIcon && !hasText && !/\b(?:aria-label|aria-labelledby|title)=/.test(attributes)) {
        add(match.index, "unnamed-icon-action", "Icon-only control needs a specific accessible name.");
      }
    }
    const headings = [...source.matchAll(/<h1\b/g)];
    if (headings.length > 1) add(headings[1].index, "multiple-h1", `${headings.length} h1 elements in one file; confirm only one renders per page.`);
    for (const match of source.matchAll(/style=\{\{[^}]*\b(?:padding|margin|gap|borderRadius|fontSize|boxShadow)\s*:/g)) {
      add(match.index, "raw-inline-style", "Move spacing, radius, type, or shadow into a class backed by tokens.");
    }
  }

  return findings;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const strict = args.includes("--strict");
  const requestedRoot = args.find((arg) => !arg.startsWith("--"));
  if (!requestedRoot) {
    console.error("Usage: node audit-target.mjs <source-directory> [--strict]");
    process.exit(2);
  }

  const root = resolve(requestedRoot);
  const findings = [];
  for (const file of await walk(root)) {
    findings.push(...auditSource(relative(root, file), await readFile(file, "utf8")));
  }

  for (const finding of findings) console.log(`${finding.file}:${finding.line}  ${finding.rule}  ${finding.detail}`);
  console.log(`${findings.length} warning(s) in ${root}. Review each; this scan does not replace the target's quality gate.`);
  if (strict && findings.length) process.exit(1);
}
