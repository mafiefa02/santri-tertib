import 'server-only';

import type { $Enums } from '@prisma/client';
import { cache } from 'react';

import prisma from '@/config/db';

export interface FindManyUserParam {
  type?: $Enums.Role;
  search?: string;
}

export const findManyUser = cache(async ({ type, search }: FindManyUserParam) =>
  prisma.user.findMany({
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
);
