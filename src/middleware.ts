import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("access_token")?.value;

  if (!accessToken) {
    // Redirect to the login page if no access token is found
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  // Allow the request to continue if access token exists
  return NextResponse.next();
}

// Specify which routes should use this middleware
export const config = {
  matcher: ["/profile/:path*"], // Match `/profile` and any sub-paths
};
