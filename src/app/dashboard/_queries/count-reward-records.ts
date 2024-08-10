import { unstable_cache as cache } from 'next/cache';

import prisma from '@/config/db';

const REVALIDATE = 60;
const CACHE_TAG = 'countRewardRecords';

export const countRewardRecords = cache(
  async () => await prisma.rewardRecord.count(),
  [CACHE_TAG],
  { revalidate: REVALIDATE, tags: [CACHE_TAG] },
);
