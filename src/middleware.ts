import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['pt', 'en', 'es']
const defaultLocale = 'pt'

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language')
  if (!acceptLanguage) return defaultLocale

  // Simple parsing of accept-language header: e.g. "en-US,en;q=0.9,pt-BR;q=0.8,pt;q=0.7"
  const parsedLocales = acceptLanguage
    .split(',')
    .map((lang) => {
      const [locale, q] = lang.split(';q=')
      return {
        locale: locale.trim().split('-')[0], // e.g. "en", "pt"
        priority: q ? parseFloat(q) : 1.0,
      }
    })
    .sort((a, b) => b.priority - a.priority)

  for (const { locale } of parsedLocales) {
    if (locales.includes(locale)) {
      return locale
    }
  }

  return defaultLocale
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  // Redirect if there is no locale
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Skip all internal paths (_next), API routes and static assets
    '/((?!api|_next/static|_next/image|favicon.ico|backup_old_site|logo|.*\\.png|.*\\.jpg|.*\\.svg).*)',
  ],
}
