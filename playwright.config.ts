import { defineConfig, devices } from "@playwright/test";

// Not 4321, so tests never reuse a running `astro dev` server: they always hit the production build.
const PORT = 4322;
// Explicit IPv4: on Windows "localhost" sometimes resolves to ::1 and the preview server refuses the connection.
const HOST = "127.0.0.1";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env["CI"],
  retries: process.env["CI"] ? 1 : 0,
  reporter: "list",
  use: {
    baseURL: `http://${HOST}:${PORT}`,
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 800 } },
    },
    {
      name: "mobile",
      use: { ...devices["Pixel 7"] },
    },
  ],
  webServer: {
    // Test build: allows [PENDIENTE] (sample content) but still blocks phone numbers and broken links.
    command: `npm run build:test && npm run preview -- --host ${HOST} --port ${PORT}`,
    url: `http://${HOST}:${PORT}/`,
    reuseExistingServer: !process.env["CI"],
    timeout: 120_000,
  },
});
