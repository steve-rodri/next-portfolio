export default function CompactFooter({
  email,
  name,
}: {
  email: string
  name: string
}) {
  return (
    <footer className="bg-surface-band px-6 py-8">
      <div className="mx-auto flex max-w-[760px] items-center gap-4 text-[13px]">
        <a
          href={`mailto:${email}`}
          className="text-blueprint-bright no-underline hover:underline hover:underline-offset-[3px]"
        >
          {email}
        </a>
        <span className="ml-auto font-mono text-[11px] text-ink-faint">
          © {new Date().getFullYear()} {name.toLowerCase()}
        </span>
      </div>
    </footer>
  )
}
