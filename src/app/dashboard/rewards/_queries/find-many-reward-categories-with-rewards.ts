import 'server-only';

import { cache } from 'react';

import prisma from '@/config/db';

export const findManyRewardCategoriesWithRewards = cache(async () =>
  prisma.rewardCategory.findMany({
    include: { rewards: true },
  }),
);
