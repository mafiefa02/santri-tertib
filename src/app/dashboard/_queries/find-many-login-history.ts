import { cache } from 'react';

import prisma from '@/config/db';

export const findManyLoginHistory = cache(
  async () =>
    await prisma.loginHistory.findMany({
      orderBy: { loginTime: 'desc' },
      take: 10,
    }),
);
