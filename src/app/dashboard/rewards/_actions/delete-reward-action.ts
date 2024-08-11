'use server';

import type { Reward } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import prisma from '@/config/db';

export const deleteRewardAction = async (id: Reward['id']) => {
  await prisma.reward.delete({ where: { id } });
  revalidatePath('/dashboard/rewards');
};
