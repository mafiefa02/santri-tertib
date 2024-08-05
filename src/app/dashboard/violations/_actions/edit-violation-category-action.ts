'use server';

import { type ViolationCategory } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { type z } from 'zod';

import prisma from '@/config/db';

import { type createViolationCategorySchema } from '../_schemas/create-violation-category-schema';

export const editViolationCategoryAction = async (
  id: ViolationCategory['id'],
  data: z.infer<typeof createViolationCategorySchema>,
) => {
  const result = await prisma.violationCategory.update({
    where: { id },
    data,
  });

  revalidatePath('/dashboard/violations', 'page');
  return result;
};
