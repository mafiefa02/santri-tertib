import 'server-only';

import { type $Enums } from '@prisma/client';
import { unstable_cache as cache } from 'next/cache';

import prisma from '@/config/db';

interface QueryParams {
  type?: $Enums.ViolationType;
  category?: string;
}

const REVALIDATE = 604800; // 7 days
const CACHE_TAG = 'findManyViolations';

export const findManyViolations = cache(
  async ({ category, type }: QueryParams) =>
    await prisma.violation.findMany({
      include: { category: { select: { name: true } } },
      orderBy: { categoryId: 'desc' },
      where: { type, categoryId: category ? parseInt(category) : undefined },
    }),
  [CACHE_TAG],
  { revalidate: REVALIDATE, tags: [CACHE_TAG] },
);
