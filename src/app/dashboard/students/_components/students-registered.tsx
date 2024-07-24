import { TableTbody, TableTd, TableTr } from '@mantine/core';

import prisma from '@/config/db';

export const StudentsRegistered = async () => {
  const data = await prisma.student.findMany();
  return (
    <TableTbody>
      {data.length > 0 ? (
        data.map((row) => (
          <TableTr key={row.id}>
            <TableTd>{row.fullName}</TableTd>
            <TableTd>{row.username}</TableTd>
            <TableTd>{row.identityNumber}</TableTd>
            <TableTd>{row.totalPoints}</TableTd>
          </TableTr>
        ))
      ) : (
        <TableTr>
          <TableTd>-</TableTd>
          <TableTd>-</TableTd>
          <TableTd>-</TableTd>
          <TableTd>-</TableTd>
        </TableTr>
      )}
    </TableTbody>
  );
};
