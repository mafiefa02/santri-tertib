import { TableTbody, TableTd, TableTr } from '@mantine/core';

import prisma from '@/config/db';

export const StudentsRegistered = async () => {
  const data = await prisma.student.findMany();

  if (data.length === 0) return <EmptyState />;

  return (
    <TableTbody>
      {data.map((row) => (
        <TableTr key={row.id}>
          <TableTd>{row.fullName}</TableTd>
          <TableTd>{row.username}</TableTd>
          <TableTd>{row.identityNumber}</TableTd>
          <TableTd>{row.totalPoints}</TableTd>
        </TableTr>
      ))}
    </TableTbody>
  );
};

const EmptyState = () => (
  <TableTbody>
    <TableTr>
      <TableTd>-</TableTd>
      <TableTd>-</TableTd>
      <TableTd>-</TableTd>
      <TableTd>-</TableTd>
    </TableTr>
  </TableTbody>
);
