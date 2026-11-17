import { HoursNote } from "../components/HoursNote.tsx"
import { IconWhatsApp } from "../components/Icons.tsx"
import { PageIntro } from "../components/PageIntro.tsx"
import { Seo } from "../components/Seo.tsx"
import { primaryButtonClass, WhatsAppLink } from "../components/WhatsAppLink.tsx"
import { company, facts, messages, pages, waLink } from "../content/site.ts"

export function Contato() {
  return (
    <>
      <Seo pathname={pages.contato.path} />
      <PageIntro
        meta={pages.contato}
        eyebrow="WhatsApp"
        title="Contato"
        lede="O contato da CheckInfra é pelo WhatsApp. Este site não tem formulário."
      />
      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-14 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-white/10 bg-navy-2 p-6 md:p-8">
          <h2 className="text-2xl font-semibold tracking-tight">WhatsApp {company.phoneDisplay}</h2>
          <p className="mt-3 text-base leading-relaxed text-mist">
            A mensagem abre com um texto pronto, conforme o botão. O texto pode ser editado antes do
            envio. Se puder, diga o tipo de imóvel e a cidade.
          </p>
          <WhatsAppLink href={waLink(messages.contato)} className={`${primaryButtonClass} mt-6`}>
            <IconWhatsApp className="h-4 w-4" />
            Abrir WhatsApp
          </WhatsAppLink>
        </div>
        <div className="space-y-4 text-sm leading-relaxed text-mist">
          <h2 className="text-2xl font-semibold tracking-tight text-white">Atendimento</h2>
          <p>{facts.hours}</p>
          <p>{facts.area}</p>
          <p>{facts.travelFee}</p>
          <p>
            {company.legalName}
            <br />
            CNPJ {company.cnpj}
          </p>
        </div>
        <div className="lg:col-span-2">
          <HoursNote />
        </div>
      </section>
    </>
  )
}
