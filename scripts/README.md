# scripts

One-off and repeatable maintenance scripts. Sanity scripts run through the CLI
with a user token, and are dry runs until `APPLY=1`:

```bash
pnpm exec sanity exec scripts/<name>.ts --with-user-token
```

## Project imagery pipeline

Getting a project's card image and screenshot tiles onto its detail page. The
shell steps need ImageMagick (`brew install imagemagick`).

**1. Pick shots by number.** Build labeled contact sheets from a folder of
captures, then read the sheets instead of opening every file.

```bash
scripts/contact-sheet.sh ~/Desktop/"Burn photos" /tmp/burn
```

`manifest.txt` holds the numbering the sheets show; every later step refers to
it. Check the sheets for anything that should not ship: real email addresses,
other people's usernames and photos, an unexpected currency on a paywall.

**2. Crop the status bar** off the shots chosen for tiles.

```bash
scripts/crop-status-bar.sh 150 /tmp/burn/native /tmp/burn/full/*.png
```

**3. Compose the card image** from three uncropped shots.

```bash
scripts/phone-hero.sh /tmp/burn/hero.png left.png centre.png right.png
```

**4. Upload and patch.** Write a spec, dry run it, then apply.

```json
{
  "image": "/tmp/burn/hero.png",
  "screenshots": [{ "caption": "goal quiz", "path": "/tmp/burn/native/goal-quiz.png" }]
}
```

```bash
SLUG=burn-by-cara-loren SPEC=/tmp/burn/spec.json \
  pnpm exec sanity exec scripts/project-media.ts --with-user-token
```

Add `APPLY=1` once the plan reads right. It replaces the whole `screenshots[]`
array, so a spec has to list every tile the page should end up with.

### Verifying

The browser pane does not repaint while it is hidden, so scrolling to
below-the-fold tiles and screenshotting them tends to time out. Pull the URLs
the page actually requested instead, fetch those, and look at the result:

```js
[...document.querySelectorAll("img")].map((i) => i.currentSrc).join("\n")
```

Tiles are served at 224x461. A ratio near 0.486 means the native capture
survived; 0.5625 means something padded or cropped it to 9:16.
