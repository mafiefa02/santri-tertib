import 'server-only';

import { type $Enums } from '@prisma/client';
import { unstable_cache as cache } from 'next/cache';

import prisma from '@/config/db';

interface QueryParams {
  type?: $Enums.ViolationType;
  category?: string;
}

const REVALIDATE = 604800; // 7 days
const CACHE_TAG = 'findManyViolationCategoriesWithViolation';

export const findManyViolationCategoriesWithViolation = cache(
  async ({ category, type }: QueryParams) =>
    await prisma.violationCategory.findMany({
      where: { id: category ? parseInt(category) : undefined },
      include: { violations: { where: { type: { equals: type } } } },
    }),
  [CACHE_TAG],
  { revalidate: REVALIDATE, tags: [CACHE_TAG] },
);
