# Crafter Gallery Site

A database-free portfolio site for crafters. Built with React 18, TypeScript 5, and Vite 5. All content — navigation, galleries, and pages — is driven by JSON data files served from a static host. There is no back-end; the React app fetches its own configuration at runtime and caches it in session storage.

Designed to run out of an Amazon S3 bucket behind CloudFront, but any static host works.

Licensed under the [MIT License](LICENSE). Maintained by [steven-meehan](https://github.com/steven-meehan).

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [How It Works](#how-it-works)
- [Project Structure](#project-structure)
- [Setting Up a New Client](#setting-up-a-new-client)
  - [Using the Setup Script](#using-the-setup-script)
  - [Manual Setup](#manual-setup)
- [Configuration Files](#configuration-files)
  - [site.config.json](#siteconfigjson)
  - [theme.css](#themecss)
  - [index.css](#indexcss)
  - [navigation.json](#navigationjson)
  - [galleries.json](#galleriesjson)
  - [gallery-{slug}.json](#gallery-slugjson)
  - [page-{slug}.json](#page-slugjson)
- [Logos](#logos)
- [Changing the Home Page](#changing-the-home-page)
- [Lead Time Calculator](#lead-time-calculator)
- [Adding a New Gallery](#adding-a-new-gallery)
- [Adding a New Page](#adding-a-new-page)
- [Theming](#theming)
- [Google Analytics](#google-analytics)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## Tech Stack

| Concern | Tool |
|---|---|
| Framework | React 18 + TypeScript 5 |
| Build | Vite 5 |
| Routing | React Router v6 |
| Styling | CSS custom properties via `theme.css` + CSS Modules |
| SEO | react-helmet-async + Playwright prerender script |
| UI components | Bootstrap 5 (layout/grid only) |

---

## How It Works

The app is a single-page React application. At runtime it fetches JSON data files from a CDN or S3 bucket and uses them to render all navigation, gallery content, and informational pages. No server-side rendering, no database, no API.

**Runtime flow:**

1. User visits the site. The browser receives the static `build/index.html` (or a prerendered page-specific HTML file for deep links).
2. The React app boots and reads `site.config.json` (compiled into the bundle at build time) to know where to fetch data.
3. Components fetch their JSON data files on demand and cache results in session storage for `cacheAgeMs` milliseconds.
4. Navigating to a gallery route (`/gallery/{slug}`) fetches `gallery-{slug}.json`. Navigating to an image deep-link (`/gallery/{slug}/{image-title}`) loads the same gallery and scrolls to the matching image.
5. All meta tags (og:title, og:image, twitter:card) are set client-side by react-helmet-async, and are also baked into static HTML at build time by the prerender script so social share previews work correctly.

---

## Project Structure

```
/
├── content/                    # Per-client static files (gitignored)
│   ├── data/
│   │   ├── galleries.json      # Gallery manifest
│   │   ├── gallery-{slug}.json # One file per gallery
│   │   ├── navigation.json     # Navbar configuration
│   │   └── page-{slug}.json    # Informational pages (Home, About, etc.)
│   ├── images/                 # Optional: locally hosted images (.gitkeep included)
│   ├── favicon.png
│   ├── robots.txt
│   └── sitemap.xml
├── NewSiteSampleFiles/         # Templates — copy these when starting a new client
│   ├── ConfigFiles/
│   │   └── site.config.json
│   ├── assets/
│   │   ├── Logo.png
│   │   └── LogoAlt.png
│   ├── public/
│   │   └── data/               # Sample data files
│   ├── index.css
│   └── theme.css
├── scripts/
│   ├── generate-sitemap.js     # Writes sitemap.xml and robots.txt into content/
│   ├── get-routes.js           # Enumerates every route for the prerenderer
│   ├── prerender.js            # Playwright: writes static HTML per route into build/
│   ├── setup-client.js         # Interactive new-client wizard
│   └── slugify.js              # Shared slug utility for scripts
├── src/
│   ├── assets/                 # Logo.png, LogoAlt.png (gitignored)
│   ├── ConfigFiles/
│   │   └── site.config.json    # Global site settings (gitignored)
│   ├── config/                 # SiteConfig type + startup validator
│   ├── theme.css               # All design tokens (gitignored)
│   ├── index.css               # Body styles (gitignored)
│   ├── typings.d.ts            # CSS module + PNG type declarations
│   ├── App.tsx                 # Route definitions
│   ├── index.tsx               # React entry point
│   ├── Alignment.ts            # Text alignment enum
│   ├── ParagraphData.ts        # Shared paragraph data type
│   ├── Card/                   # Reusable themed card wrapper
│   ├── Carousel/               # Image carousel + lightbox
│   ├── ErrorBoundary/          # Runtime error catcher
│   ├── Footer/                 # Site footer
│   ├── Galleries/              # Gallery index, gallery view, action buttons
│   ├── Header/                 # Navbar, dropdown links, nav link renderer
│   ├── Helmet/                 # SEO meta tag wrapper (used by Page/image components)
│   ├── Images/                 # Image components + page image slider
│   ├── Info/                   # Text block renderer (used by pages)
│   ├── Page/                   # Generic informational page renderer
│   ├── Routing/                # Navigation data types, background color enum
│   ├── Spinner/                # Loading indicator
│   ├── Toggler/                # Mobile hamburger button
│   ├── UseHttp/                # Data-fetching hook with session cache
│   └── utils/
│       └── slugify.ts          # Slug utility (lowercase + hyphenate)
├── build/                      # Compiled output (gitignored) — deploy this folder
├── index.html                  # Vite entry HTML (edit for GA tag, fonts, etc.)
├── vite.config.ts
├── tsconfig.json
└── package.json
```

**Gitignored client-specific files** (must be created per deployment — these are never committed):

| Path | What belongs here |
|---|---|
| `content/` | All runtime data files, favicon, robots.txt, sitemap.xml, and optionally locally hosted images |
| `content/data/` | Every `.json` data file fetched at runtime (`navigation.json`, `galleries.json`, `gallery-*.json`, `page-*.json`) |
| `src/assets/Logo.png` | Desktop logo (260 × 105 px PNG with transparent background) |
| `src/assets/LogoAlt.png` | Mobile logo (130 × 105 px PNG with transparent background) |
| `src/ConfigFiles/site.config.json` | Global site settings compiled into the bundle |
| `src/theme.css` | Design tokens — choose and activate one of the 6 built-in presets |
| `src/index.css` | Body background, font, and hamburger icon colour |
| `build/` | Compiled output from `npm run build` — never edit, always regenerate |

Templates for every file above live in `NewSiteSampleFiles/`. Copy them to the correct destination before running `npm run dev`.

---

## Setting Up a New Client

### Using the Setup Script

The easiest path. Run the wizard and answer the prompts:

```bash
npm run setup-client
```

It scaffolds `src/ConfigFiles/site.config.json`, `content/data/navigation.json`, `content/data/galleries.json`, and a sample gallery data file. Review and edit the output before running `npm run dev`.

### Manual Setup

1. **Copy config templates** from `NewSiteSampleFiles/` to their destinations:

   | Copy this file… | …to this location |
   |---|---|
   | `NewSiteSampleFiles/ConfigFiles/site.config.json` | `src/ConfigFiles/site.config.json` |
   | `NewSiteSampleFiles/theme.css` | `src/theme.css` |
   | `NewSiteSampleFiles/index.css` | `src/index.css` |
   | `NewSiteSampleFiles/assets/Logo.png` | `src/assets/Logo.png` |
   | `NewSiteSampleFiles/assets/LogoAlt.png` | `src/assets/LogoAlt.png` |
   | `NewSiteSampleFiles/public/` (entire folder contents) | `content/` (at the project root) |

   The `src/assets/` folder does not exist in the repository — create it before copying the logos.

2. **Replace the logos** in `src/assets/` with the crafter's own images (see [Logos](#logos) for sizing).

3. **Delete `content/images/.gitkeep`** — this placeholder file is only there so the empty folder can be tracked in git. Delete it after copying.

4. **Fill in `src/ConfigFiles/site.config.json`** with the client's site URL, CDN base URL, SEO fields, and footer details. Every field in this file is documented in [site.config.json](#siteconfigjson).

5. **Activate the desired theme preset** in `src/theme.css` — open the file, uncomment the `:root` block for the preset you want, and comment out any other active blocks. See [Theming](#theming) for the full list of presets.

6. **Populate `content/data/`** with the client's data files:
   - `content/data/navigation.json` — navbar links
   - `content/data/galleries.json` — gallery manifest
   - `content/data/gallery-{slug}.json` — one file per gallery
   - `content/data/page-{slug}.json` — informational pages (if any)
   
   Sample versions of each file live in `NewSiteSampleFiles/public/data/`.

7. **Update `content/favicon.png`** with the crafter's own favicon. `content/robots.txt` and `content/sitemap.xml` are generated automatically by `npm run build` — you do not need to edit them by hand.

8. **Edit `index.html`** at the project root to add Google Analytics and update the `<title>` fallback tag (see [Google Analytics](#google-analytics)).

---

## Configuration Files

### site.config.json

**Location:** `src/ConfigFiles/site.config.json`  
**Gitignored:** yes — compiled into the bundle at build time, so it is per-deployment.

The single source of truth for all global settings.

```json
{
  "siteUrl": "https://yoursite.com",
  "dataBaseUrl": "https://your-cdn.example.com/data/",
  "cacheAgeMs": 900000,
  "cacheVersion": "v1",
  "seo": {
    "siteName": "My Gallery Site",
    "defaultDescription": "A curated gallery of handcrafted work.",
    "defaultImageUrl": "https://your-cdn.example.com/og-default.jpg",
    "defaultImageAltText": "My Gallery Site"
  },
  "footer": {
    "fontColor": "secondary",
    "copyright": {
      "name": "Your Name",
      "url": "https://yoursite.com",
      "title": "Visit my site"
    },
    "designer": {
      "display": false,
      "name": "",
      "url": "",
      "title": ""
    }
  },
  "errorPage": {
    "heading": "An Error Occurred",
    "message": "Please wait a few minutes and try again."
  },
  "galleryButtonLabels": {
    "purchaseDirect": "Purchase",
    "purchaseBot": "Request",
    "sampleDirect": "Get Sample",
    "sampleBot": "Ask for a Sample",
    "useCaseDirect": "How to Use",
    "useCaseBot": "Request a Use Case"
  },
  "homePage": { "slug": "home", "title": "Home", "dataFile": "page-home.json" },
  "pages": [
    { "slug": "about", "title": "About", "dataFile": "about.json" }
  ]
}
```

**Field reference:**

| Field | Required | Description |
|---|---|---|
| `siteUrl` | Yes | Canonical base URL used for SEO and sitemap generation. |
| `dataBaseUrl` | Yes | Base URL for all runtime data fetches. Must end with `/`. Can point to a CDN, S3 bucket, or `/data/` for local dev. |
| `cacheAgeMs` | Yes | Milliseconds to cache each data file in session storage. Default: `900000` (15 min). |
| `cacheVersion` | Yes | Increment this string to invalidate all cached data on next load (e.g., `"v1"` → `"v2"`). |
| `seo.siteName` | Yes | Used in `<title>` and `og:site_name`. |
| `seo.defaultDescription` | Yes | Fallback `<meta name="description">` and `og:description`. |
| `seo.defaultImageUrl` | No | Fallback `og:image` used when no gallery image is available. |
| `seo.defaultImageAltText` | No | Alt text for the default og:image. |
| `footer.fontColor` | Yes | `"primary"` or `"secondary"` — maps to Bootstrap text utility classes. |
| `footer.copyright.name` | Yes | Crafter's name shown in the copyright notice. |
| `footer.copyright.url` | No | If set, the name becomes a link. |
| `footer.designer.display` | Yes | Set `true` to show a "Site designed by…" line in the footer. |
| `errorPage.heading` | Yes | Heading shown by the error boundary. |
| `errorPage.message` | Yes | Body text shown by the error boundary. |
| `galleryButtonLabels` | Yes | Default button labels for purchase, sample, and use-case actions. Overridable per gallery in `gallery-{slug}.json`. |
| `homePage` | No | Controls what the root `/` shows. **If omitted, the gallery index is the home page** (the default). If set, the root `/` renders the specified informational page instead. See [Changing the Home Page](#changing-the-home-page). |
| `pages` | Yes | Array of additional informational pages. Each entry creates a route at `/page/{slug}`. Can be an empty array `[]` if no informational pages are needed. |

---

### theme.css

**Location:** `src/theme.css`  
**Gitignored:** yes — per-deployment, not committed.

Contains all design tokens as CSS custom properties under a single `:root` block. Six named presets are provided in `NewSiteSampleFiles/theme.css`. Only one preset is active at a time.

See the full [Theming](#theming) section for token reference and how to switch or create presets.

---

### index.css

**Location:** `src/index.css`  
**Gitignored:** yes — per-deployment.

Sets the body background and font from theme tokens, and ensures the mobile hamburger icon is visible against dark nav backgrounds. Copy from `NewSiteSampleFiles/index.css` — it rarely needs changes beyond the hamburger colour if you switch to a light theme.

```css
body {
  font-family: var(--body-font);
  background-color: var(--body-bg);
  color: var(--font-color);
  margin: 0;
}
```

If the hamburger icon is invisible on a light navbar, uncomment the `.navbar-toggler-icon` override block in the sample file and adjust the stroke colour to match.

---

### navigation.json

**Location:** `content/data/navigation.json`  
**Fetched at:** runtime by the Header component.

Drives the navbar. The `Galleries` dropdown (when 2 or more galleries exist) is built automatically at runtime from `galleries.json` — you do **not** add gallery child links here manually; leave `childLinks` as an empty array `[]` on the Galleries nav link and the app populates it.

```json
{
  "logoAltText": "My Gallery Site",
  "backgroundColor": "altPrimary",
  "togglerUsesPrimaryColor": false,
  "links": [
    {
      "url": "/",
      "order": 1,
      "name": "Galleries",
      "title": "View all galleries",
      "active": true,
      "internalLink": true,
      "social": false,
      "icon": "",
      "childLinks": []
    },
    {
      "url": "/page/about",
      "order": 2,
      "name": "About",
      "title": "About our studio",
      "active": true,
      "internalLink": true,
      "social": false,
      "icon": "",
      "childLinks": []
    },
    {
      "url": "https://www.instagram.com/yourhandle",
      "order": 3,
      "name": "Instagram",
      "title": "Follow on Instagram",
      "active": true,
      "internalLink": false,
      "social": true,
      "icon": "fa-brands fa-instagram",
      "childLinks": []
    }
  ]
}
```

**Field reference:**

| Field | Required | Description |
|---|---|---|
| `logoAltText` | Yes | Alt text for the site logo. |
| `backgroundColor` | Yes | Navbar background. `"primary"` = `--primary-color`, `"altPrimary"` = `--alt-primary-color`, `"none"` = transparent. |
| `togglerUsesPrimaryColor` | Yes | If `true`, the mobile hamburger button uses the primary color background. |
| `links[].url` | Yes | Route path (internal) or full URL (external/social). |
| `links[].order` | Yes | Sort order in the navbar. |
| `links[].name` | Yes | Display text. Hidden for social icon links (screen-reader only). |
| `links[].title` | Yes | HTML `title` attribute for the link. |
| `links[].active` | Yes | Set `false` to hide the link without deleting it. |
| `links[].internalLink` | Yes | `true` = React Router `<Link>`, `false` = `<a target="_blank">`. |
| `links[].social` | Yes | `true` renders the `icon` instead of `name`, used for social media links. |
| `links[].icon` | No | Font Awesome class string for social links (e.g., `"fa-brands fa-instagram"`). |
| `links[].childLinks` | No | Array of the same link object shape. Creates a static dropdown for that nav item. **For the Galleries nav link, always leave this as `[]`** — the app automatically populates it from `galleries.json` at runtime (showing individual galleries when there are 2 or more, or a plain link when there is only one). Use `childLinks` only when you need a hand-authored dropdown for a non-gallery nav item. |

---

### galleries.json

**Location:** `content/data/galleries.json`  
**Fetched at:** runtime by GalleryIndex and Header.

The gallery manifest. Lists every gallery on the site. When 2 or more galleries are present, the nav automatically renders a dropdown listing them.

```json
{
  "title": "My Galleries",
  "galleries": [
    {
      "slug": "spring-2025",
      "title": "Spring 2025",
      "coverImage": "https://your-cdn.example.com/images/spring-2025/cover.jpg",
      "description": "A beautiful selection from spring 2025."
    },
    {
      "slug": "market",
      "title": "Market Collection",
      "coverImage": "https://your-cdn.example.com/images/market/cover.jpg",
      "description": "Pieces from the summer market series."
    }
  ]
}
```

| Field | Required | Description |
|---|---|---|
| `title` | Yes | Heading shown on the gallery index page. |
| `galleries[].slug` | Yes | URL-safe identifier. Used in the route (`/gallery/{slug}`) and to locate the data file (`gallery-{slug}.json`). |
| `galleries[].title` | Yes | Display name shown on the gallery index card and in the nav dropdown. |
| `galleries[].coverImage` | No | Image URL shown on the gallery index card. Can be external (CDN, Picsum, etc.). |
| `galleries[].description` | No | Short description shown on the gallery index card. |

---

### gallery-{slug}.json

**Location:** `content/data/gallery-{slug}.json`  
**Fetched at:** runtime when a user navigates to `/gallery/{slug}`.

One file per gallery. Each item becomes a carousel slide with its own shareable URL (`/gallery/{slug}/{image-title-slug}`). The title is slugified automatically (lowercased, spaces replaced with hyphens).

```json
{
  "title": "Spring 2025",
  "baseUrl": "https://your-cdn.example.com/images/spring-2025/",
  "sliderButtonLocations": "bottom",
  "labelOverrides": {
    "purchaseDirect": "Buy on Etsy",
    "purchaseBot": "Request This Piece"
  },
  "items": [
    {
      "fileName": "piece-001.jpg",
      "imageUrl": "",
      "lightboxUrl": "https://www.deviantart.com/your-page/art/piece-001",
      "title": "Spring Bloom",
      "altText": "Watercolor painting of spring flowers in pink and yellow",
      "landscape": false,
      "description": [
        {
          "display": true,
          "header": false,
          "emphasis": false,
          "text": "Hand-painted watercolor on 300gsm cold-press paper.",
          "alignment": "center"
        }
      ],
      "actions": {
        "purchase": { "storeUrl": "https://www.etsy.com/your-shop/listing/12345" },
        "sample": { "botEndpoint": "mailto:you@example.com?subject=Sample+Request" },
        "useCase": { "fileUrl": "https://your-cdn.example.com/docs/spring-bloom-how-to.pdf" }
      }
    }
  ]
}
```

**Top-level fields:**

| Field | Required | Description |
|---|---|---|
| `title` | Yes | Gallery heading displayed above the carousel. |
| `baseUrl` | Yes | Base URL prepended to `fileName` to build the image URL. Can be empty if using `imageUrl` on every item. |
| `sliderButtonLocations` | Yes | Where to show mobile slider buttons: `"top"`, `"bottom"`, or `"both"`. |
| `labelOverrides` | No | Override any `galleryButtonLabels` from `site.config.json` for this gallery only. |

**Item fields:**

| Field | Required | Description |
|---|---|---|
| `fileName` | Yes | Image filename. Combined with `baseUrl` to build the URL unless `imageUrl` is set. |
| `title` | **Yes** | Image title shown in the caption and used to build the shareable URL slug. The app throws a startup error if any item is missing this field. |
| `altText` | Yes | Accessible alt text for the image. |
| `landscape` | Yes | `true` if the image is wider than it is tall. Adjusts the CSS aspect-ratio class. |
| `imageUrl` | No | Full URL for the image. Overrides `baseUrl + fileName`. Use for external sources (DeviantArt, Picsum, etc.). |
| `lightboxUrl` | No | URL shown as a "View Original" link inside the lightbox. |
| `description` | No | Array of paragraph objects shown below the carousel. |
| `description[].display` | Yes | Whether to render this paragraph. |
| `description[].header` | Yes | Renders as a `<strong>` block if `true`. |
| `description[].emphasis` | Yes | Renders in italics if `true`. |
| `description[].text` | Yes | Paragraph content. Supports basic HTML. |
| `description[].alignment` | Yes | `"left"`, `"center"`, or `"right"`. |
| `actions` | No | Action buttons shown below the carousel. Omit the whole object or individual slots to hide buttons. |
| `actions.purchase` | No | Purchase button. Uses `purchaseDirect` label if `storeUrl` is set, `purchaseBot` label if `botEndpoint` is set. |
| `actions.sample` | No | Sample button. Uses `sampleDirect` or `sampleBot` label. |
| `actions.useCase` | No | Use-case button. Uses `useCaseDirect` or `useCaseBot` label. |
| `actions.*.storeUrl` | No | Opens this URL directly in a new tab. Takes priority over `botEndpoint`. |
| `actions.*.fileUrl` | No | Opens this file URL directly in a new tab. Takes priority over `botEndpoint`. |
| `actions.*.botEndpoint` | No | Fallback URL (mailto, form, chatbot endpoint) when no direct URL is set. |

---

### page-{slug}.json

**Location:** `content/data/page-{slug}.json`  
**Fetched at:** runtime when a user navigates to `/page/{slug}` or `/` (if `homePage` is configured).

Drives informational pages (Home, About, etc.). Each page is a grid of rows and columns containing `info` (text) or `image` components.

```json
{
  "name": "about",
  "header": "About Me",
  "layout": {
    "rows": [
      { "order": 1, "numberOfColumns": 1 },
      { "order": 2, "numberOfColumns": 2 }
    ]
  },
  "components": [
    {
      "active": true,
      "row": 1,
      "order": 1,
      "columnPosition": "left",
      "componentType": "info",
      "paragraphs": [
        {
          "display": true,
          "header": false,
          "emphasis": false,
          "text": "Welcome to my studio.",
          "alignment": "center"
        }
      ]
    },
    {
      "active": true,
      "row": 2,
      "order": 1,
      "columnPosition": "left",
      "componentType": "image",
      "imageFiles": [
        {
          "htmlTitle": "Studio Shot",
          "htmlAltText": "My studio workspace",
          "fileName": "studio.jpg",
          "imageUrl": "https://your-cdn.example.com/images/studio.jpg",
          "landscape": true,
          "description": null
        }
      ],
      "imageSlider": {
        "auto": false,
        "timer": 0,
        "arrowIcons": "fas fa-chevron-circle",
        "size": "100%"
      }
    }
  ]
}
```

**Field reference:**

| Field | Required | Description |
|---|---|---|
| `name` | Yes | Internal identifier for the page. |
| `header` | Yes | `<h1>` shown at the top of the page. Leave empty string for no heading. |
| `layout.rows[].order` | Yes | Sort key for the row. |
| `layout.rows[].numberOfColumns` | Yes | Number of Bootstrap columns in this row (1–3). |
| `components[].active` | Yes | `false` hides this component without deleting it. |
| `components[].row` | Yes | Which row (by `order`) this component belongs to. |
| `components[].order` | Yes | Position within the row. |
| `components[].columnPosition` | Yes | `"left"`, `"center"`, or `"right"`. |
| `components[].componentType` | Yes | `"info"` for a text block, `"image"` for an image or image slider. |
| `paragraphs` | No | Used with `componentType: "info"`. Array of paragraph objects (same structure as gallery item `description`). |
| `imageFiles` | No | Used with `componentType: "image"`. Array of image objects. More than one image triggers the slider. |
| `imageFiles[].htmlTitle` | Yes | Image title (used for SEO when `setHelmetInfo` is active). |
| `imageFiles[].htmlAltText` | Yes | Accessible alt text. |
| `imageFiles[].fileName` | Yes | File name. Combined with `imageUrl` or CDN base to build the source. |
| `imageFiles[].imageUrl` | No | Full image URL. Overrides the fileName-based URL. |
| `imageFiles[].landscape` | No | Adjusts display for wide images. |
| `imageSlider` | No | Configures the slider when `imageFiles` contains multiple images. |
| `imageSlider.auto` | Yes | `true` to auto-advance slides. |
| `imageSlider.timer` | Yes | Auto-advance interval in milliseconds (e.g., `5000` for 5 sec). Ignored if `auto` is `false`. |
| `imageSlider.arrowIcons` | No | Font Awesome icon class prefix for the slider arrows (e.g., `"fas fa-chevron-circle"`). |
| `imageSlider.size` | No | CSS width value for the rendered image (e.g., `"70%"`, `"100%"`). |

---

## Logos

Two logo files are required in `src/assets/`:

| File | Usage | Recommended size |
|---|---|---|
| `Logo.png` | Desktop navbar | 260 × 105 px |
| `LogoAlt.png` | Mobile navbar (collapsed) | 130 × 105 px |

Both should be PNGs with a transparent background so they work across all theme colour schemes. The Navbar component automatically switches between them at the Bootstrap `lg` breakpoint (992 px).

---

## Changing the Home Page

By default, the root URL (`/`) shows the **gallery index** — a card grid of all galleries listed in `galleries.json`. This is the right choice for most crafters whose primary content is their galleries.

If a client needs an informational landing page at `/` instead (a welcome message, a bio, an intro image, etc.), set the `homePage` field in `src/ConfigFiles/site.config.json`:

```json
"homePage": { "slug": "home", "title": "Home", "dataFile": "page-home.json" }
```

Then create the corresponding data file at `content/data/page-home.json` (see [page-{slug}.json](#page-slugjson) for the format).

When `homePage` is set:
- `/` renders the informational page from `page-home.json`
- The gallery index moves to `/galleries` (linked from the navbar Galleries item)
- The nav link for Galleries should point to `/galleries` rather than `/`

When `homePage` is **not set** (the default):
- `/` is the gallery index
- The nav Galleries link should point to `/`
- No `page-home.json` is needed

---

## Adding a New Gallery

1. Create `content/data/gallery-{slug}.json` with the gallery's items (see [gallery-{slug}.json](#gallery-slugjson)).
2. Add an entry to `content/data/galleries.json` pointing to the new slug.
3. Upload the gallery images to your CDN/S3 bucket.
4. If you now have 2 or more galleries, the nav dropdown appears automatically — no changes to `navigation.json` needed.
5. Run `npm run build` to regenerate the sitemap and prerender all image routes.

---

## Lead Time Calculator

The lead time calculator is a standalone interactive widget that lets a visitor enter a deadline date and select a product type, then instantly receives a verdict on whether delivery is realistic. It is driven entirely by a JSON data file — no code changes are required to deploy it for a new client.

### How it works

The visitor selects a product type (each with its own min/max shipping window) and enters their deadline date. The component computes days remaining and returns one of four verdict tiers:

| Tier | Condition | Variant |
|---|---|---|
| **Clear** | days ≥ max shipping + build buffer | `good` |
| **Clear with note** | days ≥ max shipping | `good` |
| **Tight** | days ≥ min shipping | `tight` |
| **Too tight** | days < min shipping | `tight` |

Two edge cases are handled automatically: no date selected, and a date already in the past.

### Adding a calculator

1. Create `content/data/calculator-{slug}.json` (copy from `NewSiteSampleFiles/public/data/calculator-lead-time.json`).
2. Add an entry to `calculators` in `src/ConfigFiles/site.config.json`:
   ```json
   "calculators": [
     { "slug": "timeline", "title": "Will It Arrive In Time?", "dataFile": "calculator-lead-time.json" }
   ]
   ```
3. The route `/calculator/timeline` is created automatically.
4. Add a nav link in `content/data/navigation.json` pointing to `/calculator/timeline` if needed.

### calculator-{slug}.json reference

```json
{
  "eyebrow": "Optional label above the headline",
  "headline": "Will it arrive in time?",
  "subtext": "Short description shown below the headline.",
  "footnote": "Optional small-print text shown at the bottom of the card.",
  "dateLabel": "Reveal / install date",
  "productLabel": "Piece you're considering",
  "buttonText": "Check my timeline",
  "buildBufferDays": 5,
  "productTypes": [
    { "id": "canvas", "label": "Canvas", "shippingLabel": "4–8 days", "minDays": 4, "maxDays": 8 }
  ],
  "verdicts": {
    "noDate":       { "variant": "tight", "label": "...", "headline": "...", "detail": "...", "showCta": false },
    "past":         { "variant": "tight", "label": "...", "headline": "...", "detail": "...", "showCta": false },
    "clear":        { "variant": "good",  "label": "...", "headline": "...", "detail": "...", "showCta": true, "ctaText": "Browse →", "ctaUrl": "/gallery" },
    "clearWithNote":{ "variant": "good",  "label": "...", "headline": "...", "detail": "...", "showCta": true, "ctaText": "Browse →", "ctaUrl": "/gallery" },
    "tight":        { "variant": "tight", "label": "...", "headline": "...", "detail": "...", "showCta": true, "ctaText": "Available now →", "ctaUrl": "/gallery" },
    "tooTight":     { "variant": "tight", "label": "...", "headline": "...", "detail": "...", "showCta": true, "ctaText": "Get in touch →", "ctaUrl": "/page/contact" }
  }
}
```

Verdict `headline` and `detail` support these interpolation tokens: `{days}`, `{productLabel}`, `{minDays}`, `{maxDays}`.

### Theming

All colours are exposed as CSS custom properties that fall back to the site theme tokens:

| Token | Controls | Default fallback |
|---|---|---|
| `--lead-calc-paper` | Card background | `--body-bg` |
| `--lead-calc-ink` | Text colour | `--font-color` |
| `--lead-calc-ink-soft` | Muted text | `--secondary-font-color` |
| `--lead-calc-accent` | Focus rings, active option borders | `--accent-color` |
| `--lead-calc-accent-deep` | Hover states | `#5F6E58` |
| `--lead-calc-eyebrow` | Eyebrow label colour | `--accent-color` |
| `--lead-calc-good-bg` | "Clear" verdict background | `rgba(107,128,104,0.07)` |
| `--lead-calc-good-color` | "Clear" verdict text | `#5F6E58` |
| `--lead-calc-tight-bg` | "Tight" verdict background | `rgba(143,163,172,0.10)` |
| `--lead-calc-tight-color` | "Tight" verdict text | `#5B7078` |
| `--lead-calc-btn-bg` | Button background | `--font-color` |
| `--lead-calc-btn-bg-hover` | Button hover background | `--lead-calc-accent-deep` |

Add any overrides to the client's active `:root` block in `src/theme.css`.

---

## Adding a New Page

1. Create `content/data/page-{slug}.json` (see [page-{slug}.json](#page-slugjson)).
2. Add an entry to `pages` in `src/ConfigFiles/site.config.json`:
   ```json
   { "slug": "contact", "title": "Contact", "dataFile": "page-contact.json" }
   ```
3. Add a nav link to `content/data/navigation.json` with `"url": "/page/contact"`.
4. Increment `cacheVersion` in `site.config.json` to bust cached navigation data on the next visit.

---

## Theming

All design tokens live in `src/theme.css`. Six named presets are included in `NewSiteSampleFiles/theme.css`:

| Preset | Description |
|---|---|
| Purple | Cool purple accent, light backgrounds |
| Warm Rose | Warm pink and rose tones |
| Forest Teal | Natural greens and teals |
| **Dark Studio** | High-contrast dark mode *(default)* |
| Monochrome | Greyscale with a black accent |

### Switching Presets

Open `src/theme.css`. The active preset has an uncommented `:root { ... }` block. Inactive presets are wrapped in `/* ... */`. To switch:

1. Wrap the current active block in `/* ... */`.
2. Unwrap the desired preset by removing its surrounding `/* ... */`.

### Customisable Tokens

| Token | Controls |
|---|---|
| `--body-bg` | Page background |
| `--primary-color` | Card background |
| `--alt-primary-color` | Secondary card background |
| `--accent-color` | Highlight colour — borders, button outlines, active states |
| `--accent-color-dimmed` | Box shadows |
| `--nav-bg` / `--nav-bg-hover` | Navbar link background / hover |
| `--nav-font-color` | Navbar link text colour |
| `--font-color` | Body text |
| `--secondary-font-color` | Muted / secondary text |
| `--body-font` / `--header-font` / `--link-font` | Font families (any Google Font or system stack) |
| `--carousel-bg` / `--carousel-radius` / `--carousel-shadow` | Carousel panel |
| `--arrow-size` / `--arrow-bg` / `--arrow-color` | Navigation arrow buttons |
| `--thumb-size` / `--thumb-gap` / `--thumb-ring` / `--thumb-ring-width` | Thumbnail strip |
| `--lightbox-bg` | Lightbox overlay background |
| `--lightbox-close-bg` / `--lightbox-close-color` | Lightbox close button |
| `--lightbox-btn-bg` / `--lightbox-btn-color` / `--lightbox-btn-radius` | Lightbox action button |
| `--counter-color` / `--counter-font-size` | Image counter and Share button |
| `--caption-color` / `--caption-font-size` | Image title below the carousel |
| `--desc-color` / `--desc-font-size` | Description paragraph text |
| `--nav-mobile-dropdown-mx` | Mobile dropdown inset: `0rem` = full-bleed edge to edge, `1rem` = inset |

### Creating a Custom Theme

Copy any existing preset block, give it a new comment header, activate it, and adjust the token values. No code changes required — all components consume the tokens via `var(--token-name)`.

---

## Google Analytics

1. Create or log into [Google Analytics](https://analytics.google.com) and create a new property for the site.
2. Copy the **Global Site Tag (gtag.js)** snippet from the property's Tagging Instructions.
3. Paste it into the `<head>` section of `index.html` at the project root (this file is committed — it is not gitignored).

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

4. Run `npm run build` so the tag is compiled into the bundle.

---

## Available Scripts

```bash
npm run dev           # Start local dev server at http://localhost:3000
npm run build         # Full production build (see below)
npm run preview       # Serve the build/ folder locally to verify before deploying
npm run setup-client  # Interactive wizard to scaffold a new client's config files
```

### `npm run build` — four steps in sequence

1. **`generate-sitemap.js`** — reads `galleries.json` and `site.config.json`, then writes `content/sitemap.xml` and `content/robots.txt`.
2. **`tsc`** — TypeScript type-check. Fails the entire build on any type error.
3. **`vite build`** — bundles and minifies the app into `build/`.
4. **`prerender.js`** — uses Playwright to visit every route (root, each gallery, each gallery image, each page) and writes a static HTML file per route into `build/`. Each HTML file contains the correct `<title>` and `og:*` meta tags so social share previews work without a server.

---

## Deployment

### S3 Bucket Layout

All content lives in a single S3 bucket. The structure after a full deploy looks like this:

```
s3://your-bucket/
├── index.html                          ← root entry point (from build/)
├── assets/                             ← JS/CSS bundles (from build/assets/)
├── gallery/                            ← prerendered HTML per image route (from build/)
│   └── spring-2025/
│       ├── index.html                  ← /gallery/spring-2025
│       └── mountain-vista/
│           └── index.html             ← /gallery/spring-2025/mountain-vista
├── page/                               ← prerendered HTML per page route (from build/)
│   └── about/
│       └── index.html
├── data/                               ← JSON data files (from content/data/)
│   ├── galleries.json
│   ├── gallery-spring-2025.json
│   └── navigation.json
├── favicon.png                         ← from content/
├── robots.txt
├── sitemap.xml
└── images/                             ← gallery images, uploaded separately
    └── spring-2025/
        ├── cover.jpg
        ├── piece-001.jpg
        └── piece-002.jpg
```

Images are uploaded to S3 separately from the build — they are not part of the repository or the `content/` folder. Upload them directly to the bucket with your S3 client or the AWS CLI:

```bash
aws s3 sync ./my-local-photos/spring-2025 s3://your-bucket/images/spring-2025/
```

Set `baseUrl` in the corresponding `gallery-spring-2025.json` to point at the bucket (directly or via CloudFront):

```json
"baseUrl": "https://cdn.yoursite.com/images/spring-2025/"
```

> **Important — avoid path collisions:** images must live under a prefix that does **not** start with `/gallery/`. The prerendered HTML files already occupy paths like `/gallery/spring-2025/mountain-vista/`. If an image were stored at `/gallery/spring-2025/piece-001.jpg`, CloudFront would serve the raw image file at that path instead of routing the request through the React app. Using `/images/` as the prefix keeps images and app routes in separate namespaces.

### Deploy Steps

1. Run `npm run build`.
2. Upload the contents of `build/` to the root of your S3 bucket.
3. Upload the contents of `content/` to the same bucket — or a separate CDN bucket if `dataBaseUrl` in `site.config.json` points elsewhere.
4. Upload gallery images to `s3://your-bucket/images/{gallery-slug}/` (or your chosen image prefix).
5. Configure CloudFront to serve the correct prerendered `index.html` for each path rather than always falling back to the root `index.html`. This ensures social crawlers receive the right `og:title` and `og:image` for gallery image deep-links.

### Cache busting

To force all visitors to re-fetch data files after a content update, increment `cacheVersion` in `site.config.json` (e.g., `"v1"` → `"v2"`) and rebuild.

---

## Contributing

This project is open source under the [MIT License](LICENSE), maintained by [steven-meehan](https://github.com/steven-meehan).

**To contribute:**

1. Clone the repository and create a feature branch: `git checkout -b feature/your-feature-name`.
2. Follow the [Setting Up a New Client](#setting-up-a-new-client) steps to get a working local environment (the client-specific files are gitignored and must be created from the sample templates).
3. Make your changes. Run `npx tsc --noEmit` to confirm TypeScript is clean before committing.
4. Open a pull request against `master` with a clear description of what changed and why.

**Please do not** commit client-specific files (`content/`, `src/assets/`, `src/ConfigFiles/*.json`, `src/theme.css`, `src/index.css`) — these are gitignored for a reason. Sample templates belong in `NewSiteSampleFiles/`.

Bug reports and feature requests are welcome via [GitHub Issues](https://github.com/steven-meehan/crafter-gallery-site/issues).
