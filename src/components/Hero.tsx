import Link from "next/link";

interface HeroProps {
  lang: string;
  dict: {
    buttons: {
      talkExpert: string;
      ourServices: string;
    };
    hero: {
      title: string;
      subtitle: string;
    };
  };
}

export default function Hero({ lang, dict }: HeroProps) {
  // Split title by comma to apply dynamic gradient highlighting
  const titleParts = dict.hero.title.split(", ");
  const mainTitle = titleParts[0];
  const highlightTitle = titleParts.slice(1).join(", ");

  return (
    <section
      id="home"
      className="relative flex items-center min-h-[75vh] w-full overflow-hidden bg-brand-light py-12 lg:py-0"
    >
      {/* Decorative Blur Background Spheres */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 left-1/4 h-[400px] w-[400px] rounded-full bg-brand-blue/5 blur-[100px]" />
        <div className="absolute top-1/2 right-1/4 h-[500px] w-[500px] rounded-full bg-brand-green/5 blur-[120px]" />
      </div>

      {/* Container da Imagem (Fundo) */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-2/3 z-0 overflow-hidden pointer-events-none">
        <img
          src="/images/hero-tranquilidade.jpg"
          alt="Executivo trabalhando com tranquilidade, representando a segurança da Checkinfra"
          className="w-full h-full object-cover lg:rounded-tl-[6rem] lg:rounded-bl-2xl filter contrast-[0.98] brightness-[1.02]"
        />
        {/* Subtle lighting overlay blend */}
        <div className="absolute inset-0 lg:rounded-tl-[6rem] lg:rounded-bl-2xl bg-gradient-to-t from-brand-light/30 via-transparent to-white/20 pointer-events-none" />
      </div>

      {/* Container do Texto (Frente) */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="relative z-10 w-full lg:w-[65%] px-6 lg:pl-16 lg:pr-32 py-12 lg:py-24 bg-gradient-to-r from-white via-white/90 to-transparent flex flex-col text-left">
          {/* Security badge */}
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-green/30 bg-brand-green/10 px-3 py-1 text-xs font-semibold tracking-wide text-brand-green mb-6">
            <span className="flex h-1.5 w-1.5 rounded-full bg-brand-green animate-ping" />
            Security-First Architecture
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-brand-text-main sm:text-5xl md:text-6xl lg:leading-[1.1]">
            {mainTitle}
            {highlightTitle && (
              <>
                <span className="text-brand-text-muted">, </span>
                <span className="block mt-1 bg-gradient-to-r from-brand-blue via-blue-900 to-brand-green bg-clip-text text-transparent">
                  {highlightTitle}
                </span>
              </>
            )}
          </h1>

          <p className="mt-6 text-lg text-brand-text-muted md:text-xl font-normal leading-relaxed max-w-xl">
            {dict.hero.subtitle}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href={`/${lang}#contact`}
              className="inline-flex items-center justify-center rounded-lg bg-brand-blue px-6 py-3.5 text-base font-semibold text-white shadow-md shadow-brand-blue/15 transition-all duration-300 hover:bg-brand-blue-hover hover:shadow-lg hover:-translate-y-0.5"
            >
              {dict.buttons.talkExpert}
            </Link>
            <Link
              href={`/${lang}#services`}
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3.5 text-base font-semibold text-brand-text-main shadow-sm transition-all duration-300 hover:border-slate-400 hover:bg-brand-surface hover:-translate-y-0.5"
            >
              {dict.buttons.ourServices}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
