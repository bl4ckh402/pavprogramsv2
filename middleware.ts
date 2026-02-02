import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Remove trailing slashes (except for root) and force lowercase URLs,
// then perform an AuthZ check against an external service. If AuthZ
// is not configured or the check fails, rewrite to the account-suspended page.

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()

  // Remove trailing slashes (except for root)
  if (url.pathname !== "/" && url.pathname.endsWith("/")) {
    url.pathname = url.pathname.slice(0, -1)
    return NextResponse.redirect(url, 301)
  }

  // Force lowercase URLs
  if (url.pathname !== url.pathname.toLowerCase()) {
    url.pathname = url.pathname.toLowerCase()
    return NextResponse.redirect(url, 301)
  }

  // Previously this middleware called an external AuthZ service and rewrote
  // unauthorized requests to `/account-suspended`.
  //
  // That check has been removed to make the app self-reliant. Authorization
  // should be enforced server-side (API routes / server components) using a
  // local user/roles store (DB, JWT, or NextAuth with a Credentials provider).
  // Middleware now focuses only on URL normalization and lets requests pass.
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|logo.png|account-suspended|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
