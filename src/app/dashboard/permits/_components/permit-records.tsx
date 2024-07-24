import { TableTbody, TableTd, TableTr } from '@mantine/core';
import dayjs from 'dayjs';

import prisma from '@/config/db';

export const PermitRecords = async () => {
  const data = await prisma.leaveRecord.findMany({
    include: {
      student: {
        select: { id: true, fullName: true },
      },
    },
  });

  return (
    <TableTbody>
      {data.length > 0 ? (
        data.map((row) => (
          <TableTr key={row.id}>
            <TableTd>{row.student.fullName}</TableTd>
            <TableTd>{row.guardianName}</TableTd>
            <TableTd>{dayjs(row.createdAt).format()}</TableTd>
            <TableTd>{dayjs(row.timeLimit).format()}</TableTd>
            <TableTd>{dayjs(row.leaveDate).format()}</TableTd>
            <TableTd>{dayjs(row.returnDate).format()}</TableTd>
            <TableTd>{row.leaveType}</TableTd>
            <TableTd>{row.destination}</TableTd>
          </TableTr>
        ))
      ) : (
        <TableTr>
          <TableTd>-</TableTd>
          <TableTd>-</TableTd>
          <TableTd>-</TableTd>
          <TableTd>-</TableTd>
          <TableTd>-</TableTd>
          <TableTd>-</TableTd>
          <TableTd>-</TableTd>
          <TableTd>-</TableTd>
        </TableTr>
      )}
    </TableTbody>
  );
};
