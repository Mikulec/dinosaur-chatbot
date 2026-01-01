import { build } from "esbuild";
import path from "path";

const root = process.cwd();
const entry = path.join(root, "packages", "core-llm", "src", "index.ts");
const outdir = path.join(root, "packages", "core-llm", "dist");

(async () => {
  try {
    await build({
      entryPoints: [entry],
      bundle: true,
      platform: "node",
      format: "esm",
      target: ["node18"],
      outdir,
      sourcemap: true,
      external: ["node-llama-cpp"],
      logLevel: "info",
      tsconfig: path.join(root, "packages", "core-llm", "tsconfig.build.json"),
    });
    console.log("esbuild: build completed");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
