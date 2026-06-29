'use strict';
const path = require('path');
const fs   = require('fs');

const { getRoutes } = require('./get-routes');
const siteConfig    = require(path.join(__dirname, '../src/ConfigFiles/site.config.json'));

const siteUrl = (siteConfig.siteUrl || '').replace(/\/$/, '');

if (!siteUrl) {
  console.warn('Warning: siteUrl is not set in site.config.json — set it to your production domain for correct sitemap URLs.');
}

const routes  = getRoutes();
const today   = new Date().toISOString().split('T')[0];
const publicDir = path.join(__dirname, '../content');

// ── sitemap.xml ───────────────────────────────────────────────────────────────

const urlEntries = routes.map(route => `  <url>
    <loc>${siteUrl}${route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
  </url>`).join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap, 'utf8');

// ── robots.txt ────────────────────────────────────────────────────────────────

const robots = `User-agent: *
Allow: /
Sitemap: ${siteUrl}/sitemap.xml
`;

fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots, 'utf8');

console.log(`  ✔  sitemap.xml — ${routes.length} routes`);
console.log('  ✔  robots.txt');
