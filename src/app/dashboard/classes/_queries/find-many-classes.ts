import 'server-only';

import { unstable_cache as cache } from 'next/cache';

import prisma from '@/config/db';

interface Params {
  search?: string;
}

const REVALIDATE = 604800; // 7 days
const CACHE_TAG = 'findManyClasses';

export const findManyClasses = cache(
  async ({ search }: Params) =>
    await prisma.class.findMany({
      where: { name: { contains: search } },
      include: { _count: { select: { students: true } } },
    }),
  [CACHE_TAG],
  { tags: [CACHE_TAG], revalidate: REVALIDATE },
);
