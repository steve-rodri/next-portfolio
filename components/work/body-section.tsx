import { PortableText, PortableTextBlock } from "@portabletext/react"
import type React from "react"
import PortableLink from "@/components/portable-link"
import type { ProjectSection } from "@/types/portfolio"

const portableComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="m-0 max-w-[62ch] text-base leading-[1.7] [text-wrap:pretty]">
        {children}
      </p>
    ),
  },
  marks: { link: PortableLink },
}

export default function BodySection({ section }: { section: ProjectSection }) {
  return (
    <section className="flex flex-col gap-3 pt-8">
      {section.heading && (
        <h2 className="m-0 font-mono text-[10.5px] font-medium uppercase tracking-[.14em] text-ink-faint">
          {section.heading}
        </h2>
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
