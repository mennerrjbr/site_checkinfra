import { useEffect } from "react"
import { canonicalUrl, getMeta } from "../content/site.ts"

function setContent(selector: string, value: string) {
  const element = document.head.querySelector(selector)
  if (element) element.setAttribute("content", value)
}

export function Seo({ pathname }: { pathname: string }) {
  const meta = getMeta(pathname)
  const canonical = canonicalUrl(pathname)

  useEffect(() => {
    document.title = meta.title
    setContent('meta[name="description"]', meta.description)
    setContent('meta[name="robots"]', meta.robots)
    setContent('meta[property="og:title"]', meta.title)
    setContent('meta[property="og:description"]', meta.description)
    setContent('meta[property="og:url"]', canonical)
    const link = document.head.querySelector('link[rel="canonical"]')
    if (link) link.setAttribute("href", canonical)
  }, [canonical, meta])

  return null
}
