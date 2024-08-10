'use server';

import { unstable_cache as cache } from 'next/cache';

import prisma from '@/config/db';

const REVALIDATE = 604800; // 7 days
const CACHE_TAG = 'findAllClasses';

export const findManyClasses = cache(
  async () => await prisma.class.findMany(),
  [CACHE_TAG],
  { revalidate: REVALIDATE, tags: [CACHE_TAG] },
);
