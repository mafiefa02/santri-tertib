'use server';

import type { Violation } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import prisma from '@/config/db';

export const deleteViolationAction = async (id: Violation['id']) => {
  await prisma.violation.delete({ where: { id } });
  revalidatePath('/dashboard/violations', 'page');
};
