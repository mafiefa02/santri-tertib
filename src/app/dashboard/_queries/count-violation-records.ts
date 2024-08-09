import { cache } from 'react';

import prisma from '@/config/db';

export const countViolationRecords = cache(
  async () => await prisma.violationRecord.count(),
);
