import type { PageMeta } from "../content/site.ts"
import { Breadcrumb } from "./Breadcrumb.tsx"

type PageIntroProps = {
  meta: PageMeta
  eyebrow: string
  title: string
  lede: string
}

export function PageIntro({ meta, eyebrow, title, lede }: PageIntroProps) {
  return (
    <header className="border-b border-white/10">
      <div className="mx-auto max-w-6xl px-5 py-12 md:py-16">
        <Breadcrumb meta={meta} />
        <p className="mt-5 text-sm font-semibold text-accent">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-mist">{lede}</p>
      </div>
    </header>
  )
}
