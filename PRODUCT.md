# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

No single primary persona (confirmed 2026-09-01: "I don't have one"). Readers span engineering managers, third-party recruiters, and founders — anyone evaluating Steve for senior full-stack work. The site must hold up for any hiring-adjacent reader rather than over-optimizing for one. Steve himself is the second user: he curates all content in Sanity Studio (`/studio`).

## Product Purpose

Steve Rodriguez's personal portfolio at steverodri.com. Primary outcome: senior full-time offers — a reader emails steve.rodri91@gmail.com or downloads the résumé (confirmed 2026-09-01). A small amount of contract work is a welcome side effect, not the target.

## Positioning

"Ships products end-to-end" — a story claim backed by evidence (RIDR: one of two engineers, 4,500+ riders in three months, 19 weekly releases; Burn by Cara Loren: $1.3M lifetime revenue) — with the agentic delivery pipeline (parallel Claude sessions in isolated git worktrees, codebase conventions designed for AI agents) as the mechanism a neighboring candidate cannot truthfully copy. Full-stack breadth is supporting fact, not the headline. (Framing recommended by design partner and adopted 2026-09-01; it restates Steve's approved site bio.)

## Operating Context

- Active job search for senior full-stack roles; Steve works remotely from Thailand (UTC+7).
- All content curation happens in Sanity Studio — the site is data-driven; content and imagery are never hardcoded (Steve's explicit rule). Featured-work selection and order live in the Home singleton's drag-ordered reference list.
- Deploys: GitHub `main` → Vercel. Sanity content changes appear live without a deploy (pages are `force-dynamic`).
- Benzinger Media, the family web-studio side business, is mentioned as an aside in About; this portfolio is not its client funnel.

## Capabilities and Constraints

- Next.js 15 App Router + Sanity CMS (project `imgj1a23`), TypeScript, Tailwind; bun as package manager.
- Two surfaces: the ledger home page (`/`) and project detail pages (`/work/[slug]`), where "Read more" appears only when a project's `sections` field has content.
- 18 real projects, skills, experience, and personal info all live in the CMS; `sanity typegen` regenerates types after schema or query changes.
- Undecided: RIDR detail-page screenshots are not yet uploaded (the section stays hidden until they are); Burn and V Hub have no detail-page content yet.

## Brand Commitments

- Name: Steve Rodriguez. Voice: honest, plain, deflated — no résumé-speak, no inflated claims. New claims must be checked with Steve before publishing; he has corrected several.
- No em dashes in public-facing copy (site content, meta descriptions, résumé). Use commas, colons, parentheses, or a new sentence instead. En dashes in date ranges (2026–now) are fine.
- Factually banned framings: "built the app that ran the business" (false — the Brilliance CRM was a hobby project), "co-founder of Benzinger Media" (false — he takes work from his uncle), RIDR as a "cycling app" (it is a mountain biking app).
- Personal history that is safe to use: self-taught via an Ironman-inspired Excel home-gym tracker; General Assembly Web Development Immersive; two years of paid freelance work before the first job.

## Evidence on Hand

- Real metrics already in approved copy: RIDR 4,500+ riders in 3 months, 19 weekly releases, public launch June 2026, live at ridr.bike; Burn by Cara Loren $1.3M lifetime revenue with App Store link.
- 18 real projects in Sanity with live/code links; images on the Sanity CDN.
- Résumé PDF at `public/Steven_Rodriguez_Resume.pdf`; GitHub `github.com/steve-rodri`; LinkedIn `linkedin.com/in/steve-rodri`.
- Absent — do not fabricate: testimonials, client quotes, RIDR app screenshots (pending upload), Burn/V Hub detail-page content.

## Product Principles

1. Evidence over adjectives: every claim traces to a real project, metric, or link; nothing fabricated or inflated.
2. Content lives in Sanity: code renders, Studio curates — selection, order, copy, and imagery are never hardcoded.
3. Featured work is the argument: a few deep, provable stories outrank exhaustive listings.
4. The reader is busy: fast scan paths to work, résumé, and email from anywhere on the site.
5. Honest voice: plain sentences, deflated framing; if a line sounds like a résumé bullet, rewrite it.
