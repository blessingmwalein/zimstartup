import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const accessToken = request.cookies.get("access_token")?.value;

  const isPublicPath =
    path === "/" ||
    path.startsWith("/auth/signin") ||
    path.startsWith("/auth/signup") ||
    path.startsWith("/auth/forgot-password") ||
    path.startsWith("/auth/reset-password")||
    path.startsWith("/about") ||
    path.startsWith("/youth-hub");
  
  const isAuthPath = path.startsWith("/auth/signin") || path.startsWith("/auth/signup")

  if (isAuthPath && accessToken) {
    return NextResponse.redirect(new URL("/dashboard/client", request.url));
  }

  if (!isPublicPath && !accessToken) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images
     * - backgrounds
     */
    "/((?!api|_next/static|_next/image|favicon.ico|images|backgrounds).*)",
  ],
};
