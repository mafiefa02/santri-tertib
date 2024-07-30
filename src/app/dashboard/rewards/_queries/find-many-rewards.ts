import { cache } from 'react';

import prisma from '@/config/db';
import 'server-only';

export interface FindManyRewardsParam {
  category?: string;
}

export const findManyRewards = cache(
  async ({ category }: FindManyRewardsParam) => {
    return prisma.reward.findMany({
      include: { category: { select: { name: true } } },
      where: {
        categoryId: getCategoryId(category),
      },
      orderBy: { categoryId: 'asc' },
    });
  },
);

const getCategoryId = (category?: string) => {
  if (!category) return undefined;
  if (category === '0') return null;
  return parseInt(category);
};
