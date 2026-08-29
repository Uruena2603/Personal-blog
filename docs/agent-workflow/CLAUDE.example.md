# CLAUDE.md, curated example

Curated English version of the rules file that governs this repository. The original is local and not versioned; machine-specific details are removed. It follows [Anthropic's official guidance](https://code.claude.com/docs/en/best-practices) for these files: keep it short, and cut any line whose removal would not cause mistakes.

## Project state

Both states are documented so no session confuses what exists with what is wanted.

- **Current:** vanilla HTML + CSS + JS, served from GitHub Pages. No build, no backend.
- **Target:** Astro with React islands. Pre-rendered HTML for SEO and Open Graph, JavaScript only where a component needs it. Deployment on Cloudflare.

## Code principles

- **Search before creating.** Check for an existing class, component, or helper first.
- **Justify every new library.** Why is what the project already has not enough?
- **Delete in the same change.** Orphaned code is removed in the commit that orphaned it.
- **From component catalogs, only the used component enters the repo.** Never the catalog.
- **No scaffolding leftovers.** No placeholder comments, no commented-out blocks.

## Performance budget

Modern look and mobile speed compete. Numbers arbitrate, not opinions.

| Metric | Threshold | Measured with |
|---|---|---|
| LCP (mobile) | < 2.5 s | performance trace, mobile emulation (412x915, CPU 4x, Slow 4G) |
| CLS | < 0.1 | performance trace |
| INP | < 200 ms | performance trace |
| Accessibility / SEO / Best Practices | ≥ 90 | Lighthouse audit |
| Any image | ≤ 200 KB | inspection |
| prefers-reduced-motion | respected in every effect | code review + emulation |

An effect that breaks the budget is degraded or does not ship. Local measurements are optimistic (unreal TTFB, cached assets): they compare before and after; they are not a production verdict.

## VERIFY

The current stack has no lint, typecheck, or build. Do not invoke them: they do not exist.

- **Now:** HTML validation, Lighthouse with a mobile profile, mobile and desktop screenshots, clean browser console.
- **After the Astro migration, add:** `npm run build`, `astro check`, lint.
- If a tool is unavailable, fall back to what can run and document the limitation in the log.

## Git

The agent runs read-only git only (`status`, `diff`, `log`). Everything else: exact commands, executed by the human.

- Branches: `<label>/short-description`, in English.
- Commits: English prefix, description in the project's language.

## Working files

- `plans/`: approved designs and plans, numbered.
- `context/log.md`: execution record, append-only.

New sessions rehydrate from these files, not from chat history. Skills never override human instructions or these rules.

## Subagents

None, unless the human asks explicitly.
