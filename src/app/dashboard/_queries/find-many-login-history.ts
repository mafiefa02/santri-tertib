import { unstable_cache as cache } from 'next/cache';

import prisma from '@/config/db';

const REVALIDATE = 60;
const CACHE_TAG = 'findManyLoginHistory';

export const findManyLoginHistory = cache(
  async () =>
    await prisma.loginHistory.findMany({
      orderBy: { loginTime: 'desc' },
      take: 10,
    }),
  [CACHE_TAG],
  { revalidate: REVALIDATE, tags: [CACHE_TAG] },
);
