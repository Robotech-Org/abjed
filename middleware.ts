// middleware.ts — at project root, not app/
import { NextRequest, NextResponse } from "next/server";

const PROTECTED_PREFIXES = ["/checkout", "/pricing"];

export function middleware(req: NextRequest) {
  const hasToken = req.cookies.has("accessToken");
  const isProtected = PROTECTED_PREFIXES.some((p) =>
    req.nextUrl.pathname.startsWith(p)
  );
  if (!hasToken && isProtected) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}

export const config = { matcher: [] };

//, "/pricing/:path*"