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

