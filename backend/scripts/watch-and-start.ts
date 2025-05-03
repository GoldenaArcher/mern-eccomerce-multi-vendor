import chokidar from "chokidar";
import { spawn } from "child_process";

const mode = process.argv.includes("--debug") ? "start:debug" : "start";

let server: ReturnType<typeof spawn> | null = null;

const start = () => {
  const isDebug = process.argv.includes("--debug");
  const args = isDebug
    ? [
        "ts-node-dev",
        "--respawn",
        "--transpile-only",
        "--inspect=9229",
        "-r",
        "tsconfig-paths/register",
        "server.ts",
      ]
    : [
        "ts-node-dev",
        "--respawn",
        "--transpile-only",
        "-r",
        "tsconfig-paths/register",
        "server.ts",
      ];

  console.info(
    `%c[watcher]: 🟢 Starting backend dev server (${mode})...\n`,
    "color: green"
  );
  server = spawn("yarn", args, {
    stdio: "inherit",
    shell: true,
    cwd: process.cwd(),
  });
};

const restart = () => {
  if (server) {
    console.info(
      `%c[watcher]: 🔴 Restarting backend dev server (${mode})...\n`,
      "color: red"
    );
    server?.kill();
  }
  start();
};

const watcher = chokidar.watch("./**/*.ts", {
  ignored: ["./node_modules/**", "**/dist/**"],
  persistent: true,
  ignoreInitial: true,
});

watcher.on("all", (event, path) => {
  console.info(`%c[watcher]: ${event} ${path}\n`, "color: blue");
  restart();
});

start();
