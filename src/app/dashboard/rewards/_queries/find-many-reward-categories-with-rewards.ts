import 'server-only';

import { cache } from 'react';

import prisma from '@/config/db';

export interface FindManyRewardCategoriesWithRewardsParam {
  category?: string;
}

export const findManyRewardCategoriesWithRewards = cache(
  async ({ category }: FindManyRewardCategoriesWithRewardsParam) =>
    await prisma.rewardCategory.findMany({
      include: { rewards: true },
      where: {
        id: category ? parseInt(category) : undefined,
      },
    }),
);
