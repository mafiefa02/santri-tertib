import { cache } from 'react';

import prisma from '@/config/db';

export const countRewardRecords = cache(
  async () => await prisma.rewardRecord.count(),
);
