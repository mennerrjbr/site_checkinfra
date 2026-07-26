"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface HeaderProps {
  lang: string;
  dict: {
    nav: {
      home: string;
      about: string;
      services: string;
      contact: string;
    };
    buttons: {
      contactUs: string;
    };
  };
}

export default function Header({ lang, dict }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: dict.nav.home, href: `/${lang}#home` },
    { name: dict.nav.about, href: `/${lang}#about` },
    { name: dict.nav.services, href: `/${lang}#services` },
    { name: dict.nav.contact, href: `/${lang}#contact` },
  ];

  const languages = [
    { code: "pt", label: "PT" },
    { code: "en", label: "EN" },
    { code: "es", label: "ES" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Esquerda: Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link href={`/${lang}`} className="flex items-center transition-opacity hover:opacity-90 flex-shrink-0">
              <Image
                src="/images/logo_new.png"
                alt="Checkinfra Segurança Eletrônica"
                width={260}
                height={70}
                className="h-14 sm:h-16 w-auto object-contain flex-shrink-0"
                priority
              />
            </Link>
          </div>

          {/* Centro: Links de Navegação (Desktop) */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-brand-text-muted transition-colors hover:text-brand-blue"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Direita: Seletor de Idiomas + Botão CTA (Desktop) */}
          <div className="hidden md:flex items-center gap-6">
            {/* Seletor de idiomas */}
            <div className="flex items-center gap-2 border-r border-slate-200 pr-6">
              {languages.map((l, index) => (
                <div key={l.code} className="flex items-center">
                  <Link
                    href={`/${l.code}`}
                    className={`text-xs font-semibold tracking-wider transition-colors ${lang === l.code
                        ? "text-brand-blue font-bold"
                        : "text-slate-400 hover:text-brand-text-main"
                      }`}
                  >
                    {l.label}
                  </Link>
                  {index < languages.length - 1 && (
                    <span className="ml-2 text-slate-200 select-none">|</span>
                  )}
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              href={`/${lang}#contact`}
              className="inline-flex items-center justify-center rounded-lg bg-brand-blue px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-brand-blue/20 transition-all duration-300 hover:bg-brand-blue-hover hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
            >
              {dict.buttons.contactUs}
            </Link>
          </div>

          {/* Botão Hambúrguer (Mobile) */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-brand-text-muted hover:bg-brand-surface hover:text-brand-text-main focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Abrir menu</span>
              {mobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 py-4 space-y-4" id="mobile-menu">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-base font-medium text-brand-text-muted hover:bg-brand-surface hover:text-brand-text-main"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="border-t border-slate-200 pt-4 flex flex-col gap-4">
            {/* Seletor de Idiomas Mobile */}
            <div className="flex justify-center gap-4">
              {languages.map((l) => (
                <Link
                  key={l.code}
                  href={`/${l.code}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-semibold tracking-wider ${lang === l.code ? "text-brand-blue font-bold" : "text-slate-400 hover:text-brand-text-main"
                    }`}
                >
                  {l.label}
                </Link>
              ))}
            </div>

            {/* CTA Mobile */}
            <Link
              href={`/${lang}#contact`}
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center rounded-lg bg-brand-blue py-3 text-base font-semibold text-white shadow-sm hover:bg-brand-blue-hover"
            >
              {dict.buttons.contactUs}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
