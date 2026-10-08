# wdd231

Repository for BYU-Pathway WDD 231 (Web Frontend Development I) coursework.

## Week 1 — Course Home Page

### What I built

A personal Course Home Page (`index.html`) using semantic HTML, mobile-first CSS, and vanilla
JavaScript.

1. **Folder structure** at the project root:
   - `images/` → `logo.svg` (site logo) and `student-photo.webp` (student portrait)
   - `styles/` → `normalize.css`, `small.css` (mobile-first base styles), `larger.css`
     (media query for larger screens)
   - `scripts/` → `navigation.js` (hamburger menu), `date.js` (copyright year + last-modified
     date), `course.js` (course data + filtering)
2. **`index.html`** built with semantic HTML:
   - `<header>` with an SVG logo, my name in a `<span>`, and a hamburger button for small screens.
   - `<nav>` with links to Home, Chamber Project (week 2), and Final Project (week 6).
   - `<main>` with "About Me", "Student Photo", and a "Web Certificate Courses" section that
     lists courses dynamically via `course.js`, with All / CSE / WDD filter buttons and a
     running credit total.
   - `<footer>` with social links (GitHub, LinkedIn, and a couple of extras), a dynamically
     generated copyright year (`#currentyear`), and the document's last-modified date
     (`#lastModified`), both filled in by JavaScript.
3. **Linked everything correctly in `<head>`** — `styles/normalize.css`, `styles/small.css`, and
   `styles/larger.css` as stylesheets, and `scripts/navigation.js`, `scripts/date.js`, and
   `scripts/course.js` as `defer`red scripts so the DOM is ready before they run.

### Result

- `index.html` — the graded Course Home Page.

### Revisions

- **Color contrast fix** (reviewer feedback: color contrast issues) — three default-visible
  text/background pairs in `styles/small.css` failed WCAG AA's 4.5:1 ratio:
  - `.filter-buttons button.filter-active` (white text on the `--color-accent` orange, ~2.4:1) →
    switched the text color to `--text-main` (~6.5:1).
  - `.course-card.completed .status` (`--completed-border` green text on `--completed-bg`,
    ~2.7:1) → darkened `--completed-border` to `#1f7a37` (~4.8:1).
  - `.course-card.not-completed .status` (`--not-completed-border` red text on
    `--not-completed-bg`, ~3.5:1) → darkened `--not-completed-border` to `#b3413d` (~4.9:1).
  - Both status colors doubled as the card border color, so darkening the CSS custom properties
    fixed the failing text without touching the borders or markup.

## Week 2 — Chamber of Commerce Directory

### What I built

A Chamber of Commerce member directory page (`chamber/directory.html`) that fetches business
data from a JSON file and renders it with JavaScript, plus a responsive header/footer shared
with the rest of the site.

1. **Folder structure** under `chamber/`:
   - `data/members.json` → an array of at least 8 member businesses, each with name, address,
     phone, image, url, category, tagline, and a `membership` level (1 = Member, 2 = Silver,
     3 = Gold).
   - `images/` → member logos referenced from `members.json`.
   - `scripts/` → `navigation.js` (shared hamburger menu), `date.js` (footer year/last-modified),
     `directory.js` (fetches and renders the member cards, handles grid/list toggling).
   - `styles/` → `normalize.css`, `small.css`, `larger.css` — same mobile-first pattern as the
     root site.
2. **`directory.js`**:
   - Used `async`/`await` with the Fetch API to load `data/members.json` and a `try/catch` to
     show a friendly error message if the fetch fails.
   - Built each member card dynamically with `document.createElement` and template literals,
     including a color-coded membership badge (Member / Silver / Gold).
   - Added **Grid** and **List** view toggle buttons that swap a CSS class on the container,
     update `aria-pressed`, and persist the chosen view in `localStorage` so it's remembered
     between visits.
3. **`directory.html`** — semantic layout with a `<header>` (logo + business name), `<nav>`
   (Home / Directory / Join), a `<main>` containing the member count and the `#members-container`
   (marked `aria-live="polite"` so screen readers announce updates), and a `<footer>` with
   contact info, dynamic copyright year, and last-modified date.
4. **Accessibility & SEO basics** — descriptive `alt` text on logos, `aria-label`/`aria-pressed`
   on the view buttons, a meta description, and Open Graph tags for link previews.
5. **Favicon** — linked `images/favicon.ico` (root) as the `<link rel="icon">` on both
   `index.html` and `chamber/directory.html` (via the relative path `../images/favicon.ico`)
   so the browser tab icon is consistent across pages.

### Result

- `chamber/directory.html` — the graded Chamber Directory page.

## Week 3 — Chamber Home Page

### What I built

