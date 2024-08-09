import { type NextRequest, NextResponse } from 'next/server';
import NextAuth from 'next-auth';

import authConfig from './config/auth/auth.config';
import { getRoleDashboardRoutes } from './routes/dashboard-routes';
import { commonRootRoutes, getRoleRootRoutes } from './routes/root-routes';

export const middleware = async (request: NextRequest) => {
  const { auth } = NextAuth(authConfig);
  const session = await auth();
  const pathname = request.nextUrl.pathname;

  // Handling unauthenticated users
  if (!session) {
    // If they try to access '/dashboard', redirect them to login.
    if (pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Allow unauthenticated users to access auth page
    if (pathname.startsWith('/login')) {
      return NextResponse.next();
    }

    // If they tried to access non-public links instead,
    const isAllowed = commonRootRoutes.some((route) =>
      route.href.startsWith(pathname),
    );

    // then redirect them back to '/' page
    if (!isAllowed) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
  }

  // Handling authenticated users
  // Protect authenticated user to access login page
  if (pathname.startsWith('/login')) {
    // Redirects back based on user's role
    if (session.user.type === 'STUDENT') {
      // Students should redirect to '/'
      return NextResponse.redirect(new URL('/', request.url));
    }

    // While other account types should redirect to dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (pathname.startsWith('/dashboard')) {
    // Redirect students to homepage when they try to access '/dashboard'
    if (session.user.type === 'STUDENT') {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // get all dashboard routes that contain user's role
    const allowedRoutes = getRoleDashboardRoutes(session.user.type);
    // check if current pathname is one of allowed routes
    const isAllowed = allowedRoutes.some((route) =>
      route.href.startsWith(pathname),
    );

    // if not allowed, redirect to home of dashboard
    if (!isAllowed) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
  }

  // check if this user is allowed to go to current path
  const allowedRoutes = getRoleRootRoutes(session.user.type);
  const isAllowed = allowedRoutes.some((route) =>
    route.href.startsWith(pathname),
  );

  // redirect them back to '/' if not allowed
  if (!isAllowed) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // otherwise continue
  return NextResponse.next();
};

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
