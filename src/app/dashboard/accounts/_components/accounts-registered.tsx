import { TableTbody, TableTd, TableTr } from '@mantine/core';

import prisma from '@/config/db';

import { AccountTypeBadge } from '../../_components/account-type-column';

export const AccountsRegistered = async () => {
  const data = await prisma.user.findMany();
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
