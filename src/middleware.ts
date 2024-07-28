import { type NextRequest, NextResponse } from 'next/server';
import NextAuth from 'next-auth';

import authConfig from './config/auth/auth.config';

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

    return NextResponse.next();
  }

  // Handling authenticated users

  if (pathname.startsWith('/dashboard')) {
    // Redirect students to homepage when they try to access '/dashboard'
    if (session.user.type === 'STUDENT') {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
  }

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

  return NextResponse.next();
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
