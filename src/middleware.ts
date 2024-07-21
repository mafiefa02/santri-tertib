import { type NextRequest, NextResponse } from 'next/server';
import NextAuth from 'next-auth';

import authConfig from './config/auth/auth.config';

export const middleware = async (request: NextRequest) => {
  const { auth } = NextAuth(authConfig);
  const session = await auth();

  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!session || session.user.type === 'STUDENT') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
