'use server';

import { type Reward } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { type z } from 'zod';

import prisma from '@/config/db';

import { type editRewardsSchema } from '../_schemas/edit-rewards-schema';

export const editRewardAction = async (
  id: Reward['id'],
  data: z.infer<typeof editRewardsSchema>,
) => {
  const result = await prisma.reward.update({
    where: { id },
    data: { ...data, categoryId: parseInt(data.categoryId) },
  });

  revalidatePath('/dashboard/rewards', 'page');
  return result;
};
