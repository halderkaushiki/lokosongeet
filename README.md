# Lokokatha: Digital Folklore Archive (phase 1 prototype)

Static front end: `index.html`, `style.css`, `app.js`. No build step. Open `index.html` in a browser, or run `npx serve .` / the VS Code Live Server extension.

## What exists
- Homepage, navigation, Bengali/English toggle (hero and nav only), dark mode
- Archive search and category filters, region cards, compare tray (max 5, metadata table only)
- Daily discovery, animated ektara illustration (pluck, sound, part facts), motif logo and dividers
- All songs, documents and figures are **sample data** in `app.js` (`S`, `D` arrays)

## Palette (Turmeric)
Umber `#4a2e0f`, turmeric `#e0a100`, cream `#fff6dc`, chilli red `#b5381f`, text `#2b1d0c` (CSS variables at the top of `style.css`, dark-mode values below)

## Fonts
Playfair Display (headings), Source Sans 3 (body), Noto Serif Bengali (Bengali), loaded from Google Fonts in `index.html`

## Not built yet (planned order)
1. Song pages with the full archive fields
2. Document upload, OCR and text extraction
3. Authentication and roles
4. AI comparison tool, research assistant, verification workflow
5. Community features, reading mode, collections

## Suggested stack
Next.js + TypeScript, PostgreSQL with pgvector (semantic search), S3-compatible storage for uploads, a server-side AI layer (Claude API) for OCR clean-up, verification, comparison and the assistant. API keys live only in server environment variables, never in front-end code.
