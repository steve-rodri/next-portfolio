import Image from "next/image"
import { urlFor } from "@/lib/sanity"
import type { ProjectScreenshot } from "@/types/portfolio"

const tiles = {
  portrait: {
    column: "w-[112px] tight:w-[100px]",
    aspect: "aspect-[9/16]",
    width: 224,
    height: 398,
  },
  landscape: {
    column: "w-[240px]",
    aspect: "aspect-video",
    width: 480,
    height: 270,
  },
}

function orientation(screenshot: ProjectScreenshot) {
  return (screenshot.aspectRatio ?? 0.5625) >= 1 ? "landscape" : "portrait"
}

function Tile({ screenshot }: { screenshot: ProjectScreenshot }) {
  const tile = tiles[orientation(screenshot)]
  return (
    <div className={`flex flex-col gap-1.5 ${tile.column}`}>
      <div
        className={`overflow-hidden rounded-[4px] border border-line bg-surface-inset ${tile.aspect}`}
      >
        <Image
          src={urlFor(screenshot.image!).width(tile.width).height(tile.height).url()}
          alt={screenshot.caption ?? ""}
          width={tile.width}
          height={tile.height}
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
      <span className="font-mono text-[10.5px] font-medium uppercase tracking-[.14em] text-ink-faint">
        Screenshots
      </span>
      <div className="flex flex-wrap gap-2.5 tight:gap-2">
        {filled.map((screenshot) => (
          <Tile key={screenshot._key} screenshot={screenshot} />
        ))}
      </div>
    </section>
  )
}
