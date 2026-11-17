export const company = {
  brand: "CheckInfra",
  wordmark: "checkinfra",
  legalName: "Reis Segurança Eletrônica e TI Ltda",
  cnpj: "47.627.806/0001-78",
  url: "https://www.checkinfra.com.br",
  phoneDisplay: "(21) 97536-9597",
  phoneE164: "5521975369597",
  city: "Nova Iguaçu",
  area: "Nova Iguaçu e região",
} as const

export const facts = {
  since: "Desde 2013",
  partner: "Parceiro Intelbras",
  equipment: "Somente equipamentos Intelbras",
  area: company.area,
  travelFee: "Fora de Nova Iguaçu, a visita tem taxa de deslocamento.",
  analysis: "Análise de segurança gratuita",
  owner: "A CheckInfra é operada pelo proprietário.",
  history:
    "A atuação em segurança eletrônica é desde 2013. O CNPJ atual, da Reis Segurança Eletrônica e TI Ltda, é de 2022.",
  intelbras:
    "A CheckInfra é Parceiro Intelbras. A parceria é formal, e o serviço é feito somente com equipamentos Intelbras. A empresa participa de diversos treinamentos da Intelbras.",
  support:
    "Redes (TI) e elétrica são serviços de apoio à instalação e ao funcionamento dos sistemas de segurança. Em redes, a MLB Assessoria Contábil é cliente atual.",
} as const

export function waLink(message: string): string {
  return `https://wa.me/${company.phoneE164}?text=${encodeURIComponent(message)}`
}

export const messages = {
  home: "Olá! Vim pelo site da CheckInfra e quero uma análise de segurança gratuita.",
  planos:
    "Olá! Vim pela página de planos da CheckInfra e quero uma análise de segurança gratuita.",
  essencial:
    "Olá! Vim pelo site da CheckInfra e quero saber mais sobre o plano Essencial (R$ 180/mês).",
  padrao:
    "Olá! Vim pelo site da CheckInfra e quero saber mais sobre o plano Padrão (R$ 350/mês).",
  completo:
    "Olá! Vim pelo site da CheckInfra e quero saber mais sobre o plano Completo (a partir de R$ 550/mês).",
  cameras:
    "Olá! Vim pela página de câmeras da CheckInfra e quero uma análise de segurança gratuita.",
  alarmes:
    "Olá! Vim pela página de alarmes da CheckInfra e quero uma análise de segurança gratuita.",
  acesso:
    "Olá! Vim pela página de controle de acesso da CheckInfra e quero uma análise de segurança gratuita.",
  sobre: "Olá! Vim pela página Sobre da CheckInfra e quero falar com a CheckInfra.",
  contato: "Olá! Vim pela página de contato da CheckInfra.",
  notFound: "Olá! Vim pelo site da CheckInfra e não encontrei a página que procurava.",
} as const

export const sharedPlanTerms = [
  "Contrato de 12 meses",
  "Peças cobradas à parte",
  "Taxa de deslocamento fora de Nova Iguaçu",
  "Atendimento em horário comercial",
] as const

export type Plan = {
  id: "essencial" | "padrao" | "completo"
  name: string
  price: string
  fromPrice: boolean
  period: string
  summary: string
  items: readonly string[]
  note?: string
  message: string
}

