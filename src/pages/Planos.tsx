import { HoursNote } from "../components/HoursNote.tsx"
import { IconWhatsApp } from "../components/Icons.tsx"
import { PageIntro } from "../components/PageIntro.tsx"
import { PlanCards } from "../components/PlanCards.tsx"
import { Seo } from "../components/Seo.tsx"
import { primaryButtonClass, WhatsAppLink } from "../components/WhatsAppLink.tsx"
import { messages, pages, waLink } from "../content/site.ts"

export function Planos() {
  return (
    <>
      <Seo pathname={pages.planos.path} />
      <PageIntro
        meta={pages.planos}
        eyebrow="Manutenção"
        title="Planos de manutenção"
        lede="Três contratos de 12 meses. Cada plano inclui o anterior. Peças são cobradas à parte."
      />
      <section className="mx-auto max-w-6xl px-5 pb-16">
        <PlanCards />
        <div className="mt-10 max-w-3xl space-y-4 text-sm leading-relaxed text-mist">
          <h2 className="text-2xl font-semibold tracking-tight text-white">Como ler os planos</h2>
          <p>Cada plano inclui o anterior.</p>
          <p>
            No Essencial, o limite é até 8 câmeras ou 1 sistema de alarme. É um ou o outro, não os
            dois juntos nesse valor. A visita preventiva é a cada 3 meses, com suporte remoto. R$ 180
            por mês.
          </p>
          <p>
            O Padrão inclui o Essencial e reúne câmeras (até 16) e alarme. A visita preventiva é
            mensal e a mão de obra corretiva está incluída. R$ 350 por mês.
          </p>
          <p>
            O Completo inclui o Padrão e soma controle de acesso e rede. O limite de câmeras sobe
            para 32, 16 a mais que o Padrão, com alarme. A visita preventiva é mensal, com prioridade
            no atendimento. O valor começa em R$ 550 por mês. O valor sobe em relação ao Padrão
            porque inclui o controle de acesso; o preço final depende do controle de acesso do local.
          </p>
        </div>
        <div className="mt-10">
          <HoursNote />
        </div>
        <div className="mt-10">
          <WhatsAppLink href={waLink(messages.planos)} className={primaryButtonClass}>
            <IconWhatsApp className="h-4 w-4" />
            Pedir análise gratuita
          </WhatsAppLink>
        </div>
      </section>
    </>
  )
}
