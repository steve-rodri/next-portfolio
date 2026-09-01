import type { ProjectStat } from "@/types/portfolio"

export default function StatsRow({ stats }: { stats: ProjectStat[] }) {
  return (
    <div className="flex gap-10 border-b border-line py-6 tight:flex-wrap tight:gap-5">
      {stats.map((stat) => (
        <div key={stat._key} className="flex flex-col gap-[3px]">
          <span className="text-[26px] font-semibold tracking-[-.02em]">
            {stat.value}
          </span>
          <span className="font-mono text-[10.5px] text-ink-faint">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  )
}
