'use server';

import { revalidatePath } from 'next/cache';
import { type z } from 'zod';

import prisma from '@/config/db';

import { type createRewardCategorySchema } from '../_schemas/create-reward-category-schema';

export const createRewardCategoryAction = async (
  data: z.infer<typeof createRewardCategorySchema>,
) => {
  const result = await prisma.rewardCategory.create({ data });

  revalidatePath('/dashboard/rewards', 'page');
  return result;
};
