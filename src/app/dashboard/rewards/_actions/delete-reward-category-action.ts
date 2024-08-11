'use server';

import type { RewardCategory } from '@prisma/client';
import { revalidatePath, revalidateTag } from 'next/cache';

import prisma from '@/config/db';

export const deleteRewardCategoryAction = async (id: RewardCategory['id']) => {
  await prisma.rewardCategory.delete({ where: { id } });
  revalidatePath('/dashboard/rewards');
  revalidateTag('findAllRewardCategories');
};