The Chamber of Commerce **home (landing) page** (`chamber/index.html`), sharing the same
header/nav/footer pattern as `directory.html`, with a hero banner, call to action, events list,
live weather widget, and randomized member spotlight cards.

1. **`chamber/index.html`**:
   - Copied `directory.html` as a starting template so the header, navigation (with `Home` now
     marked `active`), and footer stayed consistent across pages.
   - **Hero section** — a scalable inline `<img>` (`chamber/images/hero.svg`, a hand-built SVG
     skyline) instead of a CSS background image, so it scales cleanly at any size, plus a
     text/CTA overlay.
   - **Call to action** — a `Join the Chamber` button-styled link pointing to the not-yet-built
     `join.html`.
   - **Upcoming Events** — a static list of three chamber events (date, name, location) grouped
     with the weather section in a `.home-columns` flex wrapper on larger screens.
   - **Weather section** — current temperature/description plus a 3-day forecast, filled in by
     `scripts/weather.js`.
   - **Member Spotlights** — two or three randomly chosen Gold/Silver member cards, filled in by
     `scripts/spotlights.js`.
2. **`scripts/weather.js`**:
   - Two `async`/`await` fetch calls to the **OpenWeatherMap** current-weather and 5-day/3-hour
     forecast endpoints for Makati, PH, each wrapped in `try/catch` with a friendly fallback
     message on failure.
   - The forecast response returns readings every 3 hours, so I filter for the `12:00:00`
     reading on each of the next 3 days to build one labeled forecast card per day
     (day name, temperature, condition).
   - Requires a personal OpenWeatherMap API key dropped into the `apiKey` constant before the
     weather data will load.
3. **`scripts/spotlights.js`**:
   - Reused the existing `data/members.json` fetch pattern from `directory.js`.
   - Filters members down to `membership === 2` (Silver) or `3` (Gold) only, shuffles them with
     `Array.sort(() => Math.random() - 0.5)`, and slices a random count of 2–3 so a different
     set of spotlights appears on every page load/refresh.
   - Renders each spotlight card with company name, logo, phone, address, website link, and a
     color-coded membership badge (reusing the `.membership-badge` styles from Week 2).
4. **CSS (`styles/small.css` / `styles/larger.css`)**:
   - Added mobile-first styles for `.hero`, `.cta-button`, `.events-list`, `.weather-current`,
     `.forecast-grid`, and `.spotlights-grid`/`.spotlight-card`, reusing the existing `.card` and
     `.membership-badge` styles instead of duplicating rules.
   - In `larger.css`, the hero grows taller with left-aligned overlay text, the events and
     weather cards sit side by side in a `.home-columns` flexbox, and the spotlight grid expands
     to 2 then 3 columns — so the main content layout genuinely changes between mobile and larger
     viewports, not just font sizes.
   - Fixed a couple of deprecated `word-break: break-word` declarations (flagged by the CSS
     linter) to `overflow-wrap: break-word` while touching those rules.

### Lessons learned

- Building the home page as a copy of `directory.html` made the shared header/nav/footer
  trivial to keep consistent, but it meant double-checking every relative link (`index.html`
  active state, nav order) since a copy-paste page inherits the old page's assumptions.
- The OpenWeatherMap **free tier forecast endpoint** only returns 3-hour interval data, not a
  clean daily forecast — filtering for one `12:00:00` reading per day was a simple way to get a
  labeled 3-day forecast without a paid One Call subscription.
- Randomizing the spotlight selection with `Array.sort(() => Math.random() - 0.5)` is simple but
  not a perfectly uniform shuffle; good enough for 2–3 picks out of a handful of members, but
  worth remembering it's a naive shuffle if the member list grows much larger.
- Wrapping the events and weather cards in a flex container (`.home-columns`) that only applies
  `display: flex` inside the `min-width: 768px` media query was a cleaner way to reflow two
  cards side-by-side on larger screens than trying to do it with `inline-block` and fighting
  whitespace between inline elements.
- Reusing existing CSS custom properties and component classes (`.card`, `.membership-badge`)
  from Week 2 instead of writing new one-off styles kept the new sections visually consistent
  with the directory page with very little extra CSS.

## Week 4 — Chamber Membership Join Page

### What I built

A membership application form (`chamber/join.html`) and a matching confirmation page
(`chamber/thankyou.html`), following the same header/nav/footer pattern as the rest of the
Chamber site.

