import Image from "next/image"
import { urlFor } from "@/lib/sanity"
import type { ProjectScreenshot } from "@/types/portfolio"

const PORTRAIT_FALLBACK_RATIO = 0.5625

const tiles = {
  portrait: {
    column: "w-[112px] tight:w-[100px]",
    width: 224,
  },
  landscape: {
    column: "w-[240px]",
    width: 480,
  },
}

function ratioOf(screenshot: ProjectScreenshot) {
  return screenshot.aspectRatio ?? PORTRAIT_FALLBACK_RATIO
}

function orientation(screenshot: ProjectScreenshot) {
  return ratioOf(screenshot) >= 1 ? "landscape" : "portrait"
}

// The tile takes each image's own aspect ratio, so a true 19.5:9 phone capture
// is never letterboxed or cropped to fit a fixed 9:16 frame.
function Tile({ screenshot }: { screenshot: ProjectScreenshot }) {
  const tile = tiles[orientation(screenshot)]
  const ratio = ratioOf(screenshot)
  const height = Math.round(tile.width / ratio)
  return (
    <div className={`flex flex-col gap-1.5 ${tile.column}`}>
      <div
        className="overflow-hidden rounded-[4px] border border-line bg-surface-inset"
        style={{ aspectRatio: String(ratio) }}
      >
        <Image
          src={urlFor(screenshot.image!).width(tile.width).height(height).url()}
          alt={screenshot.caption ?? ""}
          width={tile.width}
          height={height}
          className="h-full w-full object-cover"
        />
      </div>
      {screenshot.caption && (
        <span className="font-mono text-[9.5px] leading-[1.4] text-ink-faint">
          {screenshot.caption}
        </span>
      )}
    </div>
  )
}

export default function Screenshots({
  screenshots,
}: {
  screenshots: ProjectScreenshot[]
}) {
  const filled = screenshots.filter((screenshot) => screenshot.image?.asset?._ref)
  if (!filled.length) return null

  return (
    <section className="flex flex-col gap-3.5 pt-8">
      <h2 className="m-0 font-mono text-[10.5px] font-medium uppercase tracking-[.14em] text-ink-faint">
        Screenshots
      </h2>
      <div className="flex flex-wrap gap-2.5 tight:gap-2">
        {filled.map((screenshot) => (
          <Tile key={screenshot._key} screenshot={screenshot} />
        ))}
      </div>
    </section>
  )
}
