'use server';

import { hash } from 'bcryptjs';
import { revalidatePath } from 'next/cache';
import { type z } from 'zod';

import prisma from '@/config/db';

import { type createStudentSchema } from '../_schemas/create-student-schema';

export const createStudentAction = async (
  data: z.infer<typeof createStudentSchema>,
) => {
  const username = `${data.fullName}_${data.identityNumber}`
    .split(' ')
    .join('')
    .toLowerCase();
  const password = await hash(username, 10);
  const result = await prisma.student.create({
    data: {
      ...data,
      username,
      password: { create: { password } },
      classId: parseInt(data.classId),
      dormitoryId: parseInt(data.dormitoryId),
    },
    include: { password: { select: { password: true } } },
  });

  revalidatePath('/dashboard/students', 'page');
  revalidatePath('/dashboard/classes', 'page');
  revalidatePath('/dashboard/dormitories', 'page');
  return result;
};
