type IconProps = {
  className?: string
}

const base = "h-6 w-6 shrink-0"

export function IconCamera({ className = base }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 8.5h3l1.4-2h7.2L17 8.5h3v9.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18V8.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="13.2" r="3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}

export function IconAlarm({ className = base }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 4.5a6.5 6.5 0 0 1 6.5 6.5c0 3.2-1.6 5.2-2.6 6.4-.4.5-.7 1-.7 1.6H8.8c0-.6-.3-1.1-.7-1.6-1-1.2-2.6-3.2-2.6-6.4A6.5 6.5 0 0 1 12 4.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M10 20.5h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export function IconAccess({ className = base }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="5" y="10" width="14" height="9.5" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M8 10V8a4 4 0 0 1 8 0v2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="12" cy="14.5" r="1" fill="currentColor" />
    </svg>
  )
}

export function IconWhatsApp({ className = base }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 3.5A8.2 8.2 0 0 0 4.7 15.9L3.6 20.2l4.4-1.15A8.2 8.2 0 1 0 12.04 3.5Zm4.76 11.58c-.2.56-1.16 1.07-1.62 1.14-.42.06-.96.09-1.55-.1-.36-.11-.82-.26-1.41-.51-2.48-1.07-4.1-3.57-4.22-3.74-.12-.16-1-1.33-1-2.54 0-1.2.63-1.8.86-2.04.22-.25.49-.31.65-.31h.47c.15 0 .35-.06.55.42.2.49.7 1.7.76 1.82.06.13.1.27.02.44-.08.16-.12.27-.24.41-.12.15-.25.32-.36.43-.12.12-.24.24-.1.47.13.22.6.99 1.29 1.6.89.79 1.64 1.04 1.87 1.15.22.12.36.1.49-.06.13-.16.56-.65.71-.87.15-.22.3-.18.5-.11.2.06 1.28.6 1.5.71.22.11.36.16.42.25.06.1.06.55-.14 1.11Z" />
    </svg>
  )
}
