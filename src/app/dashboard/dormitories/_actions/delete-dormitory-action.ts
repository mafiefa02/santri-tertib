'use server';

import { type Dormitory } from '@prisma/client';
import { revalidatePath, revalidateTag } from 'next/cache';

import prisma from '@/config/db';

export const deleteDormitoryAction = async (id: Dormitory['id']) => {
  const result = await prisma.dormitory.delete({ where: { id } });

  revalidatePath('/dashboard/dormitories');
  revalidatePath('/dashboard/students');
  revalidateTag('findAllDormitories');
  return result;
};
