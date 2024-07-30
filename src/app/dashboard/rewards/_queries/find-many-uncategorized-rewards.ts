import 'server-only';

import { cache } from 'react';

import prisma from '@/config/db';

export const findManyUncategorizedRewards = cache(async () =>
  prisma.reward.findMany({
    where: { category: null },
  }),
);
