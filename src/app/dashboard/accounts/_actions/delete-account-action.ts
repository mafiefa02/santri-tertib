'use server';

import type { User } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import prisma from '@/config/db';

export const deleteAccountAction = async (id: User['id']) => {
  await prisma.user.delete({ where: { id } });
  revalidatePath('/dashboard/accounts');
};
