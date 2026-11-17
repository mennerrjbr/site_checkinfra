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
        lede="Três contratos de 12 meses para quem já tem, ou vai ter, sistema instalado pela CheckInfra. Peças são cobradas à parte. O atendimento é em horário comercial."
      />
      <section className="mx-auto max-w-6xl px-5 pb-16">
        <PlanCards />
        <div className="mt-10 max-w-3xl space-y-4 text-sm leading-relaxed text-mist">
          <h2 className="text-2xl font-semibold tracking-tight text-white">Como ler os planos</h2>
          <p>
            No Essencial, o limite é até 8 câmeras ou 1 sistema de alarme. É um ou o outro, não os
            dois juntos nesse valor.
          </p>
          <p>
            O Padrão descreve até 16 câmeras, com visita preventiva mensal e mão de obra corretiva
            incluída. Alarme e controle de acesso não entram na descrição desse plano.
          </p>
          <p>
            O Completo reúne câmeras, alarme, controle de acesso e rede. O valor começa em R$ 550
            por mês.
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
