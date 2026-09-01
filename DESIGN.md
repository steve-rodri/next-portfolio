---
name: Steve Rodriguez — Portfolio
description: Graphite-technical ledger — warm dark surfaces, one blueprint accent, mono annotations, 1px lines doing the structural work
colors:
  graphite: "#131211"
  graphite-inset: "#1B1A19"
  graphite-pressed: "#232221"
  graphite-card: "#191817"
  graphite-band: "#0B0A09"
  ink: "#EFEEED"
  ink-muted: "#A3A19E"
  ink-faint: "#827F78"
  ink-strong: "#EDEFF2"
  line: "#272524"
  line-strong: "#383531"
  blueprint: "#5C7FCC"
  blueprint-bright: "#7D9ADB"
  blueprint-foreground: "#0B0A09"
typography:
  display:
    fontFamily: "Instrument Sans, Helvetica Neue, sans-serif"
    fontSize: "54px"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Instrument Sans, Helvetica Neue, sans-serif"
    fontSize: "26px"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Instrument Sans, Helvetica Neue, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "Instrument Sans, Helvetica Neue, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Geist Mono, monospace"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.02em"
rounded:
  sharp: "3px"
  card: "4px"
  pill: "999px"
spacing:
  xs: "6px"
  sm: "10px"
  md: "14px"
  lg: "24px"
  xl: "40px"
components:
  button-primary:
    backgroundColor: "{colors.blueprint}"
    textColor: "{colors.blueprint-foreground}"
    rounded: "{rounded.sharp}"
    padding: "9px 14px"
  button-primary-hover:
    backgroundColor: "{colors.blueprint-bright}"
  button-ghost:
    backgroundColor: "{colors.graphite}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sharp}"
    padding: "9px 14px"
  button-ghost-hover:
    textColor: "{colors.blueprint-bright}"
  tag-pill:
    backgroundColor: "{colors.graphite-inset}"
    textColor: "{colors.ink-muted}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "3px 11px"
---

# Design System: Steve Rodriguez — Portfolio

## Overview

**Creative North Star: "The Ledger"**

The site is a ledger: a calm, precise, confident accounting of shipped work. Every visual decision behaves like an entry in a well-kept book — ruled 1px lines instead of boxes and shadows, mono annotations in the margins (dates, counts, platforms), and one blueprint-blue ink reserved for the entries that act. The design's job is to make real evidence legible, never to decorate it; restraint is the craft, and the confidence comes from how little the system needs.

The room is warm-dark, not cold: graphite surfaces with a faint warm cast rather than neutral black, so long reading feels like a workshop at night rather than a terminal. Components are precise and quiet — nothing lifts, scales, or slides; state changes are exact 120ms shifts of color and border, felt more than seen.

**Key Characteristics:**
- Warm graphite dark surfaces; depth by tone and 1px rule, never shadow
- A single hue on the page: blueprint blue, only where the reader can act
- Instrument Sans for prose and display; Geist Mono for every annotation
- Drafting-sharp radii (3px / 4px / pill-only-for-tags)
- Typographic marks (↗, ·) instead of icons; no gradients, no emoji
- Motion limited to 120ms ease-out color/border transitions

## Colors

A one-ink palette: warm graphite ground, warm gray text, and a single blueprint-blue accent.

