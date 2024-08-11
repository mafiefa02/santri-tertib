'use server';

import { type Student } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import prisma from '@/config/db';

export const deleteStudentAction = async (id: Student['id']) => {
  const result = await prisma.student.delete({ where: { id } });

  revalidatePath('/dashboard/students');
  revalidatePath('/dashboard/dormitories');
  revalidatePath('/dashboard/classes');
  return result;
};
