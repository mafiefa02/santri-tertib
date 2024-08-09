'use server';

import { cache } from 'react';

import prisma from '@/config/db';

export const findManyViolationCategories = cache(
  async () => await prisma.violationCategory.findMany(),
);
