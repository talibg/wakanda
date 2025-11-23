# Learn Wolof

A Next.js app for translating and learning Wolof (Senegal/Gambia). It includes:
- Dialect-aware translator (English ⇄ Wolof) with curated phrases/words and a full lexicon
- Words and phrases by category: greetings, introductions, travel, dining, romance, people, etc.
- SEO-ready metadata, JSON-LD (including DefinedTerm on translate pages), and sitemaps with high-intent translate examples

## Quick start
```bash
pnpm install
pnpm dev
```
Open `http://localhost:3000`.

## Useful commands
- `pnpm dev` – run the app
- `pnpm typecheck` – type safety
- `pnpm lint` – lint/format (Biome)
- `pnpm build` – production build

## Notable features
- Translator deep links: `/translate/english-to-wolof/hello`, `/translate/wolof-to-english/na-nga-def`
- Dialect toggle (Senegal / Gambia / both) shared across the site
- Structured data: WebPage + DefinedTerm for translate pages; breadcrumbs/collections for content pages
- Curated sitemaps for translator terms with hyphenated slugs for readability

## Project layout
- `app/translate` – translator page + client
- `data/words`, `data/phrases` – content by category (includes people, introductions)
- `components` – UI primitives and shared components
- `app/sitemap.ts` – sitemap generation (translate examples included)

## Contributing
- Issues: [GitHub Issues](https://github.com/talibg/wakanda/issues)
- Contributions: PRs welcome for new words/phrases, translator improvements, or design tweaks. Please run `pnpm lint` and `pnpm typecheck` before opening a PR.
- Feedback: DM on X at [@talibguyani](https://x.com/talibguyani).
