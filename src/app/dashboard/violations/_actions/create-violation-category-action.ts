'use server';

import { revalidatePath } from 'next/cache';
import { type z } from 'zod';

import prisma from '@/config/db';

import { type createViolationCategorySchema } from '../_schemas/create-violation-category-schema';

export const createViolationCategoryAction = async (
  data: z.infer<typeof createViolationCategorySchema>,
) => {
  const result = await prisma.violationCategory.create({ data });

  revalidatePath('/dashboard/violations', 'page');
  return result;
};
