import { PortableText, PortableTextBlock } from "next-sanity"
import type React from "react"
import type { ProjectSection } from "@/types/portfolio"

const portableComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="m-0 max-w-[62ch] text-base leading-[1.7] [text-wrap:pretty]">
        {children}
      </p>
    ),
  },
}

export default function BodySection({ section }: { section: ProjectSection }) {
  return (
    <section className="flex flex-col gap-3 pt-8">
      {section.heading && (
        <span className="font-mono text-[10.5px] font-medium uppercase tracking-[.14em] text-ink-faint">
          {section.heading}
        </span>
      )}
      {section.body && (
        <PortableText
          value={section.body as unknown as PortableTextBlock[]}
          components={portableComponents}
        />
      )}
    </section>
  )
}
