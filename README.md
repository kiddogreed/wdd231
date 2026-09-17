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

