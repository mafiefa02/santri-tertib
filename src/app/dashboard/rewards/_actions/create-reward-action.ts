'use server';

import { revalidatePath } from 'next/cache';
import { type z } from 'zod';

import prisma from '@/config/db';

import { type createRewardsSchema } from '../_schemas/create-rewards-schema';

export const createRewardAction = async (
  data: z.infer<typeof createRewardsSchema>,
) => {
  const result = await prisma.reward.create({
    data: { ...data, categoryId: parseInt(data.categoryId) },
  });

  revalidatePath('/dashboard/rewards');
  return result;
};
