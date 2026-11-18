import { renderToString } from "react-dom/server"
import { StaticRouter } from "react-router-dom/server"
import { App } from "./App.tsx"
import { canonicalUrl, getMeta, jsonLdFor, prerenderPaths } from "./content/site.ts"

export { prerenderPaths }

export function render(url: string) {
  const html = renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  )
  const meta = getMeta(url)
  const jsonLd = JSON.stringify(jsonLdFor(url)).replace(/</g, "\\u003c")

  return {
    html,
    title: meta.title,
    description: meta.description,
    robots: meta.robots,
    canonical: canonicalUrl(url),
    jsonLd,
  }
}
