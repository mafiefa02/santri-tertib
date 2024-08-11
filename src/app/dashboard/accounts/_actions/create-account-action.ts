'use server';

import { hash } from 'bcryptjs';
import { revalidatePath } from 'next/cache';
import type { z } from 'zod';

import prisma from '@/config/db';

import type { createAccountSchema } from '../_schemas/create-account-schema';

export const createAccountAction = async (
  value: z.infer<typeof createAccountSchema>,
) => {
  const password = await hash(value.password, 10);
  const data = await prisma.user.create({
    data: {
      username: value.username,
      displayName: value.displayName,
      password: { create: { password } },
      type: value.type,
    },
  });

  revalidatePath('/dashboard/accounts');
  return data;
};
