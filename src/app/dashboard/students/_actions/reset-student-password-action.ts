'use server';

import type { Student } from '@prisma/client';
import { hash } from 'bcryptjs';

import prisma from '@/config/db';
import { randomString } from '@/utils/random-string';

export const resetStudentPasswordAction = async (studentId: Student['id']) => {
  const newPassword = randomString(8);
  const hashedNewPassword = await hash(newPassword, 10);
  await prisma.student.update({
    where: { id: studentId },
    data: { password: { update: { password: { set: hashedNewPassword } } } },
  });

  return newPassword;
};
