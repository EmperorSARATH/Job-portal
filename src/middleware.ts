// app/middleware.ts
import { NextResponse } from 'next/server';

export function middleware(request: Request) {
  console.log("Middleware is running...");

  // Get the token from the authorization header
  const token = request.headers.get('authorization')?.split(' ')[1];
  console.log("Token:", token);

  if (!token) {
    // If no token is found, redirect to the login page
    console.log("No token, redirecting to login...");
    return NextResponse.redirect(new URL('/login', request.url));
  }

  console.log("Token found, proceeding...");
  return NextResponse.next();
}

// Matcher configuration to apply to any route under /dashboard
export const config = {
  matcher: ['/abcd'], // Matches routes like /dashboard, /dashboard/settings, etc.
};

