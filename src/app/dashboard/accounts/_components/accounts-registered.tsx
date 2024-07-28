import { TableTbody, TableTd, TableTr } from '@mantine/core';
import type { $Enums } from '@prisma/client';

import prisma from '@/config/db';

import { AccountTypeBadge } from '../../_components/account-type-column';

export const AccountsRegistered = async ({
  type,
  search,
}: {
  type?: $Enums.Role;
  search?: string;
}) => {
  const data = await prisma.user.findMany({
    where: {
      AND: [
        { type },
        {
          OR: [
            { username: { contains: search } },
            { displayName: { contains: search } },
          ],
        },
      ],
    },
  });

  if (data.length === 0) return <EmptyState />;

  return (
    <TableTbody>
      {data.map((row) => (
        <TableTr key={row.id}>
          <TableTd>{row.displayName}</TableTd>
          <TableTd>{row.username}</TableTd>
          <TableTd>
            <AccountTypeBadge type={row.type} />
          </TableTd>
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
    </TableTr>
  </TableTbody>
);
