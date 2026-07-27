import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from "next/server";
import { routing } from './src/i18n/routing';

const intlMiddleware = createIntlMiddleware(routing);

const PROTECTED_ROUTES = ["/pricing", "/checkout"];
const AUTH_ROUTES = ["/login", "/signup", "/forgot-password"];

export function middleware(req: NextRequest) {
  const hasToken = req.cookies.has("accessToken") || req.cookies.has("refreshToken");
  const pathname = req.nextUrl.pathname;
  
  // Regex to match the locale prefix (e.g. "/ar", "/en")
  const localePattern = new RegExp(`^/(?:${routing.locales.join('|')})(/|$)`);
  
  // Strip the locale prefix to get the normalized route for strict auth matching
  // "/ar/checkout" -> "/checkout"
  const normalizedPathname = pathname.replace(localePattern, '/') || '/';

  // Check the normalized string against our arrays
  const isProtected = PROTECTED_ROUTES.some((p) => normalizedPathname.startsWith(p));
  const isAuthRoute = AUTH_ROUTES.some((p) => normalizedPathname.startsWith(p));

  if (!hasToken && isProtected) {
    const currentLocale = pathname.match(localePattern)?.[0].replace(/\//g, '') || routing.defaultLocale;
    return NextResponse.redirect(new URL(`/${currentLocale}/login`, req.url));
  }

  if (hasToken && isAuthRoute) {
    const currentLocale = pathname.match(localePattern)?.[0].replace(/\//g, '') || routing.defaultLocale;
    return NextResponse.redirect(new URL(`/${currentLocale}/pricing`, req.url));
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};