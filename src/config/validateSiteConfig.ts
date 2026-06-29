import type { SiteConfig } from './SiteConfig';

const REQUIRED: Array<{ path: string; get: (c: unknown) => unknown }> = [
  { path: 'dataBaseUrl',         get: (c: any) => c?.dataBaseUrl },
  { path: 'cacheVersion',        get: (c: any) => c?.cacheVersion },
  { path: 'galleryButtonLabels', get: (c: any) => c?.galleryButtonLabels },
];

const RECOMMENDED: Array<{ path: string; get: (c: unknown) => unknown }> = [
  { path: 'siteUrl',             get: (c: any) => c?.siteUrl },
  { path: 'seo.siteName',        get: (c: any) => c?.seo?.siteName },
  { path: 'seo.defaultDescription', get: (c: any) => c?.seo?.defaultDescription },
];

export function validateSiteConfig(config: unknown): asserts config is SiteConfig {
  const missing = REQUIRED
    .filter(({ get }) => {
      const val = get(config);
      return val === undefined || val === null || val === '';
    })
    .map(({ path }) => path);

  if (missing.length > 0) {
    throw new Error(
      `site.config.json is missing required fields: ${missing.join(', ')}. ` +
      'Run npm run setup-client or check your configuration file.'
    );
  }

  const incomplete = RECOMMENDED
    .filter(({ get }) => {
      const val = get(config);
      return val === undefined || val === null || val === '';
    })
    .map(({ path }) => path);

  if (incomplete.length > 0) {
    console.warn(
      `[site.config.json] SEO fields not configured: ${incomplete.join(', ')}. ` +
      'Pages will have missing meta tags until these are set.'
    );
  }
}
