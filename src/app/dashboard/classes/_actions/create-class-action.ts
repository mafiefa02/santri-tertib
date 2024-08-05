'use server';

import { revalidatePath } from 'next/cache';
import { type z } from 'zod';

import prisma from '@/config/db';

import { type createClassSchema } from '../_schemas/create-class-schema';

export const createClassAction = async (
  data: z.infer<typeof createClassSchema>,
) => {
  const result = await prisma.class.create({ data });

  revalidatePath('/dashboard/classes', 'page');
  return result;
};
