'use server';

import { revalidatePath } from 'next/cache';
import { type z } from 'zod';

import prisma from '@/config/db';

import { type createViolationSchema } from '../_schemas/create-violation-schema';

export const createViolationAction = async (
  data: z.infer<typeof createViolationSchema>,
) => {
  const result = await prisma.violation.create({
    data: { ...data, categoryId: parseInt(data.categoryId) },
  });

  revalidatePath('/dashboard/violations', 'page');
  return result;
};
