import 'server-only';

import { unstable_cache as cache } from 'next/cache';

import prisma from '@/config/db';

export interface FindManyRewardsParam {
  category?: string;
}

const REVALIDATE = 604800; // 7 days
const CACHE_TAG = 'findManyRewards';

export const findManyRewards = cache(
  async ({ category }: FindManyRewardsParam) =>
    await prisma.reward.findMany({
      include: { category: { select: { name: true } } },
      orderBy: { categoryId: 'desc' },
      where: {
        categoryId: category ? parseInt(category) : undefined,
      },
    }),
  [CACHE_TAG],
  { revalidate: REVALIDATE, tags: [CACHE_TAG] },
);
