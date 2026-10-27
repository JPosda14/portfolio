// Test build: like `astro build`, but lets [PENDIENTE] through so the e2e tests and Lighthouse
// can run on sample content. Never deploy its output; publishing uses `npm run build`.
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const astro = fileURLToPath(new URL("../node_modules/astro/bin/astro.mjs", import.meta.url));
const { status } = spawnSync(process.execPath, [astro, "build"], {
  stdio: "inherit",
  env: { ...process.env, ALLOW_PENDING: "1" },
});
process.exit(status ?? 1);
