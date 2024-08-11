'use server';

import type { Class } from '@prisma/client';
import { revalidatePath, revalidateTag } from 'next/cache';

import prisma from '@/config/db';

export const deleteClassAction = async (id: Class['id']) => {
  const result = await prisma.class.delete({ where: { id } });

  revalidatePath('/dashboard/classes');
  revalidatePath('/dashboard/students');
  revalidateTag('findAllClasses');
  return result;
};