export const plans: readonly Plan[] = [
  {
    id: "essencial",
    name: "Essencial",
    price: "R$ 180",
    fromPrice: false,
    period: "/mês",
    summary: "Para um conjunto menor de câmeras ou para um sistema de alarme.",
    items: [
      "Até 8 câmeras ou 1 sistema de alarme",
      "Visita preventiva a cada 3 meses",
      "Suporte remoto",
    ],
    message: messages.essencial,
  },
  {
    id: "padrao",
    name: "Padrão",
    price: "R$ 350",
    fromPrice: false,
    period: "/mês",
    summary: "Inclui o Essencial, com câmeras e alarme no mesmo contrato.",
    items: [
      "Até 16 câmeras e alarme",
      "Visita preventiva mensal",
      "Mão de obra corretiva incluída",
    ],
    message: messages.padrao,
  },
  {
    id: "completo",
    name: "Completo",
    price: "R$ 550",
    fromPrice: true,
    period: "/mês",
    summary: "Inclui o Padrão, com até 32 câmeras, alarme, controle de acesso e rede.",
    items: [
      "Até 32 câmeras (16 a mais que o Padrão) e alarme",
      "Controle de acesso e rede",
      "Visita preventiva mensal",
      "Prioridade no atendimento",
    ],
    note: "O valor sobe em relação ao Padrão porque inclui o controle de acesso; o preço final depende do controle de acesso do local.",
    message: messages.completo,
  },
]

export type PageMeta = {
  path: string
  title: string
  description: string
  robots: string
  crumb: string
}

export const pages = {
  home: {
    path: "/",
    title: "CheckInfra | Segurança eletrônica em Nova Iguaçu",
    description:
      "Câmeras, alarmes e controle de acesso com equipamentos Intelbras em Nova Iguaçu e região. Análise de segurança gratuita pelo WhatsApp.",
    robots: "index,follow",
    crumb: "Início",
  },
  planos: {
    path: "/planos",
    title: "Planos de manutenção | CheckInfra",
    description:
      "Planos Essencial, Padrão e Completo. Contrato de 12 meses e peças à parte, em Nova Iguaçu e região.",
    robots: "index,follow",
    crumb: "Planos",
  },
  cameras: {
    path: "/cameras",
    title: "Câmeras e CFTV em Nova Iguaçu | CheckInfra",
    description:
      "Instalação de câmeras (CFTV) com equipamentos Intelbras em Nova Iguaçu e região. Análise de segurança gratuita pelo WhatsApp.",
    robots: "index,follow",
    crumb: "Câmeras",
  },
  alarmes: {
    path: "/alarmes",
    title: "Alarmes em Nova Iguaçu | CheckInfra",
    description:
      "Instalação de alarmes com equipamentos Intelbras em Nova Iguaçu e região. Análise de segurança gratuita pelo WhatsApp.",
    robots: "index,follow",
    crumb: "Alarmes",
  },
  acesso: {
    path: "/controle-de-acesso",
    title: "Controle de acesso em Nova Iguaçu | CheckInfra",
    description:
      "Controle de acesso com equipamentos Intelbras em Nova Iguaçu e região. Análise de segurança gratuita. Manutenção no plano Completo.",
    robots: "index,follow",
    crumb: "Controle de acesso",
  },
  sobre: {
    path: "/sobre",
    title: "Sobre a CheckInfra | Segurança eletrônica desde 2013",
    description:
      "CheckInfra atua em segurança eletrônica desde 2013, é Parceiro Intelbras e atende Nova Iguaçu e região. Empresa operada pelo proprietário.",
    robots: "index,follow",
    crumb: "Sobre",
  },
  contato: {
    path: "/contato",
    title: "Contato | CheckInfra",
    description:
      "Fale com a CheckInfra pelo WhatsApp (21) 97536-9597. Nova Iguaçu e região.",
    robots: "index,follow",
    crumb: "Contato",
  },
  privacidade: {
    path: "/privacidade",
    title: "Privacidade | CheckInfra",
    description:
      "Aviso de privacidade da CheckInfra. O site não tem formulário nem cookies de rastreamento. Pedidos sobre dados pessoais pelo WhatsApp.",
    robots: "index,follow",
    crumb: "Privacidade",
  },
  notFound: {
    path: "/404",
    title: "Página não encontrada | CheckInfra",
    description: "A página solicitada não está no site da CheckInfra.",
    robots: "noindex,follow",
    crumb: "Página não encontrada",
  },
} as const satisfies Record<string, PageMeta>

export const pageList: readonly PageMeta[] = Object.values(pages)

