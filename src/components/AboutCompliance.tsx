interface AboutComplianceProps {
  lang: string;
  dict: {
    about: {
      title: string;
      text: string;
    };
    compliance: {
      title: string;
      lgpdTitle: string;
      lgpdText: string;
      ecoTitle: string;
      ecoText: string;
      acessTitle: string;
      acessText: string;
    };
  };
}

export default function AboutCompliance({ lang, dict }: AboutComplianceProps) {
  const complianceItems = [
    {
      title: dict.compliance.lgpdTitle,
      text: dict.compliance.lgpdText,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6 text-brand-green"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 11 2 2 4-4" />
        </svg>
      ),
    },
    {
      title: dict.compliance.ecoTitle,
      text: dict.compliance.ecoText,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6 text-brand-green"
        >
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 0 8.5C17 15 15 18 11 20z" />
          <path d="M19 2c-2.26 4.33-5.27 7.14-8 10" />
        </svg>
      ),
    },
    {
      title: dict.compliance.acessTitle,
      text: dict.compliance.acessText,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6 text-brand-green"
        >
          <circle cx="12" cy="5" r="1" />
          <path d="m9 20 3-6 3 6" />
          <path d="m6 8 6 2 6-2" />
          <path d="M12 10v4" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="about"
      className="relative bg-brand-surface border-y border-slate-200 py-20 md:py-24 lg:py-28 overflow-hidden"
    >
      {/* Decorative Grid Lines Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e130_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e130_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Coluna Esquerda: Sobre a Empresa */}
          <div className="lg:col-span-6 flex flex-col justify-center h-full">
            <div className="border-l-4 border-brand-green pl-6">
              <h2 className="text-3xl font-extrabold tracking-tight text-brand-text-main sm:text-4xl">
                {dict.about.title}
              </h2>
            </div>
            <p className="mt-6 text-base md:text-lg text-brand-text-muted leading-relaxed font-normal">
              {dict.about.text}
            </p>
          </div>

          {/* Coluna Direita: Compliance e Compromisso */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="mb-6">
              <h3 className="text-xs font-bold tracking-wider text-brand-green uppercase">
                {dict.compliance.title}
              </h3>
            </div>

            <div className="space-y-5">
              {complianceItems.map((item) => (
                <div
                  key={item.title}
                  className="group flex gap-4 rounded-xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-green/10 border border-brand-green/20 group-hover:bg-brand-green/20 transition-colors duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-brand-text-main group-hover:text-brand-blue transition-colors duration-300">
                      {item.title}
                    </h4>
                    <p className="mt-2 text-sm text-brand-text-muted leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
