import 'server-only';

import { type $Enums } from '@prisma/client';
import { cache } from 'react';

import prisma from '@/config/db';

interface QueryParams {
  type?: $Enums.ViolationType;
  category?: string;
}

export const findManyViolationCategoriesWithViolation = cache(
  async ({ category, type }: QueryParams) =>
    prisma.violationCategory.findMany({
      where: { id: category ? parseInt(category) : undefined },
      include: { violations: { where: { type: { equals: type } } } },
    }),
);