export const prerenderPaths = [
  "/",
  "/planos",
  "/cameras",
  "/alarmes",
  "/controle-de-acesso",
  "/sobre",
  "/contato",
  "/privacidade",
  "/404",
] as const

export const navItems = [
  pages.planos,
  pages.cameras,
  pages.alarmes,
  pages.acesso,
  pages.sobre,
  pages.contato,
] as const

export function messageForPath(pathname: string): string {
  switch (getMeta(pathname).path) {
    case pages.planos.path:
      return messages.planos
    case pages.cameras.path:
      return messages.cameras
    case pages.alarmes.path:
      return messages.alarmes
    case pages.acesso.path:
      return messages.acesso
    case pages.sobre.path:
      return messages.sobre
    case pages.contato.path:
      return messages.contato
    case pages.privacidade.path:
      return messages.contato
    case pages.notFound.path:
      return messages.notFound
    default:
      return messages.home
  }
}

export function normalizePath(pathname: string): string {
  if (pathname === "" || pathname === "/") return "/"
  const trimmed = pathname.replace(/\/+$/, "")
  return trimmed.length > 0 ? trimmed : "/"
}

export function getMeta(pathname: string): PageMeta {
  const path = normalizePath(pathname)
  return pageList.find((page) => page.path === path) ?? pages.notFound
}

export function canonicalUrl(pathname: string): string {
  const meta = getMeta(pathname)
  if (meta.path === "/" || meta.path === "/404") {
    return meta.path === "/" ? `${company.url}/` : `${company.url}/404`
  }
  return `${company.url}${meta.path}`
}

export type ServicePageContent = {
  meta: PageMeta
  message: string
  h1: string
  lede: string
  problemTitle: string
  problem: readonly string[]
  solutionTitle: string
  solution: readonly string[]
  includedTitle: string
  included: readonly string[]
  planTitle: string
  planIntro: string
  planFit: readonly { href: string; name: string; text: string }[]
}

