import { unstable_cache as cache } from 'next/cache';

import prisma from '@/config/db';

const REVALIDATE = 60;
const CACHE_TAG = 'countViolationRecords';

export const countViolationRecords = cache(
  async () => await prisma.violationRecord.count(),
  [CACHE_TAG],
  { revalidate: REVALIDATE, tags: [CACHE_TAG] },
);
