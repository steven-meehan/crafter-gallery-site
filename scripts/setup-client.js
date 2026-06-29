#!/usr/bin/env node
/**
 * Interactive setup script for a new client deployment.
 * Run with:  npm run setup-client
 *
 * Generates all client-specific files that are excluded from git:
 *   src/theme.css
 *   src/index.css
 *   src/ConfigFiles/site.config.json
 *   content/data/navigation.json
 *   content/data/galleries.json
 *   content/data/gallery-sample.json
 *   content/data/about.json  (optional)
 */

const fs   = require('fs');
const path = require('path');
const readline = require('readline');

const root = path.resolve(__dirname, '..');

// ── Helpers ──────────────────────────────────────────────────────────────────

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function ask(question, defaultValue) {
  return new Promise(resolve => {
    const hint = defaultValue ? ` (${defaultValue})` : '';
    rl.question(`${question}${hint}: `, answer => {
      resolve(answer.trim() || defaultValue || '');
    });
  });
}

function askYesNo(question, defaultYes = true) {
  return new Promise(resolve => {
    const hint = defaultYes ? '[Y/n]' : '[y/N]';
    rl.question(`${question} ${hint}: `, answer => {
      const a = answer.trim().toLowerCase();
      if (!a) resolve(defaultYes);
      else resolve(a === 'y' || a === 'yes');
    });
  });
}

