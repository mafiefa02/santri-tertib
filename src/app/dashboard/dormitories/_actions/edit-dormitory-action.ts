'use server';

import { type Dormitory } from '@prisma/client';
import { revalidatePath, revalidateTag } from 'next/cache';
import { type z } from 'zod';

import prisma from '@/config/db';

import { type editDormitorySchema } from '../_schemas/edit-dormitory-schema';

export const editDormitoryAction = async (
  id: Dormitory['id'],
  data: z.infer<typeof editDormitorySchema>,
) => {
  const result = await prisma.dormitory.update({ where: { id }, data });

  revalidatePath('/dashboard/dormitories', 'page');
  revalidateTag('findAllDormitories');
  return result;
};
