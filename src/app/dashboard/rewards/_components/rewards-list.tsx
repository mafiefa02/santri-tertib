import { TableTbody, TableTd, TableTr } from '@mantine/core';

import prisma from '@/config/db';

export const RewardsList = async () => {
  const data = await prisma.reward.findMany();
  return (
    <TableTbody>
      {data.length > 0 ? (
        data.map((row) => (
          <TableTr key={row.id}>
            <TableTd>{row.name}</TableTd>
            <TableTd>{row.points}</TableTd>
          </TableTr>
        ))
      ) : (
        <TableTr>
          <TableTd>-</TableTd>
          <TableTd>-</TableTd>
        </TableTr>
      )}
    </TableTbody>
  );
};
