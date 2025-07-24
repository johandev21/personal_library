import { NextRequest, NextResponse } from "next/server";
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing'; // Your next-intl config
import { getSessionCookie } from "better-auth/cookies"; // Your auth utility

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  // 1. Define all protected routes
  const protectedRoutes = ["/dashboard"];
  const { pathname } = request.nextUrl;

  // 2. Check if the user is accessing a protected route
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const sessionCookie = getSessionCookie(request);
    
    // 3. Redirect to the homepage if the user is not authenticated
    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // 4. If the route is not protected or the user is authenticated,
  // run the internationalization middleware
  return intlMiddleware(request);
}

// Use the broad matcher from next-intl
export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
  ]
};