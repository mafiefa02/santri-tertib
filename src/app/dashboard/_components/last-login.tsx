import { TableTbody, TableTd, TableTr } from '@mantine/core';
import React from 'react';

import prisma from '@/config/db';

import { AccountTypeBadge } from './account-type-column';
import { LastLoginTime } from './last-login-time';

export const LastLogin = async () => {
  const data = await prisma.loginHistory.findMany({
    orderBy: { loginTime: 'desc' },
    take: 10,
  });

  if (data.length === 0) return <EmptyState />;

  return (
    <TableTbody>
      {data.map((row) => (
        <TableTr key={row.id}>
          <TableTd>{row.accountName}</TableTd>
          <TableTd>{row.accountUsername}</TableTd>
          <TableTd>
            <AccountTypeBadge type={row.accountType} />
          </TableTd>
          <TableTd>
            <LastLoginTime loginTime={row.loginTime} />
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
      <TableTd>-</TableTd>
    </TableTr>
  </TableTbody>
);
