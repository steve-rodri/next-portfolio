---
name: portfolio-copy
description: Steve's copywriting rules for steverodri.com and his job-search materials. Use whenever writing or editing ANY public-facing text in this project — Sanity content (tagline, bio, about, project summaries, detail-page sections, meta and highlight lines, button labels), hardcoded strings (metadata, 404 copy, UI labels), or the résumé PDF. Trigger even for one-line tweaks like a tagline, a summary, or a button label — voice violations happen one sentence at a time.
---

# Portfolio copywriting

The reader is someone deciding whether to interview Steve. The copy's only job is to make real evidence legible; it must never impress with language. When a sentence sounds impressive but vague, it is wrong. When it sounds modest but specific, it is right.

## Voice

Honest, plain, deflated. Steve has repeatedly corrected inflated framings, so write *below* the claim, never at its ceiling.

- Evidence over adjectives: every claim traces to a real project, metric, or link. "4,500+ riders in 3 months" beats "rapid growth". If the evidence is missing, drop the claim rather than soften it.
- If a line could appear on a generic résumé, rewrite it as a sentence a person would say out loud.
- Never fabricate: no testimonials, invented metrics, client names, or benchmarks. Stating an absence honestly is always acceptable.
- Any *new* factual claim about Steve's history needs his confirmation before it ships. He has corrected several; check, don't guess.
- Hedged claims read worse than none ("might have been my first paid gig" → say something certain or nothing).
- Apologetic quantifiers ("a small amount of contract work") undersell; invite instead ("or have a project that needs one for a while").

## Mechanics

- No em dashes in public copy, ever. Restructure with commas, colons, parentheses, or a new sentence — don't just substitute a different dash. En dashes in date ranges (2026–now) are correct typography and stay. The middot (·) is the inline metadata separator ("ios & android · current").
- Sentence case for prose and headings. Mono metadata annotations are lowercase. ALL-CAPS happens only via CSS on section eyebrows; source text stays sentence case.
- External links are marked with ↗︎ — always U+2197 followed by U+FE0E, because mobile browsers otherwise substitute the emoji glyph.
- Buttons and labels are short and verb-led: "Download résumé", "View App ↗︎", "Read more". The live-link label is per-project data ("View Site" / "View App"), not prose.

## Facts that must stay true

- The Brilliance CRM was a **hobby project** Steve built while working at the lighting company, hoping to improve its systems. Never "built the app that ran the business."
- Benzinger Media is his family's web studio; he takes work from his uncle. **Never "co-founder."** Present it as an aside, not a title.
- RIDR is a **mountain biking** app, never a "cycling app." He's one of two engineers, not a founder.
- Safe origin story: an Ironman-inspired home-gym tracker in Excel (progressive overload automated in spreadsheet formulas) → General Assembly's Web Development Immersive → two years of paid freelance work (MSNY, NJ Forward, the Blitz Reader Chrome extension — all paid) before the first job.
- Positioning: the memory to leave is "ships products end-to-end" (the RIDR story), with the agentic delivery pipeline as the differentiator. Full-stack breadth is supporting fact, not the headline.

## Where copy lives

Content is curated in Sanity, never hardcoded — that's a project rule. Site copy belongs to `personalInfo` (role, tagline, bio, about), `project` (summary, meta, highlight, liveLabel, metaLine, stats, sections), and the Home singleton. Hardcoded strings are limited to metadata, the 404 page, and structural UI labels. `PRODUCT.md` at the repo root holds product truth and the evidence inventory; check it before introducing any claim.

## Real corrections to learn from

1. **Inflation:** "where I built the app that ran the business" → "a CRM I built to try to modernize the lighting company's systems." The first was false; the honest version is also the better story.
2. **Accidental implication:** "a paid Chrome extension" implied the other gigs were unpaid → "paid freelance work (the MSNY site, NJ Forward, a speed-reading Chrome extension)."
3. **Em dash + hedge, fixed together:** "working remotely with US overlap — open to senior full-stack roles and a small amount of contract work" → "I work remotely from Thailand. If you're hiring a senior full-stack engineer, or have a project that needs one for a while, my email's below."
4. **Title kept concrete:** "Senior Full Stack Software Engineer building products and the agentic pipelines that ship them" — a plain title plus a concrete hook beat both the bare title and the adjective pile.
