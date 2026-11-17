import { Link, useLocation } from "react-router-dom"
import { IconWhatsApp } from "../components/Icons.tsx"
import { Seo } from "../components/Seo.tsx"
import { primaryButtonClass, secondaryButtonClass, WhatsAppLink } from "../components/WhatsAppLink.tsx"
import { messages, pages, waLink } from "../content/site.ts"

export function NotFound() {
  const location = useLocation()

  return (
    <>
      <Seo pathname={location.pathname} />
      <section className="mx-auto max-w-3xl px-5 py-20">
        <p className="text-sm font-semibold text-accent">404</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">Página não encontrada</h1>
        <p className="mt-4 text-lg leading-relaxed text-mist">
          Esse caminho não faz parte do site da CheckInfra. A página inicial, os planos e o WhatsApp
          seguem disponíveis.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link to={pages.home.path} className={secondaryButtonClass}>
            Ir para o início
          </Link>
          <Link to={pages.planos.path} className={secondaryButtonClass}>
            Ver planos
          </Link>
          <WhatsAppLink href={waLink(messages.notFound)} className={primaryButtonClass}>
            <IconWhatsApp className="h-4 w-4" />
            WhatsApp
          </WhatsAppLink>
        </div>
      </section>
    </>
  )
}
