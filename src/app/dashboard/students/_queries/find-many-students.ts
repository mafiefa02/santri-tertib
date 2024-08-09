'use server';

import { cache } from 'react';

import prisma from '@/config/db';

interface QueryParams {
  studentClass?: string;
  search?: string;
  dormitory?: string;
}

export const findManyStudents = cache(
  async ({ search, dormitory, studentClass }: QueryParams) =>
    await prisma.student.findMany({
      where: {
        AND: [
          {
            OR: [
              { fullName: { contains: search } },
              { identityNumber: { startsWith: search } },
              { username: { startsWith: search } },
            ],
          },
          { dormitoryId: dormitory ? parseInt(dormitory) : undefined },
          { classId: studentClass ? parseInt(studentClass) : undefined },
        ],
      },
      include: {
        dormitory: { select: { name: true } },
        class: { select: { name: true } },
      },
    }),
);
