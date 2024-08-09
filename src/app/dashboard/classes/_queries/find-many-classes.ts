import 'server-only';
import { cache } from 'react';

import prisma from '@/config/db';

interface Params {
  search?: string;
}

export const findManyClasses = cache(
  async ({ search }: Params) =>
    await prisma.class.findMany({
      where: { name: { contains: search } },
      include: { _count: { select: { students: true } } },
    }),
);
