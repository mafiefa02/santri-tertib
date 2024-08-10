import { unstable_cache as cache } from 'next/cache';

import prisma from '@/config/db';

const REVALIDATE = 60;
const CACHE_TAG = 'countPermitRecords';

export const countPermitRecords = cache(
  async () => await prisma.leaveRecord.count(),
  [CACHE_TAG],
  { revalidate: REVALIDATE, tags: [CACHE_TAG] },
);
