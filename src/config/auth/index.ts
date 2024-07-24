import 'server-only';

import { compare } from 'bcryptjs';
import NextAuth, { CredentialsSignin } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import prisma from '@/config/db';
import type { LoginPayload } from '@/types/auth';

import authConfig from './auth.config';

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        username: { label: 'Username' },
        password: { label: 'Password', type: 'password' },
        type: { label: 'Type' },
      },
      authorize: async (credentials) => {
        const { username, password } = credentials as LoginPayload;
        const type = credentials.type as 'student' | 'user';

        if (type === 'student') {
          const data = await prisma.student.findUnique({
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
            throw new CredentialsSignin('Invalid credentials!');
          }

          const { password: userPassword, ...user } = data;

          if (!userPassword) {
            throw new CredentialsSignin('Invalid credentials!');
          }

          const passwordIsSame = await compare(password, userPassword.password);

          if (!passwordIsSame) {
            throw new CredentialsSignin('Invalid credentials!');
          }

          await prisma.loginHistory.create({
            data: {
              accountId: user.id,
              accountUsername: user.username,
              accountName: user.fullName,
              accountType: 'STUDENT',
            },
          });

          return user;
        }

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
          throw new CredentialsSignin('Invalid credentials!');
        }

        const { password: userPassword, ...user } = data;

        if (!userPassword) {
          throw new CredentialsSignin('Invalid credentials!');
        }

        const passwordIsSame = await compare(password, userPassword.password);

        if (!passwordIsSame) {
          throw new CredentialsSignin('Invalid credentials!');
        }

        await prisma.loginHistory.create({
          data: {
            accountId: user.id,
            accountUsername: user.username,
            accountName: user.displayName,
            accountType: user.type,
          },
        });

        return user;
      },
    }),
  ],
});
