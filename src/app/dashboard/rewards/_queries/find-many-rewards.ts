import 'server-only';

import { cache } from 'react';

import prisma from '@/config/db';

export interface FindManyRewardsParam {
  category?: string;
}

export const findManyRewards = cache(
  async ({ category }: FindManyRewardsParam) => {
    return prisma.reward.findMany({
      include: { category: { select: { name: true } } },
      orderBy: { categoryId: 'desc' },
      where: {
        categoryId: getCategoryId(category),
      },
    });
  },
);

const getCategoryId = (category?: string) => {
  if (!category) return undefined;
  return parseInt(category);
};
