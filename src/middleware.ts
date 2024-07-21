import { type NextRequest, NextResponse } from 'next/server';
import NextAuth from 'next-auth';

import authConfig from './config/auth/auth.config';

export const middleware = async (request: NextRequest) => {
  const { auth } = NextAuth(authConfig);
  const session = await auth();
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith('/dashboard')) {
    // Protects '/dashboard' route from non-authenticated users or from students;
    if (!session || session.user.type === 'STUDENT') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  if (!session && pathname.startsWith('/logout')) {
    // If non-authenticated users tries to access log out page, they'll get redirected back to homepage
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (session) {
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
  }
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
