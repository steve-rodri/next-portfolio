import {
  PortableText,
  PortableTextBlock,
  PortableTextComponents,
} from "next-sanity"
import SectionHeader from "@/components/section-header"
import type { PersonalInfo } from "@/types/portfolio"

const paragraphClass =
  "m-0 max-w-[64ch] text-[15px] leading-[1.6] text-ink-muted [text-wrap:pretty]"

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className={paragraphClass}>{children}</p>,
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blueprint underline underline-offset-[3px] transition-colors duration-120 ease-out hover:text-blueprint-bright"
      >
        {children}
      </a>
    ),
  },
}

export default function AboutSection({
  personalInfo,
}: {
  personalInfo: PersonalInfo
}) {
  const { about, bio } = personalInfo
  return (
    <section id="about" className="flex flex-col gap-4 px-10 pb-10 tight:px-6">
      <SectionHeader label="About" />
      {about?.length ? (
        <PortableText
          value={about as PortableTextBlock[]}
          components={components}
        />
      ) : (
        bio
          .split("\n\n")
          .filter(Boolean)
          .map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className={paragraphClass}>
              {paragraph}
            </p>
          ))
      )}
    </section>
  )
}
