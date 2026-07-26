interface ServicesProps {
  lang: string;
  dict: {
    services: {
      title: string;
      cftvTitle: string;
      cftvDesc: string;
      alarmeTitle: string;
      alarmeDesc: string;
      acessoTitle: string;
      acessoDesc: string;
      more: string;
    };
  };
}

export default function Services({ lang, dict }: ServicesProps) {
  const servicesItems = [
    {
      title: dict.services.cftvTitle,
      desc: dict.services.cftvDesc,
      iconColor: "text-brand-green bg-brand-green/10 border-brand-green/20 group-hover:bg-brand-green/20",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
          <path d="M17 16a8 8 0 1 0-10 0" />
          <path d="M5 20h14" />
          <path d="m18 10 3-1" />
          <path d="M21 9v4" />
        </svg>
      ),
    },
    {
      title: dict.services.alarmeTitle,
      desc: dict.services.alarmeDesc,
      iconColor: "text-brand-green bg-brand-green/10 border-brand-green/20 group-hover:bg-brand-green/20",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M10.268 21a2 2 0 0 0 3.464 0" />
          <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .738-1.674l-2-2A2 2 0 0 1 18 11.918V9a6 6 0 0 0-10.125-4.243" />
          <path d="M12 2v2" />
        </svg>
      ),
    },
    {
      title: dict.services.acessoTitle,
      desc: dict.services.acessoDesc,
      iconColor: "text-brand-green bg-brand-green/10 border-brand-green/20 group-hover:bg-brand-green/20",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M2 12a10 10 0 0 1 18-6M2 12a10 10 0 0 0 18 6" />
          <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
          <path d="M12 12v6" />
          <path d="M9 16h6" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="services"
      className="relative bg-brand-light py-20 md:py-24 lg:py-28 overflow-hidden"
    >
      {/* Dynamic Background Blurs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -right-40 h-[350px] w-[350px] rounded-full bg-brand-blue/5 blur-[90px]" />
        <div className="absolute bottom-1/4 -left-40 h-[350px] w-[350px] rounded-full bg-brand-green/5 blur-[90px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold tracking-wider text-brand-green uppercase">
            Checkinfra Portfolio
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-brand-text-main sm:text-4xl">
            {dict.services.title}
          </h2>
          <div className="mt-4 h-1 w-12 bg-brand-green mx-auto rounded" />
        </div>

        {/* Services Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicesItems.map((srv) => (
            <div
              key={srv.title}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50"
            >
              <div>
                {/* Icon Container */}
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-300 ${srv.iconColor}`}
                >
                  {srv.icon}
                </div>

                <h3 className="mt-6 text-xl font-bold text-brand-text-main group-hover:text-brand-blue transition-colors duration-300">
                  {srv.title}
                </h3>
                
                <p className="mt-4 text-sm text-brand-text-muted leading-relaxed font-normal">
                  {srv.desc}
                </p>
              </div>

              {/* Card Footer Link */}
              <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-brand-blue group-hover:text-brand-blue-hover transition-colors duration-300 cursor-pointer">
                <span>{dict.services.more}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
