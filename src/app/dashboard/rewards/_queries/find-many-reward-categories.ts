'use server';

import { cache } from 'react';

import prisma from '@/config/db';

export const findManyRewardCategories = cache(async () =>
  prisma.rewardCategory.findMany(),
);
