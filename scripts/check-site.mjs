import { readFileSync, readdirSync, statSync } from "node:fs"
import { resolve } from "node:path"

const root = resolve(import.meta.dirname, "..")
const dist = resolve(root, "dist")
const errors = []

const routes = [
  "index.html",
  "planos/index.html",
  "cameras/index.html",
  "alarmes/index.html",
  "controle-de-acesso/index.html",
  "sobre/index.html",
  "contato/index.html",
  "privacidade/index.html",
  "404.html",
  "robots.txt",
  "sitemap.xml",
  ".htaccess",
  "favicon.svg",
  "brand/logo.png",
  "brand/symbol.svg",
]

for (const route of routes) {
  try {
    statSync(resolve(dist, route))
  } catch {
    errors.push(`arquivo ausente: ${route}`)
  }
}

const required = [
  "47.627.806/0001-78",
  "Reis Segurança Eletrônica e TI Ltda",
  "Parceiro Intelbras",
  "desde 2013",
  "Nova Iguaçu",
  "Creche Gente Curiosa",
  "MLB Assessoria Contábil",
  "R$ 180",
  "R$ 350",
  "R$ 550",
  "wa.me/5521975369597",
  "análise de segurança gratuita",
  "horário comercial",
  "Contrato de 12 meses",
  "Peças cobradas à parte",
]

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = resolve(dir, entry)
    if (statSync(full).isDirectory()) walk(full, files)
    else if (entry.endsWith(".html")) files.push(full)
  }
  return files
}

const htmlFiles = walk(dist)
const titles = new Set()
let combined = ""

const forbidden = [
  /24\s*\/\s*7/i,
  /24h/i,
  /plant[aã]o/i,
  /nossa equipe/i,
  /equipe de t[eé]cnic/i,
  /nossos t[eé]cnic/i,
  /engenharia/i,
  /engenheir/i,
  /certificad/i,
  /homologad/i,
  /energia solar/i,
  /renov[aá]ve/i,
  /depoimento/i,
  /avalia[cç][aã]o/i,
  /estrelas/i,
  /pr[eê]mio/i,
  /\bcurso\b/i,
  /\+\s*300/,
  /\+\s*500/,
  /\brua\b/i,
  /\bavenida\b/i,
  /\bcep\b/i,
  /endere[cç]o/i,
  /central de monitoramento/i,
  /l[ií]der/i,
  /garantia/i,
  /streetAddress/i,
  /postalCode/i,
  /openingHours/i,
]

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8")
  combined += `\n${html}`
  if (html.includes("__META_") || html.includes("__JSON_LD__")) {
    errors.push(`marcador de prerender restante em ${file}`)
  }
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? ""
  if (!title || titles.has(title)) errors.push(`title ausente ou repetido em ${file}: ${title}`)
  titles.add(title)
  const h1 = html.match(/<h1[\s\S]*?<\/h1>/g) ?? []
  if (h1.length !== 1) errors.push(`${file} tem ${h1.length} h1`)
  if (!html.includes('lang="pt-BR"')) errors.push(`${file} sem lang pt-BR`)
  const stripped = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
  const voice = stripped
    .replaceAll(
      "Nossa parceria com a Checkinfra já dura mais de 3 anos e transformou a nossa operação. Eles realizaram uma reestruturação completa da nossa TI, implementando ferramentas colaborativas e soluções integradas de Inteligência Artificial. Com o novo ecossistema de compartilhamento de arquivos — que garante segurança absoluta e alta disponibilidade — a produtividade e a confiança da nossa equipe deram um salto exponencial.",
      " ",
    )
    .replaceAll(
      "Antes da Checkinfra, sofríamos muito com a falta de suporte técnico. Hoje, nossas solicitações são resolvidas sempre dentro do prazo programado e contamos com uma manutenção preventiva rigorosa. O maior diferencial é a entrega completa da infraestrutura: não precisamos mais procurar eletricistas à parte para implementar nossos projetos de segurança eletrônica. Eles resolvem tudo de ponta a ponta com muita competência.",
      " ",
    )
  if (/deslocamento/i.test(html)) errors.push(`${file} ainda menciona taxa de deslocamento`)
  if (/24\s*horas|24h|openingHours/i.test(html)) {
    errors.push(`${file} ainda menciona 24 horas ou openingHours`)
  }
  if (/MLB(?! Assessoria Contábil)/.test(html)) {
    errors.push(`${file} menciona MLB sem o nome completo`)
  }
  const commercialHours = html.match(/Atendimento em horário comercial/g) ?? []
  const planListPage = /\/dist\/index\.html$/.test(file) || /\/planos\/index\.html$/.test(file)
  if (planListPage && commercialHours.length !== 1) {
    errors.push(`${file} deve ter a condição de horário comercial uma vez, tem ${commercialHours.length}`)
  }
  if (!planListPage && commercialHours.length > 0) {
    errors.push(`${file} repete atendimento em horário comercial fora da lista de planos`)
  }
  for (const pattern of forbidden) {
    if (pattern.test(voice)) errors.push(`${file} contém padrão proibido ${pattern}`)
  }
}

for (const phrase of required) {
  if (!combined.includes(phrase)) errors.push(`texto obrigatório ausente: ${phrase}`)
}

const home = readFileSync(resolve(dist, "index.html"), "utf8")
if (!home.includes("LocalBusiness")) errors.push("JSON-LD sem LocalBusiness")
if (home.includes("streetAddress")) errors.push("JSON-LD com endereço")

if (errors.length) {
  console.error(errors.join("\n"))
  process.exit(1)
}

console.log(`ok: ${htmlFiles.length} páginas HTML`)
