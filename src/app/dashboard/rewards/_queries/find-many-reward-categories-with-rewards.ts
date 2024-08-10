import 'server-only';

import { unstable_cache as cache } from 'next/cache';

import prisma from '@/config/db';

export interface FindManyRewardCategoriesWithRewardsParam {
  category?: string;
}

export const REVALIDATE = 604800; // 7 days
export const CACHE_TAG = 'findManyRewardCategoriesWithRewards';

export const findManyRewardCategoriesWithRewards = cache(
  async ({ category }: FindManyRewardCategoriesWithRewardsParam) =>
    await prisma.rewardCategory.findMany({
      include: { rewards: true },
      where: {
        id: category ? parseInt(category) : undefined,
      },
    }),
  [CACHE_TAG],
  { revalidate: REVALIDATE, tags: [CACHE_TAG] },
);
