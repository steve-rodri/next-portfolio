import Image from "next/image"
import { urlFor } from "@/lib/sanity"
import type { ProjectScreenshot } from "@/types/portfolio"

function Tile({ screenshot }: { screenshot: ProjectScreenshot }) {
  const hasImage = Boolean(screenshot.image?.asset?._ref)
  return (
    <div className="flex flex-col gap-1.5">
      <div className="aspect-[9/16] overflow-hidden rounded-[4px] border border-line bg-[repeating-linear-gradient(45deg,#1B1A19,#1B1A19_8px,#232221_8px,#232221_9px)]">
        {hasImage && (
          <Image
            src={urlFor(screenshot.image!).width(224).height(398).url()}
            alt={screenshot.caption ?? ""}
            width={224}
            height={398}
            className="h-full w-full object-cover"
          />
        )}
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
  return (
    <section className="flex flex-col gap-3.5 pt-8">
      <span className="font-mono text-[10.5px] font-medium uppercase tracking-[.14em] text-ink-faint">
        Screenshots
      </span>
      <div className="grid grid-cols-[repeat(3,112px)] gap-2.5 tight:grid-cols-[repeat(3,minmax(0,112px))] tight:gap-2">
        {screenshots.map((screenshot) => (
          <Tile key={screenshot._key} screenshot={screenshot} />
        ))}
      </div>
    </section>
  )
}
