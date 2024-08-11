'use server';

import { type RewardCategory } from '@prisma/client';
import { revalidatePath, revalidateTag } from 'next/cache';
import { type z } from 'zod';

import prisma from '@/config/db';

import { type editRewardCategorySchema } from '../_schemas/edit-reward-category-schema';

export const editRewardCategoryAction = async (
  id: RewardCategory['id'],
  data: z.infer<typeof editRewardCategorySchema>,
) => {
  const result = await prisma.rewardCategory.update({
    where: { id },
    data,
  });

  revalidatePath('/dashboard/rewards');
  revalidateTag('findAllRewardCategories');
  return result;
};
