import { Link } from "react-router-dom"
import type { PageMeta } from "../content/site.ts"

export function Breadcrumb({ meta }: { meta: PageMeta }) {
  if (meta.path === "/") return null

  return (
    <nav aria-label="Trilha" className="text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link to="/" className="underline decoration-white/30 underline-offset-4 hover:text-white">
            Início
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li aria-current="page" className="text-mist">
          {meta.crumb}
        </li>
      </ol>
    </nav>
  )
}
