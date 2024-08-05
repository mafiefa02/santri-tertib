'use server';

import { cache } from 'react';

import prisma from '@/config/db';

interface QueryParams {
  search?: string;
  dormitory?: string;
}

export const findManyStudents = cache(
  async ({ search, dormitory }: QueryParams) =>
    prisma.student.findMany({
      where: {
        OR: [
          { fullName: { contains: search } },
          { identityNumber: { startsWith: search } },
        ],
        dormitory: { id: dormitory ? parseInt(dormitory) : undefined },
      },
      include: {
        dormitory: { select: { name: true } },
        class: { select: { name: true } },
      },
    }),
);
