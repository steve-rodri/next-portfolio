export default function SectionHeader({ label }: { label: string }) {
  return (
    <div className="flex items-baseline gap-3.5">
      <span className="font-mono text-[10.5px] font-medium uppercase tracking-[.14em] text-ink-faint">
        {label}
      </span>
      <span className="h-px flex-1 bg-line" />
    </div>
  )
}
