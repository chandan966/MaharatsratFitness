import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const node = process.execPath;
const jobs = [
  {
    name: "Gym web",
    cwd: path.join(root, "apps/web"),
    args: [path.join(root, "node_modules/next/dist/bin/next"), "dev", "--hostname", "0.0.0.0"]
  },
  {
    name: "Fitness API",
    cwd: path.join(root, "apps/api"),
    args: [path.join(root, "node_modules/tsx/dist/cli.mjs"), "watch", "src/index.ts"]
  }
];
const children = jobs.map((job) => {
  console.log("Starting " + job.name + "…");
  return spawn(node, job.args, { cwd: job.cwd, stdio: "inherit" });
});

function stop() {
  for (const child of children) child.kill("SIGINT");
}
process.on("SIGINT", stop);
process.on("SIGTERM", stop);
for (const child of children) child.on("exit", (code) => {
  if (code && code !== 0) {
    stop();
    process.exitCode = code;
  }
});
