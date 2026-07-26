interface FooterProps {
  dict: {
    footer: string;
  };
}

export default function Footer({ dict }: FooterProps) {
  return (
    <footer className="bg-brand-surface border-t border-slate-200 py-8 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
          {/* Left: Brand logo */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-brand-text-main">
              Check<span className="text-brand-blue">infra</span>
            </span>
          </div>

          {/* Right: Copyright */}
          <p className="text-center text-xs text-brand-text-muted leading-normal">
            {dict.footer}
          </p>
        </div>
      </div>
    </footer>
  );
}
