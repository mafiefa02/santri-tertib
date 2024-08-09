import { cache } from 'react';

import prisma from '@/config/db';

export const countPermitRecords = cache(
  async () => await prisma.leaveRecord.count(),
);
