import { useEffect, useState } from "react"
import { Link, NavLink, Outlet, useLocation } from "react-router-dom"
import { company, facts, messageForPath, messages, navItems, pages, waLink } from "../content/site.ts"
import { IconWhatsApp } from "./Icons.tsx"
import { Logo } from "./Logo.tsx"
import { primaryButtonClass, WhatsAppLink } from "./WhatsAppLink.tsx"

function navClass(isActive: boolean): string {
  return isActive
    ? "text-white"
    : "text-mist hover:text-white"
}

export function Layout() {
  const location = useLocation()
  const [openPath, setOpenPath] = useState<string | null>(null)
  const open = openPath === location.pathname
  const headerMessage = messageForPath(location.pathname)

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenPath(null)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-navy"
      >
        Ir para o conteúdo
      </a>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-navy/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-5 py-3">
          <Link to="/" className="shrink-0 rounded-sm" aria-label="checkinfra, página inicial">
            <Logo className="h-7 w-auto max-w-[58vw] sm:h-8 sm:max-w-none" />
          </Link>
          <nav aria-label="Principal" className="ml-auto hidden items-center gap-5 text-sm lg:flex">
            {navItems.map((item) => (
              <NavLink key={item.path} to={item.path} className={({ isActive }) => navClass(isActive)}>
                {item.crumb}
              </NavLink>
            ))}
          </nav>
          <WhatsAppLink
            href={waLink(headerMessage)}
            className={`${primaryButtonClass} ml-auto max-sm:hidden px-4 lg:ml-2`}
          >
            <IconWhatsApp className="h-4 w-4" />
            WhatsApp
          </WhatsAppLink>
          <button
            type="button"
            className="ml-auto inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/15 text-sm text-white sm:ml-0 lg:hidden"
            aria-expanded={open}
            aria-controls="menu-principal"
            onClick={() => setOpenPath(open ? null : location.pathname)}
          >
            <span className="sr-only">{open ? "Fechar menu" : "Abrir menu"}</span>
            <span aria-hidden="true">{open ? "Fechar" : "Menu"}</span>
          </button>
        </div>
        {open ? (
          <nav id="menu-principal" aria-label="Menu" className="border-t border-white/10 bg-navy px-5 py-4 lg:hidden">
            <ul className="flex flex-col">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className="flex min-h-11 items-center text-base text-white"
                  >
                    {item.crumb}
                  </NavLink>
                </li>
              ))}
            </ul>
            <WhatsAppLink href={waLink(headerMessage)} className={`${primaryButtonClass} mt-3 w-full`}>
              <IconWhatsApp className="h-4 w-4" />
              Pedir análise gratuita
            </WhatsAppLink>
          </nav>
        ) : null}
      </header>
      <main id="conteudo" className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-white/10 bg-navy-2">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-3">
          <div>
            <Logo className="h-8 w-auto" />
            <p className="mt-4 text-sm leading-relaxed text-mist">
              Segurança eletrônica em {company.area}. {facts.partner}. {facts.equipment}.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">{facts.footerHours}</p>
          </div>
          <div>
            <h2 className="text-sm font-semibold tracking-wide text-white">Páginas</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="text-mist underline decoration-white/20 underline-offset-4 hover:text-white">
                    {item.crumb}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to={pages.privacidade.path}
                  className="text-mist underline decoration-white/20 underline-offset-4 hover:text-white"
                >
                  {pages.privacidade.crumb}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold tracking-wide text-white">Contato</h2>
            <p className="mt-3 text-sm leading-relaxed text-mist">{facts.hours}</p>
            <p className="mt-2 text-sm text-mist">{facts.area}</p>
            <p className="mt-2 text-sm text-mist">{facts.travelFee}</p>
            <WhatsAppLink
              href={waLink(messages.contato)}
              className="mt-4 inline-flex text-sm font-semibold text-accent underline decoration-accent/40 underline-offset-4"
            >
              WhatsApp {company.phoneDisplay}
            </WhatsAppLink>
            <p className="mt-6 text-sm leading-relaxed text-muted">
              {company.legalName}
              <br />
              CNPJ {company.cnpj}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
