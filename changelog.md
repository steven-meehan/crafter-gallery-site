# Crafter Gallery Site

## vNext

---

## 2.1.0

### Gallery Index
- Gallery cards are now fully clickable links — the entire card is the interactive element, not just the "View Gallery" button
- Card body (title, description, "View Gallery" button) slides up from the bottom of the image on hover — editorial overlay effect replacing the previous below-image layout
- Cover images standardised to a 4:3 aspect ratio with `object-fit: cover` — eliminates distortion from varying source dimensions
- Subtle image zoom (`scale(1.06)`) and card lift (`translateY(-4px)`) on hover
- Persistent dark gradient at the card bottom ensures title text is readable regardless of image content
- "View Gallery" button filled by default with the accent colour; inverts to outline on hover
- Removed redundant Bootstrap `cardHover` prop from gallery cards — all hover behaviour is now CSS-driven
- Gallery cards fade in on first viewport entry via `IntersectionObserver` with a staggered per-card delay (scroll reveal)
- Skeleton loading replaces the spinner while `galleries.json` loads: placeholder cards with a shimmer animation match the grid layout; card count is read from the session storage cache so the skeleton matches the actual gallery count on repeat visits, falling back to 3 on first load

### Navigation
- Desktop dropdown: removed border, border-radius, and background box — menu items appear cleanly against the page without a panel
- Small gap (`0.4rem`) added between the dropdown trigger and the menu
- Dropdown item font size is now dynamic — `1em` for 5 or fewer active items, `0.8em` for 6 or more

### Carousel
- Image crossfade transition smoothed from `0.2s` to `0.35s`
- Landscape max-height adjusted to `60vh`, portrait to `70vh` for more consistent stage framing

### Typography
- Global heading scale introduced via `clamp()` — fluid `h1` from `2rem` to `3.25rem`; `h2` from `1.5rem` to `2.25rem`; tighter `line-height` values throughout; `letter-spacing` tightened on headings

### Page Transitions
- Fade-in and 6px upward slide on every route change via a `PageTransition` wrapper component keyed to the current pathname; keyframe defined in `App.module.css`

### Footer
- Increased vertical padding to `1.75rem` top and bottom
- Border replaced with a refined `rgba(128,128,128,0.25)` rule via `Footer.module.css`

### Fulfillment Calculator
- New generic `LeadTimeCalculator` component — an interactive widget where visitors enter a deadline date, select a product type, and instantly receive a tiered verdict on whether fulfillment is realistic
- All copy, product types, shipping windows, build buffer, verdict text, and CTA links are driven by a `calculator-{slug}.json` data file — zero code changes required to deploy for a new client
- Verdict headline and detail support `{days}`, `{productLabel}`, `{minDays}`, `{maxDays}` interpolation tokens for dynamic copy
- Registered via the `pages` array in `site.config.json` using `"type": "calculator"` — same registration pattern as static pages; route created at `/calculator/{slug}`
- Optional `markUrl` field in the data file renders the client's own logo or mark above the card and as a faint watermark inside the verdict panel; omit the field and neither renders
- Navigation link added via `navigation.json` like any other nav entry — no special handling
- All design tokens exposed as `--lead-calc-*` CSS custom properties falling back to site theme tokens; fully overridable per client in `theme.css`
- Page marked `noindex` — it is a conversion tool, not an SEO target
- `white-space: nowrap` added to `.navigationLinks` to prevent nav labels wrapping to two lines
- Sample data file at `NewSiteSampleFiles/public/data/calculator-lead-time.json` uses generic crafter copy (deadline, product, fulfillment) rather than any client-specific language

## 2.0.2
### Bug Fixes
- Fixed `.gitignore` blanket `*.css` rule that was silently excluding all component CSS modules from the repository; replaced with targeted exclusions and explicit negations for `src/**/*.module.css` and `src/theme.css`
- All previously-untracked CSS module files are now committed
- Fixed navigation dropdown z-index: `<header>` set to `z-index: 1050`, dropdown wrapper to `1051`, so the menu always renders above page content

## 2.0.1
### Bug Fixes
- Fixed broken CSS module import in `ImageProcessor.tsx` — path referenced `SiteImage.module.css` via a redundant `../Images/` prefix; replaced with Bootstrap utility classes (`d-flex justify-content-center`) and removed the import entirely
- Deleted orphaned duplicate `SiteImage.module.css` (identical content to `Image.module.css`)
- Centred informational page `<h1>` headers via `text-center`

## 2.0.0

### Architecture & Tooling
- Migrated from CRA to Vite 5; build output moved to `build/`, static assets folder renamed `public/` → `content/`
- Purged all dead files: old `.scss` files, stale routing config JSONs, orphaned gallery data files, `dist/` folder, and dead `Routing/` subfolders
- Added `/.claude` to `.gitignore`

### Theming
- All design tokens consolidated into `src/theme.css` with 6 named presets (Purple, Warm Rose, Forest Teal, Dark Studio, Monochrome)
- `--nav-mobile-dropdown-mx` variable controls mobile dropdown layout (full-bleed vs. inset)
- WCAG 2.1 AA contrast fixes applied across all presets

### Navigation
- Header border reduced to bottom accent separator only
- Gallery dropdown auto-built from `galleries.json`; only appears with 2+ galleries; full-bleed edge-to-edge on mobile
- Desktop nav items given horizontal spacing

### Gallery & Carousel
- Image deep-links via slugified titles (`/gallery/:slug/:imageSlug`) with clipboard Share button
- Prerender generates static HTML per image route for correct social share previews (`og:title`, `og:image`)
- Runtime error thrown for gallery items missing a `title` field
- Arrow buttons replaced with centered SVG chevrons
- Fixed bug: carousel navigation was re-fetching gallery JSON on every image change

### SEO
- All pages (`GalleryIndex`, `GalleryView`, `Page`) now have full Helmet with `og:*` and `twitter:*` tags
- Per-image og:title format: `Image Title — Gallery Title — Site Name`

### Polish
- `GalleryIndex` cards use the theme `Card` component instead of raw Bootstrap white cards
- `Alignment` enum casing fixed (`right` → `Right`)
- Demo `site.config.json` populated with realistic values
- `Page` component Helmet completed with `og:image:alt` and `twitter:image:alt` tags, consistent with `GalleryIndex` and `GalleryView`

### Sample Files
- Renamed `NewSiteSampleFiles/public/data-files/` → `NewSiteSampleFiles/public/data/` to match the `dataBaseUrl: "/data/"` convention
- Fixed `page-home.json` and `page-about.json` sample files: component `row` values were 0-indexed but the page renderer matches against 1-indexed layout row orders, causing pages to render blank

## 1.0.0
- Retrieve content from data files
- Render informational pages (Home, Not Found, etc.)
- Render image galleries
- Gracefully handle HTTP errors
