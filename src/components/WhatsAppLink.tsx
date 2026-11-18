import type { ReactNode } from "react"

type WhatsAppLinkProps = {
  href: string
  children: ReactNode
  className?: string
}

export function WhatsAppLink({ href, children, className }: WhatsAppLinkProps) {
  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr-only"> (abre o WhatsApp)</span>
    </a>
  )
}

export const primaryButtonClass =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-center text-sm font-semibold text-navy hover:bg-accent-2"

export const secondaryButtonClass =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-accent-2/80 px-5 py-2.5 text-center text-sm font-semibold text-white hover:border-accent hover:bg-white/5"