export const servicePages: Record<"cameras" | "alarmes" | "acesso", ServicePageContent> = {
  cameras: {
    meta: pages.cameras,
    message: messages.cameras,
    h1: "Câmeras e CFTV em Nova Iguaçu",
    lede: "Instalação de sistema de câmeras com equipamentos Intelbras, a partir de uma análise de segurança gratuita.",
    problemTitle: "O que fica descoberto sem imagem",
    problem: [
      "Sem câmera, o que acontece no imóvel não fica registrado.",
      "Um ponto sem imagem, uma câmera fora da posição combinada ou um sistema parado deixa aquela área sem registro.",
    ],
    solutionTitle: "O que a CheckInfra faz",
    solution: [
      "A entrada é uma análise de segurança gratuita, pedida pelo WhatsApp.",
      "A visita técnica é agendada. Fora de Nova Iguaçu, a visita tem taxa de deslocamento.",
      "O sistema de câmeras é instalado com equipamentos Intelbras.",
    ],
    includedTitle: "O que está incluído nesse atendimento",
    included: [
      "Análise de segurança gratuita",
      "Equipamentos Intelbras",
      "Instalação do sistema de câmeras",
      "Contrato de manutenção, se for contratado",
    ],
    planTitle: "Qual plano combina",
    planIntro:
      "A manutenção é um contrato à parte da instalação. As peças continuam cobradas à parte em todos os planos.",
    planFit: [
      {
        href: "/planos#essencial",
        name: "Essencial",
        text: "Até 8 câmeras, ou 1 sistema de alarme no lugar delas. Visita preventiva a cada 3 meses e suporte remoto. R$ 180 por mês.",
      },
      {
        href: "/planos#padrao",
        name: "Padrão",
        text: "Inclui o Essencial, com até 16 câmeras e alarme. Visita preventiva mensal e mão de obra corretiva incluída. R$ 350 por mês.",
      },
      {
        href: "/planos#completo",
        name: "Completo",
        text: "Inclui o Padrão e chega a 32 câmeras, 16 a mais que o Padrão, com alarme, controle de acesso e rede. Visita mensal e prioridade no atendimento. A partir de R$ 550 por mês. O valor sobe em relação ao Padrão porque inclui o controle de acesso; o preço final depende do controle de acesso do local.",
      },
    ],
  },
  alarmes: {
    meta: pages.alarmes,
    message: messages.alarmes,
    h1: "Alarmes em Nova Iguaçu",
    lede: "Instalação de sistema de alarme com equipamentos Intelbras, a partir de uma análise de segurança gratuita.",
    problemTitle: "Quando a entrada no imóvel passa sem aviso",
    problem: [
      "Porta, janela ou área interna sem detecção dependem de alguém notar o fato na hora.",
      "O sistema de alarme existe para disparar nos pontos em que os sensores foram instalados.",
    ],
    solutionTitle: "O que a CheckInfra faz",
    solution: [
      "A entrada é uma análise de segurança gratuita, pedida pelo WhatsApp.",
      "A visita técnica é agendada. Fora de Nova Iguaçu, a visita tem taxa de deslocamento.",
      "O alarme é instalado com equipamentos Intelbras.",
    ],
    includedTitle: "O que está incluído nesse atendimento",
    included: [
      "Análise de segurança gratuita",
      "Equipamentos Intelbras",
      "Instalação do sistema de alarme",
      "Contrato de manutenção, se for contratado",
    ],
    planTitle: "Qual plano combina",
    planIntro:
      "No Essencial, 1 sistema de alarme entra no lugar das câmeras. O Padrão inclui o Essencial e reúne até 16 câmeras e alarme. O Completo inclui o Padrão, chega a 32 câmeras e soma controle de acesso e rede.",
    planFit: [
      {
        href: "/planos#essencial",
        name: "Essencial",
        text: "1 sistema de alarme, no lugar das câmeras. Visita preventiva a cada 3 meses e suporte remoto. R$ 180 por mês.",
      },
      {
        href: "/planos#padrao",
        name: "Padrão",
        text: "Inclui o Essencial, com até 16 câmeras e alarme. Visita preventiva mensal e mão de obra corretiva incluída. R$ 350 por mês.",
      },
      {
        href: "/planos#completo",
        name: "Completo",
        text: "Inclui o Padrão e chega a 32 câmeras, 16 a mais que o Padrão, com alarme, controle de acesso e rede. Visita mensal e prioridade no atendimento. A partir de R$ 550 por mês. O valor sobe em relação ao Padrão porque inclui o controle de acesso; o preço final depende do controle de acesso do local.",
      },
    ],
  },
  acesso: {
    meta: pages.acesso,
    message: messages.acesso,
    h1: "Controle de acesso em Nova Iguaçu",
    lede: "Instalação de controle de acesso com equipamentos Intelbras, a partir de uma análise de segurança gratuita.",
    problemTitle: "Quando não dá para saber quem entrou",
    problem: [
      "Chave compartilhada ou um acesso sem controle dificultam saber quem passou por aquele ponto.",
      "O controle de acesso organiza a entrada nos pontos em que é instalado.",
    ],
    solutionTitle: "O que a CheckInfra faz",
    solution: [
      "A entrada é uma análise de segurança gratuita, pedida pelo WhatsApp.",
      "A visita técnica é agendada. Fora de Nova Iguaçu, a visita tem taxa de deslocamento.",
      "O controle de acesso é instalado com equipamentos Intelbras.",
    ],
    includedTitle: "O que está incluído nesse atendimento",
    included: [
      "Análise de segurança gratuita",
      "Equipamentos Intelbras",
      "Instalação do controle de acesso",
      "Contrato de manutenção no plano Completo, se for contratado",
    ],
    planTitle: "Qual plano combina",
    planIntro:
      "O controle de acesso entra no plano Completo. Esse plano inclui o Padrão, chega a 32 câmeras e soma alarme, controle de acesso e rede.",
    planFit: [
      {
        href: "/planos#completo",
        name: "Completo",
        text: "Inclui o Padrão e chega a 32 câmeras, 16 a mais que o Padrão, com alarme, controle de acesso e rede. Visita preventiva mensal e prioridade no atendimento. A partir de R$ 550 por mês. O valor sobe em relação ao Padrão porque inclui o controle de acesso; o preço final depende do controle de acesso do local.",
      },
    ],
  },
}

