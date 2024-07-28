import { TableTbody, TableTd, TableTr } from '@mantine/core';

import prisma from '@/config/db';

export const RewardsList = async () => {
  const data = await prisma.reward.findMany();

  if (data.length === 0) return <EmptyState />;

  return (
    <TableTbody>
      {data.map((row) => (
        <TableTr key={row.id}>
          <TableTd>{row.name}</TableTd>
          <TableTd>{row.points}</TableTd>
        </TableTr>
      ))}
    </TableTbody>
  );
};

const EmptyState = () => (
  <TableTr>
    <TableTd>-</TableTd>
    <TableTd>-</TableTd>
  </TableTr>
);
