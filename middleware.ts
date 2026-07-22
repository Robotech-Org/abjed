// middleware.ts — at project root, not app/
import { NextRequest, NextResponse } from "next/server";

const PROTECTED_PREFIXES = ["/checkout", "/pricing"];
const AUTH_ROUTES = ["/login", "/signup", "/forgot-password", "/reset-password"];

export function middleware(req: NextRequest) {
  const hasToken = req.cookies.has("accessToken") || req.cookies.has("refreshToken");
  const pathname = req.nextUrl.pathname;

  const isProtected = PROTECTED_PREFIXES.some((p) =>
    pathname.startsWith(p)
  );
  const isAuthRoute = AUTH_ROUTES.some((p) => 
    pathname.startsWith(p)
  );

  if (!hasToken && isProtected) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (hasToken && isAuthRoute) {
    return NextResponse.redirect(new URL("/pricing", req.url));
  }

  return NextResponse.next();
}

export const config = { 
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
};