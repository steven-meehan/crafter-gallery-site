'use strict';
const { chromium } = require('playwright');
const { spawn }    = require('child_process');
const path         = require('path');
const fs           = require('fs');
const net          = require('net');
const http         = require('http');

const { getRoutes } = require('./get-routes');

const root       = path.resolve(__dirname, '..');
const DIST_DIR   = path.join(root, 'build');
const siteConfig = require(path.join(root, 'src/ConfigFiles/site.config.json'));
const siteUrl    = (siteConfig.siteUrl || '').replace(/\/$/, '');

// ── Helpers ───────────────────────────────────────────────────────────────────

function getFreePort() {
  return new Promise((resolve, reject) => {
    const srv = net.createServer();
    srv.listen(0, () => {
      const port = srv.address().port;
      srv.close(() => resolve(port));
    });
    srv.on('error', reject);
  });
}

function waitForServer(baseUrl, timeout = 20000) {
  return new Promise((resolve, reject) => {
    const deadline = Date.now() + timeout;
    function attempt() {
      http.get(baseUrl, res => { res.resume(); resolve(); })
          .on('error', () => {
            if (Date.now() > deadline) {
              reject(new Error(`Preview server at ${baseUrl} did not respond within ${timeout}ms`));
            } else {
              setTimeout(attempt, 300);
            }
          });
    }
    attempt();
  });
}

async function startPreviewServer() {
  const port    = await getFreePort();
  const baseUrl = `http://localhost:${port}`;

  const server = spawn(
    'npx', ['vite', 'preview', '--port', String(port), '--strictPort'],
    { cwd: root, shell: true, stdio: 'pipe' }
  );
  server.stderr.on('data', d => process.stderr.write(d));

  await waitForServer(baseUrl);
  return { server, baseUrl };
}

function routeToOutDir(route) {
  if (route === '/') return DIST_DIR;
  const parts = route.split('/').filter(Boolean);
  return path.join(DIST_DIR, ...parts);
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function prerender() {
  const routes = getRoutes();
  console.log(`\nPre-rendering ${routes.length} routes...\n`);

  const { server, baseUrl } = await startPreviewServer();

  try {
    const browser = await chromium.launch();
    const page    = await browser.newPage();

    for (const route of routes) {
      try {
        await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle', timeout: 30000 });

        let html = await page.content();

        // Replace localhost preview origin with production siteUrl in
        // canonical and og:url tags that Helmet rendered into the page.
        if (siteUrl) {
          html = html.split(baseUrl).join(siteUrl);
        }

        const outDir = routeToOutDir(route);
        fs.mkdirSync(outDir, { recursive: true });
        fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');

        console.log(`  ✔  ${route}`);
      } catch (err) {
        console.warn(`  ✗  ${route} — ${err.message}`);
      }
    }

    await browser.close();
  } finally {
    server.kill();
  }

  console.log('\nPre-rendering complete.\n');
}

prerender().catch(err => {
  console.error('\nPre-render failed:', err.message);
  process.exit(1);
});
