'use server';

import type { Class } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { type z } from 'zod';

import prisma from '@/config/db';

import { type editClassSchema } from '../_schemas/edit-class-schema';

export const editClassAction = async (
  id: Class['id'],
  data: z.infer<typeof editClassSchema>,
) => {
  const result = await prisma.class.update({ where: { id }, data });

  revalidatePath('/dashboard/classes', 'page');
  return result;
};
