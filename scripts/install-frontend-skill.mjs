import { lstat, mkdir, realpath, symlink } from "node:fs/promises";
import { homedir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const source = join(repositoryRoot, "skills/frontend-design");
const codexHome = process.env.CODEX_HOME ?? join(homedir(), ".codex");
const destination = join(codexHome, "skills/frontend-design");

await mkdir(dirname(destination), { recursive: true });

try {
  await lstat(destination);
  const [current, expected] = await Promise.all([realpath(destination), realpath(source)]);
  if (current !== expected) {
    throw new Error(`Refusing to replace existing Skill at ${destination}. Remove or relocate it explicitly first.`);
  }
  console.log(`Frontend Design Skill is already linked: ${destination} -> ${source}`);
} catch (error) {
  if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
    await symlink(source, destination, "dir");
    console.log(`Installed Frontend Design Skill: ${destination} -> ${source}`);
  } else {
    throw error;
  }
}
