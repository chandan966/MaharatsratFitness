import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const npm = process.platform === "win32" ? "npm.cmd" : "npm";
for (const args of [
  ["install", "--prefer-dedupe"],
  ["install", "--prefix", path.join(root, "apps/web"), "--prefer-dedupe"]
]) {
  const result = spawnSync(npm, args, { cwd: root, stdio: "inherit", shell: process.platform === "win32" });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}
console.log("API and web dependencies installed.");
