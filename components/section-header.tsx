export default function SectionHeader({ label }: { label: string }) {
  return (
    <div className="flex items-baseline gap-3.5">
      <h2 className="m-0 font-mono text-[10.5px] font-medium uppercase tracking-[.14em] text-ink-faint">
        {label}
      </h2>
      <span className="h-px flex-1 bg-line" />
    </div>
  )
}
