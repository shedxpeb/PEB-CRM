/**
 * Next.js Middleware for Route Protection
 * This runs before every request - protects routes and handles auth
 */
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Protected routes that require authentication
 */
const protectedRoutes = [
  '/dashboard',
  '/dashboard/accounting',
  '/dashboard/item',
  '/dashboard/item-master',
  '/leads',
  '/customers',
  '/projects',
  '/inventory',
  '/finance',
  '/design',
  '/documents',
  '/automation',
  '/settings',
  '/super-admin',
];

/**
 * Public routes that don't require authentication
 */
const publicRoutes = [
  '/login',
  '/register',
  '/forgot-password',
  '/api/auth',
];

/**
 * Middleware function - runs on every request
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get auth token from cookies (or localStorage via custom header)
  const authToken = request.cookies.get('authToken')?.value;
  
  // Check if route is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );
  
  // Check if route is public
  const isPublicRoute = publicRoutes.some(route => 
    pathname.startsWith(route)
  );
  
  // If protected route and no token, redirect to login
  if (isProtectedRoute && !authToken) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }
  
  // If already logged in and trying to access login, redirect to dashboard
  if (isPublicRoute && authToken && pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  // Continue with request
  return NextResponse.next();
}

/**
 * Configure which routes run middleware on
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico (favicon)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};
