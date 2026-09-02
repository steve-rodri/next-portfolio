import SectionHeader from "@/components/section-header"

/** Desktop-only lede above Featured work; the ≤960px header shows the same bio instead. */
export default function Intro({ bio }: { bio: string }) {
  return (
    <section className="flex flex-col gap-4 px-10 pt-10 narrow:hidden">
      <SectionHeader label="Bio" />
      <p className="m-0 max-w-[60ch] text-base leading-[1.6] text-ink-muted [text-wrap:pretty]">
        {bio}
      </p>
    </section>
  )
}
