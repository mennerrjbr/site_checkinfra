import { Link } from "react-router-dom"
import { IconWhatsApp } from "../components/Icons.tsx"
import { PageIntro } from "../components/PageIntro.tsx"
import { Seo } from "../components/Seo.tsx"
import { primaryButtonClass, WhatsAppLink } from "../components/WhatsAppLink.tsx"
import { clients, company, facts, messages, pages, waLink } from "../content/site.ts"

export function Sobre() {
  return (
    <>
      <Seo pathname={pages.sobre.path} />
      <PageIntro
        meta={pages.sobre}
        eyebrow={facts.since}
        title="Sobre a CheckInfra"
        lede="Segurança eletrônica em Nova Iguaçu e região, com equipamentos Intelbras."
      />
      <article className="mx-auto max-w-3xl space-y-6 px-5 py-14 text-base leading-relaxed text-mist">
        <p>{facts.history}</p>
        <p>{facts.owner}</p>
        <p>
          A área de atuação é {company.area}. {facts.travelFee}
        </p>
        <p>{facts.intelbras}</p>
        <p>
          O serviço principal é segurança eletrônica: câmeras (CFTV), alarmes e controle de acesso.
          {` ${facts.support}`}
        </p>
        <h2 className="pt-4 text-2xl font-semibold tracking-tight text-white">Clientes que confiam</h2>
        <ul className="space-y-3">
          {clients.map((client) => (
            <li key={client.name}>
              <span className="font-semibold text-white">{client.name}.</span> {client.detail}
            </li>
          ))}
        </ul>
        <p>
          A entrada para um serviço novo é a{" "}
          <Link to="/" className="text-white underline decoration-accent underline-offset-4">
            análise de segurança gratuita
          </Link>
          . Os contratos de manutenção estão na página de{" "}
          <Link to={pages.planos.path} className="text-white underline decoration-accent underline-offset-4">
            planos
          </Link>
          .
        </p>
        <p>
          Razão social: {company.legalName}. CNPJ {company.cnpj}. O contato é o WhatsApp{" "}
          {company.phoneDisplay}.
        </p>
        <WhatsAppLink href={waLink(messages.sobre)} className={primaryButtonClass}>
          <IconWhatsApp className="h-4 w-4" />
          Falar com a CheckInfra
        </WhatsAppLink>
      </article>
    </>
  )
}
