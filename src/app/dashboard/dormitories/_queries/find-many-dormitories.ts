import 'server-only';

import { unstable_cache as cache } from 'next/cache';

import prisma from '@/config/db';

interface Params {
  search?: string;
}

const REVALIDATE = 604800; // 7 days
const CACHE_TAG = 'findManyDormitories';

export const findManyDormitories = cache(
  async ({ search }: Params) =>
    await prisma.dormitory.findMany({
      where: { name: { contains: search } },
      include: { _count: { select: { students: true } } },
    }),
  [CACHE_TAG],
  { revalidate: REVALIDATE, tags: [CACHE_TAG] },
);
