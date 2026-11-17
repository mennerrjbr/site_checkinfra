import { facts } from "../content/site.ts"

export function HoursNote() {
  return (
    <aside className="rounded-2xl border border-white/10 bg-navy-2 px-5 py-4 text-sm leading-relaxed text-mist">
      <p>{facts.travelFee}</p>
    </aside>
  )
}