1. **`chamber/join.html`**:
   - A `get`-method form posting to `thankyou.html`, with every field wrapped in a `<label>`
     for accessibility: first/last name (`autocomplete="given-name"`/`"family-name"`), an
     organizational title field constrained with a `pattern` regex (letters, spaces, hyphens,
     7+ characters), email (with placeholder example and `autocomplete="email"`), mobile phone
     (`autocomplete="tel"`), business name (`autocomplete="organization"`), a membership level
     `<select>` (np/bronze/silver/gold), a description `<textarea>`, and a hidden `timestamp`
     field.
   - Four membership cards (NP, Bronze, Silver, Gold), each with a "Learn more" link that opens
     a matching HTML `<dialog>` modal listing that tier's benefits.
   - A CSS keyframe animation (`card-reveal`) fades/slides each membership card in on page load,
     staggered per card with `animation-delay` so the four cards do not appear all at once.
   - Mobile-first layout stacks the cards below the form; a `min-width: 768px` media query in
     `larger.css` switches `.join-layout` to `flex-direction: row` so the cards sit beside the
     form on larger screens.
2. **`scripts/join.js`**:
   - Sets the hidden `timestamp` field to the current date/time as soon as the page loads.
   - Wires up each "Learn more" link and modal close button to `dialog.showModal()` /
     `dialog.close()` using `data-modal-target`/`data-modal-close` attributes instead of
     hard-coding four nearly-identical click handlers.
3. **`chamber/thankyou.html`** + **`scripts/thankyou.js`**:
   - Because the form uses `method="get"`, the submitted values arrive as a query string on
     `thankyou.html`. `thankyou.js` reads them with `URLSearchParams` and writes each required
     field (first name, last name, email, phone, business name, timestamp) into a `<dl>` summary
     styled to match the rest of the site's `.card` components.
4. **CSS (`styles/small.css` / `styles/larger.css`)**:
   - Added `.join-form`, `.membership-cards`/`.membership-card`, `.benefits-modal`, and
     `.application-summary`/`.detail-row` rules, reusing existing color variables
     (`--color-primary`, `--color-accent`, `--silver-border`, `--gold-border`) instead of
     introducing a new palette just for this page.
   - Styled the native `<dialog>` element directly (including `::backdrop`) rather than
     building a modal from scratch with JavaScript-managed classes.

### Result

- `chamber/join.html` — the graded membership application form.
- `chamber/thankyou.html` — the confirmation page displaying the submitted application data.

### Lessons learned

- The native `<dialog>` element with `showModal()`/`close()` handles focus trapping, the
  backdrop, and `Esc`-to-close for free, which meant the four benefit modals needed almost no
  custom JavaScript beyond wiring up which button opens which dialog.
- Using `data-modal-target`/`data-modal-close` attributes plus a `forEach` over
  `querySelectorAll('.modal-link')` scaled cleanly to four modals without writing four separate
  near-duplicate event listeners — adding a fifth membership tier later would need zero new JS.
- A `method="get"` form is a simple way to pass structured data to a confirmation page without a
  backend: the browser automatically URL-encodes every named field into the query string, and
  `URLSearchParams` on the receiving page makes reading it back out straightforward.
- The `pattern` attribute's regex for the organizational title field (`[A-Za-z\s\-]{7,}`) only
  validates on submit by default; pairing it with a clear `title` attribute matters because that
  message is the only hint the user gets about *why* the field rejected their input.
- Triggering the card entrance animation with plain CSS `@keyframes` + staggered
  `animation-delay` per `:nth-child` avoided any JavaScript/IntersectionObserver complexity for
  what is ultimately a one-time, page-load-only effect.

## Week 5/6 — Individual Project Site Plan (Trentsy)

### What I built

A website plan document (`final/site-plan.html`) for my individual project, **Trentsy**, a
curated thrift/vintage fashion and lifestyle catalog site I'm building for my wife's small
business.

