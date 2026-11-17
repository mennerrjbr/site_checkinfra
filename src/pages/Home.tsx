import { Link } from "react-router-dom"
import { IconAccess, IconAlarm, IconCamera, IconWhatsApp } from "../components/Icons.tsx"
import { PlanCards } from "../components/PlanCards.tsx"
import { Seo } from "../components/Seo.tsx"
import { primaryButtonClass, secondaryButtonClass, WhatsAppLink } from "../components/WhatsAppLink.tsx"
import { clients, company, facts, homeServices, messages, pages, waLink } from "../content/site.ts"

const serviceIcons = [IconCamera, IconAlarm, IconAccess] as const

const steps = [
  {
    title: "Análise gratuita",
    text: "O contato começa no WhatsApp, com o pedido de análise de segurança gratuita.",
  },
  {
    title: "Visita agendada",
    text: "A visita técnica é agendada.",
  },
  {
    title: "Instalação Intelbras",
    text: "A instalação usa somente equipamentos Intelbras. A manutenção, se for contratada, segue um dos planos.",
  },
] as const

export function Home() {
  return (
    <>
      <Seo pathname={pages.home.path} />
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,185,242,0.18),transparent_52%),radial-gradient(ellipse_at_bottom_left,rgba(63,169,245,0.12),transparent_46%)]" />
        <img
          src="/brand/symbol.svg"
          alt=""
          className="pointer-events-none absolute -right-10 top-6 hidden w-[26rem] opacity-[0.08] lg:block"
        />
        <div className="relative mx-auto max-w-6xl px-5 py-16 md:py-24">
          <p className="text-sm font-semibold text-accent">
            {facts.partner} · {facts.since}
          </p>
          <h1 className="mt-4 max-w-4xl text-3xl font-semibold leading-[1.15] tracking-tight sm:text-5xl">
            SEGURANÇA SEM LIMITES,{" "}
            <span className="mt-1 block">PROTEÇÃO SOB MEDIDA.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-mist">
            Câmeras, alarmes e controle de acesso com equipamentos Intelbras, em {company.area}.
            Redes e a parte elétrica entram como apoio desses sistemas.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <WhatsAppLink href={waLink(messages.home)} className={primaryButtonClass}>
              <IconWhatsApp className="h-4 w-4" />
              Pedir análise gratuita
            </WhatsAppLink>
            <Link to={pages.planos.path} className={secondaryButtonClass}>
              Ver planos de manutenção
            </Link>
          </div>
        </div>
      </section>

      <section aria-label="Dados da empresa" className="border-b border-white/10">
        <ul className="mx-auto grid max-w-6xl gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {[facts.since, facts.partner, facts.equipment, facts.area].map((item) => (
            <li key={item} className="bg-navy px-5 py-5 text-sm font-medium text-white">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <h2 className="text-3xl font-semibold tracking-tight">O que a CheckInfra instala</h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-mist">
          O trabalho é em segurança eletrônica. A análise de segurança gratuita é o caminho para
          começar.
        </p>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {homeServices.map((service, index) => {
            const Icon = serviceIcons[index] ?? IconCamera
            return (
              <li key={service.href}>
                <Link
                  to={service.href}
                  className="flex h-full flex-col rounded-3xl border border-white/10 bg-navy-2 p-6 hover:border-accent/50"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-navy text-accent">
                    <Icon />
                  </span>
                  <h3 className="mt-4 text-xl font-semibold">{service.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-mist">{service.text}</p>
                  <span className="mt-4 text-sm font-semibold text-accent">Ver esta página</span>
                </Link>
              </li>
            )
          })}
        </ul>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted">{facts.support}</p>
      </section>

      <section className="border-y border-white/10 bg-navy-2/60">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <h2 className="text-3xl font-semibold tracking-tight">Como começa</h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.title} className="rounded-3xl border border-white/10 p-6">
                <p className="text-sm font-semibold text-accent">0{index + 1}</p>
                <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <h2 className="text-3xl font-semibold tracking-tight">Planos de manutenção</h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-mist">
          Contrato de 12 meses. Cada plano inclui o anterior. Peças cobradas à parte.
        </p>
        <div className="mt-8">
          <PlanCards showPageLink />
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <h2 className="text-3xl font-semibold tracking-tight">Clientes que confiam</h2>
          <ul className="mt-8 grid gap-4 lg:grid-cols-3">
            {clients.map((client) => (
              <li
                key={client.name}
                className="flex flex-col rounded-3xl border border-white/10 bg-navy-2 p-6"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={client.logo}
                    alt={client.name}
                    width={512}
                    height={512}
                    className="h-16 w-16 shrink-0 rounded-2xl bg-white object-contain p-1"
                  />
                  <div>
                    <p className="text-xs font-semibold tracking-wide text-accent">Cliente</p>
                    <h3 className="text-lg font-semibold text-white">{client.name}</h3>
                  </div>
                </div>
                <blockquote className="mt-5 flex-1 border-l-2 border-accent pl-4 text-sm leading-relaxed text-mist">
                  <p>{client.quote}</p>
                </blockquote>
                <footer className="mt-5 border-t border-white/10 pt-4">
                  <p className="text-sm font-semibold text-white">{client.author}</p>
                  <p className="text-sm text-muted">{client.role}</p>
                  {"instagram" in client ? (
                    <a
                      href={client.instagram}
                      className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-accent underline decoration-accent/40 underline-offset-4"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @deck.65
                      <span className="sr-only"> (abre o Instagram)</span>
                    </a>
                  ) : null}
                </footer>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-16 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Peça a análise gratuita</h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-mist">
              O canal é o WhatsApp {company.phoneDisplay}.
            </p>
          </div>
          <WhatsAppLink href={waLink(messages.home)} className={primaryButtonClass}>
            <IconWhatsApp className="h-4 w-4" />
            Chamar no WhatsApp
          </WhatsAppLink>
        </div>
      </section>
    </>
  )
}
