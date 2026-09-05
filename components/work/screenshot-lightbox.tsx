"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import { stepBack, stepForward, swipeIntent } from "@/lib/carousel"
import type { ScreenshotView } from "./screenshot-viewer"

type Props = {
  views: ScreenshotView[]
  openAt: number
  onMove: (index: number) => void
  onClose: () => void
}

/** Past this many captures a dot strip stops being readable, and the numeric
 *  counter carries the position on its own. LinkFront alone has 24. */
const MAX_DOTS = 12

const GHOST =
  "p-1.5 text-xl leading-none text-white/45 transition-colors hover:text-white disabled:pointer-events-none disabled:opacity-15 md:p-2 md:text-3xl"

function Chevron({
  direction,
  disabled,
  onPress,
  className,
}: {
  direction: "prev" | "next"
  disabled: boolean
  onPress: () => void
  className: string
}) {
  return (
    <button
      type="button"
      aria-label={direction === "prev" ? "Previous screenshot" : "Next screenshot"}
      disabled={disabled}
      onClick={(event) => {
        event.stopPropagation()
        onPress()
      }}
      className={`${GHOST} ${className}`}
    >
      {direction === "prev" ? "‹" : "›"}
    </button>
  )
}

function Dots({
  views,
  openAt,
  onMove,
}: {
  views: ScreenshotView[]
  openAt: number
  onMove: (index: number) => void
}) {
  if (views.length < 2 || views.length > MAX_DOTS) return null
  return (
    <div className="flex items-center gap-1.5">
      {views.map((view, index) => (
        <button
          key={view.key}
          type="button"
          aria-label={`Go to ${view.caption || `screenshot ${index + 1}`}`}
          aria-current={index === openAt}
          onClick={(event) => {
            event.stopPropagation()
            onMove(index)
          }}
          className={`h-1.5 w-1.5 rounded-full transition-colors ${
            index === openAt ? "bg-white/80" : "bg-white/25 hover:bg-white/50"
          }`}
        />
      ))}
    </div>
  )
}

export default function ScreenshotLightbox({ views, openAt, onMove, onClose }: Props) {
  const dragFrom = useRef(0)
  const view = views[openAt]
  const back = () => onMove(stepBack(openAt, views.length))
  const forward = () => onMove(stepForward(openAt, views.length))

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
      if (event.key === "ArrowRight") onMove(stepForward(openAt, views.length))
      if (event.key === "ArrowLeft") onMove(stepBack(openAt, views.length))
    }
    window.addEventListener("keydown", onKey)
    const { overflow } = document.body.style
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = overflow
    }
  }, [openAt, views.length, onMove, onClose])

  const onTouchEnd = (event: React.TouchEvent) => {
    const intent = swipeIntent(event.changedTouches[0].clientX - dragFrom.current)
    if (intent === "forward") forward()
    if (intent === "back") back()
  }

  const atStart = openAt === 0
  const atEnd = openAt === views.length - 1

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={view.caption || "Screenshot"}
      onClick={onClose}
      onTouchStart={(e) => (dragFrom.current = e.changedTouches[0].clientX)}
      onTouchEnd={onTouchEnd}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-black/90 px-4 backdrop-blur-sm"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 z-10 rounded-full bg-white/10 px-3 py-1.5 text-sm text-white backdrop-blur hover:bg-white/20"
      >
        Close
      </button>

      {/* A wide screen has gutters for the chevrons; a phone does not, so there
          they flank the dots underneath instead of covering the capture. */}
      <div className="relative z-10 w-fit">
        <Chevron
          direction="prev"
          disabled={atStart}
          onPress={back}
          className="absolute left-0 top-1/2 hidden -translate-x-full -translate-y-1/2 md:-ml-2 md:block"
        />
        <Image
          src={view.full.src}
          alt={view.caption}
          width={view.full.width}
          height={view.full.height}
          onClick={(e) => e.stopPropagation()}
          className="h-[78vh] w-auto max-w-[86vw] rounded-[6px] object-contain"
          priority
        />
        <Chevron
          direction="next"
          disabled={atEnd}
          onPress={forward}
          className="absolute right-0 top-1/2 hidden translate-x-full -translate-y-1/2 md:ml-2 md:block"
        />
      </div>

      {/* The counter always sits between the chevrons, so they stay apart even
          on a set too long for dots. */}
      <div className="z-10 flex items-center gap-3">
        <Chevron direction="prev" disabled={atStart} onPress={back} className="md:hidden" />
        <Dots views={views} openAt={openAt} onMove={onMove} />
        <span className="font-mono text-[11px] text-white/40">
          {openAt + 1}/{views.length}
        </span>
        <Chevron direction="next" disabled={atEnd} onPress={forward} className="md:hidden" />
      </div>

      <span className="z-10 font-mono text-[11px] text-white/70">{view.caption}</span>
    </div>
  )
}
