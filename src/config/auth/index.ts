import NextAuth, { CredentialsSignin } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import prisma from '@/config/db';
import type { LoginPayload } from '@/types/auth';
import { comparePassword } from '@/utils/compare-password';

import authConfig from './auth.config';

class UserNotFoundError extends CredentialsSignin {
  code = 'User not found';
}

class WrongPasswordError extends CredentialsSignin {
  code = 'Wrong password';
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        username: { label: 'Username' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const { username, password } = credentials as LoginPayload;
        const data = await prisma.user.findUnique({
          where: {
            username,
          },
          include: {
            password: {
              select: {
                password: true,
              },
            },
          },
        });

        if (!data) {
          throw new UserNotFoundError();
        }

        const { password: userPassword, ...user } = data;

        if (!userPassword) {
          throw new UserNotFoundError();
        }

        const { passwordIsSame } = await comparePassword(
          password,
          userPassword.password,
        );

        if (!passwordIsSame) {
          throw new WrongPasswordError();
        }

        return user;
      },
    }),
  ],
});
