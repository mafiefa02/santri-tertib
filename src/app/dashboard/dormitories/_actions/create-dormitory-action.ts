'use server';

import { revalidatePath } from 'next/cache';
import { type z } from 'zod';

import prisma from '@/config/db';

import { type createDormitorySchema } from '../_schemas/create-dormitory-schema';

export const createDormitoryAction = async (
  data: z.infer<typeof createDormitorySchema>,
) => {
  const result = await prisma.dormitory.create({ data });

  revalidatePath('/dashboard/dormitories', 'page');
  return result;
};
