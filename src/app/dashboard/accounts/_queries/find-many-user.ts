import 'server-only';

import type { $Enums } from '@prisma/client';
import { unstable_cache as cache } from 'next/cache';

import prisma from '@/config/db';

export interface FindManyUserParam {
  type?: $Enums.Role;
  search?: string;
}

const REVALIDATE = 604800; // 7 days
const CACHE_TAG = 'findManyUser';

export const findManyUser = cache(
  async ({ type, search }: FindManyUserParam) =>
    await prisma.user.findMany({
      where: {
        AND: [
          { type },
          {
            OR: [
              { username: { contains: search } },
              { displayName: { contains: search } },
            ],
          },
        ],
      },
    }),
  [CACHE_TAG],
  { revalidate: REVALIDATE, tags: [CACHE_TAG] },
);