function write(filePath, content) {
  const full = path.join(root, filePath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, 'utf8');
  console.log(`  ✔  ${filePath}`);
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n╔════════════════════════════════════════╗');
  console.log('║   Gallery Site — New Client Setup      ║');
  console.log('╚════════════════════════════════════════╝\n');

  // ── Gather answers ──────────────────────────────────────────────────────────

  const siteName     = await ask('Site / client name', 'My Gallery Site');
  const siteUrl      = await ask('Production URL (e.g. https://myclient.com)', '');
  const dataBaseUrl  = await ask('Data base URL (S3 / CDN path, trailing slash)', 'https://your-cdn.example.com/data/');
  const cacheMinutes = await ask('Cache duration in minutes', '15');
  const cacheMs      = parseInt(cacheMinutes, 10) * 60 * 1000;

  console.log('');
  const footerName   = await ask('Footer copyright name', siteName);
  const footerUrl    = await ask('Footer copyright URL', 'https://example.com');
  const siteEmail    = await ask('Contact email (used in About page)', 'hello@example.com');

  console.log('');
  const wantHomePage = await askYesNo('Use a custom home page instead of the gallery index?', false);
  const wantAbout    = await askYesNo('Include an About page?', true);
  const aboutTitle   = wantAbout ? await ask('About page nav label', 'About') : '';

  console.log('');
  const storeUrl     = await ask('Etsy / shop URL (leave blank to skip)', '');

  console.log('\nGenerating files...\n');

  // ── 1. theme.css ────────────────────────────────────────────────────────────

  const themeSrc = path.join(root, 'NewSiteSampleFiles', 'theme.css');
  const themeContent = fs.existsSync(themeSrc)
    ? fs.readFileSync(themeSrc, 'utf8')
    : '/* Copy NewSiteSampleFiles/theme.css here and customise */\n';

  write('src/theme.css', themeContent);

  // ── 1b. index.css ───────────────────────────────────────────────────────────

  const indexCssSrc = path.join(root, 'NewSiteSampleFiles', 'index.css');
  const indexCssContent = fs.existsSync(indexCssSrc)
    ? fs.readFileSync(indexCssSrc, 'utf8')
    : 'body { font-family: var(--body-font); background-color: var(--body-bg); color: var(--font-color); margin: 0; }\n';

  write('src/index.css', indexCssContent);

  // ── 2. site.config.json ─────────────────────────────────────────────────────

  const homePage = wantHomePage
    ? { slug: 'home', title: 'Home', dataFile: 'page-home.json' }
    : undefined;

  const pages = wantAbout
    ? [{ slug: 'about', title: aboutTitle, dataFile: 'about.json' }]
    : [];

  const siteConfig = {
    siteUrl,
    dataBaseUrl,
    cacheAgeMs: cacheMs,
    cacheVersion: 'v1',
    seo: {
      siteName,
      defaultDescription: '',
      defaultImageUrl: '',
      defaultImageAltText: ''
    },
    footer: {
      fontColor: 'secondary',
      copyright: { name: footerName, url: footerUrl, title: `Visit ${footerName}` },
      designer:  { display: false, name: '', url: '', title: '' }
    },
    errorPage: {
      heading: 'An Error Occurred',
      message: 'Please wait a few minutes and try again.'
    },
    ...(homePage ? { homePage } : {}),
    pages
  };

  write('src/ConfigFiles/site.config.json', JSON.stringify(siteConfig, null, 2) + '\n');

  // ── 3. navigation.json ──────────────────────────────────────────────────────

  const navLinks = [
    {
      url: '/', order: 1, name: 'Galleries', title: 'View all galleries',
      active: true, internalLink: true, social: false, icon: '', childLinks: []
    }
  ];

  if (wantAbout) {
    navLinks.push({
      url: '/page/about', order: 2, name: aboutTitle, title: `About ${siteName}`,
      active: true, internalLink: true, social: false, icon: '', childLinks: []
    });
  }

  const navigation = {
    logoAltText: siteName,
    backgroundColor: 'altPrimary',
    togglerUsesPrimaryColor: false,
    links: navLinks
  };

  write('content/data/navigation.json', JSON.stringify(navigation, null, 2) + '\n');

  // ── 4. galleries.json ───────────────────────────────────────────────────────

  const galleries = {
    title: 'My Galleries',
    galleries: [
      {
        slug: 'sample',
        title: 'Sample Gallery',
        coverImage: 'https://picsum.photos/seed/cover/400/300',
        description: 'A sample gallery — replace this with your first gallery.'
      }
    ]
  };

  write('content/data/galleries.json', JSON.stringify(galleries, null, 2) + '\n');

  // ── 5. gallery-sample.json ──────────────────────────────────────────────────

  const gallerySample = {
    title: 'Sample Gallery',
    baseUrl: '',
    sliderButtonLocations: 'bottom',
    items: [
      {
        fileName: 'image-1',
        imageUrl: 'https://picsum.photos/seed/alpine/900/600',
        title: 'Sample Image 1',
        altText: 'Replace this with your image',
        landscape: true,
        description: [{ display: true, header: false, emphasis: false, text: 'Caption for image 1.', alignment: 'center' }],
        actions: {
          purchase: storeUrl ? { storeUrl } : { botEndpoint: '' }
        }
      },
      {
        fileName: 'image-2',
        imageUrl: 'https://picsum.photos/seed/forest/900/600',
        title: 'Sample Image 2',
        altText: 'Replace this with your image',
        landscape: true,
        description: [{ display: true, header: false, emphasis: false, text: 'Caption for image 2.', alignment: 'center' }],
        actions: {
          purchase: storeUrl ? { storeUrl } : { botEndpoint: '' }
        }
      }
    ]
  };

  write('content/data/gallery-sample.json', JSON.stringify(gallerySample, null, 2) + '\n');

  // ── 6. about.json (optional) ────────────────────────────────────────────────

  if (wantAbout) {
    const about = {
      name: 'about',
      header: `About ${siteName}`,
      layout: {
        rows: [
          { order: 1, numberOfColumns: 1 },
          { order: 2, numberOfColumns: 1 }
        ]
      },
      components: [
        {
          active: true, row: 1, order: 1,
          columnPosition: 'left', componentType: 'info',
          paragraphs: [
            {
              display: true, header: false, emphasis: false,
              text: `<h2 style='text-align:center'>Welcome to ${siteName}</h2>`,
              alignment: 'center'
            },
            {
              display: true, header: false, emphasis: false,
              text: 'Tell your story here. What do you make, who do you make it for, and why does it matter?',
              alignment: 'center'
            },
            {
              display: true, header: false, emphasis: true,
              text: '"Your memorable quote goes here."',
              alignment: 'center'
            }
          ]
        },
        {
          active: true, row: 2, order: 1,
          columnPosition: 'left', componentType: 'info',
          paragraphs: [
            {
              display: true, header: false, emphasis: false,
              text: `<h3 style='text-align:center'>Get in Touch</h3>`,
              alignment: 'center'
            },
            {
              display: true, header: false, emphasis: false,
              text: 'Ready to order or just have a question?',
              alignment: 'center'
            },
            {
              display: true, header: false, emphasis: false,
              text: `<a href='mailto:${siteEmail}'>${siteEmail}</a>`,
              alignment: 'center'
            }
          ]
        }
      ]
    };

    write('content/data/about.json', JSON.stringify(about, null, 2) + '\n');
  }

  // ── Done ────────────────────────────────────────────────────────────────────

  console.log('\n╔════════════════════════════════════════╗');
  console.log('║   Setup complete!                      ║');
  console.log('╚════════════════════════════════════════╝');
  console.log('');
  console.log('Next steps:');
  console.log('  1. Drop Logo.png and LogoAlt.png into src/assets/');
  console.log('  2. Edit src/theme.css — pick a preset and adjust colours/fonts');
  console.log('  3. Run:  npm install');
  console.log('  4. Run:  npx playwright install chromium   (one-time browser download)');
  console.log('  5. Run:  npm run dev');
  console.log('  6. Replace placeholder gallery images in content/data/');
  console.log('  7. Run:  npm run build   (generates sitemap, bundles, pre-renders)');
  console.log('');

  rl.close();
}

main().catch(err => {
  console.error('\nSetup failed:', err.message);
  rl.close();
  process.exit(1);
});
