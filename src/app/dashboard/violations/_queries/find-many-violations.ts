import 'server-only';

import { type $Enums } from '@prisma/client';
import { cache } from 'react';

import prisma from '@/config/db';

interface QueryParams {
  type?: $Enums.ViolationType;
  category?: string;
}

export const findManyViolations = cache(
  async ({ category, type }: QueryParams) =>
    prisma.violation.findMany({
      include: { category: { select: { name: true } } },
      orderBy: { categoryId: 'desc' },
      where: { type, categoryId: category ? parseInt(category) : undefined },
    }),
);
