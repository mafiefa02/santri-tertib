import type { Prisma } from '@prisma/client';
import type { NextAuthConfig } from 'next-auth';

import { env } from '@/env';

declare module 'next-auth' {
  interface Session {
    user: Prisma.UserSelect;
  }
}

export default {
  callbacks: {
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...(token.user as Prisma.UserSelect),
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
    maxAge: 60 * 60 * 24 * 30, // 30 days
  },
  providers: [],
} satisfies NextAuthConfig;
