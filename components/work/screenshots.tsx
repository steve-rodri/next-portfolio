import { urlFor } from "@/lib/sanity"
import type { ProjectScreenshot } from "@/types/portfolio"
import ScreenshotViewer, { type ScreenshotView } from "./screenshot-viewer"

const PORTRAIT_FALLBACK_RATIO = 0.5625

/** Width the overlay requests; comfortably covers 78vh on a large display. */
const FULL_WIDTH = 1200

const tiles = {
  portrait: { column: "w-[112px] tight:w-[100px]", width: 224 },
  landscape: { column: "w-[240px]", width: 480 },
}

function ratioOf(screenshot: ProjectScreenshot) {
  return screenshot.aspectRatio ?? PORTRAIT_FALLBACK_RATIO
}

function orientation(screenshot: ProjectScreenshot) {
  return ratioOf(screenshot) >= 1 ? "landscape" : "portrait"
}

// Each tile takes the image's own aspect ratio, so a true 19.5:9 phone capture
// is never letterboxed or cropped to fit a fixed 9:16 frame.
function toView(screenshot: ProjectScreenshot): ScreenshotView {
  const tile = tiles[orientation(screenshot)]
  const ratio = ratioOf(screenshot)
  return {
    key: screenshot._key,
    caption: screenshot.caption ?? "",
    ratio,
    column: tile.column,
    tile: {
      src: urlFor(screenshot.image!)
        .width(tile.width)
        .height(Math.round(tile.width / ratio))
        .url(),
      width: tile.width,
      height: Math.round(tile.width / ratio),
    },
    full: {
      src: urlFor(screenshot.image!)
        .width(FULL_WIDTH)
        .height(Math.round(FULL_WIDTH / ratio))
        .url(),
      width: FULL_WIDTH,
      height: Math.round(FULL_WIDTH / ratio),
    },
  }
}

export default function Screenshots({
  screenshots,
}: {
  screenshots: ProjectScreenshot[]
}) {
  const filled = screenshots.filter((shot) => shot.image?.asset?._ref)
  if (!filled.length) return null

  return (
    <section className="flex flex-col gap-3.5 pt-8">
      <h2 className="m-0 font-mono text-[10.5px] font-medium uppercase tracking-[.14em] text-ink-faint">
        Screenshots
      </h2>
      <ScreenshotViewer views={filled.map(toView)} />
    </section>
  )
}
