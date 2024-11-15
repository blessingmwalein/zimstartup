import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Cookies from 'js-cookie';
import jwt from "jsonwebtoken";

// Define paths that require authentication
const protectedRoutes = ["/profile"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only apply middleware on protected routes
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const token = Cookies.get('user');

    if (!token) {
      // If no token, redirect to login
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }

    try {
      // Verify JWT token if needed
      jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret_key");
      return NextResponse.next(); // Allow access to the profile page
    } catch (error) {
      // If token is invalid or expired, redirect to login
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }
  }

  // Allow all other routes
  return NextResponse.next();
}
