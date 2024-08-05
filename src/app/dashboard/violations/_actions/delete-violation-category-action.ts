'use server';

import { type ViolationCategory } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import prisma from '@/config/db';

export const deleteViolationCategoryAction = async (
  id: ViolationCategory['id'],
) => {
  await prisma.violationCategory.delete({ where: { id } });
  revalidatePath('/dashboard/violations', 'page');
};
