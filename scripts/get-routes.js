'use strict';
const path = require('path');
const fs   = require('fs');
const root = path.resolve(__dirname, '..');

const { slugify } = require('./slugify');

function getRoutes() {
  const galleriesPath  = path.join(root, 'content/data/galleries.json');
  const siteConfigPath = path.join(root, 'src/ConfigFiles/site.config.json');
  delete require.cache[require.resolve(galleriesPath)];
  delete require.cache[require.resolve(siteConfigPath)];

  const galleries  = require(galleriesPath);
  const siteConfig = require(siteConfigPath);

  const routes = ['/'];

  for (const gallery of (galleries.galleries || [])) {
    routes.push(`/gallery/${gallery.slug}`);

    // Enumerate per-image routes so each gets its own prerendered HTML
    // with the correct og:title and og:image for social sharing.
    const galleryFile = path.join(root, `content/data/gallery-${gallery.slug}.json`);
    if (fs.existsSync(galleryFile)) {
      const galleryData = JSON.parse(fs.readFileSync(galleryFile, 'utf8'));
      for (const item of (galleryData.items || [])) {
        const segment = item.title ? slugify(item.title) : '';
        if (segment) {
          routes.push(`/gallery/${gallery.slug}/${segment}`);
        }
      }
    }
  }

  for (const page of (siteConfig.pages || [])) {
    routes.push(`/page/${page.slug}`);
  }

  return routes;
}

module.exports = { getRoutes };
