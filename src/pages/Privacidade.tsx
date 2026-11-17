import { PageIntro } from "../components/PageIntro.tsx"
import { Seo } from "../components/Seo.tsx"
import { WhatsAppLink } from "../components/WhatsAppLink.tsx"
import { company, messages, pages, waLink } from "../content/site.ts"

export function Privacidade() {
  return (
    <>
      <Seo pathname={pages.privacidade.path} />
      <PageIntro
        meta={pages.privacidade}
        eyebrow="LGPD"
        title="Aviso de privacidade"
        lede="Este texto descreve o site da CheckInfra publicado em 17 de novembro de 2026."
      />
      <article className="mx-auto max-w-3xl space-y-6 px-5 py-14 text-base leading-relaxed text-mist">
        <section>
          <h2 className="text-2xl font-semibold tracking-tight text-white">Quem é o controlador</h2>
          <p className="mt-3">
            {company.legalName}, CNPJ {company.cnpj}, nome fantasia {company.brand}. Pedidos sobre
            dados pessoais podem ser feitos pelo WhatsApp {company.phoneDisplay}.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold tracking-tight text-white">O que este site faz</h2>
          <p className="mt-3">
            O site apresenta a empresa, os serviços e os planos de manutenção. Não há formulário,
            cadastro, área de login nem compra dentro do site.
          </p>
          <p className="mt-3">
            O site não usa cookies de rastreamento e não usa ferramenta de analytics. Nenhum script
            do site grava cookie no navegador.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold tracking-tight text-white">WhatsApp</h2>
          <p className="mt-3">
            Os botões abrem o WhatsApp (wa.me) com uma mensagem já escrita, a mesma indicada no
            botão. A conversa acontece no WhatsApp, serviço de terceiros. A CheckInfra recebe o que
            for enviado nessa conversa para responder o atendimento.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold tracking-tight text-white">Registros do servidor</h2>
          <p className="mt-3">
            A hospedagem pode guardar registros técnicos de acesso, como IP, data, página e
            navegador, para operar o site. A CheckInfra não usa esses registros para publicidade.
            Este aviso não informa um prazo de guarda porque ele não está definido aqui.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold tracking-tight text-white">Direitos do titular</h2>
          <p className="mt-3">
            A pessoa titular pode pedir confirmação, acesso, correção ou eliminação de dados
            pessoais tratados pela empresa, pelo WhatsApp {company.phoneDisplay}.
          </p>
          <p className="mt-4">
            <WhatsAppLink
              href={waLink(messages.contato)}
              className="font-semibold text-white underline decoration-accent underline-offset-4"
            >
              Falar pelo WhatsApp
            </WhatsAppLink>
          </p>
        </section>
      </article>
    </>
  )
}
