#!/usr/bin/env node
import { readFile, readdir } from "node:fs/promises";
import { extname, join, resolve } from "node:path";

const args = process.argv.slice(2);
const strict = args.includes("--strict");
const requestedRoot = args.find((arg) => !arg.startsWith("--"));

if (!requestedRoot) {
  console.error("Usage: audit-target.mjs <source-directory> [--strict]");
  process.exit(2);
}

const root = resolve(requestedRoot);
const findings = [];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (["node_modules", "dist", "coverage", ".git"].includes(entry.name)) continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    else files.push(path);
  }
  return files;
}

for (const file of await walk(root)) {
  if (![".ts", ".tsx", ".css", ".scss"].includes(extname(file))) continue;
  const source = await readFile(file, "utf8");
  const normalized = file.replaceAll("\\", "/");
  const isTokenFile = /tokens|theme|palette/i.test(file);
  const isAdminAdapter = /profiles\/admin|ui\/admin/i.test(normalized);
  const rawColors = isTokenFile ? [] : source.match(/#[0-9a-fA-F]{3,8}\b/g) ?? [];
  if (rawColors.length) findings.push({ file, rule: "raw-color", detail: [...new Set(rawColors)].join(", ") });
  if (!isAdminAdapter && /from\s+["']antd["']/.test(source)) findings.push({ file, rule: "direct-antd-import", detail: "Use the local admin profile adapter." });
  if (/button[^>]*>\s*<[^>]*(Icon|svg)/.test(source) && !/(aria-label|title=)/.test(source)) findings.push({ file, rule: "icon-action-review", detail: "Review icon-only controls for an accessible name." });
}

console.log(JSON.stringify({ root, findings, count: findings.length }, null, 2));
if (strict && findings.length) process.exit(1);
