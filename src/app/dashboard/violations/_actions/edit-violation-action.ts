'use server';

import { type Violation } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { type z } from 'zod';

import prisma from '@/config/db';

import { type editViolationSchema } from '../_schemas/edit-violation-schema';

export const editViolationAction = async (
  id: Violation['id'],
  data: z.infer<typeof editViolationSchema>,
) => {
  const result = await prisma.violation.update({
    where: { id },
    data: { ...data, categoryId: parseInt(data.categoryId) },
  });

  revalidatePath('/dashboard/violations');
  return result;
};
