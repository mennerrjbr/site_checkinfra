import { company } from "../content/site.ts"

type LogoProps = {
  className?: string
}

export function Logo({ className = "h-8 w-auto" }: LogoProps) {
  return (
    <img
      src="/brand/logo.png"
      alt={company.wordmark}
      width={1815}
      height={283}
      decoding="async"
      className={className}
    />
  )
}
