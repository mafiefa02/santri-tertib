'use server';

import { unstable_cache as cache } from 'next/cache';

import prisma from '@/config/db';

const REVALIDATE = 604800; // 7 days
const CACHE_TAG = 'findAllViolationCategories';

export const findManyViolationCategories = cache(
  async () => await prisma.violationCategory.findMany(),
  [CACHE_TAG],
  { revalidate: REVALIDATE, tags: [CACHE_TAG] },
);
