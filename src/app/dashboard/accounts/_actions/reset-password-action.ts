'use server';

import type { User } from '@prisma/client';
import { hash } from 'bcryptjs';

import prisma from '@/config/db';
import { randomString } from '@/utils/random-string';

export const resetPasswordAction = async (userId: User['id']) => {
  const newPassword = randomString(8);
  const hashedNewPassword = await hash(newPassword, 10);
  await prisma.user.update({
    where: { id: userId },
    data: { password: { update: { password: { set: hashedNewPassword } } } },
  });

  return newPassword;
};
