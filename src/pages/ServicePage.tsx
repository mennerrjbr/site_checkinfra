import { Link } from "react-router-dom"
import { IconWhatsApp } from "../components/Icons.tsx"
import { PageIntro } from "../components/PageIntro.tsx"
import { Seo } from "../components/Seo.tsx"
import { primaryButtonClass, WhatsAppLink } from "../components/WhatsAppLink.tsx"
import { facts, servicePages, waLink, type ServicePageContent } from "../content/site.ts"

function ServiceView({ service }: { service: ServicePageContent }) {
  return (
    <>
      <Seo pathname={service.meta.path} />
      <PageIntro meta={service.meta} eyebrow={facts.partner} title={service.h1} lede={service.lede} />
      <div className="mx-auto max-w-6xl space-y-14 px-5 py-14">
        <section className="max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight">{service.problemTitle}</h2>
          <div className="mt-4 space-y-3 text-base leading-relaxed text-mist">
            {service.problem.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>
        <section className="max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight">{service.solutionTitle}</h2>
          <div className="mt-4 space-y-3 text-base leading-relaxed text-mist">
            {service.solution.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-semibold tracking-tight">{service.includedTitle}</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {service.included.map((item) => (
              <li key={item} className="rounded-2xl border border-white/10 bg-navy-2 px-4 py-3 text-sm leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-semibold tracking-tight">{service.planTitle}</h2>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-mist">{service.planIntro}</p>
          <ul className="mt-5 grid gap-3">
            {service.planFit.map((item) => (
              <li key={item.name} className="rounded-2xl border border-white/10 p-5">
                <h3 className="text-lg font-semibold">
                  <Link to={item.href} className="underline decoration-accent/50 underline-offset-4">
                    {item.name}
                  </Link>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{item.text}</p>
              </li>
            ))}
          </ul>
        </section>
        <WhatsAppLink href={waLink(service.message)} className={primaryButtonClass}>
          <IconWhatsApp className="h-4 w-4" />
          Pedir análise gratuita
        </WhatsAppLink>
      </div>
    </>
  )
}

export function Cameras() {
  return <ServiceView service={servicePages.cameras} />
}

export function Alarmes() {
  return <ServiceView service={servicePages.alarmes} />
}

export function ControleAcesso() {
  return <ServiceView service={servicePages.acesso} />
}