export const clients = [
  {
    name: "Creche Gente Curiosa",
    detail: "Cliente de referência, com contrato de manutenção.",
  },
  {
    name: "MLB Assessoria Contábil",
    detail: "Cliente atual de TI.",
  },
] as const

export const homeServices = [
  {
    href: pages.cameras.path,
    title: "Câmeras (CFTV)",
    text: "Sistema de câmeras com equipamentos Intelbras.",
  },
  {
    href: pages.alarmes.path,
    title: "Alarmes",
    text: "Sistema de alarme com equipamentos Intelbras.",
  },
  {
    href: pages.acesso.path,
    title: "Controle de acesso",
    text: "Controle de acesso com equipamentos Intelbras.",
  },
] as const

type JsonLd = Record<string, unknown>

export function jsonLdFor(pathname: string): JsonLd {
  const meta = getMeta(pathname)
  const crumbs = breadcrumbItems(meta)
  const graph: JsonLd[] = [
    {
      "@type": "LocalBusiness",
      "@id": `${company.url}/#negocio`,
      name: company.brand,
      legalName: company.legalName,
      url: `${company.url}/`,
      telephone: "+5521975369597",
      taxID: company.cnpj,
      image: `${company.url}/brand/og.png`,
      logo: `${company.url}/brand/logo.png`,
      description: pages.home.description,
      currenciesAccepted: "BRL",
      areaServed: {
        "@type": "City",
        name: company.city,
      },
      knowsAbout: ["CFTV", "Alarmes", "Controle de acesso", "Redes"],
      makesOffer: [
        {
          "@type": "Offer",
          name: "Plano Essencial",
          price: "180.00",
          priceCurrency: "BRL",
          url: `${company.url}/planos#essencial`,
          description:
            "R$ 180 por mês. Contrato de 12 meses. Até 8 câmeras ou 1 sistema de alarme. Visita preventiva a cada 3 meses. Suporte remoto. Peças cobradas à parte.",
        },
        {
          "@type": "Offer",
          name: "Plano Padrão",
          price: "350.00",
          priceCurrency: "BRL",
          url: `${company.url}/planos#padrao`,
          description:
            "R$ 350 por mês. Contrato de 12 meses. Inclui o Essencial, com até 16 câmeras e alarme. Visita preventiva mensal. Mão de obra corretiva incluída. Peças cobradas à parte.",
        },
        {
          "@type": "Offer",
          name: "Plano Completo",
          url: `${company.url}/planos#completo`,
          description:
            "A partir de R$ 550 por mês. Contrato de 12 meses. Inclui o Padrão, com até 32 câmeras (16 a mais que o Padrão), alarme, controle de acesso e rede. Visita preventiva mensal. Prioridade no atendimento. O valor sobe em relação ao Padrão porque inclui o controle de acesso; o preço final depende do controle de acesso do local. Peças cobradas à parte.",
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${company.url}/#site`,
      name: company.brand,
      url: `${company.url}/`,
      inLanguage: "pt-BR",
      publisher: { "@id": `${company.url}/#negocio` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: crumbs,
    },
  ]

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  }
}

function breadcrumbItems(meta: PageMeta): JsonLd[] {
  const home = {
    "@type": "ListItem",
    position: 1,
    name: "Início",
    item: `${company.url}/`,
  }
  if (meta.path === "/" || meta.path === "/404") return [home]
  return [
    home,
    {
      "@type": "ListItem",
      position: 2,
      name: meta.crumb,
      item: `${company.url}${meta.path}`,
    },
  ]
}
