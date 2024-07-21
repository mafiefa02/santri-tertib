import type { NextAuthConfig } from 'next-auth';

import { env } from '@/env';
import type { UserSession } from '@/types/users';

declare module 'next-auth' {
  interface Session {
    user: UserSession;
  }
}

export default {
  callbacks: {
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...(token.user as UserSession),
        },
      };
    },
    jwt({ token, user }) {
      if (Boolean(user)) token.user = user;
      return token;
    },
  },
  trustHost: true,
  secret: env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
  providers: [],
  pages: {
    signIn: '/login',
    signOut: '/logout',
  },
} satisfies NextAuthConfig;
