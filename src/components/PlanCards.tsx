import { Link } from "react-router-dom"
import { plans, sharedPlanTerms, waLink } from "../content/site.ts"
import { IconWhatsApp } from "./Icons.tsx"
import { primaryButtonClass, WhatsAppLink } from "./WhatsAppLink.tsx"

export function PlanCards({ showPageLink = false }: { showPageLink?: boolean }) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {plans.map((plan) => (
        <article
          id={plan.id}
          key={plan.id}
          className="flex scroll-mt-28 flex-col rounded-3xl border border-white/10 bg-navy-2 p-6"
        >
          <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
          <p className="mt-3 min-h-5 text-sm font-medium text-accent" aria-hidden={plan.fromPrice ? undefined : true}>
            {plan.fromPrice ? "a partir de" : "\u00a0"}
          </p>
          <p className="text-4xl font-semibold tracking-tight text-white">
            {plan.price}
            <span className="text-base font-medium text-muted">{plan.period}</span>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-mist">{plan.summary}</p>
          <ul className="mt-5 flex flex-1 flex-col gap-2 text-sm leading-relaxed text-white">
            {plan.items.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <WhatsAppLink href={waLink(plan.message)} className={`${primaryButtonClass} mt-6 w-full`}>
            <IconWhatsApp className="h-4 w-4" />
            Pedir este plano
          </WhatsAppLink>
        </article>
      ))}
      <div className="lg:col-span-3">
        <h3 className="text-base font-semibold text-white">Em todos os planos</h3>
        <ul className="mt-3 grid gap-2 text-sm text-mist sm:grid-cols-2">
          {sharedPlanTerms.map((term) => (
            <li key={term} className="rounded-2xl border border-white/10 px-4 py-3">
              {term}
            </li>
          ))}
        </ul>
        {showPageLink ? (
          <p className="mt-4 text-sm text-muted">
            Condições e encaixe de cada serviço na página de{" "}
            <Link to="/planos" className="text-white underline decoration-accent underline-offset-4">
              planos de manutenção
            </Link>
            .
          </p>
        ) : null}
      </div>
    </div>
  )
}
