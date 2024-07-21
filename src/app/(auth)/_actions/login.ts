'use server';

import type { z } from 'zod';

import { signIn } from '@/config/auth';

import type { schema } from '../_schemas/login-schema';

export const login = async (
  values: z.infer<typeof schema>,
  type: 'student' | 'user',
) =>
  signIn('credentials', {
    ...values,
    type,
    redirectTo: type === 'student' ? '/' : '/dashboard',
  });