1. **Folder structure** under `final/`, mirroring the mobile-first pattern used everywhere else
   in the repo:
   - `images/` → `mobileView.jpg` and `desktopView.jpg`, photographed hand-drawn wireframe
     sketches of the home page at small and large viewport widths.
   - `styles/` → `normalize.css`, `small.css` (base styles + the plan's own color variables),
     `larger.css` (`min-width: 768px` media query).
   - `scripts/` → `date.js` (footer copyright year + last-modified date).
2. **`site-plan.html`** — a single page covering every required planning section: site name
   (`Trentsy`, with the reasoning behind it), site purpose, three target-audience scenarios, a
   color scheme swatch grid, a typography sample section, and the two wireframe images.
3. **Color scheme & typography** — reused the palette and fonts already established in the
   Trentsy prototype (`trentsy-backup/`) so the plan documents a scheme I'd already proven out:
   primary/dark teal, soft cream, card white, accent gold, and dark body text, paired with
   Cormorant Garamond (headings) and Montserrat (body/nav). The plan page itself is styled
   exclusively with this palette, per the assignment requirement.

### Testing

Self-checked the finished page with the tools suggested in the assignment before calling it done:

- **W3C Nu Html Checker** (validator.w3.org) — ran `final/site-plan.html` through the validator;
  no errors after fixing a couple of stray unescaped characters.
- **WebAIM Contrast Checker** — checked every text/background color pair from the swatch grid
  against the colors actually used as text. Caught one failure: `.placeholder-note` used
  `--accent-gold` (`#d4af37`) as text on a white card background, which only scores ~1.9:1
  (fails WCAG AA for normal text).
- **Lighthouse / DevTools** — ran an accessibility + best-practices pass on the local page to
  confirm heading order, alt text, and color contrast all checked out after the fix.

### Revisions

- **Color contrast fix** — added a dedicated `--accent-gold-text: #7a5e19` custom property (a
  darkened version of the accent gold) and switched `.placeholder-note` to use it instead of
  `--accent-gold` directly. That raises the contrast ratio against the white card background to
  a passing level while keeping `--accent-gold` itself available for non-text uses (borders,
  swatches, decorative accents) where contrast rules don't apply.

### Result

- `final/site-plan.html` — the graded individual project site plan.

### Lessons learned

- Running the contrast checker against every text color *as used*, not just the raw palette, is
  what caught the issue — `#d4af37` looks like a reasonable accent in the swatch circles, but it
  only fails once it's used as actual paragraph text on a light background. Splitting "decorative
  accent gold" from "text-safe gold" into two custom properties fixed it without losing the gold
  branding accent elsewhere on the page.
- Reusing the color/typography decisions already made in `trentsy-backup/` (my earlier prototype)
  meant the site plan's color-scheme and typography sections were documenting real, already-tested
  choices instead of picking colors from scratch and hoping they'd hold up to validation later.

## Week 6 — Individual Project Final Site (Trentsy)

### What I built

The graded 3-page Trentsy shop, replacing the old `trentsy-backup/` prototype with a real,
course-compliant build in `final/`.

- **Pages**: `index.html` (hero, categories, 6 featured products), `catalog.html` (full 18-item
  catalog with category + favorites filters), `contact.html` (pre-order form + contact info),
  and `form-action.html` (confirmation page, not one of the 3 graded pages).
- **Data & images**: `data/products.json` (18 products, 3 categories, 9 fields each) fetched with
  `fetch`/`try...catch`; replaced the prototype's hotlinked Unsplash photos with original,
  lightweight local SVG illustrations (logo, favicon, hero motif, 18 product icons).
- **ES modules** in `scripts/`: shared `data.mjs`, `render.mjs`, `modal.mjs`, `favorites.mjs`,
  `format.mjs` reused by page-entry modules `home.mjs`/`catalog.mjs`/`contact.mjs`/
  `form-action.mjs` — one render/modal/favorite implementation powers both the home and catalog
  grids.
- **Features**: accessible `<dialog>` quick-view modal, `localStorage` favorites + pre-order
  draft autosave, responsive hamburger nav, and a validated HTML form (fieldset/radio/select/
  datalist) that submits via `GET` to the confirmation page.

### Testing

Served the folder locally and drove it with Playwright: confirmed fetch/render, category and
favorites filtering, favorite persistence across reloads, native form-validation blocking empty
submits, no duplicate element IDs, 320px width with zero horizontal scroll, and per-page transfer
size (74–137 KB, well under the 500 KB budget).

### Revisions

- **Modal layout bug** — the modal's "Save to Favorites" button shared a `.favorite-btn` class
  with the absolutely-positioned card heart icon, so it inherited `position: absolute` and
  escaped the dialog's layout. Fixed by giving the modal button its own class.
- **Font weight trim** — the Google Fonts link requested several unused weights; trimmed it to
  only the weights actually used in CSS, cutting page weight further.

### Result

- `final/index.html`, `final/catalog.html`, `final/contact.html` — the three graded pages.
- `final/form-action.html` — confirmation page (not counted toward the 3-page requirement).

### Lessons learned

- Centralizing render/filter/modal logic in a few shared `.mjs` modules let `index.html` and
  `catalog.html` reuse the exact same product-card and quick-view code instead of duplicating it.
- Reusing a CSS class name across two visually different contexts (card heart vs. modal button)
  is an easy way to introduce layout bugs — scoping/renaming classes per component avoided it.
- Generating original SVG artwork instead of hotlinking stock photos sidestepped copyright
  concerns entirely and kept every page a fraction of the 500 KB budget.
- Scripting real interactions with Playwright (clicks, form fills, viewport resizing) caught the
  modal bug that a plain code read-through missed, and gave concrete numbers (page weight, scroll
  width) instead of guesses.


