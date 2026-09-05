"use client"

import Image from "next/image"
import { useCallback, useRef, useState } from "react"
import ScreenshotLightbox from "./screenshot-lightbox"

export type ScreenshotImage = { src: string; width: number; height: number }

export type ScreenshotView = {
  key: string
  caption: string
  ratio: number
  column: string
  tile: ScreenshotImage
  full: ScreenshotImage
}

const CLOSED = -1

export default function ScreenshotViewer({ views }: { views: ScreenshotView[] }) {
  const [openAt, setOpenAt] = useState(CLOSED)
  const triggers = useRef<Array<HTMLButtonElement | null>>([])

  // Send focus back to the tile that opened the overlay, so keyboard users
  // land where they left off rather than at the top of the document.
  const close = useCallback(() => {
    const trigger = triggers.current[openAt]
    setOpenAt(CLOSED)
    trigger?.focus()
  }, [openAt])

  return (
    <>
      <div className="flex flex-wrap gap-2.5 tight:gap-2">
        {views.map((view, index) => (
          <div key={view.key} className={`flex flex-col gap-1.5 ${view.column}`}>
            <button
              type="button"
              ref={(el) => {
                triggers.current[index] = el
              }}
              onClick={() => setOpenAt(index)}
              aria-label={`View ${view.caption || "screenshot"} larger`}
              className="block cursor-zoom-in overflow-hidden rounded-[4px] border border-line bg-surface-inset p-0 transition-transform duration-150 ease-out hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blueprint"
              style={{ aspectRatio: String(view.ratio) }}
            >
              <Image
                src={view.tile.src}
                alt={view.caption}
                width={view.tile.width}
                height={view.tile.height}
                className="h-full w-full object-cover"
              />
            </button>
            {view.caption && (
              <span className="font-mono text-[9.5px] leading-[1.4] text-ink-faint">
                {view.caption}
              </span>
            )}
          </div>
        ))}
      </div>

      {openAt !== CLOSED && (
        <ScreenshotLightbox
          views={views}
          openAt={openAt}
          onMove={setOpenAt}
          onClose={close}
        />
      )}
    </>
  )
}
