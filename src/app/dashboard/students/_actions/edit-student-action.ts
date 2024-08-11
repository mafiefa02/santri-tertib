'use server';

import { type Student } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { type z } from 'zod';

import prisma from '@/config/db';

import { type editStudentSchema } from '../_schemas/edit-student-schema';

export const editStudentAction = async (
  id: Student['id'],
  data: z.infer<typeof editStudentSchema>,
) => {
  const result = await prisma.student.update({
    where: { id },
    data: {
      ...data,
      classId: parseInt(data.classId),
      dormitoryId: parseInt(data.dormitoryId),
    },
  });

  revalidatePath('/dashboard/students');
  revalidatePath('/dashboard/classes');
  revalidatePath('/dashboard/dormitories');
  return result;
};
