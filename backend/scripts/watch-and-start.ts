import { spawn } from "node:child_process";

// ts-node-dev handles watching and restarting the backend itself.
const isDebug = process.argv.includes("--debug");
const server = spawn(
  process.execPath,
  [
    require.resolve("ts-node-dev/lib/bin"),
    "--respawn",
    "--transpile-only",
    ...(isDebug ? ["--inspect=9229"] : []),
    "-r",
    "tsconfig-paths/register",
    "server.ts",
  ],
  { stdio: "inherit", cwd: process.cwd() }
);

server.on("error", (error) => {
  console.error("Failed to start backend:", error);
  process.exitCode = 1;
});

server.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
  } else {
    process.exitCode = code ?? 1;
  }
});

for (const signal of ["SIGINT", "SIGTERM"] as const) {
  process.once(signal, () => server.kill(signal));
}
