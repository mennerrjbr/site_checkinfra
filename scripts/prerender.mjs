import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { pathToFileURL } from "node:url"

const root = resolve(import.meta.dirname, "..")
const templatePath = resolve(root, "dist/index.html")
const template = readFileSync(templatePath, "utf8")

if (!template.includes("__META_TITLE__") || !template.includes('<div id="root"></div>')) {
  console.error("dist/index.html não tem os marcadores de prerender")
  process.exit(1)
}

const serverHref = pathToFileURL(resolve(root, "dist-server/entry-server.js")).href
const server = await import(serverHref)

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
}

for (const routePath of server.prerenderPaths) {
  const rendered = server.render(routePath)
  const page = template
    .replaceAll("__META_TITLE__", escapeHtml(rendered.title))
    .replaceAll("__META_DESCRIPTION__", escapeHtml(rendered.description))
    .replaceAll("__META_CANONICAL__", escapeHtml(rendered.canonical))
    .replaceAll("__META_ROBOTS__", escapeHtml(rendered.robots))
    .replace("__JSON_LD__", rendered.jsonLd)
    .replace('<div id="root"></div>', `<div id="root">${rendered.html}</div>`)

  const relative =
    routePath === "/"
      ? "index.html"
      : routePath === "/404"
        ? "404.html"
        : `${routePath.slice(1)}/index.html`
  const output = resolve(root, "dist", relative)
  mkdirSync(dirname(output), { recursive: true })
  writeFileSync(output, page)
  console.log("prerender", relative)
}
