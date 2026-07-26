/* 
ARQUITETURA DE WEBHOOK: O webhook de destino deve estar ATIVO e não apenas no status de 'escuta' (listening). Se o webhook não estiver ativo, o workflow correspondente executará apenas uma vez.
*/

'use client';

import { useState, FormEvent } from 'react';

interface ContactProps {
  lang: string;
  dict: {
    contact: {
      title: string;
      subtitle: string;
      fields: {
        name: string;
        phone: string;
        email: string;
        city: string;
        message: string;
        submit: string;
      };
    };
  };
}

export default function Contact({ lang, dict }: ContactProps) {
  // Campos de texto do formulário
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [emailConfirm, setEmailConfirm] = useState('');
  const [city, setCity] = useState('');
  const [message, setMessage] = useState('');

  // Estados de envio e feedback
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  // Submissão do formulário para o Webhook
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFeedback(null);

    // Validação cruzada de e-mail
    if (email.trim().toLowerCase() !== emailConfirm.trim().toLowerCase()) {
      setFeedback({
        type: 'error',
        message: 'Os e-mails informados não coincidem. Por favor, verifique os campos de e-mail.',
      });
      return;
    }

    setIsSubmitting(true);
    const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL || '/api/webhook';

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('phone', phone);
      formData.append('email', email);
      formData.append('city', city);
      formData.append('message', message);

      const response = await fetch(webhookUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Falha na comunicação com o servidor de destino.');
      }

      setFeedback({
        type: 'success',
        message: 'Formulário enviado com sucesso! Nossa equipe entrará em contato em breve.',
      });

      // Limpeza dos campos após sucesso
      setName('');
      setPhone('');
      setEmail('');
      setEmailConfirm('');
      setCity('');
      setMessage('');
    } catch (error) {
      console.error('Erro na submissão do Webhook:', error);
      setFeedback({
        type: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Ocorreu um erro ao enviar os dados. Tente novamente mais tarde.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative bg-brand-light py-20 md:py-24 lg:py-28 overflow-hidden border-t border-slate-200"
    >
      {/* Decorative Blur Background Spheres */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 h-[400px] w-[400px] rounded-full bg-brand-blue/5 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Coluna Esquerda: Informações e Chamada */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="text-xs font-bold tracking-wider text-brand-green uppercase">
              Secure Channel
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-brand-text-main sm:text-4xl leading-tight">
              {dict.contact.title}
            </h2>
            <p className="mt-4 text-base md:text-lg text-brand-text-muted leading-relaxed font-normal">
              {dict.contact.subtitle}
            </p>

            {/* Visual Security Info Card */}
            <div className="mt-8 rounded-xl border border-slate-200 bg-brand-surface p-6 space-y-4 max-w-sm shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-green/10 text-brand-green">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-brand-text-main">
                  contato@checkinfra.com.br
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-green/10 text-brand-green">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-brand-text-main">
                  +55 (21) 97536-9597
                </span>
              </div>
            </div>
          </div>

          {/* Coluna Direita: Formulário */}
          <div className="lg:col-span-7 w-full rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-md backdrop-blur-md">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Feedback Alert Banners */}
              {feedback && (
                <div
                  className={`p-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                    feedback.type === 'success'
                      ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                      : 'bg-red-50 border border-red-200 text-red-800'
                  }`}
                >
                  {feedback.message}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Nome */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-semibold text-brand-text-muted uppercase tracking-wider mb-2"
                  >
                    {dict.contact.fields.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isSubmitting}
                    required
                    className="w-full rounded-lg bg-white border border-slate-300 text-brand-text-main px-4 py-3 text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue shadow-sm transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Telefone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-xs font-semibold text-brand-text-muted uppercase tracking-wider mb-2"
                  >
                    {dict.contact.fields.phone}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={isSubmitting}
                    required
                    className="w-full rounded-lg bg-white border border-slate-300 text-brand-text-main px-4 py-3 text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue shadow-sm transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-semibold text-brand-text-muted uppercase tracking-wider mb-2"
                  >
                    {dict.contact.fields.email}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                    required
                    className="w-full rounded-lg bg-white border border-slate-300 text-brand-text-main px-4 py-3 text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue shadow-sm transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Confirmação de Email */}
                <div>
                  <label
                    htmlFor="emailConfirm"
                    className="block text-xs font-semibold text-brand-text-muted uppercase tracking-wider mb-2"
                  >
                    Confirmar E-mail
                  </label>
                  <input
                    type="email"
                    id="emailConfirm"
                    name="emailConfirm"
                    value={emailConfirm}
                    onChange={(e) => setEmailConfirm(e.target.value)}
                    disabled={isSubmitting}
                    required
                    className="w-full rounded-lg bg-white border border-slate-300 text-brand-text-main px-4 py-3 text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue shadow-sm transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Cidade */}
              <div>
                <label
                  htmlFor="city"
                  className="block text-xs font-semibold text-brand-text-muted uppercase tracking-wider mb-2"
                >
                  {dict.contact.fields.city}
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  disabled={isSubmitting}
                  required
                  className="w-full rounded-lg bg-white border border-slate-300 text-brand-text-main px-4 py-3 text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue shadow-sm transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>

              {/* Mensagem */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-semibold text-brand-text-muted uppercase tracking-wider mb-2"
                >
                  {dict.contact.fields.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={isSubmitting}
                  required
                  rows={4}
                  className="w-full rounded-lg bg-white border border-slate-300 text-brand-text-main px-4 py-3 text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue shadow-sm transition-all duration-300 h-32 resize-none disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>

              {/* Botão Enviar */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-brand-blue hover:bg-brand-blue-hover text-white px-6 py-3.5 text-sm font-semibold tracking-wide shadow-md shadow-brand-blue/15 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-center disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Enviando...</span>
                  </>
                ) : (
                  dict.contact.fields.submit
                )}
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