### Primary
- **Blueprint** (#5C7FCC): the only hue in the system. Marks what acts — primary buttons, live links, accent table links. Hover shifts to **Blueprint Bright** (#7D9ADB); text on blueprint fills is **Blueprint Ink** (#0B0A09, the Band value), so both button states clear WCAG AA.

### Neutral
- **Graphite** (#131211): the page ground everywhere.
- **Graphite Inset** (#1B1A19): pill backgrounds and image letterboxes — one tonal step up.
- **Graphite Pressed** (#232221): the darker stripe in placeholder patterns; pressed-state ground.
- **Graphite Card** (#191817): card surfaces when a distinct panel is needed (rare).
- **Graphite Band** (#0B0A09): the full-bleed footer band — one step *below* the page, closing the document.
- **Ink** (#EFEEED): primary text and interactive labels at rest.
- **Ink Muted** (#A3A19E): descriptions, secondary rows, supporting prose.
- **Ink Faint** (#827F78): mono annotations — eyebrows, dates, counts, captions. Tuned to hold 4.5:1 on Graphite and Band.
- **Ink Strong** (#EDEFF2): display-size text on the footer band.
- **Rule** (#272524): default 1px borders, hairlines, row separators, scrollbar track contrast.
- **Rule Strong** (#383531): ghost-button borders, underline decorations, scrollbar thumbs.

### Named Rules
**The One Accent Rule.** Blueprint is the only hue on any screen and it always means "this acts." If an element doesn't link or submit, it doesn't get blue. No second accent exists; emphasis without action uses Ink against Ink Muted.

## Typography

**Display Font:** Instrument Sans (with Helvetica Neue, sans-serif)
**Body Font:** Instrument Sans
**Label/Mono Font:** Geist Mono (with monospace)

**Character:** A contemporary grotesque doing the speaking, a typewriter doing the bookkeeping. Instrument Sans at 600 with tight negative tracking reads decisive at display sizes; Geist Mono at small sizes turns metadata into marginalia.

### Hierarchy
- **Display** (600, 54px → 34px at ≤760px, 1.02, −0.025em): detail-page titles only.
- **Headline** (600, 26–30px, 1.02, −0.025em): the rail name (30px, stacked one word per line) and featured card titles (26px).
- **Title** (600, 14px): group headers inside sections (e.g. Stack rows).
- **Body** (400, 14–16px, 1.6–1.7): prose. Measures capped at 52–64ch (`max-width` in `ch`); long-form detail body is 16px/1.7 at ≤62ch.
- **Label** (Geist Mono 400/500, 9.5–13.5px): all annotations. Two registers: **eyebrows** at 10.5px, +0.14em tracking, UPPERCASE; **metadata** at 11–12px, lowercase ("ios & android · current").

### Named Rules
**The Mono Margin Rule.** Every piece of metadata — dates, counts, platforms, captions, section eyebrows, tag pills — is set in Geist Mono. ALL-CAPS belongs to eyebrows alone; every other mono annotation is lowercase. Prose is always sentence case.

## Layout

A ledger spread: a 324px sticky left rail (identity, nav with mono counts, experience, contact pinned to the bottom via `margin-top: auto`) beside a single flowing content column. The rail is full-viewport height with its own scroll and a 1px right rule; sections in the main column open with an eyebrow + 1px hairline filling the row.

- **Rhythm:** 4px base. Recurring steps: 6, 10, 14, 16, 24, 40. Section padding is 40px on desktop, 24px at ≤760px.
- **Breakpoints:** ≤960px — the grid collapses to one column; the rail becomes a static header (bottom rule instead of right), nav and experience hide, a "View work" ghost button appears beside the résumé button. ≤760px — featured cards stack (small thumb above text), the table hides its description column, stack rows stack, footer email drops to 21px with `break-all`.
- **Density:** generous around prose, tight inside annotations. Tables use 7px vertical cell padding; the whole other-work section reads as one ruled block.
- **Data-driven emptiness:** sections render only when content exists (no screenshots → no screenshots section; no live URL → no button). Empty states are absence, not placeholders.

## Elevation & Depth

Flat, absolutely. **The Borders-Do-The-Work Rule:** no `box-shadow` exists anywhere in the system; depth is conveyed by 1px rules (#272524) and tonal steps of graphite — Inset above the page, Band below it. If a surface needs separating, it earns a hairline, not a glow. Scrollbars follow suit: thin, square, thumb #383531 on the page ground.

## Shapes

Drafting-sharp. Buttons take 3px corners, cards/images/thumbnails 4px, and the pill radius (999px) belongs to tag chips alone. Borders are always exactly 1px. There are no icons anywhere — **↗︎** marks external links and **·** separates inline metadata, both as typographic characters in the text run. The arrow is always written with U+FE0E (the text-presentation variation selector) appended, because U+2197 alone is emoji-capable and mobile browsers substitute the emoji glyph. Images sit inside 1px-ruled 4px frames and cover-crop; screenshot tiles are 9:16 for portrait sources and 16:9 for landscape, decided by the image's own aspect ratio.

## Components

Precise and quiet: state changes are exact color/border shifts at 120ms ease-out; nothing transforms, lifts, or ripples.

### Buttons
- **Shape:** drafting-sharp (3px radius); padding 9px 14px (rail) or 7px 13px (cards); text 13.5–14px.
- **Primary:** Blueprint fill (#5C7FCC), Blueprint Ink text (#0B0A09), 500 weight. Hover: fill shifts to Blueprint Bright (#7D9ADB), which raises text contrast further.
- **Ghost:** transparent fill, 1px Rule Strong border (#383531), Ink text. Hover: border shifts to Blueprint, text to Blueprint Bright.
- **Focus:** every interactive element carries the global keyboard treatment: a 1px Blueprint Bright outline, offset 2px (`:focus-visible`).
- **No other variants.** Two buttons cover the site.

### Chips (tag pills)
- **Style:** Graphite Inset fill, 1px Rule border, Ink Muted text; Geist Mono 11px, lowercase; pill radius; padding 3px 11px (3px 10px in dense meta rows).
- **State:** static labels — no selected/hover states.

### Cards / Containers
The system avoids boxed cards. A "card" is a composition: a 1px-ruled 4px-radius image frame beside text, separated from siblings by a 1px top rule and 26px padding — never a filled panel with its own background.

### Section Header
The signature structural element: a Geist Mono 10.5px UPPERCASE eyebrow (+0.14em, Ink Faint) followed by a 1px hairline (#272524) filling the remaining row width. Every section in the main column opens with one.

### Navigation (rail)
Text rows at 14px: label left, Geist Mono count right ("03", "15", or "—" in Ink Faint). Active item Ink, rest Ink Muted; hover shifts the label to Blueprint Bright. Anchors smooth-scroll. Collapses away entirely at ≤960px.

### Links
- **Inline/prose:** Blueprint text, underline with 3px offset; hover Blueprint Bright.
- **Muted utility** (e.g. "Code ↗"): Ink Muted, no underline; hover Ink + underline.
- **Accent utility** (e.g. "Site ↗", "App ↗"): Blueprint, no underline; hover Blueprint Bright + underline.
- **Identity links** (rail email): Ink with Rule Strong underline; hover Blueprint Bright.

### Stat Block
A number in Instrument Sans 600 26px (−0.02em) over a Geist Mono 10.5px Ink Faint label; blocks sit in a row separated by 40px gaps, closed with a bottom hairline.

## Do's and Don'ts

### Do:
- **Do** keep Blueprint exclusively on elements that act (The One Accent Rule).
- **Do** set every annotation in Geist Mono — lowercase unless it is a section eyebrow (The Mono Margin Rule).
- **Do** hold motion to 120ms ease-out color/border transitions — hover is a shift of ink, not a movement (**The 120ms Rule**).
- **Do** separate content with 1px rules (#272524) and tonal graphite steps; open every main-column section with the eyebrow + hairline header.
- **Do** use ↗︎ for external links (always with U+FE0E appended — mobile browsers otherwise render the emoji glyph) and · as the inline separator, as text.
- **Do** cap prose measures with `ch` units (52–64ch) and use `text-wrap: pretty` on multi-line prose.
- **Do** let absent content collapse — hide a section rather than render a placeholder.
- **Do** keep the global 1px Blueprint Bright `focus-visible` outline (offset 2px); never suppress focus indicators.

### Don't:
- **Don't** use shadows, gradients, glows, or backdrop blur anywhere.
- **Don't** transform on hover — no translate, scale, underline-grow, or opacity fades on state.
- **Don't** introduce icons, icon fonts, or emoji; typographic marks only.
- **Don't** add a second hue or use Blueprint decoratively on non-interactive elements.
- **Don't** round anything beyond 4px except tag pills; never round scrollbars.
- **Don't** set mono metadata in Title Case or ALL-CAPS outside eyebrows; prose stays sentence case.
